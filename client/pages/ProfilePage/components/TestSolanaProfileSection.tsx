import React from 'react';
import { useSolanaAppContextDataSource } from '../../../contexts/solana/SolanaAppContextDataSourceContext';
import SpacingContainer from '../../../components/SpacingContainer';
import { Button } from '@mui/material';

const TestSolanaProfileSection = () => {
  const solanaContext = useSolanaAppContextDataSource();

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
      {/*profile info*/}
      {solanaContext.profile && (
        <div>
          <pre>{JSON.stringify(solanaContext.profile, null, 2)}</pre>
        </div>
      )}
    </SpacingContainer>
  );
};

export default TestSolanaProfileSection;
