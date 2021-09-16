import React, { useState } from 'react';
import { Box, makeStyles } from '@material-ui/core';
import ProfileOnboardingWizardStepper from './ProfileOnboardingWizardStepper';
import ProfileOnboardingWelcomeContent from './ProfileOnboardingWelcomeContent';
import ProfileOnboardingProfileForm from './ProfileOnboardingProfileForm';
import { ONBOARDING_STEPS } from './onboardingSteps';
import ProfileOnboardingPublishContent from './ProfileOnboardingPublishContent';

type Props = {};

const useStyles = makeStyles((theme) => ({
  stepper: {},
  wizardContent: {
    padding: theme.spacing(2, 4),
  },
}));

const ProfileOnboardingWizard: React.FC<Props> = () => {
  const classes = useStyles();

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

  // Publish callback
  const onPublishClicked = () => {
    console.log('publish');
  };

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
        <ProfileOnboardingPublishContent onPublishClicked={onPublishClicked} />
      );
      break;
  }

  return (
    <div>
      {/*Stepper*/}
      <ProfileOnboardingWizardStepper
        activeStep={activeStep}
        stepLabels={ONBOARDING_STEPS.map((s) => s.name)}
        className={classes.stepper}
      />
      {/*Page Content*/}
      <Box className={classes.wizardContent}>{wizardContent}</Box>
    </div>
  );
};

export default ProfileOnboardingWizard;
