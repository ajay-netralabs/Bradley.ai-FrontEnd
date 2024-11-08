import React from 'react';
import { Stepper, Step, StepLabel, ListItemButton, ListItemText, Paper } from '@mui/material';

const steps = ['Step 1: Organizational Profile',
               'Step 2: Energy Profile',
               'Step 3: Goals & Priorities',
               'Step 4: Site Assessment',
               'Step 5: Financial Info',
               'Data Verification',
               'Onboarding'];

interface SidebarProps {
  currentStep: number;
  visitedSteps: boolean[][]; 
  onStepChange: (step: number) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentStep, visitedSteps, onStepChange }) => {
  return (
    <Paper sx={{ width: '277px', position: 'fixed', height: '100vh', top: 0, mt: '50px', padding: '10px', paddingTop: '40px' }}>
      <Stepper 
        activeStep={currentStep} 
        orientation="vertical" 
        nonLinear 
        sx={{ 
          padding: 0, 
          '.MuiStep-root': {
            padding: 0,
          },
          '.MuiStepLabel-root': {
            fontSize: '0.875rem',
            padding: 0,
          },
        }}
      >
        {steps.map((label, index) => (
          <Step key={label} completed={visitedSteps[index][0]}>
            <StepLabel>
              <ListItemButton
                selected={currentStep === index}
                onClick={() => visitedSteps[index][0] && onStepChange(index)}
                sx={{
                  padding: '3px 0',
                }}
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
