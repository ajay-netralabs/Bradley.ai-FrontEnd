import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import HorizontalStepper from './components/HorizontalStepper';
import { Box, Button, Snackbar } from '@mui/material';
import StepContent from './pages/StepContent';

const TOTAL_STEPS = 2;
const TOTAL_SUBSTEPS = 2;

const App: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [currentSubStep, setCurrentSubStep] = useState(0);
  const [visitedSteps, setVisitedSteps] = useState([[true, false], [false, false]]);
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
    if (currentSubStep < TOTAL_SUBSTEPS - 1) {
      setCurrentSubStep(currentSubStep + 1);
      markVisited(currentStep, currentSubStep + 1);
    } else if (currentStep < TOTAL_STEPS - 1) {
      setCurrentStep(currentStep + 1);
      setCurrentSubStep(0);
      markVisited(currentStep + 1, 0);
    } else {
      setOpenSnackbar(true);
    }
  };

  const handleBack = () => {
    if (currentSubStep > 0) {
      setCurrentSubStep(currentSubStep - 1);
    } else if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      setCurrentSubStep(TOTAL_SUBSTEPS - 1);
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
    <Box sx={{ display: 'flex' }}>
      <Sidebar currentStep={currentStep} visitedSteps={visitedSteps} onStepChange={handleStepChange} />
      <Box component="main" sx={{ flexGrow: 1, p: 3, ml: '200px' }}>
        <HorizontalStepper
          currentSubStep={currentSubStep}
          visitedSteps={visitedSteps[currentStep]}
          onSubStepChange={handleSubStepChange}
        />
        <Box sx={{ mt: 2 }}>
          <StepContent step={currentStep} subStep={currentSubStep} />
        </Box>
        <Box display="flex" justifyContent="space-between" mt={4}>
          <Button
            variant="outlined"
            onClick={handleBack}
            disabled={currentStep === 0 && currentSubStep === 0}
          >
            Back
          </Button>
          <Button
            variant="contained"
            onClick={handleNext}
          >
            {currentStep === TOTAL_STEPS - 1 && currentSubStep === TOTAL_SUBSTEPS - 1 ? 'Finish' : 'Next'}
          </Button>
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
