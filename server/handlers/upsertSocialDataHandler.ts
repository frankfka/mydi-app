import { getLogger } from '../../util/logger';
import { getProfileAuthority } from '../../util/solana/solanaProgramQueries';
import { solanaAppAuthorityKey } from '../../util/solana/solanaProgramUtils';
import { serverSolanaProgram } from '../util/serverSolanaClient';
import { PublicKey } from '@solana/web3.js';
import { getUpsertUserDataTxn } from '../../util/solana/solanaProgramProfileUtils';
import { SocialLoginData } from '../../util/profile/socialLoginData';
import { uploadDataToIpfs } from '../../util/ipfs/uploadDataToIpfs';
import { addIpfsPrefix } from '../../util/ipfs/cidUtils';
import { SupportedOAuthType } from '../../client/util/socialLogin/socialLoginUtils';

const logger = getLogger('upsertSocialDataHandler');

export type UpsertSocialDataHandlerResponse = {
  transactionId: string;
};

/**
 * Handles upsert-social-data endpoint
 */
export const upsertSocialData = async (
  sessionWalletAddress: string,
  provider: SupportedOAuthType,
  metadata: SocialLoginData
): Promise<UpsertSocialDataHandlerResponse> => {
  const userKey = new PublicKey(sessionWalletAddress);

  // Verify that we have authority to write to profile
  const appAuthority = getProfileAuthority(serverSolanaProgram, {
    userKey,
    authorityKey: solanaAppAuthorityKey,
    scope: 'all',
  });
  if (!appAuthority) {
    throw Error('App does not have authority to write to profile');
  }

  // Upload metadata
  const metadataUri = await uploadDataToIpfs(metadata);

  logger.debug('Metadata uploaded with URI', metadataUri);

  // All verified - write the record
  const txn = await getUpsertUserDataTxn(serverSolanaProgram, {
    metadataUri: addIpfsPrefix(metadataUri),
    namespace: `social.${provider}`,
    userKey,
    authorityKey: solanaAppAuthorityKey,
  });
  const txnId = await serverSolanaProgram.provider.send(txn);

  return {
    transactionId: txnId,
  };
};
