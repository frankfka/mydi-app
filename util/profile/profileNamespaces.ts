/*
Data namespaces that we support
 */
export const profileNamespaces = {
  general: 'general',
  captcha: 'captcha',
  // TODO twitter, etc.
} as const;

export type ProfileNamespace =
  typeof profileNamespaces[keyof typeof profileNamespaces];

export type AuthorityScope = ProfileNamespace | 'all';
