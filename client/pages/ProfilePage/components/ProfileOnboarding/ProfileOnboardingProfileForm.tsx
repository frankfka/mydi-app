import React from 'react';
import { Button, TextField, Typography } from '@mui/material';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import SpacingContainer from '../../../../components/SpacingContainer';

type Props = {
  onNextClicked(): void;
};

export type OnboardingProfileFormValues = {
  displayName?: string;
  description?: string;
};

const ProfileOnboardingProfileForm: React.FC<Props> = ({ onNextClicked }) => {
  const { control, handleSubmit } = useForm<OnboardingProfileFormValues>();

  const onSubmit: SubmitHandler<OnboardingProfileFormValues> = (data) => {
    // TODO pass back data
    console.log(data);
    onNextClicked();
  };

  // TODO: image upload
  // TODO: Extract components https://blog.logrocket.com/using-material-ui-with-react-hook-form/
  return (
    <SpacingContainer fullWidthChildren>
      <Typography variant="h4">Basic Info</Typography>
      <Typography variant="subtitle1">All fields are optional</Typography>

      <Controller
        name="displayName"
        control={control}
        render={({ field }) => (
          <TextField
            variant="outlined"
            label="Display Name"
            placeholder="Display Name"
            {...field}
          />
        )}
      />
      <Controller
        name="description"
        control={control}
        render={({ field }) => (
          <TextField
            variant="outlined"
            label="Your Bio"
            placeholder="A bit about you..."
            {...field}
          />
        )}
      />

      <Button
        variant="contained"
        color="primary"
        onClick={handleSubmit(onSubmit)}
      >
        Next
      </Button>
    </SpacingContainer>
  );
};

export default ProfileOnboardingProfileForm;
