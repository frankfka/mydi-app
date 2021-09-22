import {
  getSolanaConnection,
  getSolanaProvider,
} from '../../util/solana/solanaNetwork';
import { Wallet } from '@project-serum/anchor';
import { Keypair } from '@solana/web3.js';
import { getProfileSolanaProgram } from '../../util/solana/solanaProgramUtils';

const privateKeyInts = process.env.SOL_APP_AUTHORITY_PRIVATE_KEY?.split(
  ','
).map((numStr) => Number(numStr));

if (!privateKeyInts || privateKeyInts.length === 0) {
  throw Error('Solana app authority private keys not defined');
}

export const serverSolanaConnection = getSolanaConnection();

export const serverSolanaProvider = getSolanaProvider(
  serverSolanaConnection,
  new Wallet(Keypair.fromSecretKey(Uint8Array.from(privateKeyInts)))
);

export const serverSolanaProgram =
  getProfileSolanaProgram(serverSolanaProvider);
