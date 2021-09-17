import { Connection, Transaction } from '@solana/web3.js';
import { addIpfsPrefix } from '../../../util/ipfs/cidUtils';
import { callStoreMetadataApi } from '../../util/storeMetadataApi';
import {
  getCreateSolanaProfileAuthorityIx,
  getCreateSolanaProfileDataIx,
  getDeleteSolanaProfileAuthorityIx,
  getDeleteSolanaProfileDataIx,
  getUpdateSolanaProfileDataIx,
} from '../../../util/solana/solanaProgramInstructions';
import { solanaAppAuthorityKey } from '../../../util/solana/solanaProgramUtils';
import { ProfileNamespace } from '../../../util/profile/profileNamespaces';
import { ProfileGeneralMetadata } from '../../../types/ProfileMetadata';
import { Program } from '@project-serum/anchor';
import { WalletContextState } from '@solana/wallet-adapter-react';
import {
  getProfileAuthority,
  getProfileData,
} from '../../../util/solana/solanaProgramQueries';
import { getLogger } from '../../../util/logger';

const logger = getLogger('solanaProfileContextUtils');

export type CreateUserProfileParams = ProfileGeneralMetadata & {
  createAppAuthority: boolean; // Whether to add instruction to also create an authorization for our app
};

export type UpsertUserDataParams = {
  data: any;
  namespace: ProfileNamespace;
};

/**
 * Creates a brand new user profile given the params
 * @param connection
 * @param wallet
 * @param profileProgram
 * @param params
 */
export const createUserProfile = async (
  connection: Connection,
  wallet: WalletContextState,
  profileProgram: Program,
  params: CreateUserProfileParams
): Promise<string> => {
  if (wallet.publicKey == null) {
    throw Error('Wallet public key not defined');
  }

  const txn = new Transaction();

  const metadataUri = addIpfsPrefix(
    await callStoreMetadataApi({
      displayName: params.displayName,
      description: params.description,
      imageUri: params.imageUri,
    })
  );
  const createProfileDataIx = await getCreateSolanaProfileDataIx(
    profileProgram,
    {
      metadataUri: metadataUri,
      userKey: wallet.publicKey,
      namespace: 'general',
    }
  );
  txn.add(createProfileDataIx);

  if (params.createAppAuthority) {
    const createAppAuthorityIx = await getCreateSolanaProfileAuthorityIx(
      profileProgram,
      {
        authorityKey: solanaAppAuthorityKey,
        userKey: wallet.publicKey,
        scope: 'all',
      }
    );
    txn.add(createAppAuthorityIx);
  }

  return wallet.sendTransaction(txn, connection);
};

/**
 * Either creates or updates data under a namespace for the user. If called within the context,
 * the user is the authority, as our signer is not exposed on the front end
 * @param connection
 * @param wallet
 * @param profileProgram
 * @param params
 */
export const upsertUserData = async (
  connection: Connection,
  wallet: WalletContextState,
  profileProgram: Program,
  params: UpsertUserDataParams
): Promise<string> => {
  if (wallet.publicKey == null) {
    throw Error('Wallet public key not defined');
  }

  // Fetch existing data
  const existingData = await getProfileData(profileProgram, {
    userKey: wallet.publicKey,
    namespace: params.namespace,
  });

  // Upload new metadata
  const metadataUri = addIpfsPrefix(await callStoreMetadataApi(params.data));

  const txn = new Transaction();
  if (existingData != null) {
    // Use update
    const updateDataIx = await getUpdateSolanaProfileDataIx(profileProgram, {
      metadataUri: metadataUri,
      userKey: wallet.publicKey,
      namespace: params.namespace,
    });
    txn.add(updateDataIx);
  } else {
    // Use create
    const createDataIx = await getCreateSolanaProfileDataIx(profileProgram, {
      metadataUri: metadataUri,
      userKey: wallet.publicKey,
      namespace: params.namespace,
    });
    txn.add(createDataIx);
  }

  return wallet.sendTransaction(txn, connection);
};

/**
 * Deletes user data for a given namespace
 * @param connection
 * @param wallet
 * @param profileProgram
 * @param namespace
 */
export const deleteUserData = async (
  connection: Connection,
  wallet: WalletContextState,
  profileProgram: Program,
  namespace: ProfileNamespace
): Promise<string | undefined> => {
  if (wallet.publicKey == null) {
    throw Error('Wallet public key not defined');
  }

  // Check that the namespace exists
  const existingData = await getProfileData(profileProgram, {
    userKey: wallet.publicKey,
    namespace: namespace,
  });

  if (!existingData) {
    logger.warn('Attempting to delete user data without an existing entry');
    return;
  }

  const txn = new Transaction();

  const deleteAppDataIx = await getDeleteSolanaProfileDataIx(profileProgram, {
    userKey: wallet.publicKey,
    namespace: namespace,
  });
  txn.add(deleteAppDataIx);

  return wallet.sendTransaction(txn, connection);
};

/**
 * Attempts to authorize us as an authority with a scope of "all"
 * @param connection
 * @param wallet
 * @param profileProgram
 */
export const createAppAuthority = async (
  connection: Connection,
  wallet: WalletContextState,
  profileProgram: Program
): Promise<string> => {
  if (wallet.publicKey == null) {
    throw Error('Wallet public key not defined');
  }

  const txn = new Transaction();

  const createAppAuthorityIx = await getCreateSolanaProfileAuthorityIx(
    profileProgram,
    {
      authorityKey: solanaAppAuthorityKey,
      userKey: wallet.publicKey,
      scope: 'all',
    }
  );
  txn.add(createAppAuthorityIx);

  return wallet.sendTransaction(txn, connection);
};

/**
 * Attempts to delete our authorization
 * @param connection
 * @param wallet
 * @param profileProgram
 */
export const deleteAppAuthority = async (
  connection: Connection,
  wallet: WalletContextState,
  profileProgram: Program
): Promise<string | undefined> => {
  if (wallet.publicKey == null) {
    throw Error('Wallet public key not defined');
  }

  // Check that the authority exists
  const existingData = await getProfileAuthority(profileProgram, {
    userKey: wallet.publicKey,
    authorityKey: solanaAppAuthorityKey,
    scope: 'all',
  });

  if (!existingData) {
    logger.warn(
      'Attempting to delete user authority without an existing entry'
    );
    return;
  }

  const txn = new Transaction();

  const deleteAppAuthorityIx = await getDeleteSolanaProfileAuthorityIx(
    profileProgram,
    {
      authorityKey: solanaAppAuthorityKey,
      userKey: wallet.publicKey,
      scope: 'all',
    }
  );
  txn.add(deleteAppAuthorityIx);

  return wallet.sendTransaction(txn, connection);
};
