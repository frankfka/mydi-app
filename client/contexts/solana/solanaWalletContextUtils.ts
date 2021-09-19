import { WalletSignTransactionError } from '@solana/wallet-adapter-base';

// TODO: Can have better error handling based on WalletError types
export const isTransactionSigningDeniedError = (err: unknown) =>
  err instanceof WalletSignTransactionError;
