import { WalletType } from '../../types/WalletType';

export type AppSessionData = {
  wallet?: CurrentWalletSessionData;
};

export type CurrentWalletSessionData = {
  // Pubkey on Solana, address on Terra
  walletIdentifier: string;
  type: WalletType;
};
