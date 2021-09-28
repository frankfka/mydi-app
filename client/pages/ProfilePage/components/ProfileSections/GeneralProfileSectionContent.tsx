import React, { useState } from 'react';
import { ProfileGeneralMetadata } from '../../../../../util/profile/ProfileMetadata';
import SpacingContainer from '../../../../components/SpacingContainer';
import { ProfileDataRecord } from '../../../../../util/profile/Profile';
import { SubmitHandler, useForm } from 'react-hook-form';
import FormTextField from '../../../../components/form/FormTextField';
import { Button } from '@mui/material';
import { useAppContext } from '../../../../contexts/AppContext';
import { getLogger } from '../../../../../util/logger';
import { isTransactionSigningDeniedError } from '../../../../contexts/solana/solanaWalletContextUtils';
import LoaderButton from '../../../../components/LoaderButton';
import { useGlobalViewContext } from '../../../../contexts/views/GlobalViewContext';

const logger = getLogger('GeneralProfileSectionContent');

type Props = {
  dataRecord: ProfileDataRecord<ProfileGeneralMetadata>;
};

type ProfileFormValues = Omit<ProfileGeneralMetadata, 'imageUri'>;

const GeneralProfileSectionContent: React.FC<Props> = ({ dataRecord }) => {
  const metadata = dataRecord.data;

  const appContext = useAppContext();
  const globalViewContext = useGlobalViewContext();

  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const {
    control,
    reset,
    handleSubmit,
    formState: { isDirty },
  } = useForm<ProfileFormValues>({
    defaultValues: metadata,
  });

  const cancelEditing = (resetForm: boolean = true) => {
    setIsEditing(false);
    resetForm && reset();
  };

  const onSubmit: SubmitHandler<ProfileFormValues> = async (data) => {
    setIsSaving(true);
    try {
      await appContext.upsertUserData({
        data,
        namespace: 'general',
      });

      cancelEditing(false);
      // Also reload profile data
      appContext.refreshUserProfile();
    } catch (err) {
      if (isTransactionSigningDeniedError(err)) {
        globalViewContext.showSnackbar({
          type: 'warning',
          message: 'Signing the transaction was denied. Please try again.',
        });
        cancelEditing();
      } else {
        logger.error('Error upserting user data', err);
        globalViewContext.showSnackbar({
          type: 'error',
          message: 'Something went wrong. Please try again.',
        });
      }
    }
    setIsSaving(false);
  };

  const buttonContent = isEditing ? (
    <SpacingContainer direction="row-reverse">
      <LoaderButton
        loading={isSaving}
        disabled={!isDirty}
        variant="contained"
        color="secondary"
        onClick={handleSubmit(onSubmit)}
        progressProps={{
          color: 'primary',
        }}
      >
        Save
      </LoaderButton>
      <Button
        color="secondary"
        onClick={() => cancelEditing()}
        disabled={isSaving}
      >
        Cancel
      </Button>
    </SpacingContainer>
  ) : (
    <SpacingContainer direction="row-reverse">
      <Button onClick={() => setIsEditing(true)} color="secondary">
        Edit
      </Button>
    </SpacingContainer>
  );

  return (
    <SpacingContainer>
      <FormTextField
        controllerProps={{
          name: 'displayName',
          control,
        }}
        label="Name"
        placeholder="Your display name"
        inputProps={{
          readOnly: !isEditing,
        }}
      />
      <FormTextField
        controllerProps={{
          name: 'description',
          control,
        }}
        label="Bio"
        placeholder="Tell us a bit about you"
        multiline
        fullWidth
        rows={3}
        inputProps={{
          readOnly: !isEditing,
        }}
      />
      {buttonContent}
    </SpacingContainer>
  );
};

export default GeneralProfileSectionContent;
