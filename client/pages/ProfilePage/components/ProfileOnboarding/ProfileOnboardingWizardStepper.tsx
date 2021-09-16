import React from 'react';
import Stepper, { StepperProps } from '@material-ui/core/Stepper';
import { Step, StepLabel } from '@material-ui/core';

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
