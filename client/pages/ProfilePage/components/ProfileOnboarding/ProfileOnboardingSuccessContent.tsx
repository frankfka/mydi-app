import React from 'react';
import SpacingContainer from '../../../../components/SpacingContainer';
import { Button, Typography } from '@mui/material';

type Props = {
  onDoneClicked(): void;
};

const ProfileOnboardingSuccessContent: React.FC<Props> = ({
  onDoneClicked,
}) => {
  return (
    <SpacingContainer fullWidthChildren>
      <Typography variant="h4">Success!</Typography>
      <Typography variant="body1">
        Your profile was created successfully.
      </Typography>
      <Button variant="contained" color="primary" onClick={onDoneClicked}>
        Done
      </Button>
    </SpacingContainer>
  );
};

export default ProfileOnboardingSuccessContent;
