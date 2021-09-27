import useSWR from 'swr';
import { Profile, ProfileDataRecordTypes } from '../../util/profile/Profile';
import { PublicKey } from '@solana/web3.js';
import {
  ProfileNamespace,
  profileNamespaces,
} from '../../util/profile/profileNamespaces';
import { pull } from 'lodash';
import {
  getProfileAuthority,
  getProfileData,
} from '../../util/solana/solanaProgramQueries';
import { Program } from '@project-serum/anchor';
import { KeyedMutator } from 'swr/dist/types';
import { useMemo } from 'react';
import { solanaAppAuthorityKey } from '../../util/solana/solanaProgramUtils';
import { getLogger } from '../../util/logger';
import { callGetMetadataApi } from '../util/getMetadataApi';

const logger = getLogger('useGetSolanaWalletProfile');

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

const namespaceFetcher = async <TMetadata extends ProfileDataRecordTypes>(
  program: Program,
  userKey: PublicKey,
  namespace: ProfileNamespace,
  profile: Profile
): Promise<void> => {
  // Get data from blockchain
  const namespaceData = await getProfileData(program, {
    namespace,
    userKey: userKey,
  });

  if (namespaceData == null) {
    logger.debug(
      'No data found for namespace',
      namespace,
      'with user',
      userKey.toString()
    );
    return;
  }

  // Get metadata
  let metadata: ProfileDataRecordTypes = {};
  if (namespaceData.metadataUri) {
    metadata = (await callGetMetadataApi(namespaceData.metadataUri)) ?? {};
  }

  profile.data[namespace] = {
    data: metadata,
    lastUpdated: namespaceData.lastUpdated.toNumber(),
    authority: namespaceData.authority.toString(),
    metadataUri: namespaceData.metadataUri,
  };
};

const solanaWalletProfileFetcher = async (
  program: Program,
  userKey: PublicKey
): Promise<Profile | null> => {
  logger.debug('Fetching profile for user', userKey.toString());

  const profile: Profile = {
    authorities: {},
    data: {},
  } as unknown as Profile;

  // Fetch the general namespace first
  await namespaceFetcher(program, userKey, 'general', profile);

  if (profile.data.general == null) {
    logger.debug('No general namespace exists for user');
    return null;
  }

  // Merge data from other namespaces, doing this in parallel
  const otherNamespaces = pull(Object.values(profileNamespaces), 'general');
  const namespaceDataPromises = otherNamespaces.map((namespace) => {
    return namespaceFetcher(program, userKey, namespace, profile);
  });
  await Promise.all(namespaceDataPromises);

  // Now get authorities (only our app right now)
  const appAuthority = await getProfileAuthority(program, {
    scope: 'all',
    authorityKey: solanaAppAuthorityKey,
    userKey,
  });

  if (appAuthority != null) {
    profile.authorities[solanaAppAuthorityKey.toString()] = {
      ...appAuthority,
      lastAuthorized: appAuthority.lastAuthorized.toNumber(),
      scope: 'all',
    };
  }

  logger.debug('Finished fetching profile data', profile);

  return profile;
};

export const useGetSolanaWalletProfile = (
  params?: GetSolanaWalletProfileParams
): GetSolanaWalletProfileState => {
  // Because we're passing an object (program), use `useMemo` to make sure useSwr doesn't get stuck in an infinite loop
  const swrKey = useMemo(
    () => (params != null ? [params.program, params.userKey] : null),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [params?.userKey]
  );
  const { data, error, mutate } = useSWR(swrKey, solanaWalletProfileFetcher);

  if (error) {
    logger.error('Error getting wallet profile', error);
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
