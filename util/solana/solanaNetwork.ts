import { clusterApiUrl, Connection } from '@solana/web3.js';
import { Provider, Wallet } from '@project-serum/anchor';

const solClusterConfig = process.env.NEXT_PUBLIC_SOL_CLUSTER;

/*
Solana endpoint
 */
export let solanaNetworkEndpoint = clusterApiUrl('devnet');
if (solClusterConfig === 'LOCALNET') {
  solanaNetworkEndpoint = 'http://localhost:8899';
} else if (solClusterConfig === 'TESTNET') {
  solanaNetworkEndpoint = clusterApiUrl('testnet');
} else if (solClusterConfig === 'MAINNET') {
  solanaNetworkEndpoint = clusterApiUrl('mainnet-beta');
}

/*
Connection
 */
export const getSolanaConnection = (): Connection => {
  return new Connection(solanaNetworkEndpoint);
};

/*

 */
export const getSolanaProvider = (
  connection: Connection,
  wallet: Wallet
): Provider => {
  return new Provider(connection, wallet, {});
};
