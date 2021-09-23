import { getCid } from './cidUtils';
import cache from 'memory-cache';
import { web3StorageClient } from './web3Storage';
import { getLogger } from '../logger';

const logger = getLogger('getDataFromCid');

/**
 * Returns JSON data from IPFS. Accessible ONLY on server side
 * @param cid: the CID of a singular JSON file to be read as text
 */
export const getDataFromCid = async (cid: string): Promise<any | undefined> => {
  const cleanedCid = getCid(cid);
  const fetchResponse = await web3StorageClient.get(cleanedCid);

  if (fetchResponse == null || !fetchResponse.ok) {
    logger.warn(
      'Error response from web3 storage client',
      fetchResponse?.status,
      fetchResponse?.statusText
    );
    return;
  }

  const fetchedFiles = await fetchResponse.files();

  if (fetchedFiles.length !== 1) {
    logger.warn(
      'Incorrect number of fetched files from web3 response',
      fetchedFiles.length
    );
    return;
  }

  const fetchedText = await fetchedFiles[0].text();
  const fetchedData = JSON.parse(fetchedText);

  cache.put(cleanedCid, fetchedData);

  return fetchedData;
};
