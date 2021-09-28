import { Wallet } from '../../types/Wallet';
import { useSolanaAppContextDataSource } from './solana/SolanaAppContextDataSourceContext';

export const walletsAreEquivalent = (w1?: Wallet, w2?: Wallet) => {
  if (!w1 || !w2) {
    return false;
  }

  return w1.walletIdentifier === w2.walletIdentifier;
};

// Util hook for watching for the current connected wallet
// This becomes useful when we have multiple wallets
export const useCurrentWallet = (): Wallet | undefined => {
  const solanaAppContextDataSource = useSolanaAppContextDataSource();

  return solanaAppContextDataSource.connectedWallet?.walletIdentifier != null
    ? {
        type: 'solana',
        walletIdentifier:
          solanaAppContextDataSource.connectedWallet?.walletIdentifier,
      }
    : undefined;
};
