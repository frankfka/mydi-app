import type { NextApiResponse } from 'next';
import EndpointResult from '../../../types/EndpointResult';
import withSession, {
  NextIronRequest,
} from '../../../server/session/withSession';
import {
  AppSessionData,
  CurrentWalletSessionData,
} from '../../../util/session/SessionTypes';
import { SESSION_WALLET_KEY } from '../../../util/session/sessionData';

export type SessionResponse = AppSessionData;

/**
 * Fetches the current session data
 * @param req
 * @param res
 */
async function handler(
  req: NextIronRequest,
  res: NextApiResponse<EndpointResult<SessionResponse>>
) {
  const walletSessionData = await req.session.get<CurrentWalletSessionData>(
    SESSION_WALLET_KEY
  );

  res.status(200).json({
    data: {
      wallet: walletSessionData,
    },
  });
}

export default withSession(handler);
