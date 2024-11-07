import React from 'react';
import { Stepper, Step, StepLabel } from '@mui/material';

const subSteps = ['S.Step 1', 'S.Step 2'];

interface HorizontalStepperProps {
  currentSubStep: number;
  visitedSteps: boolean[];
  onSubStepChange: (subStep: number) => void;
}

const HorizontalStepper: React.FC<HorizontalStepperProps> = ({ currentSubStep, visitedSteps, onSubStepChange }) => {
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
