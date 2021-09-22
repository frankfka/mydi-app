import React, { useState } from 'react';
import AppPage from '../../components/AppPage';
import ConnectWalletContainer from './components/ConnectWalletContainer';
import TestSolanaProfileSection from './components/TestSolanaProfileSection';
import ProfileOnboardingDialog from './components/ProfileOnboardingDialog';
import CreateProfileContainer from './components/CreateProfileContainer';
import ErrorInfoView from '../../components/ErrorInfoView';
import LoadingView from '../../components/LoadingView';
import PaperSectionContainer from '../../components/PaperSectionContainer';
import { useAppContext } from '../../contexts/AppContext';
import { getLogger } from '../../../util/logger';
import ProfileContentSections from './components/ProfileContentSections';
import ProfileNoAppAuthorityAlert from './components/ProfileNoAppAuthorityAlert';
import { Button } from '@mui/material';

const logger = getLogger('ProfilePage');

const ProfilePage = () => {
  const appState = useAppContext();

  const [showOnboardingDialog, setShowOnboardingDialog] = useState(false);
  const openOnboardingDialog = () => setShowOnboardingDialog(true);
  const closeOnboardingDialog = () => setShowOnboardingDialog(false);

  // Alert for no app authority granted
  let profileNoAppAuthorityContent: JSX.Element | undefined;
  if (appState.profile != null && !appState.appAuthorityEnabled) {
    profileNoAppAuthorityContent = (
      <ProfileNoAppAuthorityAlert
        sx={{
          marginBottom: 2,
        }}
      />
    );
  }

  // Helpers, info containers, etc.
  let profileAltContent: JSX.Element | undefined;
  if (appState.profile != null) {
    // Greedily render the profile if exists, so explicitly set to undefined
    profileAltContent = undefined;
  } else if (appState.isLoading) {
    profileAltContent = <LoadingView />;
  } else if (appState.isError) {
    profileAltContent = <ErrorInfoView />;
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
  // Wrap in section container
  profileAltContent =
    profileAltContent != null ? (
      <PaperSectionContainer>{profileAltContent}</PaperSectionContainer>
    ) : undefined;

  // Main content to display profiles
  let profileMainContent: JSX.Element | undefined;
  if (appState.profile != null) {
    profileMainContent = <ProfileContentSections profile={appState.profile} />;
  }

  logger.debug('Render');

  const testBtnClick = () => {
    window.open('/profile/oauth', '_blank');
  };

  return (
    <AppPage>
      <Button onClick={testBtnClick}>Test</Button>
      {/*Onboarding dialog*/}
      <ProfileOnboardingDialog
        onDoneOnboardingClicked={closeOnboardingDialog}
        open={showOnboardingDialog}
        onClose={closeOnboardingDialog}
      />
      {/*Profile Alt Content*/}
      {profileAltContent}

      {/*No authority alert*/}
      {profileNoAppAuthorityContent}

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
