import React, { createContext, useContext } from 'react';
import { useWallet, WalletContextState } from '@solana/wallet-adapter-react';
import {
  getSolanaConnection,
  getSolanaProvider,
} from '../../../util/solana/solanaNetwork';
import { Program, Provider, Wallet } from '@project-serum/anchor';
import { getProfileSolanaProgram } from '../../../util/solana/solanaProgramUtils';
import {
  GetSolanaWalletProfileParams,
  GetSolanaWalletProfileState,
  useGetSolanaWalletProfile,
} from '../../hooks/useGetSolanaWalletProfile';
import { ProfileGeneralMetadata } from '../../../util/profile/ProfileMetadata';
import { ProfileNamespace } from '../../../util/profile/profileNamespaces';
import {
  ClientUpsertUserDataParams,
  createAppAuthority,
  createUserProfile,
  deleteAppAuthority,
  deleteUserData,
  upsertUserData,
} from './solanaProfileContextUtils';

type CreateUserProfileParams = ProfileGeneralMetadata & {
  createAppAuthority: boolean; // Whether to add instruction to also create an authorization for our app
};

export type SolanaProfileContextState = {
  // Base state
  wallet: WalletContextState;
  // Profile state
  userProfile: GetSolanaWalletProfileState;
  // Loading/err
  isLoading: boolean;
  isError: boolean;
  // Utils
  createUserProfile(params: CreateUserProfileParams): Promise<string>;
  upsertUserData(params: ClientUpsertUserDataParams): Promise<string>; // For a specific namespace
  deleteUserData(namespace: ProfileNamespace): Promise<string | undefined>; // Undefined txn ID if there's no data to delete
  createAppAuthority(): Promise<string>; // Requests authorization for our app with "all" scope
  deleteAppAuthority(): Promise<string | undefined>;
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

  // A HOC that checks preconditions and refreshes user profile after an operation
  async function executeOperation<TRet>(
    fn: (program: Program) => Promise<TRet>
  ): Promise<TRet> {
    if (profileProgram == null) {
      throw Error('Program not defined');
    }
    const res = await fn(profileProgram);
    // Reload data after a short delay
    setTimeout(userProfile.mutate, 2000);
    return res;
  }

  /*
  Data to store in our context
   */
  const contextData: SolanaProfileContextState = {
    wallet,
    userProfile,
    isLoading: userProfile.isLoading,
    isError: userProfile.isError,
    async createUserProfile(params: CreateUserProfileParams) {
      return executeOperation((program) => {
        return createUserProfile(connection, wallet, program, params);
      });
    },
    async upsertUserData(params: ClientUpsertUserDataParams) {
      return executeOperation((program) => {
        return upsertUserData(connection, wallet, program, params);
      });
    },
    async deleteUserData(namespace: ProfileNamespace) {
      return executeOperation((program) => {
        return deleteUserData(connection, wallet, program, namespace);
      });
    },
    async createAppAuthority() {
      return executeOperation((program) => {
        return createAppAuthority(connection, wallet, program);
      });
    },
    async deleteAppAuthority() {
      return executeOperation((program) => {
        return deleteAppAuthority(connection, wallet, program);
      });
    },
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
