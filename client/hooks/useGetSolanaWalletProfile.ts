import useSWR from 'swr';
import { Profile } from '../../types/Profile';
import { PublicKey } from '@solana/web3.js';
import { profileNamespaces } from '../../util/profile/profileNamespaces';
import { pull } from 'lodash';
import { getSolanaProfileData } from '../../util/solana/solanaProgramQueries';
import { Program } from '@project-serum/anchor';
import { KeyedMutator } from 'swr/dist/types';
import { getDataFromCid } from '../../util/ipfs/getDataFromCid';
import { useMemo } from 'react';

export type GetSolanaWalletProfileState = {
  profile?: Profile;
  nonExistentProfile: boolean; // True if we tried to fetch profile and it doesn't exist
  isLoading: boolean;
  isError: boolean;
  mutate: KeyedMutator<Profile | null>;
};

export type GetSolanaWalletProfileParams = {
  userKey: PublicKey;
  program: Program;
};

const solanaWalletProfileFetcher = async (
  program: Program,
  userKey: PublicKey
): Promise<Profile | null> => {
  // To determine if a profile exists, we query the 'general' namespace
  const generalNamespaceData = await getSolanaProfileData(program, {
    namespace: 'general',
    userKey: userKey,
  });

  // No profile exists
  if (generalNamespaceData == null) {
    return null;
  }

  // Now start to fetch other namespaces and add to baseProfile
  const generalProfileMetadata = await getDataFromCid(
    generalNamespaceData.metadataUri
  );
  const profile: Profile = {
    authorities: {},
    data: {
      general: {
        data: generalProfileMetadata ?? {},
        lastUpdated: generalNamespaceData.lastUpdated.toNumber(),
        authority: generalNamespaceData.authority.toString(),
      },
    },
  };

  // TODO Merge data from other namespaces (should do this in parallel)
  const otherNamespaces = pull(Object.values(profileNamespaces), 'general');

  // TODO Now get authorities (just our app right now)

  return profile;
};

export const useGetSolanaWalletProfile = (
  params?: GetSolanaWalletProfileParams
): GetSolanaWalletProfileState => {
  // Because we're passing an object (program), use `useMemo` to make sure useSwr doesn't get stuck in an infinite loop
  const swrKey = useMemo(
    () => (params != null ? [params.program, params.userKey] : null),
    [params?.userKey]
  );
  const { data, error, mutate } = useSWR(swrKey, solanaWalletProfileFetcher);

  if (error) {
    console.error('Error getting wallet profile', error);
  }

  const isLoading = params != null && !error && data === undefined;
  // Fetcher returns null if profile doesn't exist
  const nonExistentProfile = params != null && !error && data === null;

  return {
    profile: data ?? undefined,
    nonExistentProfile,
    isLoading,
    isError: error != null,
    mutate,
  };
};
