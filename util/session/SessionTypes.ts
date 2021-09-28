import { Wallet } from '../../types/Wallet';

export type AppSessionData = {
  wallet?: CurrentWalletSessionData;
};

export type CurrentWalletSessionData = Wallet;
