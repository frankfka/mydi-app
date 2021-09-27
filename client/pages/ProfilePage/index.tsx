import React, { useState } from 'react';
import AppPage from '../../components/AppPage';
import ConnectWalletContainer from './components/ConnectWalletContainer';
import ProfileOnboardingDialog from './components/ProfileOnboardingDialog';
import CreateProfileContainer from './components/CreateProfileContainer';
import ErrorInfoView from '../../components/ErrorInfoView';
import LoadingView from '../../components/LoadingView';
import PaperSectionContainer from '../../components/PaperSectionContainer';
import { useAppContext } from '../../contexts/AppContext';
import { getLogger } from '../../../util/logger';
import ProfileContentSections from './components/ProfileContentSections';
import ProfileNoAppAuthorityAlert from './components/ProfileNoAppAuthorityAlert';
import { Box } from '@mui/material';
import SolanaWalletButton from '../../components/wallet/solana/SolanaWalletButton';

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

  let walletButtonContent: JSX.Element | undefined;
  if (appState.currentUserPubKey && !appState.isLoading) {
    walletButtonContent = (
      <Box
        sx={{
          marginBottom: 2,
          textAlign: 'right',
        }}
      >
        <SolanaWalletButton variant="outlined" />
      </Box>
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

  return (
    <AppPage>
      {/*Onboarding dialog*/}
      <ProfileOnboardingDialog
        onDoneOnboardingClicked={closeOnboardingDialog}
        open={showOnboardingDialog}
        onClose={closeOnboardingDialog}
      />

      {/*No authority alert*/}
      {profileNoAppAuthorityContent}

      {/*Connected wallet button*/}
      {walletButtonContent}

      {/*Profile Alt Content*/}
      {profileAltContent}

      {/*Profile Main Content*/}
      {profileMainContent}

      {/*Testing*/}
      {/*<TestSolanaProfileSection />*/}
    </AppPage>
  );
};

export default ProfilePage;
