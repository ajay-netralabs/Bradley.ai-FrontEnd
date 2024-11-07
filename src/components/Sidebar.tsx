import React from 'react';
import { Stepper, Step, StepLabel, ListItemButton, ListItemText } from '@mui/material';

const steps = ['Step 1', 'Step 2'];

interface SidebarProps {
  currentStep: number;
  visitedSteps: boolean[][];
  onStepChange: (step: number) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentStep, visitedSteps, onStepChange }) => {
  return (
    <Stepper activeStep={currentStep} orientation="vertical" nonLinear>
      {steps.map((label, index) => (
        <Step key={label} completed={visitedSteps[index][0]}>
          <StepLabel>
            <ListItemButton
              selected={currentStep === index}
              onClick={() => visitedSteps[index][0] && onStepChange(index)}
            >
              <ListItemText primary={label} />
            </ListItemButton>
          </StepLabel>
        </Step>
      ))}
    </Stepper>
  );
};

export default Sidebar;
