import createPostFetchInit from '../../util/createPostFetchInit';

/**
 * Calls our backend API to login the current user
 * @param pubKey
 */
export const callLoginApi = async (pubKey: string): Promise<void> => {
  await fetch(
    '/api/login',
    createPostFetchInit({
      body: {
        pubKey,
      },
    })
  );
};
