import React, { lazy, useEffect, useState } from 'react';
import { Box, Button, LinearProgress, Tooltip } from '@mui/material';

// Steps definition
import { steps } from '../components/steps';

// Redux hooks and actions
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { 
    setCurrentStep, 
    setCurrentSubStep, 
    setCurrentFurtherSubStep, 
    setVisitedSteps, 
    setCompletedSubSteps,
    setWorkflowState 
} from '../store/slices/workflowSlice';
import { setOwnershipPreference } from '../store/slices/financialInfoSlice';
import { logoutUser } from '../store/slices/authSlice';

// UI Components
import HorizontalStepper from '../components/HorizontalStepper';
import StepContent from './StepContent';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import Footer from '../components/Footer';
import ChatBot from '../components/ChatBot';

const OrganizationDetails = lazy(() =>
  import('./pages/Organizational Profile/SubStep2/Organization Details')
);

const FacilityAddress = lazy(() =>
  import('./pages/Organizational Profile/SubStep2/Facility Address')
);

const ClientApp: React.FC = () => {
  const dispatch = useAppDispatch();
  const [isHydrated, setIsHydrated] = useState(false);
  
  // Redux Selectors
  const { 
    currentStep, 
    currentSubStep, 
    currentFurtherSubStep, 
    visitedSteps, 
    completedSubSteps 
  } = useAppSelector((state) => state.workflow);

  const ownershipPreference = useAppSelector((state) => state.financialInfo.ownershipPreference);
  const electricBillUploadState = useAppSelector((state) => state.energyProfile.electricBill);

  const appPrefix = "client"; // Hardcoded for ClientApp

  // Initialization / Hydration (Equivalent to what AppProvider was doing)
  useEffect(() => {
    const getSubStepCount = (step: any) => Array.isArray(step.subSteps) ? step.subSteps.length : step.subSteps;
    
    const savedCurrentStep = Number(localStorage.getItem(`${appPrefix}_currentStep`) || 0);
    const savedCurrentSubStep = Number(localStorage.getItem(`${appPrefix}_currentSubStep`) || 0);
    const savedCurrentFurtherSubStep = Number(localStorage.getItem(`${appPrefix}_currentFurtherSubStep`) || 0);
    
    const savedVisitedSteps = localStorage.getItem(`${appPrefix}_visitedSteps`);
    const parsedVisitedSteps = savedVisitedSteps
      ? JSON.parse(savedVisitedSteps)
      : Array.from({ length: steps.length }, (_, i) =>
          Array.from({ length: getSubStepCount(steps[i]) }, (_, j) => i === 0 && j === 0)
        );

    const savedCompletedSubSteps = localStorage.getItem(`${appPrefix}_completedSubSteps`);
    const parsedCompletedSubSteps = savedCompletedSubSteps
      ? JSON.parse(savedCompletedSubSteps)
      : Array.from({ length: steps.length }, (_, i) =>
          Array.from({ length: getSubStepCount(steps[i]) }, () => false)
        );

    dispatch(setWorkflowState({
        currentStep: savedCurrentStep,
        currentSubStep: savedCurrentSubStep,
        currentFurtherSubStep: savedCurrentFurtherSubStep,
        visitedSteps: parsedVisitedSteps,
        completedSubSteps: parsedCompletedSubSteps
    }));
    setIsHydrated(true);
  }, [dispatch]);

  // Persistence
  useEffect(() => {
    if (!isHydrated) return;

    localStorage.setItem(`${appPrefix}_currentStep`, currentStep.toString());
    localStorage.setItem(`${appPrefix}_currentSubStep`, currentSubStep.toString());
    localStorage.setItem(`${appPrefix}_currentFurtherSubStep`, currentFurtherSubStep.toString());
    localStorage.setItem(`${appPrefix}_visitedSteps`, JSON.stringify(visitedSteps));
    localStorage.setItem(`${appPrefix}_completedSubSteps`, JSON.stringify(completedSubSteps));
  }, [currentStep, currentSubStep, currentFurtherSubStep, visitedSteps, completedSubSteps, isHydrated]);

  // Helper functions
  const markVisited = (step: number, subStep: number) => {
    const newVisited = [...visitedSteps].map(row => [...row]);
    if (!newVisited[step]) newVisited[step] = [];
    newVisited[step][subStep] = true;
    dispatch(setVisitedSteps(newVisited));
  };

  const markCompleted = (step: number, subStep: number) => {
    const newCompleted = [...completedSubSteps].map(row => [...row]);
    if (!newCompleted[step]) newCompleted[step] = [];
    newCompleted[step][subStep] = true;
    dispatch(setCompletedSubSteps(newCompleted));
  };

  const handleStepChange = (step: number) => {
    if (visitedSteps[step]?.some((visited: boolean) => visited)) {
      dispatch(setCurrentStep(step));
      dispatch(setCurrentSubStep(0));
      dispatch(setCurrentFurtherSubStep(0));
    }
  };

  const handleSubStepChange = (subStep: number) => {
    if (visitedSteps[currentStep]?.[subStep]) {
      dispatch(setCurrentSubStep(subStep));
      dispatch(setCurrentFurtherSubStep(0));
    }
  };

  const handleNext = () => {
    const isLastFurtherSubStep = currentFurtherSubStep === steps[currentStep].furtherSubSteps[currentSubStep] - 1;
    const isLastSubStep = currentSubStep === steps[currentStep].subSteps - 1;
    const isLastStep = currentStep === steps.length - 1;

    if (currentStep === 1 && currentSubStep === 1 && currentFurtherSubStep === 0) {
        markCompleted(1, 1);
        const hasFiles = electricBillUploadState.fileMetadata.length > 0;

        if (hasFiles) {
            dispatch(setCurrentStep(1));
            dispatch(setCurrentSubStep(1));
            dispatch(setCurrentFurtherSubStep(4));
            markVisited(1, 4);
        } else {
            dispatch(setCurrentFurtherSubStep(1));
            markVisited(1, 1);
        }
        return; 
    }

    if (currentStep === 4 && currentSubStep === 2 && currentFurtherSubStep === 2) {
      dispatch(setCurrentStep(5));
      dispatch(setCurrentSubStep(0));
      dispatch(setCurrentFurtherSubStep(0));
      markVisited(5, 0);
      return;
    }
  
    if (isLastFurtherSubStep) {
      markCompleted(currentStep, currentSubStep);
      if (isLastSubStep) {
        if (!isLastStep) {
          dispatch(setCurrentStep(currentStep + 1));
          dispatch(setCurrentSubStep(0));
          dispatch(setCurrentFurtherSubStep(0));
          markVisited(currentStep + 1, 0);
        }
      } else {
        dispatch(setCurrentSubStep(currentSubStep + 1));
        dispatch(setCurrentFurtherSubStep(0));
        markVisited(currentStep, currentSubStep + 1);
      }
    } else {
      dispatch(setCurrentFurtherSubStep(currentFurtherSubStep + 1));
    }
  };

  const handleBack = () => {
    if (currentStep === 1 && currentSubStep === 1 && currentFurtherSubStep === 4) {
        const hasFiles = electricBillUploadState.fileMetadata.length > 0;
        if (hasFiles) {
            dispatch(setCurrentStep(1));
            dispatch(setCurrentSubStep(1));
            dispatch(setCurrentFurtherSubStep(0));
            return;
        }
    }

    if (currentStep === 5 && currentSubStep === 0 && currentFurtherSubStep === 0) {
        if (ownershipPreference.preference === 'own') {
            dispatch(setCurrentStep(4));
            dispatch(setCurrentSubStep(1));
            dispatch(setCurrentFurtherSubStep(7));
            return;
        } else if (ownershipPreference.preference === 'third-party') {
            dispatch(setCurrentStep(4));
            dispatch(setCurrentSubStep(2));
            dispatch(setCurrentFurtherSubStep(2));
            return;
        }
    }

    if (currentStep === 4 && (currentSubStep === 1 || currentSubStep === 2) && currentFurtherSubStep === 0) {
        dispatch(setCurrentStep(4));
        dispatch(setCurrentSubStep(0));
        dispatch(setCurrentFurtherSubStep(1));
        return;
    }
    
    if (currentFurtherSubStep > 0) {
      dispatch(setCurrentFurtherSubStep(currentFurtherSubStep - 1));
    } else if (currentSubStep > 0) {
      const prevSubStep = currentSubStep - 1;
      dispatch(setCurrentSubStep(prevSubStep));
      dispatch(setCurrentFurtherSubStep(steps[currentStep].furtherSubSteps[prevSubStep] - 1));
    } else if (currentStep > 0) {
      const prevStep = currentStep - 1;
      const lastSubStepOfPrevStep = steps[prevStep].subSteps - 1;
      dispatch(setCurrentStep(prevStep));
      dispatch(setCurrentSubStep(lastSubStepOfPrevStep));
      dispatch(setCurrentFurtherSubStep(steps[prevStep].furtherSubSteps[lastSubStepOfPrevStep] - 1));
    }
  };

  const calculateProgress = () => {
    const totalFurtherSubSteps = steps[currentStep]?.furtherSubSteps?.[currentSubStep] || 1;
    return ((currentFurtherSubStep + 1) / totalFurtherSubSteps) * 100;
  };

  const handleLogout = () => {
    const isEmissionCheckIQ = window.location.pathname.startsWith('/emissioncheckiq');
    const product = isEmissionCheckIQ ? "emissioncheckiq" : "bradley";
    dispatch(logoutUser(product));
    window.location.href = isEmissionCheckIQ ? "/login/emissioncheckiq" : "/login/bradley";
  };

  const handleSaveAndContinueLater = () => {
    handleLogout();
  };
  
  const handleSetOwnership = (pref: 'own' | 'third-party') => {
      dispatch(setOwnershipPreference(pref));
      if (pref === 'own') {
        dispatch(setCurrentStep(4));
        dispatch(setCurrentSubStep(1));
        dispatch(setCurrentFurtherSubStep(0));
        markVisited(4, 1);
        markCompleted(4, 0);
      } else {
        dispatch(setCurrentStep(4));
        dispatch(setCurrentSubStep(2));
        dispatch(setCurrentFurtherSubStep(0));
        markVisited(4, 2);
        markCompleted(4, 0);
      }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'row', height: '100vh', zIndex: 500 }}>
      <Navbar OrganizationDetailsComponent={OrganizationDetails} FacilityAddressComponent={FacilityAddress} />
      <Box sx={{ display: 'flex', flexGrow: 1, mt: '64px', width: '100vw' }}>
        <Box sx={{ width: '210px', flexShrink: 0 }}>
          <Sidebar currentStep={currentStep} steps={steps} visitedSteps={visitedSteps} onStepChange={handleStepChange} />
        </Box>
        <Box component="main" sx={{ flexGrow: 1, p: 4, bgcolor: '#f5f5f5', overflowX: 'auto', scrollbarWidth: 'none' }}>
          <Box sx={{ mt: 1, pl: 2, pb: 1, pt: 3, mb: 7, ml: 8, mr: 5, borderRadius: '8px', bgcolor: 'white', boxShadow: 1, color: 'black', display: 'flex' }}>
            <Box sx={{ flexGrow: 1 }}>
              <HorizontalStepper currentSubStep={currentSubStep} totalSubSteps={steps[currentStep].subSteps} visitedSteps={visitedSteps[currentStep]} completedSubSteps={completedSubSteps[currentStep]} onSubStepChange={handleSubStepChange} currentStep={currentStep} />
              <LinearProgress variant="determinate" value={calculateProgress()} sx={{ width: 'calc(100% + 16px)', height: '3.5px', margin: '0px -16px', mt: '30px', mb: '10px', backgroundColor: '#e0e0e0', '& .MuiLinearProgress-bar': { backgroundColor: '#036cc1' } }} />
              <StepContent step={currentStep} subStep={currentSubStep} furtherSubStep={currentFurtherSubStep} />
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3, mr: 5.2, ml: 1, mb: 1 }}>
                {!(currentStep === steps.length - 1 && currentSubStep === steps[currentStep].subSteps - 1 && currentFurtherSubStep === steps[currentStep].furtherSubSteps[currentSubStep] - 1) && (
                  <Tooltip title="Navigate to previous step" placement='bottom' arrow>
                    <Button variant="outlined" onClick={handleBack} disabled={currentStep === 0 && currentSubStep === 0 && currentFurtherSubStep === 0} sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.75rem', padding: '2px 10px', minWidth: '10px', maxHeight: '25px', textTransform: 'none', '&:focus': { outline: 'none' } }}>Back</Button>
                  </Tooltip>
                )}
                <Box sx={{ display: 'flex', gap: 1, ml: 'auto' }}>
                  {currentStep === 4 && currentSubStep === 0 && currentFurtherSubStep === 1 ? (
                    <>
                      <Tooltip title="Save progress and log out" placement='bottom' arrow><Button variant="outlined" onClick={handleSaveAndContinueLater} sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.75rem', padding: '2px 10px', minWidth: '10px', maxHeight: '25px', textTransform: 'none', '&:focus': { outline: 'none' } }}>Save and Continue Later</Button></Tooltip>
                      <Tooltip title="Choose self ownership" placement='bottom' arrow>
                        <Button variant="contained" color="primary" onClick={() => handleSetOwnership('own')} sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.75rem', padding: '2px 10px', minWidth: '10px', maxHeight: '25px', textTransform: 'none', '&:focus': { outline: 'none' } }}>Own</Button>
                      </Tooltip>
                      <Tooltip title="Choose 3rd party ownership" placement='bottom' arrow>
                        <Button variant="contained" color="primary" onClick={() => handleSetOwnership('third-party')} sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.75rem', padding: '2px 10px', minWidth: '10px', maxHeight: '25px', textTransform: 'none', boxShadow: 'none', '&:focus': { outline: 'none' } }}>Third Party</Button>
                      </Tooltip>
                    </>
                  ) : (
                    <>
                      {!(currentStep === steps.length - 1 && currentSubStep === steps[currentStep].subSteps - 1 && currentFurtherSubStep === steps[currentStep].furtherSubSteps[currentSubStep] - 1) && (
                        <Tooltip title="Save progress and log out" placement='bottom' arrow><Button variant="outlined" onClick={handleSaveAndContinueLater} sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.75rem', padding: '2px 10px', minWidth: '10px', maxHeight: '25px', textTransform: 'none', '&:focus': { outline: 'none' } }}>Save and Continue Later</Button></Tooltip>
                      )}
                      <Button variant="contained" color="primary" onClick={handleNext} sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.75rem', padding: '2px 10px', minWidth: '10px', maxHeight: '25px', textTransform: 'none', boxShadow: 'none', '&:focus': { outline: 'none' } }}>
                        {currentStep === steps.length - 1 && currentSubStep === steps[currentStep].subSteps - 1 && currentFurtherSubStep === steps[currentStep].furtherSubSteps[currentSubStep] - 2 ? (<Tooltip title="Generate customized DER report" placement='bottom' arrow><span>Generate Report</span></Tooltip>) : currentStep === steps.length - 1 && currentSubStep === steps[currentStep].subSteps - 1 && currentFurtherSubStep === steps[currentStep].furtherSubSteps[currentSubStep] - 1 ? (<Tooltip title="Download DER report" placement='bottom' arrow><span>Download Report</span></Tooltip>) : currentStep === 1 && currentSubStep === 1 && currentFurtherSubStep === 2 ? (<Tooltip title="Submit LOA" placement='bottom' arrow><span>Authorize & Send Request</span></Tooltip>) : currentStep === 5 && currentSubStep === 0 && currentFurtherSubStep === 0 ? (<Tooltip title="Submit your profile" placement='bottom' arrow><span>Submit</span></Tooltip>) : (<Tooltip title="Navigate to next step" placement='bottom' arrow><span>Next</span></Tooltip>)}
                      </Button>
                    </>
                  )}
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

export default ClientApp;