import React, { useState } from 'react';
import ProfileOnboardingWizardStepper from './ProfileOnboardingWizardStepper';
import ProfileOnboardingSuccessContent from './ProfileOnboardingSuccessContent';
import ProfileOnboardingProfileForm, {
  OnboardingProfileFormValues,
} from './ProfileOnboardingProfileForm';
import { ONBOARDING_STEPS } from './onboardingSteps';
import ProfileOnboardingPublishContent from './ProfileOnboardingPublishContent';
import { Box } from '@mui/material';
import { useSolanaProfileContext } from '../../../../contexts/solana/SolanaProfileContext';
import ProfileOnboardingWelcomeContent from './ProfileOnboardingWelcomeContent';

type Props = {
  onDoneOnboardingClicked(): void;
};

const ProfileOnboardingWizard: React.FC<Props> = ({
  onDoneOnboardingClicked,
}) => {
  const solanaProfileContext = useSolanaProfileContext();

  // Success state - default to whether we need to create a user profile, so
  // if this accidentally gets shown when a profile is retrieved, we just show the
  // success content
  const [onboardSuccess, setOnboardSuccess] = useState(
    !solanaProfileContext.userProfile.nonExistentProfile
  );

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
  const onFormNext = (formValues: OnboardingProfileFormValues) => {
    setUserProfileFormValues(formValues);
    onNext();
  };

  // Main content to render for wizard
  let wizardContent: JSX.Element | undefined = undefined;

  if (onboardSuccess) {
    wizardContent = (
      <ProfileOnboardingSuccessContent
        onDoneClicked={onDoneOnboardingClicked}
      />
    );
  } else {
    switch (activeStep) {
      case 0:
        wizardContent = (
          <ProfileOnboardingWelcomeContent onNextClicked={onNext} />
        );
        break;
      case 1:
        wizardContent = (
          <ProfileOnboardingProfileForm
            onNextClicked={onFormNext}
            onPrevClicked={onPrev}
            existingFormValues={userProfileFormValues}
          />
        );
        break;
      case 2:
        wizardContent = (
          <ProfileOnboardingPublishContent
            onPrevClicked={onPrev}
            onProfileCreated={() => setOnboardSuccess(true)}
            userProfileValues={userProfileFormValues}
          />
        );
        break;
    }
  }

  return (
    <div>
      {/*Stepper*/}
      <ProfileOnboardingWizardStepper
        activeStep={activeStep}
        stepLabels={ONBOARDING_STEPS.map((s) => s.name)}
      />
      {/*Page Content*/}
      <Box pt={4} px={1}>
        {wizardContent}
      </Box>
    </div>
  );
};

export default ProfileOnboardingWizard;
