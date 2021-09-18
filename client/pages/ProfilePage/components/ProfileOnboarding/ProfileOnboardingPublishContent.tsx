import React, { useState } from 'react';
import SpacingContainer from '../../../../components/SpacingContainer';
import { Box, Button, Switch, Typography } from '@mui/material';
import { useSolanaProfileContext } from '../../../../contexts/solana/SolanaProfileContext';
import { OnboardingProfileFormValues } from './ProfileOnboardingProfileForm';

type Props = {
  userProfileValues?: OnboardingProfileFormValues;
};

const ProfileOnboardingPublishContent: React.FC<Props> = () => {
  const [appAuthorityEnabled, setAppAuthorityEnabled] = useState(true);

  // Profile context
  const solanaProfileContext = useSolanaProfileContext();

  // Publish loading state
  const [isPublishing, setIsPublishing] = useState(false);
  // TODO: publish err and complete states
  // Publish callback
  const onPublishClicked = () => {
    setIsPublishing(true);
    try {
      solanaProfileContext.createUserProfile({
        createAppAuthority: false,
        description: '',
        displayName: '',
        imageUri: '',
      });
    } catch (err) {
      // TODO
    }
    setIsPublishing(false);
  };

  return (
    <SpacingContainer fullWidthChildren>
      <Typography variant="h4">Almost Done!</Typography>
      <Typography variant="subtitle1">
        It&apos;s time to publish your profile. You will be asked to confirm a
        transaction. There is no additional charge beyond the transaction fee.
      </Typography>
      <Box
        display="flex"
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
        flexWrap="nowrap"
      >
        <Typography variant="caption">
          Authorize our app to information to your profile. This is required for
          CAPTCHA verification and social integration.
        </Typography>
        <Switch
          checked={appAuthorityEnabled}
          onChange={() => setAppAuthorityEnabled((prev) => !prev)}
          color="primary"
        />
      </Box>
      <Button variant="contained" color="primary" onClick={onPublishClicked}>
        Publish Now
      </Button>
    </SpacingContainer>
  );
};

export default ProfileOnboardingPublishContent;
