import { getCid } from './cidUtils';
import cache from 'memory-cache';
import { getLogger } from '../logger';
import { web3StorageClient } from './web3Storage';
import any from 'promise.any';

const logger = getLogger('getDataFromCid');

/**
 * Returns JSON data from IPFS. Accessible ONLY on server side
 * @param cid: the CID of a singular JSON file to be read as text
 */
export const getDataFromCid = async (cid: string): Promise<any | undefined> => {
  const cleanedCid = getCid(cid);

  const fetchedData = any([
    getDataFromInfura(cleanedCid),
    getDataFromWeb3Storage(cleanedCid),
  ]);

  cache.put(cleanedCid, fetchedData);

  return fetchedData;
};

/**
 * Data providers
 */

const getDataFromWeb3Storage = async (cleanedCid: string): Promise<any> => {
  const fetchResponse = await web3StorageClient.get(cleanedCid);

  if (fetchResponse == null || !fetchResponse.ok) {
    const errorMsg =
      'Error from Web3Storage API: ' +
      fetchResponse?.status +
      fetchResponse?.statusText;
    logger.warn(errorMsg);
    throw Error(errorMsg);
  }

  const fetchedFiles = await fetchResponse.files();

  if (fetchedFiles.length !== 1) {
    const errorMsg = `Incorrect number of fetched files from web3 response: ${fetchedFiles.length}`;
    logger.warn(errorMsg);
    throw Error(errorMsg);
  }

  const fetchedText = await fetchedFiles[0].text();
  const fetchedData = JSON.parse(fetchedText);

  return fetchedData;
};

const getDataFromInfura = async (
  cleanedCid: string
): Promise<any | undefined> => {
  const fetchResponse = await fetch(
    'https://ipfs.infura.io:5001/api/v0/cat?arg=' + cleanedCid,
    {
      method: 'POST',
    }
  );

  if (!fetchResponse.ok) {
    const errorMsg =
      'Error from Infura API: ' +
      fetchResponse?.status +
      fetchResponse?.statusText;
    logger.warn(errorMsg);
    throw Error(errorMsg);
  }

  return fetchResponse.json();
};
