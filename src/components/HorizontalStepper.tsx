import React from 'react';
import { Stepper, Step, StepLabel, StepConnector, styled } from '@mui/material';

interface HorizontalStepperProps {
  currentSubStep: number;
  totalSubSteps: number;
  visitedSteps: boolean[];
  completedSubSteps: boolean[];
  onSubStepChange: (subStep: number) => void;
  currentStep: number;
}

const CustomStepConnector = styled(StepConnector)(() => ({
  [`& .MuiStepConnector-line`]: {
    borderColor: 'gray',
    borderWidth: 2.5,
  },
  [`&.Mui-active .MuiStepConnector-line, &.Mui-completed .MuiStepConnector-line`]: {
    borderColor: '#036ca1',
    borderWidth: 2.5,
  },
}));

const HorizontalStepper: React.FC<HorizontalStepperProps> = ({
  currentSubStep,
  totalSubSteps,
  visitedSteps,
  completedSubSteps,
  onSubStepChange,
  currentStep,
}) => {
  
  const subSteps = Array.from({ length: totalSubSteps }, (_, index) => `Step ${currentStep + 1}.${index + 1}`);

  return (
    <Stepper
      activeStep={currentSubStep}
      alternativeLabel
      connector={<CustomStepConnector />}
    >
      {subSteps.map((label, index) => (
        <Step
          key={label}
          completed={completedSubSteps[index]}
          active={index <= currentSubStep}
        >
          <StepLabel
            onClick={() => visitedSteps[index] && onSubStepChange(index)}
            sx={{
              cursor: visitedSteps[index] ? 'pointer' : 'default',
              color: index <= currentSubStep ? '#036ca1' : 'gray',
              '& .MuiStepLabel-label': {
                fontFamily: 'Nunito Sans, sans-serif',
                fontSize: '0.800rem'
              },
            }}
          >
            <span className="nunito-sans">{label}</span>
          </StepLabel>
        </Step>
      ))}
    </Stepper>
  );
};

export default HorizontalStepper;
