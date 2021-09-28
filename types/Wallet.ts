export type WalletType = 'solana' | 'terra';

export type Wallet = {
  type: WalletType;
  // Pubkey on Solana, address on Terra
  walletIdentifier: string;
};
