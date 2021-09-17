import React from 'react';
import AppPage from '../../components/AppPage';
import ConnectWalletContainer from './components/ConnectWalletContainer';
import ProfileOnboardingWizard from './components/ProfileOnboarding/ProfileOnboardingWizard';
import TestSolanaProfileSection from './components/TestSolanaProfileSection';

const ProfilePage = () => {
  console.log('Render');
  return (
    <AppPage>
      <ConnectWalletContainer />
      <br />
      <ProfileOnboardingWizard />
      <TestSolanaProfileSection />
    </AppPage>
  );
};

export default ProfilePage;
