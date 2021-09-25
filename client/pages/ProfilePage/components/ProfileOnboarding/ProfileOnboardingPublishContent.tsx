import React, { useState } from 'react';
import SpacingContainer from '../../../../components/SpacingContainer';
import { Alert, Button, Typography } from '@mui/material';
import { useSolanaProfileContext } from '../../../../contexts/solana/SolanaProfileContext';
import { OnboardingProfileFormValues } from './ProfileOnboardingProfileForm';
import { isTransactionSigningDeniedError } from '../../../../contexts/solana/solanaWalletContextUtils';
import LoaderButton from '../../../../components/LoaderButton';

type Props = {
  onPrevClicked(): void;
  onProfileCreated(txnId: string): void;
  userProfileValues?: OnboardingProfileFormValues;
};

const ProfileOnboardingPublishContent: React.FC<Props> = ({
  onPrevClicked,
  onProfileCreated,
  userProfileValues,
}) => {
  // Profile context
  const solanaProfileContext = useSolanaProfileContext();

  // Publish states
  const [isPublishing, setIsPublishing] = useState(false);
  const [publishErrText, setPublishErrText] = useState<string>();

  // Publish callback
  const onPublishClicked = async () => {
    setIsPublishing(true);
    try {
      const createTxnId = await solanaProfileContext.createUserProfile({
        createAppAuthority:
          userProfileValues != null
            ? userProfileValues.appAuthorityEnabled
            : true,
        description: userProfileValues?.description,
        displayName: userProfileValues?.displayName,
        imageUri: undefined, // Not enabled yet
      });
      onProfileCreated(createTxnId);
    } catch (err) {
      if (isTransactionSigningDeniedError(err)) {
        setPublishErrText(
          'Signing the transaction was denied. Please try again.'
        );
      } else {
        setPublishErrText('Something went wrong. Please try again');
      }
    }
    setIsPublishing(false);
  };

  const disableInteraction = isPublishing;

  return (
    <SpacingContainer fullWidthChildren>
      {publishErrText && (
        <Alert severity="error" onClose={() => setPublishErrText(undefined)}>
          {publishErrText}
        </Alert>
      )}

      <Typography variant="h4">Almost Done!</Typography>
      <Typography variant="subtitle1">
        It&apos;s time to publish your profile. You will be asked to confirm a
        transaction. There is no additional charge beyond the transaction fee.
      </Typography>
      <SpacingContainer direction="row">
        <Button onClick={onPrevClicked} disabled={disableInteraction}>
          Back
        </Button>
        <LoaderButton
          variant="contained"
          color="primary"
          onClick={onPublishClicked}
          disabled={disableInteraction}
          loading={isPublishing}
          progressProps={{
            color: 'primary',
          }}
        >
          Publish Now
        </LoaderButton>
      </SpacingContainer>
    </SpacingContainer>
  );
};

export default ProfileOnboardingPublishContent;
