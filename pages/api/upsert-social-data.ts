import type { NextApiResponse } from 'next';
import withSession, { NextIronRequest } from '../../server/session/withSession';
import EndpointResult from '../../types/EndpointResult';
import { CurrentWalletSessionData } from '../../util/session/SessionTypes';
import { SESSION_WALLET_KEY } from '../../util/session/sessionData';
import executeAsyncForResult from '../../util/executeAsyncForResult';
import { VerifyCaptchaResponse } from '../../server/handlers/verifyCaptchaHandler';
import resultToEndpointResult from '../../util/resultToEndpointResult';
import {
  supportedMagicOAuthTypes,
  SupportedOAuthType,
} from '../../client/util/socialLogin/socialLoginUtils';
import { SocialLoginData } from '../../util/profile/socialLoginData';
import { upsertSocialData } from '../../server/handlers/upsertSocialDataHandler';

type ReqBody = {
  provider: SupportedOAuthType;
  metadata: SocialLoginData;
};

const getValidReqBody = (reqBody: any): ReqBody | undefined => {
  if (!reqBody.provider || !reqBody.metadata) {
    return;
  }

  if (!supportedMagicOAuthTypes.includes(reqBody.provider)) {
    return;
  }

  return {
    provider: reqBody.provider,
    metadata: reqBody.metadata,
  };
};

/**
 * Upserts the given social data to the user profile within serssion
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

  if (!walletSessionData) {
    res.status(400).json({
      error: 'No current wallet session',
    });
    return;
  }

  const reqData = getValidReqBody(req.body);
  if (reqData == null) {
    res.status(400).json({
      error: 'Invalid request body',
    });
    return;
  }

  const result = await executeAsyncForResult(async () => {
    return upsertSocialData(
      walletSessionData.walletIdentifier,
      reqData.provider,
      reqData.metadata
    );
  });

  res.status(200).json(resultToEndpointResult(result));
}

export default withSession(handler);
