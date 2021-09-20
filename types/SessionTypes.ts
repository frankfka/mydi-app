export type AppSessionData = {
  wallet?: CurrentWalletSessionData;
  // TODO: more info, like connected social accounts for current session
};

export type CurrentWalletSessionData = {
  pubKey: string;
};
