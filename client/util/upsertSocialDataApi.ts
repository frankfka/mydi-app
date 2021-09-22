import createPostFetchInit from '../../util/createPostFetchInit';
import { SocialLoginData } from '../../util/profile/socialLoginData';
import { SupportedOAuthType } from './magicLogin/magicUtils';
import EndpointResult from '../../types/EndpointResult';
import { UpsertSocialDataHandlerResponse } from '../../server/handlers/upsertSocialDataHandler';

/**
 * Calls our backend API to upsert social account data
 * @param provider
 * @param metadata
 */
export const callUpsertSocialDataApi = async (
  provider: SupportedOAuthType,
  metadata: SocialLoginData
): Promise<string> => {
  const resp = await fetch(
    '/api/upsert-social-data',
    createPostFetchInit({
      body: {
        provider,
        metadata,
      },
    })
  );

  const respJson: EndpointResult<UpsertSocialDataHandlerResponse> =
    await resp.json();

  if (respJson.data?.transactionId == null) {
    throw Error('No transaction ID from upsert social data API');
  }

  return respJson.data.transactionId;
};
