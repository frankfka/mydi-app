import createPostFetchInit from '../../util/createPostFetchInit';

/**
 * Calls our backend API to destroy the current session
 */
export const callDestroySessionApi = async (): Promise<void> => {
  await fetch('/api/session/destroy', createPostFetchInit({}));
};
