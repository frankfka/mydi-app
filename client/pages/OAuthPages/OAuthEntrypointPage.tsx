import React, { useEffect } from 'react';
import useSession from '../../hooks/useSession';
import AppPage from '../../components/AppPage';
import { useRouter } from 'next/router';
import {
  supportedMagicOAuthTypes,
  SupportedOAuthType,
} from '../../util/socialLogin/socialLoginUtils';
import { createClientMagicInstance } from '../../util/socialLogin/clientMagicInstance';
import CenteredInfoContainer from '../../components/CenteredInfoContainer';
import OAuthErrorView from './components/OAuthErrorView';
import LoadingView from '../../components/LoadingView';

const getRedirectUri = (): string => {
  return window.location.href.split('?')[0] + '/redirect';
};

/**
 * The entrypoint screen that will handle the oAuth sign in flow with Magic
 */
const OAuthEntrypointPage = () => {
  const router = useRouter();
  const { type: oAuthType } = router.query;
  const session = useSession();

  const isValidSession = session.session?.wallet?.walletIdentifier != null;
  let validOAuthType: SupportedOAuthType | undefined = undefined;
  if (
    !!oAuthType &&
    typeof oAuthType === 'string' &&
    supportedMagicOAuthTypes.includes(oAuthType as SupportedOAuthType)
  ) {
    validOAuthType = oAuthType as SupportedOAuthType;
  }

  useEffect(() => {
    if (validOAuthType && isValidSession) {
      // Use Magic to create sign-in flow
      createClientMagicInstance().oauth.loginWithRedirect({
        provider: validOAuthType,
        redirectURI: getRedirectUri(),
      });
    }
  }, [isValidSession, validOAuthType]);

  const pageContent =
    validOAuthType && isValidSession ? (
      <CenteredInfoContainer>
        <LoadingView label="Redirecting to sign-in" />
      </CenteredInfoContainer>
    ) : (
      <OAuthErrorView />
    );

  return <AppPage hideNavBar>{pageContent}</AppPage>;
};

export default OAuthEntrypointPage;
