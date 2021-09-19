import useSWR from 'swr';
import { UserSessionData } from '../../types/SessionTypes';
import { useState } from 'react';
import { callLoginApi } from '../util/loginApi';
import { getLogger } from '../../util/logger';
import EndpointResult from '../../types/EndpointResult';
import fetchJson from '../../util/fetchJson';
import { callLogoutApi } from '../util/logoutApi';

export type UseUserState = {
  user?: UserSessionData;
  isLoading: boolean;
  isError: boolean;
  login(pubKey: string): Promise<void>;
  logout(): Promise<void>;
};

const logger = getLogger('useUser');

/**
 * Manages the user session
 */
export default function useUser(): UseUserState {
  const {
    data,
    error: getUserErr,
    mutate,
  } = useSWR<EndpointResult<UserSessionData>>('/api/user', fetchJson);
  const user = data?.data;
  const userEndpointIsLoading = user == null && getUserErr == null;
  const userEndpointIsErr = getUserErr != null;

  const [isMutating, setIsMutating] = useState(false);
  const [isMutationError, setIsMutationError] = useState(false);

  const login = async (pubKey: string) => {
    setIsMutating(true);
    try {
      logger.debug('Creating session with', pubKey);
      await callLoginApi(pubKey);
      // Refresh user
      await mutate();
    } catch (err) {
      logger.error('Error from login API', err);
      setIsMutationError(true);
    }
    setIsMutating(false);
  };

  const logout = async () => {
    setIsMutating(true);
    try {
      logger.debug('Destroying current session');
      await callLogoutApi();
      // Refresh user
      await mutate();
    } catch (err) {
      logger.error('Error from logout API', err);
      setIsMutationError(true);
    }
    setIsMutating(false);
  };

  const isLoading = userEndpointIsLoading || isMutating;
  const isError = userEndpointIsErr || isMutationError;
  return { user, isLoading, isError, login, logout };
}
