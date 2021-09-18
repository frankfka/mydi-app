import React, { useState } from 'react';
import ProfileOnboardingWizardStepper from './ProfileOnboardingWizardStepper';
import ProfileOnboardingWelcomeContent from './ProfileOnboardingWelcomeContent';
import ProfileOnboardingProfileForm, {
  OnboardingProfileFormValues,
} from './ProfileOnboardingProfileForm';
import { ONBOARDING_STEPS } from './onboardingSteps';
import ProfileOnboardingPublishContent from './ProfileOnboardingPublishContent';
import { Box } from '@mui/material';

type Props = {};

const ProfileOnboardingWizard: React.FC<Props> = () => {
  // Current step + utils
  const [activeStep, setActiveStep] = useState(0);
  const onNext = () => {
    setActiveStep((prev) =>
      prev < ONBOARDING_STEPS.length - 1 ? prev + 1 : prev
    );
  };
  const onPrev = () => {
    setActiveStep((prev) => (prev > 0 ? prev - 1 : prev));
  };
  // User general info state - from form
  const [userProfileFormValues, setUserProfileFormValues] =
    useState<OnboardingProfileFormValues>();

  // Main content to render for wizard
  let wizardContent: JSX.Element | undefined = undefined;

  switch (activeStep) {
    case 0:
      wizardContent = (
        <ProfileOnboardingWelcomeContent onNextClicked={onNext} />
      );
      break;
    case 1:
      wizardContent = <ProfileOnboardingProfileForm onNextClicked={onNext} />;
      break;
    case 2:
      wizardContent = (
        <ProfileOnboardingPublishContent
          userProfileValues={userProfileFormValues}
        />
      );
      break;
  }

  return (
    <div>
      {/*Stepper*/}
      <ProfileOnboardingWizardStepper
        activeStep={activeStep}
        stepLabels={ONBOARDING_STEPS.map((s) => s.name)}
      />
      {/*Page Content*/}
      <Box py={2} px={4}>
        {wizardContent}
      </Box>
    </div>
  );
};

export default ProfileOnboardingWizard;
