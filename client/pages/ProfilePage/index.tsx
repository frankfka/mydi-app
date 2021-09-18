import React from 'react';
import AppPage from '../../components/AppPage';
import ConnectWalletContainer from './components/ConnectWalletContainer';
import TestSolanaProfileSection from './components/TestSolanaProfileSection';
import { useSolanaProfileContext } from '../../contexts/solana/SolanaProfileContext';
import ProfileOnboardingDialog from './components/ProfileOnboardingDialog';

const ProfilePage = () => {
  const solanaProfileContext = useSolanaProfileContext();

  console.log('Wallet state', {
    wallet: solanaProfileContext.wallet.wallet,
    userKey: solanaProfileContext.wallet.publicKey,
    ready: solanaProfileContext.wallet.ready,
  });

  // TODO: Loading and  state
  let profileContentElement: JSX.Element | undefined = undefined;
  if (solanaProfileContext.wallet.publicKey == null) {
    profileContentElement = <ConnectWalletContainer />;
  } else if (solanaProfileContext.userProfile.nonExistentProfile) {
    // TODO create a container to show dialog
    profileContentElement = <ProfileOnboardingDialog />;
  } else if (solanaProfileContext.userProfile.profile != null) {
    profileContentElement = (
      <div>
        <pre>
          {JSON.stringify(solanaProfileContext.userProfile.profile, null, 2)}
        </pre>
      </div>
    );
  } else {
    profileContentElement = <h1>Not handled state</h1>;
  }

  console.log('Render');
  return (
    <AppPage>
      {profileContentElement}
      <br />
      <TestSolanaProfileSection />
    </AppPage>
  );
};

export default ProfilePage;
