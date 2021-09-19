import { StoreMetadataResponse } from '../../pages/api/store-metadata';
import cache from 'memory-cache';
import createPostFetchInit from '../../util/createPostFetchInit';

/**
 * Calls our backend API to store the JSON metadata file, also interacting with the global cache if needed
 * @param data
 */
export const callStoreMetadataApi = async (data: any): Promise<string> => {
  const resp = await fetch(
    '/api/store-metadata',
    createPostFetchInit({
      body: {
        data,
      },
    })
  );
  const storeApiResult = (await resp.json()) as StoreMetadataResponse;

  if (!storeApiResult.cid) {
    throw Error(
      'No CID from calling /store-metadata' + JSON.stringify(storeApiResult)
    );
  }
  cache.put(storeApiResult.cid, data);

  return storeApiResult.cid;
};
