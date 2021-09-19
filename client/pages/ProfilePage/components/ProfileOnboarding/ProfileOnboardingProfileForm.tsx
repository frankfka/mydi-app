import React from 'react';
import { Box, Button, Switch, TextField, Typography } from '@mui/material';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import SpacingContainer from '../../../../components/SpacingContainer';

type Props = {
  existingFormValues?: OnboardingProfileFormValues;
  onNextClicked(formValues: OnboardingProfileFormValues): void;
  onPrevClicked(): void;
};

export type OnboardingProfileFormValues = {
  displayName?: string;
  description?: string;
  appAuthorityEnabled: boolean;
};

const ProfileOnboardingProfileForm: React.FC<Props> = ({
  existingFormValues,
  onNextClicked,
  onPrevClicked,
}) => {
  const { control, handleSubmit } = useForm<OnboardingProfileFormValues>({
    defaultValues: {
      appAuthorityEnabled: true,
      ...existingFormValues,
    },
  });

  const onSubmit: SubmitHandler<OnboardingProfileFormValues> = (data) => {
    // Pass back data
    onNextClicked(data);
  };

  // TODO: image upload?
  // TODO: Extract components https://blog.logrocket.com/using-material-ui-with-react-hook-form/
  return (
    <SpacingContainer fullWidthChildren>
      <Typography variant="h4">Basic Info</Typography>

      <Typography variant="subtitle1">All fields are optional</Typography>

      <Controller
        name="displayName"
        control={control}
        render={({ field }) => (
          <TextField label="Name" placeholder="Your display name" {...field} />
        )}
      />
      <Controller
        name="description"
        control={control}
        render={({ field }) => (
          <TextField
            label="Bio"
            placeholder="Tell us a bit about you"
            {...field}
            multiline
            fullWidth
            rows={3}
          />
        )}
      />
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
        <Controller
          name="appAuthorityEnabled"
          control={control}
          render={({ field }) => (
            <Switch {...field} defaultChecked={true} color="primary" />
          )}
        />
      </Box>

      <SpacingContainer direction="row">
        <Button onClick={onPrevClicked}>Back</Button>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit(onSubmit)}
        >
          Next
        </Button>
      </SpacingContainer>
    </SpacingContainer>
  );
};

export default ProfileOnboardingProfileForm;
