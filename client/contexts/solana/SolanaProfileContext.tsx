import React, { createContext, useContext } from 'react';
import { useWallet, WalletContextState } from '@solana/wallet-adapter-react';
import {
  getSolanaConnection,
  getSolanaProvider,
} from '../../../util/solana/solanaNetwork';
import { Program, Provider, Wallet } from '@project-serum/anchor';
import {
  getProfileSolanaProgram,
  solanaAppAuthorityKey,
} from '../../../util/solana/solanaProgramUtils';
import {
  GetSolanaWalletProfileParams,
  GetSolanaWalletProfileState,
  useGetSolanaWalletProfile,
} from '../../hooks/useGetSolanaWalletProfile';
import { ProfileGeneralMetadata } from '../../../types/ProfileMetadata';
import { ProfileNamespace } from '../../../util/profile/profileNamespaces';
import { Transaction } from '@solana/web3.js';
import {
  getCreateSolanaProfileAuthorityIx,
  getCreateSolanaProfileDataIx,
} from '../../../util/solana/solanaProgramInstructions';
import { addIpfsPrefix } from '../../../util/ipfs/cidUtils';
import { callStoreMetadataApi } from '../../util/storeMetadataApi';

type CreateUserProfileParams = ProfileGeneralMetadata & {
  createAppAuthority: boolean; // Whether to add instruction to also create an authorization for our app
};

type SolanaProfileContextState = {
  // Base state
  wallet: WalletContextState;
  // Profile state
  userProfile: GetSolanaWalletProfileState;
  // Transaction utils
  createUserProfile(params: CreateUserProfileParams): Promise<string>;
  upsertUserData(namespace: ProfileNamespace, data: any): Promise<string>; // For a specific namespace
  deleteUserData(namespace: ProfileNamespace): Promise<string>;
  createAuthority(): Promise<string>; // Requests authorization for our app with "all" scope
};

export const SolanaProfileContext = createContext<SolanaProfileContextState>(
  {} as unknown as SolanaProfileContextState
);

export const SolanaProfileContextProvider: React.FC = ({ children }) => {
  const wallet = useWallet();

  const connection = getSolanaConnection();
  // Force-cast to anchor Wallet, which requires a signer. This allows us to create txns but not send them
  const anchorProvider: Provider | undefined =
    wallet.wallet != null
      ? getSolanaProvider(connection, wallet as unknown as Wallet)
      : undefined;
  const profileProgram: Program | undefined =
    anchorProvider != null
      ? getProfileSolanaProgram(anchorProvider)
      : undefined;

  // Wallet profile
  const getUserProfileParams: GetSolanaWalletProfileParams | undefined =
    wallet.publicKey != null && profileProgram != null
      ? {
          program: profileProgram,
          userKey: wallet.publicKey,
        }
      : undefined;
  const userProfile = useGetSolanaWalletProfile(getUserProfileParams);

  const createUserProfile = async (
    params: CreateUserProfileParams
  ): Promise<string> => {
    if (wallet.publicKey == null) {
      throw Error('Wallet public key not defined');
    }
    if (profileProgram == null) {
      throw Error('Program is not defined');
    }

    const txn = new Transaction();

    const metadataUri = addIpfsPrefix(
      await callStoreMetadataApi({
        displayName: params.displayName,
        description: params.description,
        imageUri: params.imageUri,
      })
    );
    const createProfileDataIx = await getCreateSolanaProfileDataIx(
      profileProgram,
      {
        metadataUri: metadataUri,
        userKey: wallet.publicKey,
        namespace: 'general',
      }
    );
    txn.add(createProfileDataIx);

    if (params.createAppAuthority) {
      const createAppAuthorityIx = await getCreateSolanaProfileAuthorityIx(
        profileProgram,
        {
          authorityKey: solanaAppAuthorityKey,
          userKey: wallet.publicKey,
          scope: 'all',
        }
      );
      txn.add(createAppAuthorityIx);
    }

    return wallet.sendTransaction(txn, connection);
  };
  const upsertUserData = async (
    namespace: ProfileNamespace,
    data: any
  ): Promise<string> => {};
  const deleteUserData = (namespace: ProfileNamespace): Promise<string> => {};
  const createAuthority = (): Promise<string> => {};

  const contextData: SolanaProfileContextState = {
    wallet,
    userProfile,
    createUserProfile,
    upsertUserData,
    deleteUserData,
    createAuthority,
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
