import type { NextApiResponse } from 'next';
import EndpointResult from '../../types/EndpointResult';
import withSession, { NextIronRequest } from '../../server/session/withSession';
import { BaseUserSessionData, UserSessionData } from '../../types/SessionTypes';
import { SESSION_USER_KEY } from '../../util/session/sessionData';

export type UserResponse = UserSessionData;

/**
 * Fetches the current session data
 * @param req
 * @param res
 */
async function handler(
  req: NextIronRequest,
  res: NextApiResponse<EndpointResult<UserResponse>>
) {
  const baseUserData = await req.session.get<BaseUserSessionData>(
    SESSION_USER_KEY
  );

  res.status(200).json({
    data: {
      user: baseUserData,
    },
  });
}

export default withSession(handler);
