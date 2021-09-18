import React from 'react';
import { Step, StepLabel, Stepper, StepperProps } from '@mui/material';

type Props = {
  stepLabels: string[];
  activeStep: number;
};

const ProfileOnboardingWizardStepper: React.FC<Props & Partial<StepperProps>> =
  ({ stepLabels, activeStep, ...rest }) => {
    return (
      <Stepper activeStep={activeStep} {...rest}>
        {stepLabels.map((label) => {
          return (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
    );
  };

export default ProfileOnboardingWizardStepper;
