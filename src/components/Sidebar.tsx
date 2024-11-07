import React from 'react';
import { Stepper, Step, StepLabel, ListItemButton, ListItemText, Paper } from '@mui/material';

const steps = ['Step 1', 'Step 2', 'Step 3', 'Step 4', 'Step 5'];

interface SidebarProps {
  currentStep: number;
  visitedSteps: boolean[][];
  onStepChange: (step: number) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentStep, visitedSteps, onStepChange }) => {
  return (
    <Paper sx={{ height: '100vh', position: 'fixed', width: '200px', padding: '10px' }}>
      <Stepper activeStep={currentStep} orientation="vertical" nonLinear>
        {steps.map((label, index) => (
          <Step key={label} completed={visitedSteps[index][0]}>
            <StepLabel>
              <ListItemButton
                selected={currentStep === index}
                onClick={() => visitedSteps[index][0] && onStepChange(index)}  // Enable click only for visited steps
              >
                <ListItemText primary={label} />
              </ListItemButton>
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </Paper>
  );
};

export default Sidebar;
