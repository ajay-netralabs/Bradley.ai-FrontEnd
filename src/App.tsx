import React, { useState } from 'react';
import { AppBar, Box, Button, Toolbar, Typography, Snackbar } from '@mui/material';
import HorizontalStepper from './components/HorizontalStepper';
import StepContent from './pages/StepContent';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';

const steps = [
  { label: 'Organizational Profile', subSteps: 2 },
  { label: 'Energy Profile', subSteps: 3 },
  { label: 'Goals & Priorities', subSteps: 3 },
  { label: 'Site Assessment', subSteps: 3 },
  { label: 'Financial Info', subSteps: 3 },
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
      {/* Top Navbar */}
      <Navbar/>
      {/* <AppBar position="fixed" sx={{ bgcolor: 'white', color: 'black', zIndex: 1000 }}> 
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Bradley.ai
          </Typography>
          <Button color="inherit">Logout</Button>
        </Toolbar>
      </AppBar> */}

      {/* Content Section with Sidebar and Main Content */}
      <Box sx={{ display: 'flex', flexGrow: 1, mt: '64px', overflowY: 'auto' }}> {/* Adjust margin-top for navbar height */}
        {/* Sidebar */}
        <Sidebar
          currentStep={currentStep}
          steps={steps}
          visitedSteps={visitedSteps}
          onStepChange={handleStepChange}
          sx={{ width: '240px' }} // Adjust width as needed
        />

        {/* Main Content Area */}
        <Box component="main" sx={{ flexGrow: 1, p: 4, bgcolor: '#f5f5f5', overflowY: 'auto' }}>
          {/* Horizontal Stepper */}
          <HorizontalStepper
            currentSubStep={currentSubStep}
            totalSubSteps={steps[currentStep].subSteps}
            visitedSteps={visitedSteps[currentStep]}
            onSubStepChange={handleSubStepChange}
          />
          
          {/* Step Content */}
          <Box sx={{ mt: 4, p: 4, borderRadius: '8px', bgcolor: 'white', boxShadow: 1 }}>
            <StepContent step={currentStep} subStep={currentSubStep} />
          </Box>

          {/* Navigation Buttons */}
          <Box display="flex" justifyContent="space-between" mt={4}>
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
