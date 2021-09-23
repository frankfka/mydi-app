import { File } from 'web3.storage';
import { nanoid } from 'nanoid';
import cache from 'memory-cache';
import { getCid } from './cidUtils';
import { web3StorageClient } from './web3Storage';

/**
 * Uploads data as JSON to IPFS. Accessible ONLY on server side
 * @param data
 */
export const uploadDataToIpfs = async (data: any): Promise<string> => {
  const filename = nanoid(5) + '.json';
  const cid = await web3StorageClient.put(
    [new File([Buffer.from(JSON.stringify(data))], filename)],
    {
      wrapWithDirectory: false,
    }
  );

  cache.put(getCid(cid), data);

  return cid;
};
