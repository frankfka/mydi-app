import { File, Web3Storage } from 'web3.storage';
import { nanoid } from 'nanoid';
import cache from 'memory-cache';
import { getCid } from './cidUtils';

const web3StorageToken = process.env.WEB3_STORAGE_TOKEN;
if (!web3StorageToken) {
  throw Error('Web3 storage token not defined');
}

const web3StorageClient = new Web3Storage({
  token: web3StorageToken,
});

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
