import React from 'react';
import ConnectWalletContainer from './components/ConnectWalletContainer';
import AppPage from '../../components/AppPage';
import ProfileOnboardingWizard from './components/ProfileOnboarding/ProfileOnboardingWizard';
import { useWallet } from '@solana/wallet-adapter-react';
import { useSolanaContext } from '../../contexts/solana/SolanaProfileContext';

const ProfilePage = () => {
  const wallet = useWallet();
  const solanaContext = useSolanaContext();

  const showProfileOnboarding =
    wallet.wallet != null && wallet.signTransaction != null;

  const testClick = async () => {
    await solanaContext.tryExecute();
  };

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
