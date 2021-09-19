import createPostFetchInit from '../../util/createPostFetchInit';

/**
 * Calls our backend API to login the current user
 */
export const callLogoutApi = async (): Promise<void> => {
  await fetch(
    '/api/logout',
    createPostFetchInit({
      body: {},
    })
  );
};
