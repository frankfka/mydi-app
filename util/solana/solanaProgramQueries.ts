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
import { getLogger } from '../logger';

const logger = getLogger('SolanaProgramQueries');

const isAccountNotExistsError = (err: unknown) =>
  err instanceof Error &&
  (err.message.includes('Account does not exist') ||
    err.message.includes('Invalid account discriminator'));

/*
Queries for our solana program
 */

export const getProfileData = async (
  program: Program,
  params: GetProfileDataParams
): Promise<SolanaProfileData | undefined> => {
  const [dataPda] = await getDataProgramAddress(
    params.userKey,
    params.namespace
  );
  logger.debug('Executing profile data query with params', params);

  try {
    const fetchedData = await program.account.userDataRecord.fetch(dataPda);

    logger.debug('Fetched profile data', fetchedData);

    return fetchedData as unknown as SolanaProfileData;
  } catch (err) {
    if (isAccountNotExistsError(err)) {
      return;
    }
    // Bubble up this error
    logger.warn('Error getting profile data', err);
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
  logger.debug('Executing profile authority query with params', params);

  try {
    const fetchedAuthority = await program.account.userAuthorityRecord.fetch(
      authorityPda
    );
    logger.debug('Fetched profile authority', fetchedAuthority);

    return fetchedAuthority as unknown as ProfileAuthority;
  } catch (err) {
    logger.warn('Error getting profile authority', err);
    if (isAccountNotExistsError(err)) {
      return;
    }
    // Bubble up this error
    throw err;
  }
};
