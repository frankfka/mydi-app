import React from 'react';
import AppPage from '../../components/AppPage';
import ConnectWalletContainer from './components/ConnectWalletContainer';
import ProfileOnboardingWizard from './components/ProfileOnboarding/ProfileOnboardingWizard';
import { useSolanaProfileContext } from '../../contexts/solana/SolanaProfileContext';

const ProfilePage = () => {
  const solanaContext = useSolanaProfileContext();

  const testClick = async () => {
    await solanaContext.createUserProfile({
      createAppAuthority: true,
      displayName: 'Test!',
    });
  };

  console.log('Render');
  return (
    <AppPage>
      <ConnectWalletContainer />
      <br />
      <ProfileOnboardingWizard />
      <button onClick={testClick}>Test</button>
    </AppPage>
  );
};

export default ProfilePage;
