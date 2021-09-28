import React, { createContext, useContext, useEffect } from 'react';
import useSession from '../hooks/useSession';
import { useSolanaAppContextDataSource } from './solana/SolanaAppContextDataSourceContext';
import { getLogger } from '../../util/logger';
import { AppSessionData } from '../../util/session/SessionTypes';
import AppContextDataSourceState from './types/AppContextDataSourceState';
import { useCurrentWallet, walletsAreEquivalent } from './useCurrentWallet';

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

export const AppContextProvider: React.FC = ({ children }) => {
  const sessionState = useSession();
  const solanaAppContextDataSource = useSolanaAppContextDataSource();

  const currentWallet = useCurrentWallet();
  const sessionWallet = sessionState.session?.wallet;

  // When supporting additional data sources, we can just change this
  const appContextDataSourceState: AppContextDataSourceState =
    solanaAppContextDataSource;

  // Reload session on public key change
  useEffect(() => {
    const updateSession = async () => {
      if (currentWallet != null) {
        // Wallet mismatch - update session
        if (!walletsAreEquivalent(currentWallet, sessionWallet)) {
          await sessionState.createSession(currentWallet);
        }
      } else if (sessionWallet != null) {
        // Wallet is disconnected BUT there is a pubkey in session
        // Normally we should destroy the session, but to support oAuth,
        // we "cache" the latest session
        logger.debug('Wallet not connected, leaving session pubKey');
      }
    };

    updateSession();
  }, [currentWallet, sessionWallet, sessionState]);

  // Debug logging
  useEffect(() => {
    logger.debug('Current AppContext State', {
      wallet: currentWallet,
      session: sessionState.session,
      profile: appContextDataSourceState.profile,
    });
  }, [sessionState.session, currentWallet, appContextDataSourceState.profile]);

  const isLoading =
    sessionState.isLoading || appContextDataSourceState.isLoading;
  const isError = sessionState.isError || appContextDataSourceState.isError;

  const contextState: AppContextState = {
    ...appContextDataSourceState,
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
