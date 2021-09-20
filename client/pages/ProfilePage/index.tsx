import React, { useState } from 'react';
import AppPage from '../../components/AppPage';
import ConnectWalletContainer from './components/ConnectWalletContainer';
import TestSolanaProfileSection from './components/TestSolanaProfileSection';
import ProfileOnboardingDialog from './components/ProfileOnboardingDialog';
import CreateProfileContainer from './components/CreateProfileContainer';
import GenericErrorView from '../../components/GenericErrorView';
import LoadingView from '../../components/LoadingView';
import PaperSectionContainer from '../../components/PaperSectionContainer';
import { useAppContext } from '../../contexts/AppContext';
import { getLogger } from '../../../util/logger';

const logger = getLogger('ProfilePage');

const ProfilePage = () => {
  const appState = useAppContext();

  const [showOnboardingDialog, setShowOnboardingDialog] = useState(false);
  const openOnboardingDialog = () => setShowOnboardingDialog(true);
  const closeOnboardingDialog = () => setShowOnboardingDialog(false);

  let profileContentElement: JSX.Element | undefined;
  if (appState.isLoading) {
    profileContentElement = <LoadingView />;
  } else if (appState.isError) {
    profileContentElement = <GenericErrorView />;
  } else if (appState.currentUserPubKey == null) {
    profileContentElement = <ConnectWalletContainer />;
  } else if (appState.nonExistentProfile) {
    profileContentElement = (
      <CreateProfileContainer showOnboardingDialog={openOnboardingDialog} />
    );
  } else if (appState.profile != null) {
    profileContentElement = (
      <div>
        <pre>{JSON.stringify(appState.profile, null, 2)}</pre>
      </div>
    );
  } else {
    logger.warn('Unhandled state');
    profileContentElement = undefined;
  }

  logger.debug('Render');

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
