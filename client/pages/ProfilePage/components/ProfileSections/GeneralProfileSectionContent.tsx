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

const logger = getLogger('GeneralProfileSectionContent');

type Props = {
  dataRecord: ProfileDataRecord<ProfileGeneralMetadata>;
};

type ProfileFormValues = Omit<ProfileGeneralMetadata, 'imageUri'>;

const GeneralProfileSectionContent: React.FC<Props> = ({ dataRecord }) => {
  const metadata = dataRecord.data;

  const appContext = useAppContext();

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
      await appContext.solanaProfileState.upsertUserData({
        data,
        namespace: 'general',
      });

      cancelEditing(false);
      // Also reload profile data
      appContext.solanaProfileState.userProfile.mutate();
    } catch (err) {
      // TODO: Global toast context
      if (isTransactionSigningDeniedError(err)) {
        // setPublishErrText(
        //   'Signing the transaction was denied. Please try again.'
        // );
        cancelEditing();
      } else {
        logger.error('Error upserting user data', err);
        // setPublishErrText('Something went wrong. Please try again');
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
      <Button onClick={() => setIsEditing(true)}>Edit</Button>
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
