/*
Data namespaces that we support
 */

// Social data namespaces
import { ValueOf } from '../../types/ValueOf';

export const profileSocialNamespaces = {
  socialDiscord: 'social.discord',
  socialGithub: 'social.github',
  // TODO twitter, etc.
} as const;

// All profile namespaces
export const profileNamespaces = {
  general: 'general',
  captcha: 'captcha',
  ...profileSocialNamespaces,
} as const;

// Types
export type ProfileSocialNamespace = ValueOf<typeof profileSocialNamespaces>;

export type ProfileNamespace = ValueOf<typeof profileNamespaces>;

export type AuthorityScope = ProfileNamespace | 'all';
