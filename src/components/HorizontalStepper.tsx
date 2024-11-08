import React from 'react';
import { Stepper, Step, StepLabel } from '@mui/material';

interface HorizontalStepperProps {
  currentSubStep: number;
  totalSubSteps: number;
  visitedSteps: boolean[];
  onSubStepChange: (subStep: number) => void;
  currentStep: number;
}

const HorizontalStepper: React.FC<HorizontalStepperProps> = ({ currentSubStep, totalSubSteps, visitedSteps, onSubStepChange, currentStep }) => {
  if (totalSubSteps === 1) {
    return null;
  }
  const subSteps = Array.from({ length: totalSubSteps }, (_, index) => `Step ${currentStep + 1}.${index + 1}`);

  return (
    <Stepper activeStep={currentSubStep} alternativeLabel>
      {subSteps.map((label, index) => (
        <Step key={label} completed={visitedSteps[index]}>
          <StepLabel onClick={() => visitedSteps[index] && onSubStepChange(index)}>
            {label}
          </StepLabel>
        </Step>
      ))}
    </Stepper>
  );
};

export default HorizontalStepper;
