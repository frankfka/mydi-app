import { NextApiRequest, NextApiResponse } from 'next';
import { Session, withIronSession } from 'next-iron-session';
import { SESSION_COOKIE_NAME } from '../../util/session/sessionData';

const sessionPassword = process.env.SESSION_COOKIE_PASSWORD;
if (!sessionPassword) {
  throw Error('Cookie session password not specified');
}

export type NextIronRequest = NextApiRequest & { session: Session };
export type NextIronHandler = (
  req: NextIronRequest,
  res: NextApiResponse
) => void | Promise<void>;

const withSession = (handler: NextIronHandler) =>
  withIronSession(handler, {
    password: sessionPassword,
    cookieName: SESSION_COOKIE_NAME,
    cookieOptions: {
      // Allow http for dev
      secure: process.env.NODE_ENV === 'production',
    },
  });

export default withSession;
