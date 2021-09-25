import React from 'react';
import { Button, Typography } from '@mui/material';
import CenteredInfoContainer from '../../../components/CenteredInfoContainer';
import SpacingContainer from '../../../components/SpacingContainer';

type Props = {
  showOnboardingDialog(): void;
};

const CreateProfileContainer: React.FC<Props> = ({ showOnboardingDialog }) => {
  return (
    <CenteredInfoContainer>
      <SpacingContainer justifyContent="center" alignItems="center">
        <Typography variant="h4">Create Your Web3 Profile</Typography>
        <Typography variant="subtitle1">
          It looks like you haven&apos;t created a profile. It takes less than a
          few minutes to get started.
        </Typography>
        <Button
          variant="contained"
          color="secondary"
          onClick={showOnboardingDialog}
        >
          Get Started
        </Button>
      </SpacingContainer>
    </CenteredInfoContainer>
  );
};

export default CreateProfileContainer;
