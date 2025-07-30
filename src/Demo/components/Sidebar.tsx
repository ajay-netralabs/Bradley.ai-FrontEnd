import React, { useState, useEffect } from 'react';
import {
  Stepper,
  Step,
  StepLabel,
  ListItemButton,
  ListItemText,
  Paper,
  Typography,
  StepConnector,
  styled,
  Tooltip,
} from '@mui/material';
import { steps } from './steps';

interface SidebarProps {
  currentStep: number;
  visitedSteps: boolean[][];
  onStepChange: (step: number) => void;
}

const CustomStepConnector = styled(StepConnector)(() => ({
  marginLeft: '22px',
  height: 25,
  [`& .MuiStepConnector-line`]: {
    borderColor: 'gray',
    borderWidth: 2,
    height: 30,
  },
  [`&.Mui-completed .MuiStepConnector-line`]: {
    borderColor: '#036ca1',
    borderWidth: 2,
    height: 30,
  },
  [`&.Mui-active .MuiStepConnector-line`]: {
    borderColor: '#036ca1',
    borderWidth: 2,
    height: 30,
  },
}));

const Sidebar: React.FC<SidebarProps> = ({ currentStep, visitedSteps, onStepChange }) => {
  const [completedSteps, setCompletedSteps] = useState<boolean[]>(new Array(steps.length).fill(false));

  useEffect(() => {
    if (currentStep > 0 && !completedSteps[currentStep - 1]) {
      markStepAsCompleted(currentStep - 1);
    }
  }, [currentStep, completedSteps]);

  const handleStepClick = (index: number) => {
    if (visitedSteps[index].some(visited => visited)) {
      onStepChange(index);
    }
  };

  const markStepAsCompleted = (step: number) => {
    setCompletedSteps((prev) => {
      const newCompleted = [...prev];
      newCompleted[step] = true;
      return newCompleted;
    });
  };

  const CustomStepIcon = ({ icon: IconComponent, active, completed, visited, isCurrent }: any) => (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 30,
        height: 30,
        borderRadius: '50%',
        backgroundColor: completed || active || visited ? (isCurrent ? '#036ca1' : '#0584b7') : '#808080',
        color: '#fff',
      }}
    >
      <IconComponent fontSize="small" style={{ color: '#fff' }} />
    </div>
  );

  return (
    <Paper sx={{ width: '210px', position: 'fixed', height: '100vh', top: 0, mt: '40px', padding: '10px', paddingTop: '40px', boxShadow: 1 }}>
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Nunito+Sans:ital,opsz,wght@0,6..12,200..1000;1,6..12,200..1000&display=swap');
      </style>
      <Stepper
        activeStep={currentStep}
        orientation="vertical"
        nonLinear
        connector={<CustomStepConnector />}
        sx={{
          padding: 0.5,
          '.MuiStep-root': {
            padding: 0.5,
          },
          '.MuiStepLabel-root': {
            padding: 0.5,
            paddingBottom: 0,
          },
        }}
      >
        {steps.map((step, index) => {
          const IconComponent = step.icon;
          const isVisited = visitedSteps[index].some(visited => visited);
          const isCurrent = currentStep === index;
          return (
            <Step key={step.label} completed={completedSteps[index]}>
              <StepLabel
                StepIconComponent={(props) => (
                  <CustomStepIcon 
                    icon={IconComponent} 
                    active={props.active} 
                    completed={props.completed} 
                    visited={isVisited} 
                    isCurrent={isCurrent}
                  />
                )}
              >
                {isVisited ? (
                  <Tooltip title={index === currentStep ? "You are here" : "Navigate to step"} placement="right" arrow>
                    <ListItemButton
                      onClick={() => handleStepClick(index)}
                      selected={currentStep === index}
                      sx={{
                        padding: '3px 4px',
                        fontFamily: 'Nunito Sans, sans-serif',
                        '&.Mui-selected': {
                          backgroundColor: 'transparent',
                        },
                        color: isCurrent ? '#036ca1' : '#0584b7',
                        '&:hover': {
                          borderRadius: '8px',
                        },
                      }}
                    >
                      <ListItemText
                        primary={
                          <Typography sx={{ 
                            fontSize: '0.75rem', 
                            fontFamily: 'Nunito Sans, sans-serif', 
                            fontWeight: index === currentStep ? 'bold' : 'normal',
                            color: isCurrent ? '#036ca1' : '#0584b7'
                          }}>
                            {index === currentStep ? `${step.label}*` : step.label}
                          </Typography>
                        }
                      />
                    </ListItemButton>
                  </Tooltip>
                ) : (
                  <ListItemButton
                    sx={{
                      padding: '3px 4px',
                      fontFamily: 'Nunito Sans, sans-serif',
                      color: 'gray',
                      '&:hover': {
                        borderRadius: '8px',
                      },
                    }}
                  >
                    <ListItemText
                      primary={
                        <Typography sx={{ fontSize: '0.75rem', fontFamily: 'Nunito Sans, sans-serif' }}>
                          {step.label}
                        </Typography>
                      }
                    />
                  </ListItemButton>
                )}
              </StepLabel>
            </Step>
          );
        })}
      </Stepper>
    </Paper>
  );
};

export default Sidebar;
