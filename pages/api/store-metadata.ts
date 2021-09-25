import type { NextApiResponse } from 'next';
import { uploadDataToIpfs } from '../../util/ipfs/uploadDataToIpfs';
import EndpointResult from '../../types/EndpointResult';
import { CurrentWalletSessionData } from '../../util/session/SessionTypes';
import { SESSION_WALLET_KEY } from '../../util/session/sessionData';
import withSession, { NextIronRequest } from '../../server/session/withSession';
import executeAsyncForResult from '../../util/executeAsyncForResult';
import resultToEndpointResult from '../../util/resultToEndpointResult';

type ReqBody = {
  data: any;
};

export type StoreMetadataResponse = {
  cid: string;
};

/**
 * Stores metadata in body.data and returns the CID
 * @param req
 * @param res
 */
async function handler(
  req: NextIronRequest,
  res: NextApiResponse<EndpointResult<StoreMetadataResponse>>
) {
  const walletSessionData = await req.session.get<CurrentWalletSessionData>(
    SESSION_WALLET_KEY
  );

  if (!walletSessionData?.pubKey) {
    res.status(400).json({
      error: 'No current wallet address in session',
    });
    return;
  }

  if (req.body.data == null) {
    res.status(400).json({
      error: 'Data property not specified',
    });
    return;
  }
  const reqBody: ReqBody = req.body;

  const result = await executeAsyncForResult<StoreMetadataResponse>(
    async () => {
      return {
        cid: await uploadDataToIpfs(reqBody.data),
      };
    }
  );

  res.status(200).json(resultToEndpointResult(result));
}

export default withSession(handler);
