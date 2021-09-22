import { OAuthRedirectResult } from '@magic-ext/oauth';
import { SocialLoginData } from '../../../util/profile/socialLoginData';

export const supportedMagicOAuthTypes = ['discord', 'github'] as const;

export type SupportedOAuthType = typeof supportedMagicOAuthTypes[number];

export const getSocialLoginData = (
  oAuthResult: OAuthRedirectResult
): SocialLoginData => {
  const userInfo = oAuthResult.oauth.userInfo;

  return {
    sub: userInfo.sub,
    preferredUsername: userInfo.preferredUsername,
    email: userInfo.email,
  };
};

/**
 * Mapping of stored social login data to render-able text
 */
export const socialLoginDataToDisplayName: Record<
  keyof SocialLoginData,
  string
> = {
  sub: 'Provider ID',
  email: 'Email',
  preferredUsername: 'Username',
};

/**
 * Mapping of social provider type to display name
 */
export const oAuthTypeToDisplayName: Record<SupportedOAuthType, string> = {
  discord: 'Discord',
  github: 'github',
};
