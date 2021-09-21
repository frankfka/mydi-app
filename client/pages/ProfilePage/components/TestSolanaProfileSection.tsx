import React from 'react';
import { useSolanaProfileContext } from '../../../contexts/solana/SolanaProfileContext';
import SpacingContainer from '../../../components/SpacingContainer';
import { Button } from '@mui/material';

const TestSolanaProfileSection = () => {
  const solanaContext = useSolanaProfileContext();

  const testCreateDummyProfile = async () => {
    await solanaContext.createUserProfile({
      createAppAuthority: true,
      displayName: 'Test!',
    });
  };

  const testDeleteDummyProfile = async () => {
    await solanaContext.deleteUserData('general');
    await solanaContext.deleteAppAuthority();
    await solanaContext.deleteUserData('captcha');
  };

  return (
    <SpacingContainer direction="row">
      <Button onClick={testCreateDummyProfile}>Create Profile</Button>
      <Button onClick={testDeleteDummyProfile}>Delete Profile</Button>
    </SpacingContainer>
  );
};

export default TestSolanaProfileSection;
