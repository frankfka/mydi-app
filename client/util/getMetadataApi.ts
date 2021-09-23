import createPostFetchInit from '../../util/createPostFetchInit';
import { getCid } from '../../util/ipfs/cidUtils';
import cache from 'memory-cache';

import EndpointResult from '../../types/EndpointResult';
import { getLogger } from '../../util/logger';

const logger = getLogger('getMetadataApi');

/**
 * Calls our backend API to fetch the JSON stored in CID
 * @param cid
 */
export const callGetMetadataApi = async <TData>(
  cid: string
): Promise<TData> => {
  const cleanedCid = getCid(cid);

  // Rely on cache
  if (cache.get(cleanedCid)) {
    logger.debug(cleanedCid, 'exists in cache, returning now');
    return cache.get(cleanedCid);
  }

  const resp = await fetch(
    '/api/get-metadata',
    createPostFetchInit({
      body: {
        cid: cleanedCid,
      },
    })
  );
  const getApiResult = (await resp.json()) as EndpointResult<TData>;

  if (!getApiResult.data) {
    throw Error(
      'No data from calling /get-metadata' + JSON.stringify(getApiResult)
    );
  }

  cache.put(cleanedCid, getApiResult.data);

  return getApiResult.data;
};
