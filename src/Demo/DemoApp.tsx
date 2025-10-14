import React, { useEffect, useState } from 'react';
import { Box, Button, LinearProgress, Tooltip, Backdrop, CircularProgress, Typography } from '@mui/material';
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
import ApiPrePinger from './components/ApiPrePinger';

// Feature Contexts
import { OrganizationDetailsProvider, useOrganizationDetails } from '../Context/Organizational Profile/SubStep2/Organization Details Context';
import { FacilityAddressProvider, useFacilityAddress } from '../Context/Organizational Profile/SubStep2/Facility Address Context';
import { ElectricBillUploadProvider, useElectricBillUpload } from '../Context/Energy Profile/SubStep2/Electric Bill Upload Context';
import { NaturalGasBillUploadProvider, useNaturalGasBillUpload } from '../Context/Energy Profile/SubStep2/Natural Gas Bill Upload Context';
import { LOAProvider } from '../Context/Energy Profile/SubStep2/Letter Of Authorization Context';
import { LOAStatusProvider } from '../Context/Energy Profile/SubStep2/LOA - Status Context';
import { ThermalEnergyNeedsIProvider } from '../Context/Energy Profile/SubStep2/Thermal Energy Needs - I Context';
import { ThermalEnergyNeedsIIProvider } from '../Context/Energy Profile/SubStep2/Thermal Energy Needs - II Context';
import { ThermalEnergyNeedsIIIProvider } from '../Context/Energy Profile/SubStep2/Thermal Energy Needs - III Context';
import { ThermalEnergyNeedsIVProvider } from '../Context/Energy Profile/SubStep2/Thermal Energy Needs - IV Context';
import { BoilerCogenerationProvider } from '../Context/Energy Profile/SubStep2/Existing Boiler Cogeneration Context';
import { BillAddressProvider, useBillAddress } from '../Context/Energy Profile/BillAddressContext';
import { updateOrganizationDetails, updateFacilityAddresses, uploadBillData, BillMetadata } from '../services/APIServices';

// Import the updated Dashboard Context
import { DashboardDataProvider, useDashboardData } from '../Context/DashboardDataContext';

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
    
    const { setDashboardData, isLoading, setIsLoading } = useDashboardData();

    const { organizationDetailsState } = useOrganizationDetails();
    const { facilityAddressState } = useFacilityAddress();
    const { electricBillUploadState } = useElectricBillUpload();
    const { naturalGasBillUploadState } = useNaturalGasBillUpload();
    const { bills, isNextDisabled } = useBillAddress();

    const navigate = useNavigate();
    const [organizationId, setOrganizationId] = useState<string | null>(null);
    const [addressUuidMap, setAddressUuidMap] = useState<{ [key: string]: string }>({});

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

    const handleNext = async () => {
        const isLastFurtherSubStep = currentFurtherSubStep === steps[currentStep].furtherSubSteps[currentSubStep] - 1;
        const isLastSubStep = currentSubStep === steps[currentStep].subSteps - 1;
        const isLastStep = currentStep === steps.length - 1;

        if (currentStep === 0 && currentSubStep === 0 && currentFurtherSubStep === 0) {
            setIsLoading(true);
            try {
                const orgId = await updateOrganizationDetails(organizationDetailsState);
                setOrganizationId(orgId);
            } catch (error: any) {
                console.error("Failed to update organization details:", error);
                window.alert(`Failed to save organization details. Server responded with: "${error.message}". Please try again.`);
                setIsLoading(false);
                return; 
            }
            setIsLoading(false);
        }

        if (currentStep === 0 && currentSubStep === 0 && currentFurtherSubStep === 1) {
            if (!organizationId) {
                console.error("Organization ID not found. Cannot update addresses.");
                return;
            }
            const addressesPayload = facilityAddressState.addresses.map(({ id, ...address }) => ({
                ...address,
                organizationId: organizationId,
            }));
            setIsLoading(true);
            try {
                const response = await updateFacilityAddresses(addressesPayload);
                const newMap: { [key: string]: string } = {};
                facilityAddressState.addresses.forEach((address, index) => {
                    newMap[address.id] = response.facility_ids[index];
                });
                setAddressUuidMap(newMap);
            } catch (error: any) {
                console.error("Failed to update facility addresses:", error);
                window.alert(`Failed to save facility addresses. Server responded with: "${error.message}". Please try again.`);
                setIsLoading(false);
                return;
            }
            setIsLoading(false);
        }

        // CORRECT: Added error handling for the bill upload API call
        if (currentStep === 0 && currentSubStep === 0 && currentFurtherSubStep === 6) {
            const billsWithAddress = bills.filter(bill => bill.addressId);
            const electricBillMetadataList: BillMetadata[] = billsWithAddress.filter(bill => bill.type === 'electric').map(bill => ({ ...bill, size: bill.size.toString(), addressId: bill.addressId! }));
            const gasBillMetadataList: BillMetadata[] = billsWithAddress.filter(bill => bill.type === 'gas').map(bill => ({ ...bill, size: bill.size.toString(), addressId: bill.addressId! }));
            const electricBillNames = new Set(electricBillMetadataList.map(bill => bill.name));
            const electricFiles = electricBillUploadState.files.filter(file => electricBillNames.has(file.name));
            const gasBillNames = new Set(gasBillMetadataList.map(bill => bill.name));
            const gasFiles = naturalGasBillUploadState.files.filter(file => gasBillNames.has(file.name));
            const Files = [...electricFiles, ...gasFiles];
            const sources = [...electricFiles.map(() => 'electric'), ...gasFiles.map(() => 'gas')];
            const allBillMetadata = [...electricBillMetadataList, ...gasBillMetadataList];
            const fileToMetadataMap = new Map<string, BillMetadata>();
            allBillMetadata.forEach(meta => fileToMetadataMap.set(meta.name, meta));
            const uuidsForUpload = Files.map(file => {
                const metadata = fileToMetadataMap.get(file.name);
                if (metadata && metadata.addressId) {
                    return addressUuidMap[metadata.addressId]; 
                }
                return null;
            }).filter((uuid): uuid is string => uuid !== null);

            if (uuidsForUpload.length !== Files.length) {
                console.error("Could not map a UUID to every file. Aborting upload.");
                window.alert("An internal error occurred: Could not map a facility to every file. Please review your uploads.");
                setIsLoading(false);
                return;
            }

            setIsLoading(true);
            try {
                const apiResponse = await uploadBillData(Files, sources, uuidsForUpload);
                if (apiResponse && Array.isArray(apiResponse) && apiResponse.length > 0) {
                    setDashboardData(apiResponse);
                } else {
                    // Throw an error if the response is not what we expect
                    throw new Error("API returned invalid or empty dashboard data.");
                }
            } catch (error: any) {
                console.error("Failed to upload bill data:", error);
                window.alert(`Failed to process your energy bills. Server responded with: "${error.message}". Please try again.`);
                setIsLoading(false);
                return; // Stay on the current step
            }
            setIsLoading(false);
        }

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

    const loadingMessages = [
        "Analyzing your energy consumption patterns...",
        "Did you know? Switching to LED bulbs can reduce energy use by 75%.",
        "Calculating your carbon footprint based on utility data...",
        "Compiling your emissions report...",
        "Renewable energy sources like solar and wind are key to a sustainable future.",
        "Optimizing recommendations for Distributed Energy Resources (DERs)..."
    ];

    const [loadingMessageIndex, setLoadingMessageIndex] = useState(0);

    useEffect(() => {
        if (isLoading) {
            const timer = setInterval(() => {
                setLoadingMessageIndex(prevIndex => (prevIndex + 1) % loadingMessages.length);
            }, 3000);
            return () => clearInterval(timer);
        }
    }, [isLoading]);

    return (
        <Box sx={{ display: 'flex', flexDirection: 'row', height: '100vh', zIndex: 500 }}>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 2, position: 'absolute', backdropFilter: 'blur(3px)', display: 'flex', flexDirection: 'column', gap: 2 }}
                open={isLoading}
            >
                <CircularProgress color="inherit" />
                <Typography variant="h6" sx={{ fontFamily: 'Nunito Sans, sans-serif' }}>{loadingMessages[loadingMessageIndex]}</Typography>
            </Backdrop>

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
                                    {!(currentStep === steps.length - 1 && currentSubStep === steps[currentStep].subSteps - 1 && currentFurtherSubStep === steps[currentStep].furtherSubSteps[currentSubStep] - 1) && (
                                        <Tooltip title="Save progress and log out" placement='bottom' arrow>
                                            <Button variant="outlined" onClick={handleSaveAndContinueLater} sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.75rem', padding: '2px 10px', minWidth: '10px', maxHeight: '25px', textTransform: 'none', '&:focus': { outline: 'none' } }}>Save and Continue Later</Button>
                                        </Tooltip>
                                    )}
                                    <Tooltip title={(currentStep === 0 && currentSubStep === 0 && currentFurtherSubStep === 6 && isNextDisabled()) ? "You haven't uploaded bills for all addresses. Upload atleast one bill for every address first." : "Navigate to next step"} placement='bottom' arrow>
                                        <span>
                                            <Button variant="contained" color="primary" onClick={handleNext} disabled={currentStep === 0 && currentSubStep === 0 && currentFurtherSubStep === 6 && isNextDisabled()} sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.75rem', padding: '2px 10px', minWidth: '10px', maxHeight: '25px', textTransform: 'none', boxShadow: 'none', '&:focus': { outline: 'none' } }}>
                                                {currentStep === steps.length - 1 && currentSubStep === steps[currentStep].subSteps - 1 && currentFurtherSubStep === steps[currentStep].furtherSubSteps[currentSubStep] - 2 ? ("Generate Report") :
                                                 currentStep === steps.length - 1 && currentSubStep === steps[currentStep].subSteps - 1 && currentFurtherSubStep === steps[currentStep].furtherSubSteps[currentSubStep] - 1 ? ("Download Report") :
                                                 currentStep === 1 && currentSubStep === 1 && currentFurtherSubStep === 2 ? ("Authorize & Send Request") :
                                                 currentStep === 5 && currentSubStep === 0 && currentFurtherSubStep === 0 ? ("Submit") : ("Next")}
                                            </Button>
                                        </span>
                                    </Tooltip>
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
            <ApiPrePinger />
            <DashboardDataProvider>
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
                                                            <BillAddressProvider appPrefix="demo">
                                                                <AppContent />
                                                            </BillAddressProvider>
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
            </DashboardDataProvider>
        </AppProvider>
    );
};

export default DemoApp;