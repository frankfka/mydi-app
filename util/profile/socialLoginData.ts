import { OpenIDConnectUserInfo } from '@magic-ext/oauth';

/**
 * Represents the set of stored data from social logins that we support
 */
export type SocialLoginData = Pick<
  OpenIDConnectUserInfo,
  'sub' | 'email' | 'preferredUsername'
>;

export type SocialLoginDataKey = keyof SocialLoginData;
