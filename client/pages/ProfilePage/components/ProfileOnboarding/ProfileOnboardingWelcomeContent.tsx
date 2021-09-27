import React from 'react';
import SpacingContainer from '../../../../components/SpacingContainer';
import { Button, Typography } from '@mui/material';

type Props = {
  onNextClicked(): void;
};

const ProfileOnboardingWelcomeContent: React.FC<Props> = ({
  onNextClicked,
}) => {
  return (
    <SpacingContainer fullWidthChildren>
      <Typography variant="h4">Create Your Profile</Typography>
      <Typography variant="body1">
        Craft your Web 3.0 identity however you&apos;d like. Easily create a
        pseudonymous profile and share only what you want. You have complete
        control and ownership over the data that you publish to the blockchain.
      </Typography>
      <Button variant="contained" color="secondary" onClick={onNextClicked}>
        Next
      </Button>
    </SpacingContainer>
  );
};

export default ProfileOnboardingWelcomeContent;
