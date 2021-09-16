import React, { createContext, useContext } from 'react';
import { useWallet, WalletContextState } from '@solana/wallet-adapter-react';
import {
  getSolanaConnection,
  getSolanaProvider,
} from '../../../util/solana/solanaNetwork';
import { Wallet } from '@project-serum/anchor';
import { getAuthorityProgramAddress } from '../../../util/solana/solanaProgramUtils';
import {
  SystemProgram,
  Transaction,
  TransactionInstruction,
} from '@solana/web3.js';
import {
  GetProfileAuthorityParams,
  GetProfileDataParams,
  ProfileAuthority,
  ProfileData,
} from '../../../util/solana/solanaProfileTypes';

type SolanaProfileContextState = {
  // Base state
  walletContext: WalletContextState;
  // Additional state
  connectedWallet?: Wallet;
  /**
   * Retrieve profile data
   */
  getProfileData(
    params: GetProfileDataParams
  ): Promise<ProfileData | undefined>;
  /**
   * Retrieve profile authority, returning undefined if the authority record does not exist
   */
  getProfileAuthority(
    params: GetProfileAuthorityParams
  ): Promise<ProfileAuthority | undefined>;
  /**
   * Creates profile
   */
  tryExecute(): Promise<void>;
};

export const SolanaProfileContext = createContext<SolanaProfileContextState>(
  {} as unknown as SolanaProfileContextState
);

/*
TODO: Think about how to manage this profile for multiple scopes & authorities (maybe only worry about our authority rn)
- appAuthorityGranted
- useSwr that fetches all scopes & returns normalized data
- Expose fns to just grant authority to us + create new profile data
- Need delete fns as well
 */

export const SolanaProfileContextProvider: React.FC = ({ children }) => {
  const connection = getSolanaConnection();
  const solanaWallet = useWallet();

  const solanaProgram =
    solanaWallet.wallet != null
      ? getProfileSolanaProgram(
          getSolanaProvider(connection, solanaWallet as unknown as Wallet) // TODO (Look at this)
        )
      : undefined;

  const tryExecute = async () => {
    if (solanaProgram == null) {
      console.log('Solana program undefined!');
      return;
    }
    if (solanaWallet.publicKey == null) {
      console.log('No public key for wallet!');
      return;
    }

    // Create an authority for the user
    const [authorityPda, authorityBump] = await getAuthorityProgramAddress(
      solanaWallet.publicKey,
      solanaWallet.publicKey,
      'all'
    );

    const testTxnIx: TransactionInstruction =
      solanaProgram.instruction.createAuthorityRecord('all', authorityBump, {
        accounts: {
          authorityRecord: authorityPda,
          user: solanaWallet.publicKey,
          authority: solanaWallet.publicKey,
          systemProgram: SystemProgram.programId,
        },
      });

    console.log('Ix', testTxnIx);

    const tx = await solanaWallet.sendTransaction(
      new Transaction().add(testTxnIx),
      connection,
      {}
    );

    console.log('Transaction sent!', tx);
  };

  const contextData: SolanaProfileContextState = {
    tryExecute,
  };

  return (
    <SolanaProfileContext.Provider value={contextData}>
      {children}
    </SolanaProfileContext.Provider>
  );
};

export const useSolanaProfileContext = () => {
  return useContext(SolanaProfileContext);
};
