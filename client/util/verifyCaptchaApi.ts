import createPostFetchInit from '../../util/createPostFetchInit';
import EndpointResult from '../../types/EndpointResult';
import { VerifyCaptchaResponse } from '../../server/handlers/verifyCaptchaHandler';

/**
 * Calls our backend API to verify a given cpatcha code and add it to the session profile
 * @param captchaToken
 */
export const callVerifyCaptchaApi = async (
  captchaToken: string
): Promise<string> => {
  const resp = await fetch(
    '/api/verify-captcha',
    createPostFetchInit({
      body: {
        captchaToken,
      },
    })
  );

  const respJson: EndpointResult<VerifyCaptchaResponse> = await resp.json();
  if (respJson.data?.transactionId == null) {
    throw Error('No transaction ID from upsert social data API');
  }

  return respJson.data.transactionId;
};
