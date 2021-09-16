import {
  getAuthorityProgramAddress,
  getDataProgramAddress,
} from './solanaProgramUtils';
import { SystemProgram, Transaction } from '@solana/web3.js';
import {
  CreateProfileAuthorityParams,
  CreateProfileDataParams,
  DeleteProfileAuthorityParams,
  DeleteProfileDataParams,
} from './solanaProfileTypes';
import { Program } from '@project-serum/anchor';

/*
Authority
 */

/**
 * Creates a transaction to create an authority
 * @param program
 * @param params
 */
export const getCreateSolanaProfileAuthorityTxn = async (
  program: Program,
  params: CreateProfileAuthorityParams
): Promise<Transaction> => {
  const [authorityPda, authorityBump] = await getAuthorityProgramAddress(
    params.userKey,
    params.authorityKey,
    params.scope
  );

  return program.transaction.createAuthorityRecord(
    params.scope,
    authorityBump,
    {
      accounts: {
        authorityRecord: authorityPda,
        user: params.userKey,
        authority: params.authorityKey,
        systemProgram: SystemProgram.programId,
      },
    }
  );
};

/**
 * Creates a transaction to delete an authority account
 * @param program
 * @param params
 */
export const getDeleteSolanaProfileAuthorityTxn = async (
  program: Program,
  params: DeleteProfileAuthorityParams
) => {
  const [authorityPda, authorityBump] = await getAuthorityProgramAddress(
    params.userKey,
    params.authorityKey,
    params.scope
  );

  return program.transaction.deleteAuthorityRecord(
    params.scope,
    authorityBump,
    {
      accounts: {
        authorityRecord: authorityPda,
        user: params.userKey,
        authority: params.authorityKey,
      },
    }
  );
};

/*
Data
 */

/**
 * Creates a transaction to create a profile data account
 * @param program
 * @param params
 */
export const getCreateSolanaProfileDataTxn = async (
  program: Program,
  params: CreateProfileDataParams
): Promise<Transaction> => {
  const [dataPda, dataBump] = await getDataProgramAddress(
    params.userKey,
    params.namespace
  );

  // Authority is checked if the user is not the authority
  let authorityRecord = params.userKey;
  if (params.authorityKey != null) {
    // Derive the authority record for the required namespace
    [authorityRecord] = await getAuthorityProgramAddress(
      params.userKey,
      params.authorityKey,
      params.namespace
    );
  }

  return program.transaction.createDataRecord(
    params.metadataUri,
    params.namespace,
    dataBump,
    {
      accounts: {
        dataRecord: dataPda,
        user: params.userKey,
        authority: params.authorityKey ?? params.userKey,
        authorityRecord,
        systemProgram: SystemProgram.programId,
      },
    }
  );
};

/**
 * Creates a txn to delete a profile data account
 * @param program
 * @param params
 */
export const getDeleteSolanaProfileDataTxn = async (
  program: Program,
  params: DeleteProfileDataParams
): Promise<Transaction> => {
  const [dataPda, dataBump] = await getDataProgramAddress(
    params.userKey,
    params.namespace
  );

  // Authority is checked if the user is not the authority
  let authorityRecord = params.userKey;
  if (params.authorityKey != null) {
    // Derive the authority record for the required namespace
    [authorityRecord] = await getAuthorityProgramAddress(
      params.userKey,
      params.authorityKey,
      params.namespace
    );
  }

  return program.transaction.deleteDataRecord(params.namespace, dataBump, {
    accounts: {
      dataRecord: dataPda,
      user: params.userKey,
      authority: params.authorityKey ?? params.userKey,
      authorityRecord,
    },
  });
};
