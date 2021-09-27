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

export type CreateSessionResponse = AppSessionData;

/**
 * Destroys the current session adn creates a new session given a wallet address.
 * This is named "login" but only a wallet address is required to establish a new session
 * @param req - has a `pubKey` property
 * @param res
 */
async function handler(
  req: NextIronRequest,
  res: NextApiResponse<EndpointResult<CreateSessionResponse>>
) {
  const newWalletSessionData: CurrentWalletSessionData = req.body;

  // Destroy the existing session
  await req.session.destroy();

  if (!newWalletSessionData.walletIdentifier || !newWalletSessionData.type) {
    res.status(400).json({
      error:
        'Attempting to create a session without a wallet identifier or type',
    });

    return;
  }

  // Create a new session
  await req.session.set<CurrentWalletSessionData>(
    SESSION_WALLET_KEY,
    newWalletSessionData
  );
  await req.session.save();

  res.status(200).json({
    data: {
      wallet: newWalletSessionData,
    },
  });
}

export default withSession(handler);
