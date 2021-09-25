import type { NextApiResponse } from 'next';
import EndpointResult from '../../types/EndpointResult';
import { CurrentWalletSessionData } from '../../util/session/SessionTypes';
import { SESSION_WALLET_KEY } from '../../util/session/sessionData';
import withSession, { NextIronRequest } from '../../server/session/withSession';
import executeAsyncForResult from '../../util/executeAsyncForResult';
import resultToEndpointResult from '../../util/resultToEndpointResult';
import { getDataFromCid } from '../../util/ipfs/getDataFromCid';

type ReqBody = {
  cid: string;
};

export type GetMetadataResponse = any;

/**
 * Fetches JSON metadata from a given CID
 * @param req
 * @param res
 */
async function handler(
  req: NextIronRequest,
  res: NextApiResponse<EndpointResult<GetMetadataResponse>>
) {
  // Guard API call to session-only
  const walletSessionData = await req.session.get<CurrentWalletSessionData>(
    SESSION_WALLET_KEY
  );

  if (!walletSessionData?.pubKey) {
    res.status(400).json({
      error: 'No current wallet address in session',
    });
    return;
  }

  if (req.body.cid == null || typeof req.body.cid !== 'string') {
    res.status(400).json({
      error: 'Invalid CID property',
    });
    return;
  }
  const reqBody: ReqBody = req.body;

  const result = await executeAsyncForResult<GetMetadataResponse>(async () => {
    return await getDataFromCid(reqBody.cid);
  });

  res.status(200).json(resultToEndpointResult(result));
}

export default withSession(handler);
