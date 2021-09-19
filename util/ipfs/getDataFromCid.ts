import { getCid, getCidGatewayUrl, isIpfsCid } from './cidUtils';
import cache from 'memory-cache';

/**
 * Returns data from given CID, checking the cache first
 *
 * @param cid
 */
export const getDataFromCid = async <TData>(
  cid: string
): Promise<TData | undefined> => {
  if (!isIpfsCid(cid)) {
    console.log('Not a CID: ', cid);
    return;
  }

  const cleanedCid = getCid(cid);
  const cachedData = cache.get(cleanedCid);
  if (cachedData) {
    return cachedData;
  }

  // TODO: use swr here in wrapper. Also need a timeout: https://dmitripavlutin.com/timeout-fetch-request/
  const resp = await fetch(getCidGatewayUrl(cleanedCid));
  const fetchedData = resp.json();
  console.log('Fetched!');
  cache.put(cleanedCid, fetchedData);

  return fetchedData;
};
