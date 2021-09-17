import {
  GetProfileAuthorityParams,
  GetProfileDataParams,
  ProfileAuthority,
  SolanaProfileData,
} from './solanaProfileTypes';
import { Program } from '@project-serum/anchor';
import {
  getAuthorityProgramAddress,
  getDataProgramAddress,
} from './solanaProgramUtils';

const isAccountNotExistsError = (err: unknown) =>
  err instanceof Error && err.message.includes('Account does not exist');

/*
Queries for our solana program
 */

export const getSolanaProfileData = async (
  program: Program,
  params: GetProfileDataParams
): Promise<SolanaProfileData | undefined> => {
  const [dataPda] = await getDataProgramAddress(
    params.userKey,
    params.namespace
  );

  try {
    const fetchedData = await program.account.userDataRecord.fetch(dataPda);
    return fetchedData as unknown as SolanaProfileData;
  } catch (err) {
    if (isAccountNotExistsError(err)) {
      return;
    }
    // Bubble up this error
    throw err;
  }
};

/**
 * Retrieve profile authority, returning undefined if the authority record does not exist
 */
export const getProfileAuthority = async (
  program: Program,
  params: GetProfileAuthorityParams
): Promise<ProfileAuthority | undefined> => {
  const [authorityPda] = await getAuthorityProgramAddress(
    params.userKey,
    params.authorityKey,
    params.scope
  );

  try {
    const fetchedAuthority = await program.account.userAuthorityRecord.fetch(
      authorityPda
    );
    return fetchedAuthority as unknown as ProfileAuthority;
  } catch (err) {
    if (isAccountNotExistsError(err)) {
      return;
    }
    // Bubble up this error
    throw err;
  }
};
