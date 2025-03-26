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
import { GoOrganization } from 'react-icons/go';
import { MdOutlineEnergySavingsLeaf } from 'react-icons/md';
import { LuGoal } from 'react-icons/lu';
import { MdOutlineWarehouse } from 'react-icons/md';
import { MdOutlineAccountBalanceWallet } from 'react-icons/md';
import { GrDocumentVerified } from 'react-icons/gr';
import { MdDoneOutline } from 'react-icons/md';

const steps = [
  { label: 'Organizational Profile', icon: GoOrganization },
  { label: 'Energy Profile', icon: MdOutlineEnergySavingsLeaf },
  { label: 'Goals & Priorities', icon: LuGoal },
  { label: 'Site Assessment', icon: MdOutlineWarehouse },
  { label: 'Financial Info', icon: MdOutlineAccountBalanceWallet },
  { label: 'Data Verification', icon: GrDocumentVerified },
  { label: 'Onboarding', icon: MdDoneOutline },
];

interface SidebarProps {
  currentStep: number;
  steps: {
    label: string;
    subSteps: number;
    furtherSubSteps: number[];
  }[];
  visitedSteps: boolean[][];
  onStepChange: (step: number) => void;
}

const CustomStepConnector = styled(StepConnector)(() => ({
  [`& .MuiStepConnector-line`]: {
    borderColor: 'gray',
    borderWidth: 1.5,
  },
  [`&.Mui-completed .MuiStepConnector-line`]: {
    borderColor: '#036ca1',
    borderWidth: 1.5,
  },
  [`&.Mui-active .MuiStepConnector-line`]: {
    borderColor: '#036ca1',
    borderWidth: 1.5,
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

  const CustomStepIcon = ({ icon: IconComponent, active, completed, visited }: any) => (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 24,
        height: 24,
        borderRadius: '50%',
        backgroundColor: completed || active || visited ? '#036ca1' : '#808080',
        color: '#fff',
      }}
    >
      <IconComponent fontSize="small" style={{ color: '#fff' }} />
    </div>
  );

  return (
    <Paper sx={{ width: '173px', position: 'fixed', height: '100vh', top: 0, mt: '50px', padding: '10px', paddingTop: '40px', boxShadow: 1 }}>
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Nunito+Sans:ital,opsz,wght@0,6..12,200..1000;1,6..12,200..1000&display=swap');
      </style>
      <Stepper
        activeStep={currentStep}
        orientation="vertical"
        nonLinear
        connector={<CustomStepConnector />}
        sx={{
          padding: 0,
          '.MuiStep-root': {
            padding: 0,
          },
          '.MuiStepLabel-root': {
            padding: 0,
          },
        }}
      >
        {steps.map((step, index) => {
          const IconComponent = step.icon;
          const isVisited = visitedSteps[index].some(visited => visited);
          return (
            <Step key={step.label} completed={completedSteps[index]}>
              <StepLabel
                StepIconComponent={(props) => (
                  <CustomStepIcon icon={IconComponent} active={props.active} completed={props.completed} visited={isVisited} />
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
                        color: '#036ca1',
                        '&:hover': {
                          borderRadius: '8px',
                        },
                      }}
                    >
                      <ListItemText
                        primary={
                          <Typography sx={{ fontSize: '0.700rem', fontFamily: 'Nunito Sans, sans-serif', fontWeight: index === currentStep ? 'bold' : 'normal' }}>
                            {step.label}
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
                        <Typography sx={{ fontSize: '0.700rem', fontFamily: 'Nunito Sans, sans-serif' }}>
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