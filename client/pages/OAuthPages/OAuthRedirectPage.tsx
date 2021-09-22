import React, { useEffect, useState } from 'react';
import AppPage from '../../components/AppPage';
import { createClientMagicInstance } from '../../util/magicLogin/clientMagicInstance';
import { OAuthRedirectResult } from '@magic-ext/oauth';
import PaperSectionContainer from '../../components/PaperSectionContainer';
import { getLogger } from '../../../util/logger';
import OAuthDataPublishFormContent from './components/OAuthDataPublishFormContent';
import useSession from '../../hooks/useSession';

const logger = getLogger('OAuthRedirectPage');

/**
 * The redirect page that handles Magic login redirects
 */
const OAuthRedirectPage = () => {
  const session = useSession();

  // Start in loading as we should be getting the redirect result
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [oAuthResult, setOAuthResult] = useState<OAuthRedirectResult>();

  // Get oAuth result on load
  useEffect(() => {
    const getOAuthResult = async () => {
      try {
        setOAuthResult(
          await createClientMagicInstance().oauth.getRedirectResult()
        );
      } catch (err) {
        logger.error('Error getting redirect result', err);
        setError(true);
      }
      setLoading(false);
    };

    getOAuthResult();
  }, []);

  // TODO: Loading & error views
  let redirectPageContent: JSX.Element | undefined = undefined;
  if (oAuthResult != null && session.session?.wallet?.pubKey != null) {
    redirectPageContent = (
      <OAuthDataPublishFormContent oAuthResult={oAuthResult} />
    );
  }

  return (
    <AppPage>
      <PaperSectionContainer>{redirectPageContent}</PaperSectionContainer>
    </AppPage>
  );
};

export default OAuthRedirectPage;
