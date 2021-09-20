import React, { useEffect, useState } from 'react';
import AppPage from '../../components/AppPage';
import ConnectWalletContainer from './components/ConnectWalletContainer';
import TestSolanaProfileSection from './components/TestSolanaProfileSection';
import { useSolanaProfileContext } from '../../contexts/solana/SolanaProfileContext';
import ProfileOnboardingDialog from './components/ProfileOnboardingDialog';
import CreateProfileContainer from './components/CreateProfileContainer';
import GenericErrorView from '../../components/GenericErrorView';
import LoadingView from '../../components/LoadingView';
import PaperSectionContainer from '../../components/PaperSectionContainer';
import useSession from '../../hooks/useSession';

const ProfilePage = () => {
  const solanaProfileContext = useSolanaProfileContext();
  const sessionState = useSession();

  // Reload session on public key change, this should eventually be in a AppContext that brings everything together
  useEffect(() => {
    // console.log('Pub key changed', solanaProfileContext.wallet.publicKey);
    if (solanaProfileContext.wallet.publicKey != null) {
      const pubKey = solanaProfileContext.wallet.publicKey.toString();
      if (pubKey !== sessionState.session?.wallet?.pubKey) {
        sessionState.createSession(pubKey);
      }
    } else if (sessionState.session?.wallet != null) {
      sessionState.destroySession();
    }
  }, [solanaProfileContext.wallet.publicKey, sessionState.createSession]);

  const [showOnboardingDialog, setShowOnboardingDialog] = useState(false);
  const openOnboardingDialog = () => setShowOnboardingDialog(true);
  const closeOnboardingDialog = () => setShowOnboardingDialog(false);

  console.log('Wallet state', {
    wallet: solanaProfileContext.wallet.wallet,
    userKey: solanaProfileContext.wallet.publicKey,
    ready: solanaProfileContext.wallet.ready,
  });

  console.log('Session state', {
    pubKey: sessionState.session?.wallet?.pubKey,
  });

  const isLoading = solanaProfileContext.loading;
  const isError = solanaProfileContext.error;

  let profileContentElement: JSX.Element | undefined = undefined;
  if (isLoading) {
    profileContentElement = <LoadingView />;
  } else if (isError) {
    profileContentElement = <GenericErrorView />;
  } else if (solanaProfileContext.wallet.publicKey == null) {
    profileContentElement = <ConnectWalletContainer />;
  } else if (solanaProfileContext.userProfile.nonExistentProfile) {
    profileContentElement = (
      <CreateProfileContainer showOnboardingDialog={openOnboardingDialog} />
    );
  } else if (solanaProfileContext.userProfile.profile != null) {
    profileContentElement = (
      <div>
        <pre>
          {JSON.stringify(solanaProfileContext.userProfile.profile, null, 2)}
        </pre>
      </div>
    );
  } else {
    // TODO
    profileContentElement = <h1>Not handled state</h1>;
  }

  console.log('Render');
  return (
    <AppPage>
      {/*Onboarding dialog*/}
      <ProfileOnboardingDialog
        onDoneOnboardingClicked={closeOnboardingDialog}
        open={showOnboardingDialog}
        onClose={closeOnboardingDialog}
      />
      {/*Profile content*/}
      <PaperSectionContainer>{profileContentElement}</PaperSectionContainer>

      {/*Testing*/}
      <TestSolanaProfileSection />
    </AppPage>
  );
};

export default ProfilePage;
