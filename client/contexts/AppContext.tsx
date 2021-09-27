import React, { createContext, useContext, useEffect } from 'react';
import { WalletContextState } from '@solana/wallet-adapter-react';
import useSession, { UseSessionState } from '../hooks/useSession';
import { Profile } from '../../util/profile/Profile';
import {
  SolanaProfileContextState,
  useSolanaProfileContext,
} from './solana/SolanaProfileContext';
import { getLogger } from '../../util/logger';
import { solanaAppAuthorityKey } from '../../util/solana/solanaProgramUtils';

type AppContextState = {
  /*
  Child States
   */
  // Wallet state
  walletState: WalletContextState;
  // Session state
  sessionState: UseSessionState;
  // Profile state
  solanaProfileState: SolanaProfileContextState;
  /*
  Derived state
   */
  isLoading: boolean;
  isError: boolean;
  currentUserPubKey?: string;
  profile?: Profile;
  appAuthorityEnabled: boolean; // Whether our app is authorized to make profile changes
  nonExistentProfile: boolean; // Should prompt user to create a user
  /*
  Util fns
   */
};

const logger = getLogger('AppContext');

export const AppContext = createContext<AppContextState>(
  {} as unknown as AppContextState
);

export const AppContextProvider: React.FC = ({ children }) => {
  const sessionState = useSession();
  const solanaProfileState = useSolanaProfileContext();

  const currentWalletPubKey = solanaProfileState.wallet.publicKey?.toString();
  const sessionWalletIdentifier =
    sessionState.session?.wallet?.walletIdentifier;

  const appAuthorityEnabled =
    solanaProfileState.userProfile?.profile?.authorities[
      solanaAppAuthorityKey.toString()
    ]?.scope === 'all'; // We require "all" scope

  // Reload session on public key change
  useEffect(() => {
    const updateSession = async () => {
      if (currentWalletPubKey != null) {
        // Pubkey mismatch - update session
        if (currentWalletPubKey !== sessionWalletIdentifier) {
          await sessionState.createSession({
            walletIdentifier: currentWalletPubKey,
            type: 'solana',
          });
        }
      } else if (sessionWalletIdentifier != null) {
        // Wallet is disconnected BUT there is a pubkey in session
        // Normally we should destroy the session, but to support oAuth,
        // we "cache" the latest session
        logger.debug('Wallet not connected, leaving session pubKey');
      }
    };

    updateSession();
  }, [currentWalletPubKey, sessionWalletIdentifier, sessionState]);

  // Debug logging
  useEffect(() => {
    logger.debug('Current AppContext State', {
      walletPubKey: currentWalletPubKey,
      sessionPubKey: sessionWalletIdentifier,
      profile: solanaProfileState.userProfile.profile,
    });
  }, [
    sessionWalletIdentifier,
    currentWalletPubKey,
    solanaProfileState.userProfile.profile,
  ]);

  const isLoading = sessionState.isLoading || solanaProfileState.isLoading;
  const isError = sessionState.isError || solanaProfileState.isError;

  const contextState: AppContextState = {
    walletState: solanaProfileState.wallet,
    sessionState: sessionState,
    solanaProfileState: solanaProfileState,
    currentUserPubKey: currentWalletPubKey,
    profile: solanaProfileState.userProfile.profile,
    nonExistentProfile: solanaProfileState.userProfile.nonExistentProfile,
    appAuthorityEnabled,
    isLoading,
    isError,
  };

  return (
    <AppContext.Provider value={contextState}>{children}</AppContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(AppContext);
};
