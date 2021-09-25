import useSWR from 'swr';
import { AppSessionData } from '../../util/session/SessionTypes';
import { useState } from 'react';
import { callCreateSessionApi } from '../util/createSessionApi';
import { getLogger } from '../../util/logger';
import EndpointResult from '../../types/EndpointResult';
import fetchJson from '../../util/fetchJson';
import { callDestroySessionApi } from '../util/destroySessionApi';

export type UseSessionState = {
  session?: AppSessionData;
  isLoading: boolean;
  isError: boolean;
  createSession(pubKey: string): Promise<void>;
  destroySession(): Promise<void>;
};

const logger = getLogger('useSession');

/**
 * Manages the user session
 */
export default function useSession(): UseSessionState {
  const {
    data,
    error: getSessionError,
    mutate,
  } = useSWR<EndpointResult<AppSessionData>>('/api/session', fetchJson);
  const session = data?.data;
  const sessionEndpointIsLoading = session == null && getSessionError == null;
  const sessionEndpointIsErr = getSessionError != null;

  const [isMutating, setIsMutating] = useState(false);
  const [isMutationError, setIsMutationError] = useState(false);

  const createSession = async (pubKey: string) => {
    setIsMutating(true);
    try {
      logger.debug('Creating session with', pubKey);
      // Refresh user
      await callCreateSessionApi(pubKey);
      await mutate();
    } catch (err) {
      logger.error('Error from create session API', err);
      setIsMutationError(true);
    }
    setIsMutating(false);
  };

  const destroySession = async () => {
    setIsMutating(true);
    try {
      logger.debug('Destroying current session');
      // Refresh user
      await callDestroySessionApi();
      await mutate();
    } catch (err) {
      logger.error('Error from destroy session API', err);
      setIsMutationError(true);
    }
    setIsMutating(false);
  };

  const isLoading = sessionEndpointIsLoading || isMutating;
  const isError = sessionEndpointIsErr || isMutationError;
  return {
    session,
    isLoading,
    isError,
    createSession,
    destroySession,
  };
}
