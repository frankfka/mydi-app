import {
  getAuthorityProgramAddress,
  getDataProgramAddress,
} from './solanaProgramUtils';
import {
  PublicKey,
  SystemProgram,
  TransactionInstruction,
} from '@solana/web3.js';
import {
  CreateProfileAuthorityParams,
  CreateProfileDataParams,
  DeleteProfileAuthorityParams,
  DeleteProfileDataParams,
  UpdateProfileDataParams,
} from './solanaProfileTypes';
import { Program } from '@project-serum/anchor';

/*
Authority
 */

/**
 * Creates a instruction to create an authority
 * @param program
 * @param params
 */
export const getCreateSolanaProfileAuthorityIx = async (
  program: Program,
  params: CreateProfileAuthorityParams
): Promise<TransactionInstruction> => {
  const [authorityPda, authorityBump] = await getAuthorityProgramAddress(
    params.userKey,
    params.authorityKey,
    params.scope
  );

  return program.instruction.createAuthorityRecord(
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
 * Creates a instruction to delete an authority account
 * @param program
 * @param params
 */
export const getDeleteSolanaProfileAuthorityIx = async (
  program: Program,
  params: DeleteProfileAuthorityParams
): Promise<TransactionInstruction> => {
  const [authorityPda, authorityBump] = await getAuthorityProgramAddress(
    params.userKey,
    params.authorityKey,
    params.scope
  );

  return program.instruction.deleteAuthorityRecord(
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
 * Util fn to get an authority record from params, which is checked when authority != user
 * @param params
 */
const getAllScopedAuthorityRecordFromParams = async (
  params: Pick<CreateProfileDataParams, 'authorityKey' | 'userKey'>
): Promise<PublicKey> => {
  // Authority is checked if the user is not the authority
  let authorityRecord = params.userKey;
  if (params.authorityKey != null) {
    // Derive the authority record for the required namespace
    [authorityRecord] = await getAuthorityProgramAddress(
      params.userKey,
      params.authorityKey,
      'all' // App authority should be the only one using this fn, which should have all scope
    );
  }

  return authorityRecord;
};

/**
 * Creates a instruction to create a profile data account
 * @param program
 * @param params
 */
export const getCreateSolanaProfileDataIx = async (
  program: Program,
  params: CreateProfileDataParams
): Promise<TransactionInstruction> => {
  const [dataPda, dataBump] = await getDataProgramAddress(
    params.userKey,
    params.namespace
  );

  return program.instruction.createDataRecord(
    params.metadataUri,
    params.namespace,
    dataBump,
    {
      accounts: {
        dataRecord: dataPda,
        user: params.userKey,
        authority: params.authorityKey ?? params.userKey,
        authorityRecord: await getAllScopedAuthorityRecordFromParams(params),
        systemProgram: SystemProgram.programId,
      },
    }
  );
};

/**
 * Creates a instruction to update a profile data account
 * @param program
 * @param params
 */
export const getUpdateSolanaProfileDataIx = async (
  program: Program,
  params: UpdateProfileDataParams
): Promise<TransactionInstruction> => {
  const [dataPda, dataBump] = await getDataProgramAddress(
    params.userKey,
    params.namespace
  );

  return program.instruction.updateDataRecord(
    params.metadataUri,
    params.namespace,
    dataBump,
    {
      accounts: {
        dataRecord: dataPda,
        user: params.userKey,
        authority: params.authorityKey ?? params.userKey,
        authorityRecord: await getAllScopedAuthorityRecordFromParams(params),
        systemProgram: SystemProgram.programId,
      },
    }
  );
};

/**
 * Creates a Ix to delete a profile data account
 * @param program
 * @param params
 */
export const getDeleteSolanaProfileDataIx = async (
  program: Program,
  params: DeleteProfileDataParams
): Promise<TransactionInstruction> => {
  const [dataPda, dataBump] = await getDataProgramAddress(
    params.userKey,
    params.namespace
  );

  return program.instruction.deleteDataRecord(params.namespace, dataBump, {
    accounts: {
      dataRecord: dataPda,
      user: params.userKey,
      authority: params.authorityKey ?? params.userKey,
      authorityRecord: await getAllScopedAuthorityRecordFromParams(params),
      systemProgram: SystemProgram.programId,
    },
  });
};
