/*
Data namespaces that we support
 */

import { SupportedOAuthType } from '../../client/util/magicLogin/magicUtils';

export const profileSocialNamespaces = {
  socialDiscord: 'social.discord',
  socialGithub: 'social.github',
  // TODO twitter, etc.
} as const;

export const socialNamespaceToOauthType: Record<
  ProfileSocialNamespace,
  SupportedOAuthType
> = {
  [profileSocialNamespaces.socialDiscord]: 'discord',
  [profileSocialNamespaces.socialGithub]: 'github',
};

export const profileNamespaces = {
  general: 'general',
  captcha: 'captcha',
  ...profileSocialNamespaces,
} as const;

export type ProfileNamespace =
  typeof profileNamespaces[keyof typeof profileNamespaces];

export type ProfileSocialNamespace =
  typeof profileSocialNamespaces[keyof typeof profileSocialNamespaces];

export type AuthorityScope = ProfileNamespace | 'all';
