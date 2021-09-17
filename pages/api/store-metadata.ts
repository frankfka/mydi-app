import type { NextApiRequest, NextApiResponse } from 'next';
import { uploadDataToIpfs } from '../../util/ipfs/uploadDataToIpfs';

type ReqBody = {
  data: any;
};

export type StoreMetadataResponse = {
  cid?: string;
  error?: string;
};

/**
 * Stores metadata in body.data and returns the CID
 * TODO: Better typing
 * @param req
 * @param res
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<StoreMetadataResponse>
) {
  if (req.body.data == null) {
    res.status(400).json({
      error: 'Data property not specified',
    });
    return;
  }
  const reqBody: ReqBody = req.body;

  const cid = await uploadDataToIpfs(reqBody.data);
  res.status(200).json({ cid });
}
