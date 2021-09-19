export type UserSessionData = {
  user?: BaseUserSessionData;
  // TODO: more info, like connected social accounts for current session
};

export type BaseUserSessionData = {
  pubKey: string;
};
