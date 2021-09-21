import { PublicKey, Transaction } from '@solana/web3.js';
import {
  getCreateSolanaProfileDataIx,
  getUpdateSolanaProfileDataIx,
} from './solanaProgramInstructions';
import { getProfileData } from './solanaProgramQueries';
import { Program } from '@project-serum/anchor';
import { ProfileNamespace } from '../profile/profileNamespaces';

export type UpsertUserDataParams = {
  userKey: PublicKey;
  authorityKey?: PublicKey;
  metadataUri: string;
  namespace: ProfileNamespace;
};

export const getUpsertUserDataTxn = async (
  profileProgram: Program,
  upsertParams: UpsertUserDataParams
): Promise<Transaction> => {
  // Fetch existing data
  const existingData = await getProfileData(profileProgram, {
    userKey: upsertParams.userKey,
    namespace: upsertParams.namespace,
  });

  const authorityKey = upsertParams.authorityKey ?? upsertParams.userKey;

  const txn = new Transaction();
  if (existingData != null) {
    // Use update
    const updateDataIx = await getUpdateSolanaProfileDataIx(profileProgram, {
      metadataUri: upsertParams.metadataUri,
      userKey: upsertParams.userKey,
      authorityKey,
      namespace: upsertParams.namespace,
    });
    txn.add(updateDataIx);
  } else {
    // Use create
    const createDataIx = await getCreateSolanaProfileDataIx(profileProgram, {
      metadataUri: upsertParams.metadataUri,
      userKey: upsertParams.userKey,
      authorityKey,
      namespace: upsertParams.namespace,
    });
    txn.add(createDataIx);
  }

  return txn;
};
