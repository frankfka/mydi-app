import { getLogger } from '../../util/logger';
import { getProfileAuthority } from '../../util/solana/solanaProgramQueries';
import { solanaAppAuthorityKey } from '../../util/solana/solanaProgramUtils';
import { serverSolanaProgram } from '../services/serverSolanaClient';
import { PublicKey } from '@solana/web3.js';
import { getUpsertUserDataTxn } from '../../util/solana/solanaProgramProfileUtils';

const logger = getLogger('verifyCaptchaHandler');

/*
HCaptcha Verification
 */

/**
 * Returned by hCaptcha
 */
type CaptchaVerificationResult = {
  success: boolean;
  // ISO string for when the captcha was completed
  challenge_ts: string;
  // Hostname of site where captcha was solved
  hostname: string;
  error_codes?: any[];
};

const verifyCaptchaToken = async (
  captchaToken: string
): Promise<CaptchaVerificationResult> => {
  const response = await fetch('https://hcaptcha.com/siteverify', {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
    },
    body: `response=${captchaToken}&secret=${process.env.HCAPTCHA_SECRET_KEY}`,
    method: 'POST',
  });

  return response.json();
};

/*
Handler
 */
export type VerifyCaptchaResponse = {
  transactionId: string;
};

/**
 * Handles verify-captcha endpoint
 */
export const verifyCaptchaHandler = async (
  sessionWalletAddress: string,
  captchaToken: string
): Promise<VerifyCaptchaResponse> => {
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

  console.log(solanaAppAuthorityKey.toString());

  // Now verify the token
  const verificationResult = await verifyCaptchaToken(captchaToken);

  logger.debug('Verification result from hCaptcha', verificationResult);

  if (!verificationResult.success) {
    throw Error('Given captcha token is not verified');
  }

  // All verified - write the record
  const txn = await getUpsertUserDataTxn(serverSolanaProgram, {
    metadataUri: '',
    namespace: 'captcha',
    userKey,
    authorityKey: solanaAppAuthorityKey,
  });
  const txnId = await serverSolanaProgram.provider.send(txn);

  return {
    transactionId: txnId,
  };
};
