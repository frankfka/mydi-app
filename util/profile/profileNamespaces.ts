/*
Data namespaces that we support
 */
export const profileNamespaces = {
  general: 'general',
  captcha: 'captcha',
  socialDiscord: 'social.discord',
  socialGithub: 'social.github',
  // TODO twitter, etc.
} as const;

export type ProfileNamespace =
  typeof profileNamespaces[keyof typeof profileNamespaces];

export type AuthorityScope = ProfileNamespace | 'all';
