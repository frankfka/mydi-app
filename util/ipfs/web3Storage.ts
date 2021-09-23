import { Web3Storage } from 'web3.storage';

const web3StorageToken = process.env.WEB3_STORAGE_TOKEN;
if (!web3StorageToken) {
  throw Error('Web3 storage token not defined');
}

export const web3StorageClient = new Web3Storage({
  token: web3StorageToken,
});
