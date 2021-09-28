import React, { createContext, useContext } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
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
  useGetSolanaWalletProfile,
} from '../../hooks/useGetSolanaWalletProfile';
import { ProfileNamespace } from '../../../util/profile/profileNamespaces';
import {
  createAppAuthority,
  createUserProfile,
  deleteAppAuthority,
  deleteUserData,
  upsertUserData,
} from './solanaProfileContextUtils';
import {
  ClientUpsertUserDataParams,
  CreateUserProfileParams,
} from '../types/MutationParamTypes';
import AppContextDataSourceState from '../types/AppContextDataSourceState';

export const SolanaAppContextDataSourceContext =
  createContext<AppContextDataSourceState>(
    {} as unknown as AppContextDataSourceState
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

  const appAuthorityEnabled =
    userProfile.profile?.authorities[solanaAppAuthorityKey.toString()]
      ?.scope === 'all';

  /*
  Data to store in our context
   */
  const contextData: AppContextDataSourceState = {
    connectedWallet:
      wallet.publicKey != null
        ? {
            type: 'solana',
            walletIdentifier: wallet.publicKey.toString(),
          }
        : undefined,
    profile: userProfile.profile,
    appAuthorityEnabled,
    nonExistentProfile: userProfile.nonExistentProfile,
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
    async refreshUserProfile() {
      await userProfile.mutate();
    },
  };

  return (
    <SolanaAppContextDataSourceContext.Provider value={contextData}>
      {children}
    </SolanaAppContextDataSourceContext.Provider>
  );
};

export const useSolanaAppContextDataSource = () => {
  return useContext(SolanaAppContextDataSourceContext);
};
