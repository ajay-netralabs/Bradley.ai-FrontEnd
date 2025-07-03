import React from 'react';
import { Box, Button, LinearProgress, Tooltip } from '@mui/material';
import { useNavigate } from 'react-router-dom';

// App and Stepper contexts
import { useAppContext } from '../Context/AppContext';
import { steps, TOTAL_STEPS } from '../components/steps';

// All the new form-specific context providers
import { OrganizationDetailsProvider } from '../Context/Organizational Profile/SubStep2/Organization Details Context';
import { AnnualEnergySpendProvider } from '../Context/Organizational Profile/SubStep2/Annual Energy Spend Context';
import { FacilityOperationProvider } from '../Context/Organizational Profile/SubStep2/Facility Operation Description Context';
import { FacilityAddressProvider } from '../Context/Organizational Profile/SubStep2/Facility Address Context';
import { OtherDetailsProvider } from '../Context/Organizational Profile/SubStep2/Other Details Context';
import { ElectricBillUploadProvider } from '../Context/Energy Profile/SubStep2/Electric Bill Upload Context';
import { LOAProvider } from '../Context/Energy Profile/SubStep2/Letter Of Authorization Context';
import { LOAStatusProvider } from '../Context/Energy Profile/SubStep2/LOA - Status Context';
import { NaturalGasBillUploadProvider } from '../Context/Energy Profile/SubStep2/Natural Gas Bill Upload Context';
import { ThermalEnergyNeedsIProvider } from '../Context/Energy Profile/SubStep2/Thermal Energy Needs - I Context';
import { ThermalEnergyNeedsIIProvider } from '../Context/Energy Profile/SubStep2/Thermal Energy Needs - II Context';
import { ThermalEnergyNeedsIIIProvider } from '../Context/Energy Profile/SubStep2/Thermal Energy Needs - III Context';
import { ThermalEnergyNeedsIVProvider } from '../Context/Energy Profile/SubStep2/Thermal Energy Needs - IV Context';
import { BoilerCogenerationProvider } from '../Context/Energy Profile/SubStep2/Existing Boiler Cogeneration Context';
import { PrioritizationIProvider } from '../Context/Goals & Priorities/SubStep2/Prioritization - I Context';
import { PrioritizationIIProvider } from '../Context/Goals & Priorities/SubStep2/Prioritization - II Context';
import { FinancialsIProvider } from '../Context/Goals & Priorities/SubStep3/Financials & Investment Information - I Context';
import { FinancialsIIProvider } from '../Context/Goals & Priorities/SubStep3/Financials & Investment Information - II Context';
import { OwnershipPreferenceProvider, useOwnershipPreference } from '../Context/Financial Info/SubStep1/Ownership Preference Context';
// import { SiteLocationProvider } from '../Context/Site Assessment/SubStep2/Confirm Edit Your Pre-Entered Site Location Context';
import { SiteCharacteristicsIProvider } from '../Context/Site Assessment/SubStep2/Site Characteristics - I Context';
import { SiteCharacteristicsIIProvider } from '../Context/Site Assessment/SubStep2/Site Characteristics - II Context';
import { OtherSiteCharacteristicsProvider } from '../Context/Site Assessment/SubStep2/Other Site Characteristics Context';
import { FacilityUsageProvider } from '../Context/Site Assessment/SubStep2/Facility Usage & Operating Days Context';
import { MEPDrawingsProvider } from '../Context/Site Assessment/SubStep2/Upload Existing Drawings Context';
import { SolarAssetsProvider } from '../Context/Site Assessment/SubStep3/INPUTS TO MAXIMIZE SOLAR DER ASSETS Context';
import { RoofingConsiderationsProvider } from '../Context/Site Assessment/SubStep3/Roofing Considerations Context';
import { RoofMountSolarProvider } from '../Context/Site Assessment/SubStep3/Roof - Mounted Solar (Optional) Context';
import { GroundMountSolarProvider } from '../Context/Site Assessment/SubStep3/Ground - Mounted Solar (Optional) Context';
import { CarportSolarProvider } from '../Context/Site Assessment/SubStep3/Carport - Mounted Solar (Optional) Context';
import { ExistingAssetsProvider } from '../Context/Site Assessment/SubStep3/Existing Solar & Wind Resource (Optional) Context';
import { EquipmentPreferencesProvider } from '../Context/Site Assessment/SubStep3/Equipment Preferences (Optional) Context';
import { PPAPreferencesProvider } from '../Context/Financial Info/SubStep2/Third Party/PPA Preferences Context';
import { AdditionalPPAPreferencesProvider } from '../Context/Financial Info/SubStep2/Third Party/Additional PPA Preferences (Optional) Context';
import { FinancialPreferencesProvider } from '../Context/Financial Info/SubStep2/Own/Financial Preferences Context';
import { ExistingContractsIProvider } from '../Context/Financial Info/SubStep2/Own/Existing Energy Contracts - I Context';
import { ExistingPPAContractsIIProvider } from '../Context/Financial Info/SubStep2/Own/Existing Power Purchase Agreement (PPA) Electricity Contracts - II Context';
import { ExistingPPAContractsIIIProvider } from '../Context/Financial Info/SubStep2/Own/Existing Power Purchase Agreement (PPA) for Combined Heat and or Power (CHP) Contracts – III Context';
import { ExistingContractsIVProvider } from '../Context/Financial Info/SubStep2/Own/Existing Energy Contracts - IV Context';
import { OtherEnergyCommitmentsProvider } from '../Context/Financial Info/SubStep2/Own/Other Energy Commitments (Optional) Context';
import { BudgetGoalsProvider } from '../Context/Financial Info/SubStep2/Own/What Are Your Budget & Investment Goals Context';
import { FinancingPreferencesProvider } from '../Context/Financial Info/SubStep2/Own/Financing Preferences Context';

// UI Components
import HorizontalStepper from '../components/HorizontalStepper';
import StepContent from './StepContent';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import Footer from '../components/Footer';
import ChatBot from '../components/ChatBot';


// Component to hold all providers for cleanliness
const AppProviders: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <OrganizationDetailsProvider>
  <AnnualEnergySpendProvider>
  <FacilityOperationProvider>
  <FacilityAddressProvider>
  <OtherDetailsProvider>
  <ElectricBillUploadProvider>
  <LOAProvider>
  <LOAStatusProvider>
  <NaturalGasBillUploadProvider>
  <ThermalEnergyNeedsIProvider>
  <ThermalEnergyNeedsIIProvider>
  <ThermalEnergyNeedsIIIProvider>
  <ThermalEnergyNeedsIVProvider>
  <BoilerCogenerationProvider>
  <PrioritizationIProvider>
  <PrioritizationIIProvider>
  <FinancialsIProvider>
  <FinancialsIIProvider>
  <OwnershipPreferenceProvider>
  {/* <SiteLocationProvider> */}
  <SiteCharacteristicsIProvider>
  <SiteCharacteristicsIIProvider>
  <OtherSiteCharacteristicsProvider>
  <FacilityUsageProvider>
  <MEPDrawingsProvider>
  <SolarAssetsProvider>
  <RoofingConsiderationsProvider>
  <RoofMountSolarProvider>
  <GroundMountSolarProvider>
  <CarportSolarProvider>
  <ExistingAssetsProvider>
  <EquipmentPreferencesProvider>
  <PPAPreferencesProvider>
  <AdditionalPPAPreferencesProvider>
  <FinancialPreferencesProvider>
  <ExistingContractsIProvider>
  <ExistingPPAContractsIIProvider>
  <ExistingPPAContractsIIIProvider>
  <ExistingContractsIVProvider>
  <OtherEnergyCommitmentsProvider>
  <BudgetGoalsProvider>
  <FinancingPreferencesProvider>
    {children}
  </FinancingPreferencesProvider>
  </BudgetGoalsProvider>
  </OtherEnergyCommitmentsProvider>
  </ExistingContractsIVProvider>
  </ExistingPPAContractsIIIProvider>
  </ExistingPPAContractsIIProvider>
  </ExistingContractsIProvider>
  </FinancialPreferencesProvider>
  </AdditionalPPAPreferencesProvider>
  </PPAPreferencesProvider>
  </EquipmentPreferencesProvider>
  </ExistingAssetsProvider>
  </CarportSolarProvider>
  </GroundMountSolarProvider>
  </RoofMountSolarProvider>
  </RoofingConsiderationsProvider>
  </SolarAssetsProvider>
  </MEPDrawingsProvider>
  </FacilityUsageProvider>
  </OtherSiteCharacteristicsProvider>
  </SiteCharacteristicsIIProvider>
  </SiteCharacteristicsIProvider>
  {/* </SiteLocationProvider> */}
  </OwnershipPreferenceProvider>
  </FinancialsIIProvider>
  </FinancialsIProvider>
  </PrioritizationIIProvider>
  </PrioritizationIProvider>
  </BoilerCogenerationProvider>
  </ThermalEnergyNeedsIVProvider>
  </ThermalEnergyNeedsIIIProvider>
  </ThermalEnergyNeedsIIProvider>
  </ThermalEnergyNeedsIProvider>
  </NaturalGasBillUploadProvider>
  </LOAStatusProvider>
  </LOAProvider>
  </ElectricBillUploadProvider>
  </OtherDetailsProvider>
  </FacilityAddressProvider>
  </FacilityOperationProvider>
  </AnnualEnergySpendProvider>
  </OrganizationDetailsProvider>
);


// The main content of the app, which can now use all the contexts
const AppContent: React.FC = () => {
  const {
    currentStep, setCurrentStep,
    currentSubStep, setCurrentSubStep,
    currentFurtherSubStep, setCurrentFurtherSubStep,
    visitedSteps, setVisitedSteps,
    completedSubSteps, setCompletedSubSteps,
    setUser,
  } = useAppContext();

  const { ownershipPreference, setOwnershipPreference } = useOwnershipPreference();
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

  const handleNext = () => {
    const isLastFurtherSubStep = currentFurtherSubStep === steps[currentStep].furtherSubSteps[currentSubStep] - 1;
    const isLastSubStep = currentSubStep === steps[currentStep].subSteps - 1;
    const isLastStep = currentStep === TOTAL_STEPS - 1;

    // Special case for jumping from the "Third Party" path end to step 5
    if (currentStep === 4 && currentSubStep === 2 && currentFurtherSubStep === 2) {
      setCurrentStep(5);
      setCurrentSubStep(0);
      setCurrentFurtherSubStep(0);
      markVisited(5, 0);
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
    // Special case: Going back from the start of Step 5
    if (currentStep === 5 && currentSubStep === 0 && currentFurtherSubStep === 0) {
        // Navigate back to the end of the previously chosen financial path
        if (ownershipPreference.preference === 'own') {
            setCurrentStep(4);
            setCurrentSubStep(1); // 'Own' path sub-step
            setCurrentFurtherSubStep(7); // Last further sub-step of 'Own' path
            return;
        } else if (ownershipPreference.preference === 'third-party') {
            setCurrentStep(4);
            setCurrentSubStep(2); // 'Third Party' path sub-step
            setCurrentFurtherSubStep(2); // Last further sub-step of 'Third Party' path
            return;
        }
        // Fallback to default behavior if preference is not set
    }

    // Special case for navigating back to the "Ownership Preference" screen
    if (currentStep === 4 && (currentSubStep === 1 || currentSubStep === 2) && currentFurtherSubStep === 0) {
        setCurrentStep(4);
        setCurrentSubStep(0);
        setCurrentFurtherSubStep(1);
        return;
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
    setUser(null);
    navigate('/login');
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'row', height: '100vh', zIndex: 500 }}>
      <Navbar />
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
                {!(currentStep === TOTAL_STEPS - 1 && currentSubStep === steps[currentStep].subSteps - 1 && currentFurtherSubStep === steps[currentStep].furtherSubSteps[currentSubStep] - 1) && (
                  <Tooltip title="Navigate to previous step" placement='bottom' arrow>
                    <Button variant="outlined" onClick={handleBack} disabled={currentStep === 0 && currentSubStep === 0 && currentFurtherSubStep === 0} sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.75rem', padding: '2px 10px', minWidth: '10px', maxHeight: '25px', textTransform: 'none', '&:focus': { outline: 'none' } }}>Back</Button>
                  </Tooltip>
                )}
                <Box sx={{ display: 'flex', gap: 1, ml: 'auto' }}>
                  {currentStep === 4 && currentSubStep === 0 && currentFurtherSubStep === 1 ? (
                    <>
                      <Tooltip title="Save progress and log out" placement='bottom' arrow><Button variant="outlined" onClick={handleSaveAndContinueLater} sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.75rem', padding: '2px 10px', minWidth: '10px', maxHeight: '25px', textTransform: 'none', '&:focus': { outline: 'none' } }}>Save and Continue Later</Button></Tooltip>
                      <Tooltip title="Choose self ownership" placement='bottom' arrow>
                        <Button variant="contained" color="primary" onClick={() => { setOwnershipPreference('own'); setCurrentStep(4); setCurrentSubStep(1); setCurrentFurtherSubStep(0); markVisited(4, 1); markCompleted(4, 0); }} sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.75rem', padding: '2px 10px', minWidth: '10px', maxHeight: '25px', textTransform: 'none', '&:focus': { outline: 'none' } }}>Own</Button>
                      </Tooltip>
                      <Tooltip title="Choose 3rd party ownership" placement='bottom' arrow>
                        <Button variant="contained" color="primary" onClick={() => { setOwnershipPreference('third-party'); setCurrentStep(4); setCurrentSubStep(2); setCurrentFurtherSubStep(0); markVisited(4, 2); markCompleted(4, 0); }} sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.75rem', padding: '2px 10px', minWidth: '10px', maxHeight: '25px', textTransform: 'none', boxShadow: 'none', '&:focus': { outline: 'none' } }}>Third Party</Button>
                      </Tooltip>
                    </>
                  ) : (
                    <>
                      {!(currentStep === TOTAL_STEPS - 1 && currentSubStep === steps[currentStep].subSteps - 1 && currentFurtherSubStep === steps[currentStep].furtherSubSteps[currentSubStep] - 1) && (
                        <Tooltip title="Save progress and log out" placement='bottom' arrow><Button variant="outlined" onClick={handleSaveAndContinueLater} sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.75rem', padding: '2px 10px', minWidth: '10px', maxHeight: '25px', textTransform: 'none', '&:focus': { outline: 'none' } }}>Save and Continue Later</Button></Tooltip>
                      )}
                      <Button variant="contained" color="primary" onClick={handleNext} sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.75rem', padding: '2px 10px', minWidth: '10px', maxHeight: '25px', textTransform: 'none', boxShadow: 'none', '&:focus': { outline: 'none' } }}>
                        {currentStep === TOTAL_STEPS - 1 && currentSubStep === steps[currentStep].subSteps - 1 && currentFurtherSubStep === steps[currentStep].furtherSubSteps[currentSubStep] - 2 ? (<Tooltip title="Generate customized DER report" placement='bottom' arrow><span>Generate Report</span></Tooltip>) : currentStep === TOTAL_STEPS - 1 && currentSubStep === steps[currentStep].subSteps - 1 && currentFurtherSubStep === steps[currentStep].furtherSubSteps[currentSubStep] - 1 ? (<Tooltip title="Download DER report" placement='bottom' arrow><span>Download Report</span></Tooltip>) : currentStep === 1 && currentSubStep === 1 && currentFurtherSubStep === 2 ? (<Tooltip title="Submit LOA" placement='bottom' arrow><span>Authorize & Send Request</span></Tooltip>) : currentStep === 5 && currentSubStep === 0 && currentFurtherSubStep === 0 ? (<Tooltip title="Submit your profile" placement='bottom' arrow><span>Submit</span></Tooltip>) : (<Tooltip title="Navigate to next step" placement='bottom' arrow><span>Next</span></Tooltip>)}
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


const ClientApp: React.FC = () => {
  return (
    <AppProviders>
      <AppContent />
    </AppProviders>
  );
};

export default ClientApp;