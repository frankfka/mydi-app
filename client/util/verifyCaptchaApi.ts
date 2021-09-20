import createPostFetchInit from '../../util/createPostFetchInit';

/**
 * Calls our backend API to verify a given cpatcha code and add it to the session profile
 * @param captchaToken
 */
export const callVerifyCaptchaApi = async (
  captchaToken: string
): Promise<void> => {
  const resp = await fetch(
    '/api/verify-captcha',
    createPostFetchInit({
      body: {
        captchaToken,
      },
    })
  );

  console.log(await resp.json());
};
