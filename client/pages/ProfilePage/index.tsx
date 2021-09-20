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
import ProfileContentSections from './components/ProfileContentSections';

const logger = getLogger('ProfilePage');

const ProfilePage = () => {
  const appState = useAppContext();

  const [showOnboardingDialog, setShowOnboardingDialog] = useState(false);
  const openOnboardingDialog = () => setShowOnboardingDialog(true);
  const closeOnboardingDialog = () => setShowOnboardingDialog(false);

  // Helpers, info containers, etc.
  let profileAltContent: JSX.Element | undefined;

  if (appState.profile != null) {
    // Greedily render the profile if exists, so explicitly set to undefined
    profileAltContent = undefined;
  } else if (appState.isLoading) {
    profileAltContent = <LoadingView />;
  } else if (appState.isError) {
    profileAltContent = <GenericErrorView />;
  } else if (appState.currentUserPubKey == null) {
    profileAltContent = <ConnectWalletContainer />;
  } else if (appState.nonExistentProfile) {
    profileAltContent = (
      <CreateProfileContainer showOnboardingDialog={openOnboardingDialog} />
    );
  } else {
    logger.warn('Unhandled state');
    profileAltContent = undefined;
  }

  let profileMainContent: JSX.Element | undefined;
  if (appState.profile != null) {
    profileMainContent = <ProfileContentSections profile={appState.profile} />;
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
      {/*Profile Alt Content*/}
      {profileAltContent && (
        <PaperSectionContainer>{profileAltContent}</PaperSectionContainer>
      )}

      {/*Profile Main Content*/}
      {profileMainContent}

      {/*Testing*/}
      {/*test btns*/}
      <TestSolanaProfileSection />
      {/*profile info*/}
      {appState.profile && (
        <div>
          <pre>{JSON.stringify(appState.profile, null, 2)}</pre>
        </div>
      )}
    </AppPage>
  );
};

export default ProfilePage;
