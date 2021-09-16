import React from 'react';
import { Button } from '@material-ui/core';

type Props = {
  onNextClicked(): void;
};

const ProfileOnboardingProfileForm: React.FC<Props> = ({ onNextClicked }) => {
  return (
    <div>
      <h1>Onboarding profile</h1>
      <Button variant="contained" color="primary" onClick={onNextClicked}>
        Next
      </Button>
    </div>
  );
};

export default ProfileOnboardingProfileForm;
