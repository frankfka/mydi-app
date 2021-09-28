import React, { createContext, useContext, useEffect } from 'react';
import useSession from '../hooks/useSession';
import { useSolanaAppContextDataSource } from './solana/SolanaAppContextDataSourceContext';
import { getLogger } from '../../util/logger';
import { AppSessionData } from '../../util/session/SessionTypes';
import { Wallet } from '../../types/Wallet';
import AppContextDataSourceState from './types/AppContextDataSourceState';

type AppContextState = {
  /*
  State
   */
  isLoading: boolean;
  isError: boolean;
  currentSessionData?: AppSessionData;
} & AppContextDataSourceState;

const logger = getLogger('AppContext');

export const AppContext = createContext<AppContextState>(
  {} as unknown as AppContextState
);

// TODO: Can test this now!
export const AppContextProvider: React.FC = ({ children }) => {
  const sessionState = useSession();
  const solanaAppContextDataSource = useSolanaAppContextDataSource();

  // TODO: hook for current wallet
  const currentWallet: Wallet | undefined =
    solanaAppContextDataSource.connectedWallet?.walletIdentifier != null
      ? {
          type: 'solana',
          walletIdentifier:
            solanaAppContextDataSource.connectedWallet?.walletIdentifier,
        }
      : undefined;

  const sessionWalletIdentifier =
    sessionState.session?.wallet?.walletIdentifier;

  // Reload session on public key change
  useEffect(() => {
    const updateSession = async () => {
      if (currentWallet != null) {
        // Wallet mismatch - update session
        if (currentWallet.walletIdentifier !== sessionWalletIdentifier) {
          await sessionState.createSession({
            walletIdentifier: currentWallet.walletIdentifier,
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
  }, [currentWallet?.walletIdentifier, sessionWalletIdentifier, sessionState]);

  // Debug logging
  useEffect(() => {
    logger.debug('Current AppContext State', {
      wallet: currentWallet,
      session: sessionState.session,
      profile: solanaAppContextDataSource.profile,
    });
  }, [
    sessionWalletIdentifier,
    currentWallet,
    solanaAppContextDataSource.profile,
  ]);

  const isLoading =
    sessionState.isLoading || solanaAppContextDataSource.isLoading;
  const isError = sessionState.isError || solanaAppContextDataSource.isError;

  const contextState: AppContextState = {
    ...solanaAppContextDataSource,
    currentSessionData: sessionState.session,
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
