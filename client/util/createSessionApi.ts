import createPostFetchInit from '../../util/createPostFetchInit';
import { AppSessionData } from '../../types/SessionTypes';
import EndpointResult from '../../types/EndpointResult';

/**
 * Calls our backend API to create a session with a given public key
 * @param pubKey
 */
export const callCreateSessionApi = async (
  pubKey: string
): Promise<EndpointResult<AppSessionData>> => {
  const res = await fetch(
    '/api/session/create',
    createPostFetchInit({
      body: {
        pubKey,
      },
    })
  );

  return res.json();
};
