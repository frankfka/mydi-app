import React from 'react';
import SpacingContainer from '../../../../components/SpacingContainer';
import { Button, Typography } from '@material-ui/core';

type Props = {
  onPublishClicked(): void;
};

const ProfileOnboardingPublishContent: React.FC<Props> = ({
  onPublishClicked,
}) => {
  return (
    <SpacingContainer>
      <Typography variant="h4">Almost Done!</Typography>
      <Typography variant="subtitle1">
        It&apos;s time to publish your profile. You will be asked to confirm a
        transaction. There is no additional charge beyond the transaction fee.
      </Typography>
      <Button variant="contained" color="primary" onClick={onPublishClicked}>
        Publish Now
      </Button>
    </SpacingContainer>
  );
};

export default ProfileOnboardingPublishContent;
