import type { NextApiResponse } from 'next';
import EndpointResult from '../../types/EndpointResult';
import withSession, { NextIronRequest } from '../../server/session/withSession';
import { BaseUserSessionData } from '../../types/SessionTypes';
import { SESSION_USER_KEY } from '../../util/session/sessionData';

export type LoginResponse = {};

/**
 * Destroys the current session adn creates a new session given a wallet address.
 * This is named "login" but only a wallet address is required to establish a new session
 * @param req - has a `pubKey` property
 * @param res
 */
async function handler(
  req: NextIronRequest,
  res: NextApiResponse<EndpointResult<LoginResponse>>
) {
  const { pubKey } = req.body;

  // Destroy the existing session
  await req.session.destroy();

  if (!pubKey) {
    res.status(400).json({
      error: 'Attempting to create a session without a pubKey',
    });

    return;
  }

  // Create a new session
  await req.session.set<BaseUserSessionData>(SESSION_USER_KEY, {
    pubKey,
  });
  await req.session.save();

  res.status(200).json({});
}

export default withSession(handler);
