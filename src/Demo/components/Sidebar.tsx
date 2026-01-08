import React, { useMemo } from 'react';
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

import { GoOrganization } from 'react-icons/go';
import { MdOutlineWarehouse, MdDashboard, MdOutlineFactCheck } from 'react-icons/md';
import { BsFileEarmarkArrowUp, BsFileEarmarkBarGraph } from 'react-icons/bs';
import { GrDocumentVerified } from 'react-icons/gr';

interface SidebarProps {
  currentStep: number;
  currentSubStep: number;
  currentFurtherSubStep: number;
  visitedSteps: boolean[][];
  onStepChange: (step: number, subStep: number, furtherSubStep: number) => void;
  hasElectricFiles: boolean;
}

const iconMap: { [key: string]: React.ElementType } = {
    'Organization Details': GoOrganization,
    'Facility Address': MdOutlineWarehouse,
    'Electric Bill Upload': BsFileEarmarkArrowUp,
    "Don't Have Interval Data": BsFileEarmarkBarGraph,
    'Letter Of Authorization': GrDocumentVerified,
    'LOA - Status': MdOutlineFactCheck,
    'Natural Gas Bill Upload': BsFileEarmarkArrowUp,
    'Emissions Dashboard': MdDashboard,
};

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

const Sidebar: React.FC<SidebarProps> = ({
  currentStep,
  currentSubStep,
  currentFurtherSubStep,
  visitedSteps,
  onStepChange,
  hasElectricFiles,
}) => {

  const { flatSteps, activeFlatIndex } = useMemo(() => {
    const newFlatSteps: any[] = [];
    let cumulativeIndex = 0;
    let newActiveFlatIndex = -1;

    steps.forEach((step, stepIndex) => {
      step.subSteps.forEach((subStep, subStepIndex) => {
        subStep.furtherSubSteps.forEach((fStep, fIndex) => {
          if (stepIndex === currentStep && subStepIndex === currentSubStep && fIndex === currentFurtherSubStep) {
            newActiveFlatIndex = cumulativeIndex;
          }
          newFlatSteps.push({
            label: fStep.label,
            icon: iconMap[fStep.label] || GoOrganization,
            stepIndex,
            subStepIndex,
            furtherSubStepIndex: fIndex,
            flatIndex: cumulativeIndex,
          });
          cumulativeIndex++;
        });
      });
    });
    return { flatSteps: newFlatSteps, activeFlatIndex: newActiveFlatIndex };
  }, [currentStep, currentSubStep, currentFurtherSubStep]);

  const handleStepClick = (stepData: any) => {
    onStepChange(stepData.stepIndex, stepData.subStepIndex, stepData.furtherSubStepIndex);
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
        backgroundColor: active || completed || visited ? (isCurrent ? '#036ca1' : '#0584b7') : '#808080',
        color: '#fff',
      }}
    >
      <IconComponent fontSize="medium" style={{ color: '#fff' }} />
    </div>
  );

  return (
    <Paper sx={{ width: '210px', position: 'fixed', height: '100vh', top: 0, mt: '40px', padding: '10px', paddingTop: '40px', boxShadow: 1, overflowY: 'auto', scrollbarWidth: 'none' }}>
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Nunito+Sans:ital,opsz,wght@0,6..12,200..1000;1,6..12,200..1000&display=swap');
      </style>
      <Stepper
        activeStep={activeFlatIndex}
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
        {flatSteps.map((stepData) => {
          const { label, icon: IconComponent, stepIndex, subStepIndex, flatIndex } = stepData;

          const isCurrent = activeFlatIndex === flatIndex;
          const isCompleted = flatIndex < activeFlatIndex;
          const isVisited = visitedSteps[stepIndex]?.[subStepIndex] === true;
          const isDisabled = hasElectricFiles && (label === "Don't Have Interval Data" || label === "Letter Of Authorization" || label === "LOA - Status");
          const isClickable = !isDisabled && (isVisited || isCompleted);

          const textColor = isDisabled ? '#bdbdbd' : (isCurrent ? '#036ca1' : (isVisited || isCompleted ? '#0584b7' : 'gray'));

          return (
            <Step key={label + flatIndex} completed={isCompleted} active={isCurrent}>
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
                {isClickable ? (
                  <Tooltip title={isCurrent ? "You are here" : "Navigate to step"} placement="right" arrow>
                    <ListItemButton
                      onClick={() => handleStepClick(stepData)}
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
                            fontWeight: isCurrent ? 'bold' : 'normal',
                            color: textColor
                          }}>
                            {isCurrent ? `${label}*` : label}
                          </Typography>
                        }
                      />
                    </ListItemButton>
                  </Tooltip>
                ) : (
                  <Tooltip title={isDisabled ? "You have already uploaded an electric bill" : ""} placement="right" arrow>
                    <ListItemButton
                      sx={{
                        padding: '3px 4px',
                        fontFamily: 'Nunito Sans, sans-serif',
                        color: 'gray',
                        '&:hover': {
                          borderRadius: '8px',
                        },
                        cursor: isDisabled ? 'not-allowed' : 'default',
                      }}
                    >
                      <ListItemText
                        primary={
                          <Typography sx={{ fontSize: '0.75rem', fontFamily: 'Nunito Sans, sans-serif', color: textColor }}>
                            {label}
                          </Typography>
                        }
                      />
                    </ListItemButton>
                  </Tooltip>
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