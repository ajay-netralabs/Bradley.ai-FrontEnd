import React from 'react';
import { Box, Button, LinearProgress } from '@mui/material';
import HorizontalStepper from '../components/HorizontalStepper';
import StepContent from './StepContent';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import Footer from '../components/Footer';
import { useAppContext } from '../Context API/AppContext';
import { steps, TOTAL_STEPS } from '../components/steps';
import { useNavigate } from 'react-router-dom';

const ClientApp: React.FC = () => {
  const {
    currentStep, setCurrentStep,
    currentSubStep, setCurrentSubStep,
    currentFurtherSubStep, setCurrentFurtherSubStep,
    visitedSteps, setVisitedSteps,
    completedSubSteps, setCompletedSubSteps,
    setUser,
} = useAppContext();

  const navigate = useNavigate();

  const handleStepChange = (step: number) => {
    if (visitedSteps[step][0]) {
      setCurrentStep(step);
      setCurrentSubStep(0);
      setCurrentFurtherSubStep(0);
    }
  };

  const handleSubStepChange = (subStep: number) => {
    if (visitedSteps[currentStep][subStep]) {
      setCurrentSubStep(subStep);
      setCurrentFurtherSubStep(0);
    }
  };

  const handleNext = () => {
    const isLastFurtherSubStep = currentFurtherSubStep === steps[currentStep].furtherSubSteps[currentSubStep] - 1;
    const isLastSubStep = currentSubStep === steps[currentStep].subSteps - 1;
    const isLastStep = currentStep === TOTAL_STEPS - 1;

    
  
    if (currentStep === 4 && currentSubStep === 2 && currentFurtherSubStep === 2) {
      setCurrentStep(5);
      setCurrentSubStep(0);
      setCurrentFurtherSubStep(0);
      markVisited(5, 0);
      return;
    }
  
    if (isLastFurtherSubStep) {
      if (isLastSubStep) {
        if (isLastStep) {
          markCompleted(currentStep, currentSubStep);
        } else {
          setCurrentStep(currentStep + 1);
          setCurrentSubStep(0);
          setCurrentFurtherSubStep(0);
          markVisited(currentStep + 1, 0);
        }
      } else {
        setCurrentSubStep(currentSubStep + 1);
        setCurrentFurtherSubStep(0);
        markVisited(currentStep, currentSubStep + 1);
      }
      markCompleted(currentStep, currentSubStep);
    } else {
      setCurrentFurtherSubStep(currentFurtherSubStep + 1);
    }
  };
  

  const handleBack = () => {
    if (currentStep === 4 && currentSubStep === 2 && currentFurtherSubStep === 0) {
      setCurrentStep(4);
      setCurrentSubStep(0);
      setCurrentFurtherSubStep(1);
    } else {
      if (currentFurtherSubStep > 0) {
        setCurrentFurtherSubStep(currentFurtherSubStep - 1);
      } else if (currentSubStep > 0) {
        setCurrentSubStep(currentSubStep - 1);
        setCurrentFurtherSubStep(steps[currentStep].furtherSubSteps[currentSubStep - 1] - 1);
      } else if (currentStep > 0) {
        setCurrentStep(currentStep - 1);
        setCurrentSubStep(steps[currentStep - 1].subSteps - 1);
        setCurrentFurtherSubStep(steps[currentStep - 1].furtherSubSteps[steps[currentStep - 1].subSteps - 1] - 1);
      }
    }
  };
  

  const markVisited = (step: number, subStep: number) => {
    setVisitedSteps((prev) => {
      const newVisited = [...prev];
      newVisited[step][subStep] = true;
      return newVisited;
    });
  };

  const markCompleted = (step: number, subStep: number) => {
    setCompletedSubSteps((prev) => {
      const newCompleted = [...prev];
      newCompleted[step][subStep] = true;
      return newCompleted;
    });
  };

  const calculateProgress = () => {
    const totalFurtherSubSteps = steps[currentStep].furtherSubSteps[currentSubStep];
    return ((currentFurtherSubStep + 1) / totalFurtherSubSteps) * 100;
  };

  const handleSaveAndContinueLater = () => {
    const progress = {
      currentStep,
      currentSubStep,
      currentFurtherSubStep,
    };
    localStorage.setItem('userProgress', JSON.stringify(progress));

    setUser(null);

    navigate('/login');
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'row', height: '100vh', zIndex: 500 }}>
      <Navbar />
      <Box sx={{ display: 'flex', flexGrow: 1, mt: '64px', width: '100vw' }}>
        <Box sx={{ width: '173px', flexShrink: 0 }}>
          <Sidebar
            currentStep={currentStep}
            steps={steps}
            visitedSteps={visitedSteps}
            onStepChange={handleStepChange}
          />
        </Box>

        <Box component="main" sx={{ flexGrow: 1, p: 4, bgcolor: '#f5f5f5', overflowX: 'auto', scrollbarWidth: 'none' }}>
          <Box sx={{ mt: 1, pl: 2, pb: 1, pt: 3, mb: 7, ml: 3, borderRadius: '8px', bgcolor: 'white', boxShadow: 1, color: 'black', display: 'flex' }}>
            <Box sx={{ flexGrow: 1 }}>
              <HorizontalStepper
                currentSubStep={currentSubStep}
                totalSubSteps={steps[currentStep].subSteps}
                visitedSteps={visitedSteps[currentStep]}
                completedSubSteps={completedSubSteps[currentStep]}
                onSubStepChange={handleSubStepChange}
                currentStep={currentStep}
              />
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'stretch', width: '100%' }}>
  <LinearProgress
    variant="determinate"
    value={calculateProgress()}
    sx={{
      width: 'calc(100% + 16px)',
      height: '3.5px',
      margin: '0px -16px',
      mt: '30px',
      mb: '10px',
      backgroundColor: '#e0e0e0',
      '& .MuiLinearProgress-bar': {
        backgroundColor: '#036cc1',
      },
    }}
  />
</Box>


              <StepContent step={currentStep} subStep={currentSubStep} furtherSubStep={currentFurtherSubStep} />
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3, mr: 5.2, ml: 1, mb: 1 }}>
  {!(currentStep === TOTAL_STEPS - 1 && currentSubStep === steps[currentStep].subSteps - 1 && currentFurtherSubStep === steps[currentStep].furtherSubSteps[currentSubStep] - 1) && (
    <Button
      sx={{
        fontFamily: 'Nunito Sans, sans-serif',
        fontSize: '0.75rem',
        padding: '2px 10px',
        minWidth: '10px',
        maxHeight: '25px',
        textTransform: 'none','&:focus': {
                                  outline: 'none',
                                },
      }}
      variant="outlined"
      onClick={handleBack}
      disabled={currentStep === 0 && currentSubStep === 0 && currentFurtherSubStep === 0}
    >
      Back
    </Button>
  )}

  <Box sx={{ display: 'flex', gap: 1, ml: 'auto' }}>
    {currentStep === 4 && currentSubStep === 0 && currentFurtherSubStep === 1 ? (
      <>
        <Button
          sx={{
            fontFamily: 'Nunito Sans, sans-serif',
            fontSize: '0.75rem',
            padding: '2px 10px',
            minWidth: '10px',
            maxHeight: '25px',
            textTransform: 'none','&:focus': {
                                  outline: 'none',
                                },
          }}
          variant="outlined"
          onClick={handleSaveAndContinueLater}
        >
          Save and Continue Later
        </Button>
        <Button
          sx={{
            fontFamily: 'Nunito Sans, sans-serif',
            fontSize: '0.75rem',
            padding: '2px 10px',
            minWidth: '10px',
            maxHeight: '25px',
            textTransform: 'none','&:focus': {
                                  outline: 'none',
                                },
          }}
          variant="contained"
          color="primary"
          onClick={() => {
            setCurrentStep(4);
            setCurrentSubStep(1);
            setCurrentFurtherSubStep(0);
            markCompleted(4, 0);
          }}
        >
          Own
        </Button>
        <Button
          sx={{
            fontFamily: 'Nunito Sans, sans-serif',
            fontSize: '0.75rem',
            padding: '2px 10px',
            minWidth: '10px',
            maxHeight: '25px',
            textTransform: 'none',
            boxShadow: 'none','&:focus': {
                                  outline: 'none',
                                },
          }}
          variant="contained"
          color="primary"
          onClick={() => {
            setCurrentStep(4);
            setCurrentSubStep(2);
            setCurrentFurtherSubStep(0);
            markCompleted(4, 0);
          }}
        >
          Third Party
        </Button>
      </>
    ) : (
      <>
        {!(currentStep === TOTAL_STEPS - 1 && currentSubStep === steps[currentStep].subSteps - 1 && currentFurtherSubStep === steps[currentStep].furtherSubSteps[currentSubStep] - 1) && (
          <Button
            sx={{
              fontFamily: 'Nunito Sans, sans-serif',
              fontSize: '0.75rem',
              padding: '2px 10px',
              minWidth: '10px',
              maxHeight: '25px',
              textTransform: 'none','&:focus': {
                                  outline: 'none',
                                },
            }}
            variant="outlined"
            onClick={handleSaveAndContinueLater}
          >
            Save and Continue Later
          </Button>
        )}
        <Button
          sx={{
            fontFamily: 'Nunito Sans, sans-serif',
            fontSize: '0.75rem',
            padding: '2px 10px',
            minWidth: '10px',
            maxHeight: '25px',
            textTransform: 'none',
            boxShadow: 'none',
            '&:focus': {
                                  outline: 'none',
                                },
          }}
          variant="contained"
          color="primary"
          onClick={() => {
            if (
              currentStep === TOTAL_STEPS - 1 &&
              currentSubStep === steps[currentStep].subSteps - 1 &&
              currentFurtherSubStep === steps[currentStep].furtherSubSteps[currentSubStep] - 1
            ) {
              markCompleted(currentStep, currentSubStep);
            } else {
              handleNext();
            }
          }}
        >
          {currentStep === TOTAL_STEPS - 1 &&
          currentSubStep === steps[currentStep].subSteps - 1 &&
          currentFurtherSubStep === steps[currentStep].furtherSubSteps[currentSubStep] - 2
            ? 'Generate Report'
            : currentStep === TOTAL_STEPS - 1 &&
              currentSubStep === steps[currentStep].subSteps - 1 &&
              currentFurtherSubStep === steps[currentStep].furtherSubSteps[currentSubStep] - 1
            ? 'Download Report'
            : currentStep === 1 && currentSubStep === 2 && currentFurtherSubStep === 0
            ? 'Authorize & Send Request'
            : currentStep === 5 && currentSubStep === 0 && currentFurtherSubStep === 0
            ? 'Submit'
            : 'Next'}
        </Button>
      </>
    )}
  </Box>
</Box>


            </Box>
          </Box>
        </Box>
      </Box>
      <Footer />
    </Box>
  );
};

export default ClientApp;
