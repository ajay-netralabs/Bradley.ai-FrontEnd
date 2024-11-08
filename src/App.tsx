import React, { useState } from 'react';
import { Box, Button, Snackbar } from '@mui/material';
import HorizontalStepper from './components/HorizontalStepper';
import StepContent from './pages/StepContent';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';

const steps = [
  { label: 'Step 1: Organizational Profile', subSteps: 2 },
  { label: 'Step 2: Energy Profile', subSteps: 3 },
  { label: 'Step 3: Goals & Priorities', subSteps: 3 },
  { label: 'Step 4: Site Assessment', subSteps: 3 },
  { label: 'Step 5: Financial Info', subSteps: 3 },
  { label: 'Data Verification', subSteps: 1 },
  { label: 'Onboarding', subSteps: 1 },
];
const TOTAL_STEPS = steps.length;

const App: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [currentSubStep, setCurrentSubStep] = useState(0);
  const [visitedSteps, setVisitedSteps] = useState(
    Array.from({ length: TOTAL_STEPS }, (_, i) =>
      Array.from({ length: steps[i].subSteps }, (_, j) => i === 0 && j === 0)
    )
  );
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleStepChange = (step: number) => {
    if (visitedSteps[step][0]) {
      setCurrentStep(step);
      setCurrentSubStep(0);
    }
  };

  const handleSubStepChange = (subStep: number) => {
    if (visitedSteps[currentStep][subStep]) {
      setCurrentSubStep(subStep);
    }
  };

  const handleNext = () => {
    const isLastSubStep = currentSubStep === steps[currentStep].subSteps - 1;
    const isLastStep = currentStep === TOTAL_STEPS - 1;

    if (isLastSubStep) {
      if (!isLastStep) {
        setCurrentStep(currentStep + 1);
        setCurrentSubStep(0);
        markVisited(currentStep + 1, 0);
      } else {
        setOpenSnackbar(true);
      }
    } else {
      setCurrentSubStep(currentSubStep + 1);
      markVisited(currentStep, currentSubStep + 1);
    }
  };

  const handleBack = () => {
    if (currentSubStep > 0) {
      setCurrentSubStep(currentSubStep - 1);
    } else if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      setCurrentSubStep(steps[currentStep - 1].subSteps - 1);
    }
  };

  const markVisited = (step: number, subStep: number) => {
    setVisitedSteps((prev) => {
      const newVisited = [...prev];
      newVisited[step][subStep] = true;
      return newVisited;
    });
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <Navbar />
      <Box sx={{ display: 'flex', flexGrow: 1, mt: '64px', width: '100vw' }}>
        
        <Box sx={{ width: '277px', flexShrink: 0 }}>
          <Sidebar
            currentStep={currentStep}
            steps={steps}
            visitedSteps={visitedSteps}
            onStepChange={handleStepChange}
          />
        </Box>
  
        <Box component="main" sx={{ flexGrow: 1, p: 4, bgcolor: '#f5f5f5', overflowX: 'auto' }}>
          <HorizontalStepper
            currentSubStep={currentSubStep}
            totalSubSteps={steps[currentStep].subSteps}
            visitedSteps={visitedSteps[currentStep]}
            onSubStepChange={handleSubStepChange}
            currentStep={currentStep}
          />
          
          <Box sx={{ mt: 4, p: 15, mb: 10, borderRadius: '8px', bgcolor: 'white', boxShadow: 1, color: 'black' }}>
            <StepContent step={currentStep} subStep={currentSubStep} />
          </Box>
  
          <Box display="flex" justifyContent="space-between" mb={0}>
            <Button
              variant="outlined"
              onClick={handleBack}
              disabled={currentStep === 0 && currentSubStep === 0}
            >
              Back
            </Button>
            <Button
              variant="outlined"
              onClick={() => {}}
            >
              Save and Continue Later
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={handleNext}
            >
              {currentStep === TOTAL_STEPS - 1 && currentSubStep === steps[currentStep].subSteps - 1 ? 'Finish' : 'Next'}
            </Button>
          </Box>
        </Box>
      </Box>
  
      <Snackbar
        open={openSnackbar}
        autoHideDuration={2000}
        onClose={() => setOpenSnackbar(false)}
        message="Done!"
      />
    </Box>
  );
  
  
  
};

export default App;
