import type { NextApiResponse } from 'next';
import EndpointResult from '../../types/EndpointResult';
import withSession, { NextIronRequest } from '../../server/session/withSession';

export type LogoutResponse = {};

/**
 * Destroys the current session
 * @param req
 * @param res
 */
async function handler(
  req: NextIronRequest,
  res: NextApiResponse<EndpointResult<LogoutResponse>>
) {
  await req.session.destroy();
  res.status(200).json({});
}

export default withSession(handler);
