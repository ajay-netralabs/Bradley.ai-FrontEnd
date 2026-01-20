import React, { lazy, useEffect, useState } from 'react';
import { Box, Button, LinearProgress, Tooltip, Backdrop, CircularProgress, Typography, Modal, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
// import { useNavigate } from 'react-router-dom';
import { usePDF } from 'react-to-pdf';

// Contexts & Components
import { AppProvider, useAppContext as useLocalAppContext } from '../Context/AppContext';
import { useAppContext as useGlobalAppContext } from '../Context/AppContext';
import { steps } from './components/steps';
import HorizontalStepper from '../components/HorizontalStepper';
import StepContent from './StepContent';
import Navbar from '../components/Navbar';
import Sidebar from './components/Sidebar';
import Footer from '../components/Footer';
import ChatBot from '../components/ChatBot';
import ApiPrePinger from './components/ApiPrePinger';

// Feature Contexts
import { OrganizationDetailsProvider, useOrganizationDetails } from './Context/Organizational Profile/SubStep2/Organization Details Context';
import { FacilityAddressProvider, useFacilityAddress } from './Context/Organizational Profile/SubStep2/Facility Address Context';
import { ElectricBillUploadProvider, useElectricBillUpload } from './Context/Energy Profile/SubStep2/Electric Bill Upload Context';
import { NaturalGasBillUploadProvider, useNaturalGasBillUpload } from './Context/Energy Profile/SubStep2/Natural Gas Bill Upload Context';
import { WaterBillUploadProvider, useWaterBillUpload } from './Context/Energy Profile/SubStep2/Water Bill Upload Context';
import { LOAProvider } from './Context/Energy Profile/SubStep2/Letter Of Authorization Context';
import { LOAStatusProvider } from './Context/Energy Profile/SubStep2/LOA - Status Context';
// import { ThermalEnergyNeedsIProvider } from './Context/Energy Profile/SubStep2/Thermal Energy Needs - I Context';
// import { ThermalEnergyNeedsIIProvider } from './Context/Energy Profile/SubStep2/Thermal Energy Needs - II Context';
// import { ThermalEnergyNeedsIIIProvider } from './Context/Energy Profile/SubStep2/Thermal Energy Needs - III Context';
// import { ThermalEnergyNeedsIVProvider } from './Context/Energy Profile/SubStep2/Thermal Energy Needs - IV Context';
// import { BoilerCogenerationProvider } from './Context/Energy Profile/SubStep2/Existing Boiler Cogeneration Context';
import { BillAddressProvider, useBillAddress } from './Context/Energy Profile/BillAddressContext';
import { updateOrganizationDetails, updateFacilityAddresses, uploadBillData, BillMetadata } from '../services/APIServices';

// Dashboard Context
import { DashboardDataProvider, useDashboardData } from './Context/DashboardDataContext';
import EmissionsReportTemplate from './components/EmissionsReportTemplate';
// import OrganizationDetails from './pages/SubStep1/Organization Details';
// import FacilityAddress from './pages/SubStep1/Facility Address';

const STEP_COMPONENTS = {
  organizationDetails: lazy(() =>
    import('./pages/SubStep1/Organization Details')
  ),
  facilityAddress: lazy(() =>
    import('./pages/SubStep1/Facility Address')
  ),
};

const AppContent: React.FC = () => {
    const {
        currentStep, setCurrentStep,
        currentSubStep, setCurrentSubStep,
        currentFurtherSubStep, setCurrentFurtherSubStep,
        visitedSteps, setVisitedSteps,
        completedSubSteps, setCompletedSubSteps,
        /* logout, */ bootstrap,
    } = useLocalAppContext();

    const { dashboardData, setDashboardData, isLoading, setIsLoading } = useDashboardData();

    const { toPDF, targetRef } = usePDF({ 
        filename: 'EmissionCheckIQ_Performance_Report.pdf',
        page: { format: 'A4' },
        method: 'save',
        resolution: 2 // Higher resolution for clearer text
    });

    const { organizationDetailsState } = useOrganizationDetails();
    const { facilityAddressState } = useFacilityAddress();
    const { electricBillUploadState } = useElectricBillUpload();
    const { naturalGasBillUploadState } = useNaturalGasBillUpload();
    const { waterBillUploadState } = useWaterBillUpload();
    const { bills, isNextDisabled } = useBillAddress();

    const getFacilityFlags = () => {
        const selectedAddresses = facilityAddressState.addresses.filter(addr => 
            facilityAddressState.selectedFacilityIds.includes(addr.id)
        );
        const hasElectric = selectedAddresses.some(addr => addr.billType.includes('electric'));
        const hasGas = selectedAddresses.some(addr => addr.billType.includes('natural_gas'));
        const hasWater = selectedAddresses.some(addr => addr.billType.includes('water'));
        return { selectedAddresses, hasElectric, hasGas, hasWater };
    };

    const { hasElectric, hasGas, hasWater } = getFacilityFlags();

    // const navigate = useNavigate();
    const [organizationId, setOrganizationId] = useState<string | null>(null);
    const [addressUuidMap, setAddressUuidMap] = useState<{ [key: string]: string }>({});
    const [hasHydratedFromBootstrap, setHasHydratedFromBootstrap] = useState(false);

    const markVisited = React.useCallback((step: number, subStep: number) => {
        setVisitedSteps((prev) => {
            const newVisited = [...prev];
            if (!newVisited[step]) newVisited[step] = [];
            newVisited[step][subStep] = true;
            return newVisited;
        });
    }, [setVisitedSteps]);

    const markCompleted = React.useCallback((step: number, subStep: number) => {
        setCompletedSubSteps((prev) => {
            const newCompleted = [...prev];
            if (!newCompleted[step]) newCompleted[step] = [];
            newCompleted[step][subStep] = true;
            return newCompleted;
        });
    }, [setCompletedSubSteps]);

    useEffect(() => {
        if (!bootstrap || hasHydratedFromBootstrap) return;

        try {
            const hasEmissions = Array.isArray(bootstrap.emissions) && bootstrap.emissions.length > 0;
            const hasOrgId = Boolean(bootstrap.organization?.id);

            if (hasEmissions) {
                setDashboardData(bootstrap.emissions.map((emission: any) => emission.emissions_json));
                markVisited(0, 1);
                markCompleted(0, 0);
                setCurrentStep(0);
                setCurrentSubStep(1);
                setCurrentFurtherSubStep(0);
            }

            if (hasOrgId) {
                setOrganizationId(String(bootstrap.organization.id));
            }

            if (hasEmissions || hasOrgId) {
                setHasHydratedFromBootstrap(true);
            }
        } catch (error) {
            console.error('Failed to hydrate dashboard from bootstrap:', error);
        }
    }, [
        bootstrap,
        hasHydratedFromBootstrap,
        markCompleted,
        markVisited,
        setCurrentStep,
        setCurrentSubStep,
        setCurrentFurtherSubStep,
        setDashboardData
    ]);

    useEffect(() => {
        if (hasHydratedFromBootstrap) {
            setIsLoading(false);
        }
    }, [hasHydratedFromBootstrap, setIsLoading]);

    // Error Modal
    const [errorModalOpen, setErrorModalOpen] = useState(false);
    const [errorTitle, setErrorTitle] = useState('Error');
    const [errorMsg, setErrorMsg] = useState('');

    const handleStepChange = (step: number, subStep: number = 0, furtherSubStep: number = 0) => {
        if (visitedSteps[step]?.[subStep]) {
            setCurrentStep(step);
            setCurrentSubStep(subStep);
            setCurrentFurtherSubStep(furtherSubStep);
        }
    };

    const handleSubStepChange = (subStep: number) => {
        if (visitedSteps[currentStep]?.[subStep]) {
            setCurrentSubStep(subStep);
            setCurrentFurtherSubStep(0);
        }
    };

    const submitBillData = async (
        electricFiles: File[], 
        gasFiles: File[], 
        waterFiles: File[],
        electricMetadata: BillMetadata[], 
        gasMetadata: BillMetadata[],
        waterMetadata: BillMetadata[],
        currentUuidMap: { [key: string]: string }
    ) => {
        const Files = [...electricFiles, ...gasFiles, ...waterFiles];
        const sources = [...electricFiles.map(() => 'grid'), ...gasFiles.map(() => 'gas'), ...waterFiles.map(() => 'water')];
        
        const electricUuids = electricMetadata.map(meta => {
             if (meta.addressId) {
                 return currentUuidMap[meta.addressId];
             }
             return null;
        });
        const gasUuids = gasMetadata.map(meta => {
             if (meta.addressId) {
                 return currentUuidMap[meta.addressId];
             }
             return null;
        });
        const waterUuids = waterMetadata.map(meta => {
             if (meta.addressId) {
                 return currentUuidMap[meta.addressId];
             }
             return null;
        });
        const uuidsForUpload = [...electricUuids, ...gasUuids, ...waterUuids].filter((uuid): uuid is string => uuid !== null);

        if (uuidsForUpload.length !== Files.length) {
             setErrorTitle('Facility Mapping Error');
             setErrorMsg("An internal error occurred: Could not map a facility to every file. Please review your uploads.");
             setErrorModalOpen(true);
             setIsLoading(false);
             return false;
        }

        setIsLoading(true);
        try {
             const apiResponse = await uploadBillData(Files, sources, uuidsForUpload);
             if (apiResponse && Array.isArray(apiResponse) && apiResponse.length > 0) {
                 setDashboardData(apiResponse);
                 return true;
             } else {
                 throw new Error("API returned invalid or empty dashboard data.");
             }
        } catch (error: any) {
             setErrorTitle('Bill Upload Failed');
             const status = error.response?.status || error.status;
             let friendlyError: string;
             switch (status) {
                 case 415: // Specific to this step
                     friendlyError = "File or uploaded data format not supported.";
                     break;
                 case 400:
                     friendlyError = "Invalid data provided for one or more fields.";
                     break;
                 case 422:
                     friendlyError = "Data provided in invalid format for one or more fields.";
                     break;
                 case 404:
                     friendlyError = "Resource not found.";
                     break;
                 case 500:
                     friendlyError = "Something went wrong. Please try after some time.";
                     break;
                 default:
                     friendlyError = error.message || "An unknown error occurred. Please try again.";
             }
             setErrorMsg(friendlyError);
             setErrorModalOpen(true);
             setIsLoading(false);
             return false;
        }
    };

    const handleNext = async () => {
        const isLastFurtherSubStep = currentFurtherSubStep === steps[currentStep].subSteps[currentSubStep].furtherSubSteps.length - 1;
        const isLastSubStep = currentSubStep === steps[currentStep].subSteps.length - 1;
        const isLastStep = currentStep === steps.length - 1;

        if (currentStep === steps.length - 1 && currentSubStep === steps[currentStep].subSteps.length - 1 && currentFurtherSubStep === steps[currentStep].subSteps[currentSubStep].furtherSubSteps.length - 1) {
             setIsLoading(true);
             console.log("Generating PDF Report...");
             try {
                await new Promise(resolve => setTimeout(resolve, 500)); 
                await toPDF();
             } catch (e) {
                console.error("PDF Generation failed", e);
                setErrorTitle("PDF Error");
                setErrorMsg("Failed to generate report. Please try again.");
                setErrorModalOpen(true);
             } finally {
                setIsLoading(false);
             }
             return; 
        }

        // Step 0: Save Org Details
        if (currentStep === 0 && currentSubStep === 0 && currentFurtherSubStep === 0) {
            setIsLoading(true);
            try {
                const orgId = await updateOrganizationDetails(organizationDetailsState);
                setOrganizationId(orgId);
            } catch (error: any) {
                setErrorTitle('Save Organization Failed');
                
                const status = error.response?.status || error.status;
                let friendlyError: string;
                switch (status) {
                    case 400:
                        friendlyError = "Invalid data provided for one or more fields.";
                        break;
                    case 422:
                        friendlyError = "Data provided in invalid format for one or more fields.";
                        break;
                    case 404:
                        friendlyError = "Resource not found.";
                        break;
                    case 500:
                        friendlyError = "Something went wrong. Please try after some time.";
                        break;
                    default:
                        friendlyError = error.message || "An unknown error occurred. Please try again.";
                }
                setErrorMsg(friendlyError);

                setErrorModalOpen(true);
                setIsLoading(false);
                return; 
            }
            setIsLoading(false);
        }

        // Step 0: Facility Addresses
        if (currentStep === 0 && currentSubStep === 0 && currentFurtherSubStep === 1) {
            if (!organizationId) {
                setErrorTitle('Facility Address Save Failed');
                setErrorMsg("Organization ID not found. Cannot update addresses.");
                setErrorModalOpen(true);
                return;
            }

            const { selectedAddresses, hasElectric } = getFacilityFlags();

            if (selectedAddresses.length === 0) {
                 setErrorTitle('No Facility Selected');
                 setErrorMsg("Please select at least one facility to continue.");
                 setErrorModalOpen(true);
                 return;
            }

            const addressesPayload = selectedAddresses.map(({ id, position, ...address }) => ({
                houseNumber: address.houseNumber || '',
                streetAddress: address.road || '',
                city: address.city || '',
                state: address.state || '',
                zipCode: address.zipCode || '',
                areaSqFt: address.areaSqFt || '',
                operationalStart: address.operationalStart || '',
                operationalEnd: address.operationalEnd || '',
                organizationId: organizationId,
                placeId: address.placeId || '',
                position: position ? { lat: position.lat, lng: position.lng } : null,
                billType: address.billType
            }));
            
            setIsLoading(true);
            try {
                const response = await updateFacilityAddresses(addressesPayload);
                const newMap: { [key: string]: string } = {};
                selectedAddresses.forEach((address, index) => {
                    newMap[address.id] = response.facility_ids[index];
                });
                
                setAddressUuidMap(newMap);
                
                if (hasElectric) {
                } else {
                    setCurrentFurtherSubStep(3);
                    markVisited(0, 3);
                    setIsLoading(false);
                    return;
                }

            } catch (error: any) {
                setErrorTitle('Save Facility Addresses Failed');
                
                const status = error.response?.status || error.status;
                let friendlyError: string;
                switch (status) {
                    case 409:
                        friendlyError = "Invalid ZipCode/Address data provided.";
                        break;
                    case 400:
                        friendlyError = "Invalid data provided for one or more fields.";
                        break;
                    case 422:
                        friendlyError = "Data provided in invalid format for one or more fields.";
                        break;
                    case 404:
                        friendlyError = "Resource not found.";
                        break;
                    case 500:
                        friendlyError = "Something went wrong. Please try after some time.";
                        break;
                    default:
                        friendlyError = error.message || "An unknown error occurred. Please try again.";
                }
                setErrorMsg(friendlyError);
                
                setErrorModalOpen(true);
                setIsLoading(false);
                return;
            }
            setIsLoading(false);
        }

        const gatherBillData = () => {
             const billsWithAddress = bills.filter(bill => bill.addressId);
             const electricBillMetadataList: BillMetadata[] = billsWithAddress.filter(bill => bill.type === 'grid').map(bill => ({ ...bill, size: bill.size.toString(), addressId: bill.addressId! }));
             const gasBillMetadataList: BillMetadata[] = billsWithAddress.filter(bill => bill.type === 'gas').map(bill => ({ ...bill, size: bill.size.toString(), addressId: bill.addressId! }));
             const waterBillMetadataList: BillMetadata[] = billsWithAddress.filter(bill => bill.type === 'water').map(bill => ({ ...bill, size: bill.size.toString(), addressId: bill.addressId! }));
             
             const electricBillNames = new Set(electricBillMetadataList.map(bill => bill.name));
             const electricFiles = electricBillUploadState.files.filter(file => electricBillNames.has(file.name));
             
             const gasBillNames = new Set(gasBillMetadataList.map(bill => bill.name));
             const gasFiles = naturalGasBillUploadState.files.filter(file => gasBillNames.has(file.name));

             const waterBillNames = new Set(waterBillMetadataList.map(bill => bill.name));
             const waterFiles = waterBillUploadState.files.filter(file => waterBillNames.has(file.name));

             return { electricFiles, gasFiles, waterFiles, electricBillMetadataList, gasBillMetadataList, waterBillMetadataList };
        };

        // Step 0: Bill Uploads (Water)
        if (currentStep === 0 && currentSubStep === 0 && currentFurtherSubStep === 7) {
             const { electricFiles, gasFiles, waterFiles, electricBillMetadataList, gasBillMetadataList, waterBillMetadataList } = gatherBillData();
             const success = await submitBillData(electricFiles, gasFiles, waterFiles, electricBillMetadataList, gasBillMetadataList, waterBillMetadataList, addressUuidMap);
             if (!success) return;
             setIsLoading(false);
        }

        // Step 0: Bill Uploads (Natural Gas)
        if (currentStep === 0 && currentSubStep === 0 && currentFurtherSubStep === 6) {
             const { hasWater } = getFacilityFlags();
             if (hasWater) {
                 setCurrentFurtherSubStep(7);
                 markVisited(0, 7);
                 return;
             } else {
                 const { electricFiles, gasFiles, waterFiles, electricBillMetadataList, gasBillMetadataList, waterBillMetadataList } = gatherBillData();
                 const success = await submitBillData(electricFiles, gasFiles, waterFiles, electricBillMetadataList, gasBillMetadataList, waterBillMetadataList, addressUuidMap);
                 if (!success) return;
                 setIsLoading(false);

                 markCompleted(0, 0);
                 setCurrentSubStep(1);
                 setCurrentFurtherSubStep(0);
                 markVisited(0, 1);
                 return;
             }
        }

        // Step 0: Electric Bill Upload
        if (currentStep === 0 && currentSubStep === 0 && currentFurtherSubStep === 2) {
            markCompleted(0, 0);
            const hasFiles = electricBillUploadState.fileMetadata.length > 0;
            const { hasGas, hasWater } = getFacilityFlags();

            console.log("Electric Bill Files Uploaded:", hasFiles, "Has Gas:", hasGas, "Has Water:", hasWater);
            
            if (hasFiles) {
                if (hasGas) {
                    setCurrentStep(0);
                    setCurrentSubStep(0);
                    setCurrentFurtherSubStep(6);
                    markVisited(0, 6);
                } else if (hasWater) {
                    setCurrentStep(0);
                    setCurrentSubStep(0);
                    setCurrentFurtherSubStep(7);
                    markVisited(0, 7);
                } else {
                    const { electricFiles, gasFiles, waterFiles, electricBillMetadataList, gasBillMetadataList, waterBillMetadataList } = gatherBillData();
                    const success = await submitBillData(electricFiles, gasFiles, waterFiles, electricBillMetadataList, gasBillMetadataList, waterBillMetadataList, addressUuidMap);
                    
                    if (success) {
                        setCurrentStep(0);
                        setCurrentSubStep(1);
                        setCurrentFurtherSubStep(0);
                        markVisited(0, 1);
                        markCompleted(0, 0);
                    }
                    setIsLoading(false);
                }
                return;
            } else {
                setCurrentFurtherSubStep(3);
                markVisited(0, 3);
                return;
            }
        }

        // Step 0: LOA Status - Intercept transition to Gas/Water
        if (currentStep === 0 && currentSubStep === 0 && currentFurtherSubStep === 5) {
             const { hasGas, hasWater } = getFacilityFlags();
             if (hasGas) {
                 setCurrentStep(0);
                 setCurrentSubStep(0);
                 setCurrentFurtherSubStep(6);
                 markVisited(0, 6);
                 return;
             } else if (hasWater) {
                 setCurrentStep(0);
                 setCurrentSubStep(0);
                 setCurrentFurtherSubStep(7);
                 markVisited(0, 7);
                 return;
             } else {
                 const { electricFiles, gasFiles, waterFiles, electricBillMetadataList, gasBillMetadataList, waterBillMetadataList } = gatherBillData();
                 const success = await submitBillData(electricFiles, gasFiles, waterFiles, electricBillMetadataList, gasBillMetadataList, waterBillMetadataList, addressUuidMap);
                 
                 if (success) {
                     setCurrentStep(0);
                     setCurrentSubStep(1);
                     setCurrentFurtherSubStep(0);
                     markVisited(0, 1);
                     markCompleted(0, 0);
                 }
                 return;
             }
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
        // Back from Water (7)
        if (currentStep === 0 && currentSubStep === 0 && currentFurtherSubStep === 7) {
            const { hasGas } = getFacilityFlags();
            if (hasGas) {
                setCurrentFurtherSubStep(6);
                return;
            } else {
                const hasElectricFiles = electricBillUploadState.fileMetadata.length > 0;
                if (hasElectricFiles) {
                    setCurrentFurtherSubStep(2);
                } else {
                    setCurrentFurtherSubStep(5);
                }
                return;
            }
        }

        // Back from Gas (6)
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
            setCurrentFurtherSubStep(steps[currentStep].subSteps[prevSubStep].furtherSubSteps.length - 1);
        } else if (currentStep > 0) {
            const prevStep = currentStep - 1;
            const lastSubStepOfPrevStep = steps[prevStep].subSteps.length - 1;
            setCurrentStep(prevStep);
            setCurrentSubStep(lastSubStepOfPrevStep);
            setCurrentFurtherSubStep(steps[prevStep].subSteps[lastSubStepOfPrevStep].furtherSubSteps.length - 1);
        }
    };

    const calculateProgress = () => {
        const totalFurtherSubSteps = steps[currentStep]?.subSteps?.[currentSubStep]?.furtherSubSteps?.length || 1;
        return ((currentFurtherSubStep + 1) / totalFurtherSubSteps) * 100;
    };

    const { logoutForProduct } = useLocalAppContext();

    const handleLogout = () => {
        const isEmissionCheckIQ = window.location.pathname.startsWith('/emissioncheckiq');
        logoutForProduct(isEmissionCheckIQ ? "emissioncheckiq" : "bradley");
    };

    const handleSaveAndContinueLater = () => {
        handleLogout();
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

    // Sleek, minimal modal style
    const modalStyle = {
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        minWidth: 270,
        maxWidth: 340,
        bgcolor: '#f9f9fb',
        borderRadius: 2.5,
        boxShadow: '0 4px 20px rgba(60,60,60,0.10)',
        outline: 'none',
        p: 0,
        fontFamily: "'Nunito Sans', sans-serif",
        overflow: 'hidden'
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'row', height: '100vh', zIndex: 500 }}>

            <div style={{ position: 'absolute', top: -99999, left: -99999 }}>
                <EmissionsReportTemplate ref={targetRef} data={dashboardData} />
            </div>

            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 0, position: 'absolute', backdropFilter: 'blur(3px)', display: 'flex', flexDirection: 'column', gap: 2 }}
                open={isLoading}
            >
                <CircularProgress color="inherit" />
                <Typography variant="h6" sx={{ fontFamily: 'Nunito Sans, sans-serif' }}>{loadingMessages[loadingMessageIndex]}</Typography>
            </Backdrop>

            {/* Sleek Error Modal */}
            <Modal
                open={errorModalOpen}
                onClose={() => setErrorModalOpen(false)}
                aria-labelledby="error-modal-title"
                aria-describedby="error-modal-description"
                closeAfterTransition
            >
                <Box sx={modalStyle}>
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            px: 2,
                            py: 1.3,
                            borderBottom: '1px solid #eeecec',
                            fontFamily: "'Nunito Sans',sans-serif",
                            fontWeight: 500,
                            fontSize: '0.98rem',
                            color: '#555',
                            background: '#f6f6fa',
                            position: 'relative'
                        }}
                    >
                        {errorTitle}
                        <IconButton
                            aria-label="close"
                            onClick={() => setErrorModalOpen(false)}
                            sx={{
                                position: 'absolute',
                                right: 8,
                                top: 7,
                                padding: 0.3,
                                color: '#8a8a8a'
                            }}
                            size="small"
                        >
                            <CloseIcon fontSize="small" />
                        </IconButton>
                    </Box>
                    <Box sx={{
                        px: 2,
                        pb: 2.2,
                        pt: 1.3,
                        fontFamily: "'Nunito Sans',sans-serif",
                        bgcolor: '#f9f9fb'
                    }}>
                        <Typography
                            sx={{
                                fontFamily: "'Nunito Sans',sans-serif",
                                color: '#666',
                                fontSize: '0.88rem',
                                fontWeight: 400,
                                letterSpacing: '0.01em',
                                marginBottom: '0.2em'
                            }}
                            id="error-modal-description"
                        >
                            {errorMsg}
                        </Typography>
                    </Box>
                </Box>
            </Modal>

            <Navbar
              OrganizationDetailsComponent={STEP_COMPONENTS.organizationDetails}
              FacilityAddressComponent={STEP_COMPONENTS.facilityAddress}
            />
            <Box sx={{ display: 'flex', flexGrow: 1, mt: '64px', width: '100vw' }}>
                <Box sx={{ width: '210px', flexShrink: 0 }}>
                    <Sidebar 
                        currentStep={currentStep} 
                        currentSubStep={currentSubStep} 
                        currentFurtherSubStep={currentFurtherSubStep} 
                        visitedSteps={visitedSteps}
                        onStepChange={handleStepChange}
                        hasElectricFiles={electricBillUploadState.fileMetadata.length > 0}
                        hasElectric={hasElectric}
                        hasGas={hasGas}
                        hasWater={hasWater}
                    />
                </Box>
                <Box component="main" sx={{ flexGrow: 1, p: 4, bgcolor: '#f5f5f5', overflowX: 'auto', scrollbarWidth: 'none' }}>
                    <Box sx={{ mt: 1, pl: 2, pb: 1, pt: 3, mb: 7, ml: 8, mr: 5, borderRadius: '8px', bgcolor: 'white', boxShadow: 1, color: 'black', display: 'flex' }}>
                        <Box sx={{ flexGrow: 1 }}>
                            <HorizontalStepper currentSubStep={currentSubStep} totalSubSteps={steps[currentStep]?.subSteps?.length} visitedSteps={visitedSteps[currentStep]} completedSubSteps={completedSubSteps[currentStep]} onSubStepChange={handleSubStepChange} currentStep={currentStep} />
                            <LinearProgress variant="determinate" value={calculateProgress()} sx={{ width: 'calc(100% + 16px)', height: '3.5px', margin: '0px -16px', mt: '30px', mb: '10px', backgroundColor: '#e0e0e0', '& .MuiLinearProgress-bar': { backgroundColor: '#036cc1' } }} />
                            <StepContent step={currentStep} subStep={currentSubStep} furtherSubStep={currentFurtherSubStep} />
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3, mr: 5.2, ml: 1, mb: 1 }}>
                                {!(currentStep === steps.length - 1 && currentSubStep === steps[currentStep].subSteps.length - 1 && currentFurtherSubStep === steps[currentStep].subSteps[currentSubStep].furtherSubSteps.length - 1) && (
                                    <Tooltip title="Navigate to previous step" placement='bottom' arrow>
                                        <Button variant="outlined" onClick={handleBack} disabled={currentStep === 0 && currentSubStep === 0 && currentFurtherSubStep === 0} sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.75rem', padding: '2px 10px', minWidth: '10px', maxHeight: '25px', textTransform: 'none', '&:focus': { outline: 'none' } }}>Back</Button>
                                    </Tooltip>
                                )}
                                <Box sx={{ display: 'flex', gap: 1, ml: 'auto' }}>
                                    {!(currentStep === steps.length - 1 && currentSubStep === steps[currentStep].subSteps.length - 1 && currentFurtherSubStep === steps[currentStep].subSteps[currentSubStep].furtherSubSteps.length - 1) && (
                                        <Tooltip title="Save progress and log out" placement='bottom' arrow>
                                            <Button variant="outlined" onClick={handleSaveAndContinueLater} sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.75rem', padding: '2px 10px', minWidth: '10px', maxHeight: '25px', textTransform: 'none', '&:focus': { outline: 'none' } }}>Save and Continue Later</Button>
                                        </Tooltip>
                                    )}
                                    <Tooltip title={(currentStep === 0 && currentSubStep === 0 && currentFurtherSubStep === 6 && isNextDisabled()) ? "You haven't uploaded bills for all addresses. Upload at least one bill for every address first." : (currentStep === steps.length - 1 && currentSubStep === steps[currentStep].subSteps.length - 1 && currentFurtherSubStep === steps[currentStep].subSteps[currentSubStep].furtherSubSteps.length - 1 ? "Click to download your report." : "Navigate to next step")} placement='bottom' arrow>
                                        <span>
                                            <Button 
                                                variant="contained" 
                                                color="primary" 
                                                onClick={(event) => {
                                                    event.preventDefault();
                                                    (currentStep === steps.length - 1 && currentSubStep === steps[currentStep].subSteps.length - 1 && currentFurtherSubStep === steps[currentStep].subSteps[currentSubStep].furtherSubSteps.length - 1) ? toPDF() : handleNext();
                                                }} 
                                                disabled={currentStep === 0 && currentSubStep === 0 && currentFurtherSubStep === 6 && isNextDisabled()} 
                                                sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.75rem', padding: '2px 10px', minWidth: '10px', maxHeight: '25px', textTransform: 'none', boxShadow: 'none', '&:focus': { outline: 'none' } }}
                                            >
                                                {currentStep === steps.length - 1 && currentSubStep === steps[currentStep].subSteps.length - 1 && currentFurtherSubStep === steps[currentStep].subSteps[currentSubStep].furtherSubSteps.length - 2 ? ("Generate Report") :
                                                 currentStep === steps.length - 1 && currentSubStep === steps[currentStep].subSteps.length - 1 && currentFurtherSubStep === steps[currentStep].subSteps[currentSubStep].furtherSubSteps.length - 1 ? ("Download Report") :
                                                 currentStep === 1 && currentSubStep === 1 && currentFurtherSubStep === 2 ? ("Authorize & Send Request") :
                                                 currentStep === 5 && currentSubStep === 0 && currentFurtherSubStep === 0 ? ("Submit") : ("Next")}
                                            </Button>
                                        </span>
                                    </Tooltip>
                                </Box>
                            </Box>
                        </Box>
                        <ChatBot />
                    </Box>
                </Box>
            </Box>
            <Footer />
        </Box>
    );
};

const DemoApp: React.FC = () => {
    const { bootstrap } = useGlobalAppContext();

    return (
        <AppProvider steps={steps} appPrefix="emissioncheckiq" initialBootstrap={bootstrap}>
            <ApiPrePinger />
            <DashboardDataProvider>
                <OrganizationDetailsProvider>
                    <FacilityAddressProvider>
                        <ElectricBillUploadProvider>
                            <NaturalGasBillUploadProvider>
                                <WaterBillUploadProvider>
                                <LOAProvider>
                                    <LOAStatusProvider>
                                        {/* <ThermalEnergyNeedsIProvider>
                                            <ThermalEnergyNeedsIIProvider>
                                                <ThermalEnergyNeedsIIIProvider>
                                                    <ThermalEnergyNeedsIVProvider>
                                                        <BoilerCogenerationProvider> */}
                                                            <BillAddressProvider appPrefix="emissioncheckiq">
                                                                <AppContent />
                                                            </BillAddressProvider>
                                                        {/* </BoilerCogenerationProvider>
                                                    </ThermalEnergyNeedsIVProvider>
                                                </ThermalEnergyNeedsIIIProvider>
                                            </ThermalEnergyNeedsIIProvider>
                                        </ThermalEnergyNeedsIProvider> */}
                                    </LOAStatusProvider>
                                </LOAProvider>
                                </WaterBillUploadProvider>
                            </NaturalGasBillUploadProvider>
                        </ElectricBillUploadProvider>
                    </FacilityAddressProvider>
                </OrganizationDetailsProvider>
            </DashboardDataProvider>
        </AppProvider>
    );
};

export default DemoApp;
