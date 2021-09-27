import createPostFetchInit from '../../util/createPostFetchInit';
import {
  AppSessionData,
  CurrentWalletSessionData,
} from '../../util/session/SessionTypes';
import EndpointResult from '../../types/EndpointResult';

/**
 * Calls our backend API to create a session with a given wallet identifier and type
 * @param walletData
 */
export const callCreateSessionApi = async (
  walletData: CurrentWalletSessionData
): Promise<EndpointResult<AppSessionData>> => {
  const res = await fetch(
    '/api/session/create',
    createPostFetchInit({
      body: walletData,
    })
  );

  return res.json();
};
