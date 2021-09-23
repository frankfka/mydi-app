import React, { useEffect, useState } from 'react';
import AppPage from '../../components/AppPage';
import { createClientMagicInstance } from '../../util/magicLogin/clientMagicInstance';
import { OAuthRedirectResult } from '@magic-ext/oauth';
import PaperSectionContainer from '../../components/PaperSectionContainer';
import { getLogger } from '../../../util/logger';
import OAuthDataPublishFormContent from './components/OAuthDataPublishFormContent';
import useSession from '../../hooks/useSession';
import OAuthErrorView from './components/OAuthErrorView';
import LoadingView from '../../components/LoadingView';
import CenteredInfoContainer from '../../components/CenteredInfoContainer';
import { Typography } from '@mui/material';
import SpacingContainer from '../../components/SpacingContainer';

const logger = getLogger('OAuthRedirectPage');

/**
 * The redirect page that handles Magic login redirects
 */
const OAuthRedirectPage = () => {
  const session = useSession();

  const [dataPublishSuccess, setDataPublishSuccess] = useState(false);

  // Start in loading as we should be getting the redirect result
  const [loadingOAuthResult, setLoadingOAuthResult] = useState(true);
  const [oAuthResultError, setOAuthResultError] = useState(false);
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
        setOAuthResultError(true);
      }
      setLoadingOAuthResult(false);
    };

    getOAuthResult();
  }, []);

  let redirectPageContent: JSX.Element;
  if (dataPublishSuccess) {
    redirectPageContent = (
      <PaperSectionContainer>
        <CenteredInfoContainer>
          <SpacingContainer>
            <Typography variant="h4">Success!</Typography>
            <Typography variant="subtitle1">
              Your social data was successfully published to your profile. You
              may now close this tab.
            </Typography>
          </SpacingContainer>
        </CenteredInfoContainer>
      </PaperSectionContainer>
    );
  } else if (oAuthResult != null && session.session?.wallet?.pubKey != null) {
    redirectPageContent = (
      <PaperSectionContainer>
        <OAuthDataPublishFormContent
          oAuthResult={oAuthResult}
          onPublishSuccess={() => setDataPublishSuccess(true)}
        />
      </PaperSectionContainer>
    );
  } else if (loadingOAuthResult) {
    redirectPageContent = <LoadingView label="Retrieving your data" />;
  } else if (oAuthResultError) {
    redirectPageContent = <OAuthErrorView />;
  } else {
    logger.warn('Unhandled view state');
    redirectPageContent = <OAuthErrorView />;
  }

  return <AppPage>{redirectPageContent}</AppPage>;
};

export default OAuthRedirectPage;
