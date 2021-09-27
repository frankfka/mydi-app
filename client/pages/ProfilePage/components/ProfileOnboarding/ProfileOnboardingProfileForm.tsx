import React from 'react';
import { Box, Button, Switch, Typography } from '@mui/material';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import SpacingContainer from '../../../../components/SpacingContainer';
import FormTextField from '../../../../components/form/FormTextField';
import { ProfileGeneralMetadata } from '../../../../../util/profile/ProfileMetadata';

type Props = {
  existingFormValues?: OnboardingProfileFormValues;
  onNextClicked(formValues: OnboardingProfileFormValues): void;
  onPrevClicked(): void;
};

export type OnboardingProfileFormValues = Omit<
  ProfileGeneralMetadata,
  'imageUri'
> & {
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
  return (
    <SpacingContainer fullWidthChildren>
      <Typography variant="h4">The Basics</Typography>

      <Typography variant="subtitle1">
        Fill out a basic profile with anything you&apos;d like - or share
        nothing at all. All fields are optional.
      </Typography>

      <FormTextField
        controllerProps={{
          name: 'displayName',
          control,
        }}
        label="Name"
        placeholder="Your display name"
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
            <Switch {...field} defaultChecked={true} color="secondary" />
          )}
        />
      </Box>

      <SpacingContainer direction="row">
        <Button onClick={onPrevClicked}>Back</Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={handleSubmit(onSubmit)}
        >
          Next
        </Button>
      </SpacingContainer>
    </SpacingContainer>
  );
};

export default ProfileOnboardingProfileForm;
