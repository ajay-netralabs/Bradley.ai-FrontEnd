import React from 'react';
import { Box, Button, LinearProgress, Tooltip } from '@mui/material';
import { useNavigate } from 'react-router-dom';

// App and Stepper contexts
import { AppProvider, useAppContext } from '../Context/AppContext';
import { steps } from './components/steps';

// UI Components
import HorizontalStepper from '../components/HorizontalStepper';
import StepContent from './StepContent';
import Navbar from '../components/Navbar';
import Sidebar from './components/Sidebar';
import Footer from '../components/Footer';
import ChatBot from '../components/ChatBot';


import { OrganizationDetailsProvider } from '../Context/Organizational Profile/SubStep2/Organization Details Context';
import { FacilityAddressProvider } from '../Context/Organizational Profile/SubStep2/Facility Address Context';
import { ElectricBillUploadProvider, useElectricBillUploadProvider } from '../Context/Energy Profile/SubStep2/Electric Bill Upload Context';
import { NaturalGasBillUploadProvider } from '../Context/Energy Profile/SubStep2/Natural Gas Bill Upload Context';
import { LOAProvider } from '../Context/Energy Profile/SubStep2/Letter Of Authorization Context';
import { LOAStatusProvider } from '../Context/Energy Profile/SubStep2/LOA - Status Context';
import { ThermalEnergyNeedsIProvider } from '../Context/Energy Profile/SubStep2/Thermal Energy Needs - I Context';
import { ThermalEnergyNeedsIIProvider } from '../Context/Energy Profile/SubStep2/Thermal Energy Needs - II Context';
import { ThermalEnergyNeedsIIIProvider } from '../Context/Energy Profile/SubStep2/Thermal Energy Needs - III Context';
import { ThermalEnergyNeedsIVProvider } from '../Context/Energy Profile/SubStep2/Thermal Energy Needs - IV Context';
import { BoilerCogenerationProvider } from '../Context/Energy Profile/SubStep2/Existing Boiler Cogeneration Context';

// The main content of the app, which can now use all the contexts
const AppContent: React.FC = () => {
  const {
    currentStep, setCurrentStep,
    currentSubStep, setCurrentSubStep,
    currentFurtherSubStep, setCurrentFurtherSubStep,
    visitedSteps, setVisitedSteps,
    completedSubSteps, setCompletedSubSteps,
    logout,
  } = useAppContext();

  const { electricBillUploadState } = useElectricBillUploadProvider();

  const navigate = useNavigate();

  const markVisited = (step: number, subStep: number) => {
    setVisitedSteps((prev) => {
      const newVisited = [...prev];
      if (!newVisited[step]) newVisited[step] = [];
      newVisited[step][subStep] = true;
      return newVisited;
    });
  };

  const markCompleted = (step: number, subStep: number) => {
    setCompletedSubSteps((prev) => {
      const newCompleted = [...prev];
      if (!newCompleted[step]) newCompleted[step] = [];
      newCompleted[step][subStep] = true;
      return newCompleted;
    });
  };

  const handleStepChange = (step: number) => {
    if (visitedSteps[step]?.[0]) {
      setCurrentStep(step);
      setCurrentSubStep(0);
      setCurrentFurtherSubStep(0);
    }
  };

  const handleSubStepChange = (subStep: number) => {
    if (visitedSteps[currentStep]?.[subStep]) {
      setCurrentSubStep(subStep);
      setCurrentFurtherSubStep(0);
    }
  };

  // const { electricBillUploadState } = useElectricBillUploadProvider();

  const handleNext = () => {
    const isLastFurtherSubStep = currentFurtherSubStep === steps[currentStep].furtherSubSteps[currentSubStep] - 1;
    const isLastSubStep = currentSubStep === steps[currentStep].subSteps - 1;
    const isLastStep = currentStep === steps.length - 1;

    if (currentStep === 0 && currentSubStep === 0 && currentFurtherSubStep === 2) {
        markCompleted(0, 0);
        const hasFiles = electricBillUploadState.fileMetadata.length > 0;

        if (hasFiles) {
            setCurrentStep(0);
            setCurrentSubStep(0);
            setCurrentFurtherSubStep(6);
            markVisited(0, 6);
        } else {
            setCurrentFurtherSubStep(3);
            markVisited(0, 3);
        }
        return; 
    }

    if (isLastFurtherSubStep) {
      markCompleted(currentStep, currentSubStep);
      if (isLastSubStep) {
        if (!isLastStep) {
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
    } else {
      setCurrentFurtherSubStep(currentFurtherSubStep + 1);
    }
  };

  const handleBack = () => {

    if (currentStep === 0 && currentSubStep === 0 && currentFurtherSubStep === 6) {
        const hasFiles = electricBillUploadState.fileMetadata.length > 0;

        if (hasFiles) {
            setCurrentStep(0);
            setCurrentSubStep(0);
            setCurrentFurtherSubStep(2);
            return;
        }
    }
    // Standard back navigation logic
    if (currentFurtherSubStep > 0) {
      setCurrentFurtherSubStep(currentFurtherSubStep - 1);
    } else if (currentSubStep > 0) {
      const prevSubStep = currentSubStep - 1;
      setCurrentSubStep(prevSubStep);
      setCurrentFurtherSubStep(steps[currentStep].furtherSubSteps[prevSubStep] - 1);
    } else if (currentStep > 0) {
      const prevStep = currentStep - 1;
      const lastSubStepOfPrevStep = steps[prevStep].subSteps - 1;
      setCurrentStep(prevStep);
      setCurrentSubStep(lastSubStepOfPrevStep);
      setCurrentFurtherSubStep(steps[prevStep].furtherSubSteps[lastSubStepOfPrevStep] - 1);
    }
  };

  const calculateProgress = () => {
    const totalFurtherSubSteps = steps[currentStep]?.furtherSubSteps?.[currentSubStep] || 1;
    return ((currentFurtherSubStep + 1) / totalFurtherSubSteps) * 100;
  };

  const handleSaveAndContinueLater = () => {
    logout();
    navigate('/login');
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'row', height: '100vh', zIndex: 500 }}>
      <Navbar />
      <Box sx={{ display: 'flex', flexGrow: 1, mt: '64px', width: '100vw' }}>
        <Box sx={{ width: '210px', flexShrink: 0 }}>
          <Sidebar currentStep={currentStep} visitedSteps={visitedSteps} onStepChange={handleStepChange} />
        </Box>
        <Box component="main" sx={{ flexGrow: 1, p: 4, bgcolor: '#f5f5f5', overflowX: 'auto', scrollbarWidth: 'none' }}>
          <Box sx={{ mt: 1, pl: 2, pb: 1, pt: 3, mb: 7, ml: 8, mr: 5, borderRadius: '8px', bgcolor: 'white', boxShadow: 1, color: 'black', display: 'flex' }}>
            <Box sx={{ flexGrow: 1 }}>
              <HorizontalStepper currentSubStep={currentSubStep} totalSubSteps={steps[currentStep]?.subSteps} visitedSteps={visitedSteps[currentStep]} completedSubSteps={completedSubSteps[currentStep]} onSubStepChange={handleSubStepChange} currentStep={currentStep} />
              <LinearProgress variant="determinate" value={calculateProgress()} sx={{ width: 'calc(100% + 16px)', height: '3.5px', margin: '0px -16px', mt: '30px', mb: '10px', backgroundColor: '#e0e0e0', '& .MuiLinearProgress-bar': { backgroundColor: '#036cc1' } }} />
              <StepContent step={currentStep} subStep={currentSubStep} furtherSubStep={currentFurtherSubStep} />
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3, mr: 5.2, ml: 1, mb: 1 }}>
                {!(currentStep === steps.length - 1 && currentSubStep === steps[currentStep].subSteps - 1 && currentFurtherSubStep === steps[currentStep].furtherSubSteps[currentSubStep] - 1) && (
                  <Tooltip title="Navigate to previous step" placement='bottom' arrow>
                    <Button variant="outlined" onClick={handleBack} disabled={currentStep === 0 && currentSubStep === 0 && currentFurtherSubStep === 0} sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.75rem', padding: '2px 10px', minWidth: '10px', maxHeight: '25px', textTransform: 'none', '&:focus': { outline: 'none' } }}>Back</Button>
                  </Tooltip>
                )}
                <Box sx={{ display: 'flex', gap: 1, ml: 'auto' }}>
                  
                    <>
                      {!(currentStep === steps.length - 1 && currentSubStep === steps[currentStep].subSteps - 1 && currentFurtherSubStep === steps[currentStep].furtherSubSteps[currentSubStep] - 1) && (
                        <Tooltip title="Save progress and log out" placement='bottom' arrow><Button variant="outlined" onClick={handleSaveAndContinueLater} sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.75rem', padding: '2px 10px', minWidth: '10px', maxHeight: '25px', textTransform: 'none', '&:focus': { outline: 'none' } }}>Save and Continue Later</Button></Tooltip>
                      )}
                      <Button variant="contained" color="primary" onClick={handleNext} sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.75rem', padding: '2px 10px', minWidth: '10px', maxHeight: '25px', textTransform: 'none', boxShadow: 'none', '&:focus': { outline: 'none' } }}>
                        {currentStep === steps.length - 1 && currentSubStep === steps[currentStep].subSteps - 1 && currentFurtherSubStep === steps[currentStep].furtherSubSteps[currentSubStep] - 2 ? (<Tooltip title="Generate customized DER report" placement='bottom' arrow><span>Generate Report</span></Tooltip>) : currentStep === steps.length - 1 && currentSubStep === steps[currentStep].subSteps - 1 && currentFurtherSubStep === steps[currentStep].furtherSubSteps[currentSubStep] - 1 ? (<Tooltip title="Download DER report" placement='bottom' arrow><span>Download Report</span></Tooltip>) : currentStep === 1 && currentSubStep === 1 && currentFurtherSubStep === 2 ? (<Tooltip title="Submit LOA" placement='bottom' arrow><span>Authorize & Send Request</span></Tooltip>) : currentStep === 5 && currentSubStep === 0 && currentFurtherSubStep === 0 ? (<Tooltip title="Submit your profile" placement='bottom' arrow><span>Submit</span></Tooltip>) : (<Tooltip title="Navigate to next step" placement='bottom' arrow><span>Next</span></Tooltip>)}
                      </Button>
                    </>
                  
                </Box>
              </Box>
            </Box>
          </Box>
          <ChatBot />
        </Box>
      </Box>
      <Footer />
    </Box>
  );
};


const DemoApp: React.FC = () => {
  return (
    <AppProvider steps={steps} appPrefix="demo">
      <OrganizationDetailsProvider>
        <FacilityAddressProvider>
          <ElectricBillUploadProvider>
            <NaturalGasBillUploadProvider>
              <LOAProvider>
                <LOAStatusProvider>
                  <ThermalEnergyNeedsIProvider>
                    <ThermalEnergyNeedsIIProvider>
                      <ThermalEnergyNeedsIIIProvider>
                        <ThermalEnergyNeedsIVProvider>
                          <BoilerCogenerationProvider>
                            <AppContent />
                          </BoilerCogenerationProvider>
                        </ThermalEnergyNeedsIVProvider>
                      </ThermalEnergyNeedsIIIProvider>
                    </ThermalEnergyNeedsIIProvider>
                  </ThermalEnergyNeedsIProvider>
                </LOAStatusProvider>
              </LOAProvider>
            </NaturalGasBillUploadProvider>
          </ElectricBillUploadProvider>
        </FacilityAddressProvider>
      </OrganizationDetailsProvider>
    </AppProvider>
  );
};

export default DemoApp;
