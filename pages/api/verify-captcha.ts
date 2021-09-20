import type { NextApiResponse } from 'next';
import withSession, { NextIronRequest } from '../../server/session/withSession';
import EndpointResult from '../../types/EndpointResult';
import { CurrentWalletSessionData } from '../../types/SessionTypes';
import { SESSION_WALLET_KEY } from '../../util/session/sessionData';
import executeAsyncForResult from '../../util/executeAsyncForResult';
import { verifyCaptchaToken } from '../../server/handlers/verifyCaptchaHandlerUtils';

export type VerifyCaptchaResponse = {};

/**
 * Fetches the current session data
 * @param req
 * @param res
 */
async function handler(
  req: NextIronRequest,
  res: NextApiResponse<EndpointResult<VerifyCaptchaResponse>>
) {
  const walletSessionData = await req.session.get<CurrentWalletSessionData>(
    SESSION_WALLET_KEY
  );

  if (!walletSessionData?.pubKey) {
    res.status(400).json({
      error: 'No current wallet address in session',
    });
    return;
  }

  // Get the captcha from the request body and veirfy it
  const { captchaToken } = req.body;
  if (!captchaToken || typeof captchaToken !== 'string') {
    res.status(400).json({
      error: 'Invalid captcha token',
    });
    return;
  }

  // Verification logic
  const result = executeAsyncForResult(async () => {
    const verificationResult = await verifyCaptchaToken(captchaToken);
    if (!verificationResult.success) {
      throw Error('Given captcha token is not verified');
    }

    console.log('Verification result', verificationResult);
  });

  res.status(200).json({
    data: {},
  });
}

export default withSession(handler);
