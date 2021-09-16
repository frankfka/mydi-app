import React from 'react';
import SpacingContainer from '../../../../components/SpacingContainer';
import { Button, Typography } from '@material-ui/core';

type Props = {
  onNextClicked(): void;
};

const ProfileOnboardingWelcomeContent: React.FC<Props> = ({
  onNextClicked,
}) => {
  return (
    <SpacingContainer justifyContent="center" alignItems="center">
      <Typography variant="h4">Create Your Profile</Typography>
      <Typography variant="body1">
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry standard dummy text ever
        since the 1500s.
      </Typography>
      <Button variant="contained" color="primary" onClick={onNextClicked}>
        Get Started
      </Button>
    </SpacingContainer>
  );
};

export default ProfileOnboardingWelcomeContent;
