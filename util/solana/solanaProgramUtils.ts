import { PublicKey } from '@solana/web3.js';
import { Program, Provider, utils } from '@project-serum/anchor';
import { KeyAndBump } from './solanaProfileTypes';
import { profileProgramIdl } from './profileProgramIdl';

// Fetch program ID from env
const SOLANA_PROGRAM_ID = process.env.NEXT_PUBLIC_SOL_PROGRAM_ID;
if (!SOLANA_PROGRAM_ID) {
  throw Error('Solana program ID not defined');
}

/**
 * ID of our deployed solana program
 */
export const solanaProgramId = new PublicKey(SOLANA_PROGRAM_ID);

/**
 * Retrieve an Anchor Program instance for our IDL
 * @param provider an optional provider for signing txns
 */
export const getProfileSolanaProgram = (provider?: Provider) => {
  return new Program(profileProgramIdl, SOLANA_PROGRAM_ID, provider);
};

/**
 * Retrieves the address of the PDA for an authority account
 * @param userKey
 * @param authorityKey
 * @param scope
 */
export const getAuthorityProgramAddress = async (
  userKey: PublicKey,
  authorityKey: PublicKey,
  scope: string
): Promise<KeyAndBump> => {
  return PublicKey.findProgramAddress(
    [
      userKey.toBuffer(),
      Buffer.from(utils.bytes.utf8.encode('authorities')),
      authorityKey.toBuffer(),
      Buffer.from(utils.bytes.utf8.encode(scope)),
    ],
    solanaProgramId
  );
};

/**
 * Retrieves the address of the PDA for a data account
 * @param userKey
 * @param namespace
 */
export const getDataProgramAddress = async (
  userKey: PublicKey,
  namespace: string
): Promise<KeyAndBump> => {
  return PublicKey.findProgramAddress(
    [
      userKey.toBuffer(),
      Buffer.from(utils.bytes.utf8.encode('data')),
      Buffer.from(utils.bytes.utf8.encode(namespace)),
    ],
    solanaProgramId
  );
};
