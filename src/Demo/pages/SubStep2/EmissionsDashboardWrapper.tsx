import React, { useEffect, useState, useRef, useMemo } from 'react';
import { Box, CircularProgress, Typography, Backdrop } from '@mui/material';
import { useDashboardData, type DashboardData, type DashboardDataObject, type SRECMetrics } from '../../Context/DashboardDataContext';
import EmissionsDashboard from './EmissionsDashboard';

const loadingMessages = [
    "Recalculating emissions based on new parameters...",
    "Analyzing DER (Distributed Energy Resources) impact...",
    "Fetching updated projections from the server...",
    "Calculating SREC impact...",
];

const EmissionsDashboardWrapper: React.FC = () => {
    const { dashboardData, setDashboardData, isLoading: isInitialLoading } = useDashboardData();

    const socketRef = useRef<WebSocket | null>(null);
    const retryTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    const activeIdRef = useRef<string>('');

    const [isUpdating, setIsUpdating] = useState(false);
    const [isFiltering, setIsFiltering] = useState(false); 
    const [loadingMessageIndex, setLoadingMessageIndex] = useState(0);
    const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

    const [selectedLocation, setSelectedLocation] = useState<string>('');
    // const [selectedSource, setSelectedSource] = useState<string>('');
    const [selectedYear, setSelectedYear] = useState<number | string>('');

    const [activeData, setActiveData] = useState<DashboardDataObject | null>(null);

    // --- State for Tab 4 now lives in the wrapper and is stored in maps ---
    const [projectSelections, setProjectSelections] = useState<{ [locationSourceKey: string]: { [key: string]: boolean } }>({});
    const [srecPercentages, setSrecPercentages] = useState<{ [locationSourceKey: string]: number }>({});
    const [srecMetricsMap, setSrecMetricsMap] = useState<{ [locationSourceKey: string]: SRECMetrics | null }>({});

    const [derMetricsMap, setDerMetricsMap] = useState<{ [id: string]: any }>({});
    
    const currentDataKey = useMemo(() => {
        if (!activeData) return 'default';
        return activeData._id; 
    }, [activeData]);


    const uniqueLocations = useMemo(() => {
        if (!dashboardData) return [];
        return Array.from(new Set(dashboardData.map(d => d.location)));
    }, [dashboardData]);

    // const availableSources = useMemo(() => {
    //     if (!dashboardData || !selectedLocation) return [];
    //     return Array.from(new Set(
    //         dashboardData.filter(d => d.location === selectedLocation).map(d => d.source)
    //     ));
    // }, [dashboardData, selectedLocation]);

    const nextData = useMemo(() => {
        if (!dashboardData || dashboardData.length === 0) return null;

        // If no selectedLocation yet, just default to first item
        if (selectedLocation === "") return dashboardData[0];

        // Otherwise pick the matching location, else fallback to first
        return dashboardData.find(d => d.location === selectedLocation) || dashboardData[0];
        }, [dashboardData, selectedLocation]);



    const availableYears = useMemo(() => {
        if (!dashboardData) return []; 
        // CHANGE: Aggregate years from ALL data files to allow year selection across disparate datasets
        const years = new Set<number>();
        dashboardData.forEach(d => {
            d.monthly_tracking?.monthly_emissions?.forEach(em => {
                years.add(Number(em.year));
            });
        });
        return Array.from(years).sort((a, b) => b - a);
    }, [dashboardData]);

    useEffect(() => {
        if (!dashboardData || dashboardData.length === 0) return;

        // Always ensure selectedLocation is initialized
        if (selectedLocation === "") {
            setSelectedLocation(dashboardData[0]?.location ?? "");
        }
    }, [dashboardData, selectedLocation]);


    useEffect(() => {
        if (activeData && activeData._id) {
            activeIdRef.current = activeData._id;
        }
    }, [activeData]);

    // useEffect(() => {
    //     if (selectedLocation) {
    //         if (availableSources.length > 0) {
    //             if (!availableSources.includes(selectedSource)) {
    //                 setSelectedSource(availableSources[0]);
    //             }
    //         } else {
    //             setSelectedSource('');
    //         }
    //     }
    // }, [selectedLocation, availableSources, selectedSource]);

    useEffect(() => {
        if (availableYears.length > 0 && !availableYears.includes(Number(selectedYear))) {
            setSelectedYear(availableYears[0]);
        } else if (availableYears.length === 0 && selectedYear !== '') {
            setSelectedYear('');
        }
        
        if (nextData) {
            setActiveData(nextData);
            // const key = `${nextData.location}-${nextData.source}`;
            const key = nextData._id; 

            setProjectSelections(prev => ({
                ...prev,
                [key]: prev[key] || {} 
            }));
            setSrecPercentages(prev => ({
                ...prev,
                [key]: 0 
            }));
            setSrecMetricsMap(prev => ({
                ...prev,
                [key]: prev[key] || nextData.srec_metrics 
            }));
            
            setIsFiltering(false); 
        }
    }, [availableYears, selectedYear, nextData]); 

    useEffect(() => {
        let connectAttempts = 0;
        const maxConnectAttempts = 4;
        const retryDelays = [3000, 6000, 10000];

        const connect = () => {
            if (socketRef.current || connectAttempts >= maxConnectAttempts) return;

            const socketURL = import.meta.env.VITE_WS_URL || 'ws://localhost:8000/ws';
            const socketInstance = new WebSocket(socketURL);
            socketRef.current = socketInstance;

            socketInstance.onopen = () => {
                console.log("WebSocket connected.");
                connectAttempts = 0;
            };

            socketInstance.onmessage = (event) => {
                setIsUpdating(false);
                try {
                    const receivedData = JSON.parse(event.data);
                    
                    if (Array.isArray(receivedData)) {
                        setDashboardData(receivedData as DashboardData);
                        return;
                    }

                    // if (receivedData.type && activeData) {
                    //     const key = activeData._id;
                    //     let updatedObject: DashboardDataObject | null = null;

                    //     switch (receivedData.type) {
                    //         case "pid_result":
                    //             updatedObject = {
                    //                 ...activeData,
                    //                 der_control_panel: receivedData.payload.der_control_panel
                    //             };
                    //             break;
                            
                    //         case "srec_result":
                    //             const newSrecMetrics = receivedData.payload as SRECMetrics;
                    //             setSrecMetricsMap(prev => ({
                    //                 ...prev,
                    //                 [key]: newSrecMetrics
                    //             }));
                    //             updatedObject = { ...activeData };
                    //             break;
                            
                    //         default:
                    //             return;
                    //     }

                    //     if (updatedObject) {
                    //         setActiveData(updatedObject); 
                    //         setDashboardData((prevDashboardData) => {
                    //             if (!prevDashboardData) return null;
                    //             return prevDashboardData.map(item => 
                    //                 // String(item.file_id) === String(activeData.file_id) ? updatedObject! : item
                    //                 String(item._id) === String(activeData._id) ? updatedObject! : item
                    //             );
                    //         });
                    //     }
                    // }

                    if (receivedData.type) {
                        const payloadId = receivedData.payload?.file_id || receivedData.payload?._id || activeIdRef.current;

                        console.log(`WS Received ${receivedData.type} for ID: ${payloadId}`); // Debug log

                        if (!payloadId) return;

                        // Handle SREC separately (It updates a local map, not the main data immediately)
                        if (receivedData.type === "srec_result") {
                             setSrecMetricsMap(prev => ({ 
                                 ...prev, 
                                 [payloadId]: receivedData.payload 
                             }));
                             return; // Done for SREC
                        }

                        if (receivedData.type === "pid_result") {
                            setDerMetricsMap(prev => ({
                                ...prev,
                                [payloadId]: receivedData.payload.der_control_panel
                            }));
                            return; // Done for PID
                        }
                        
                        setDashboardData((prevDashboardData) => {
                            if (!prevDashboardData) return null;
                            
                            const index = prevDashboardData.findIndex(item => String(item._id) === String(payloadId));
                            if (index === -1) return prevDashboardData;

                            const newItem = { ...prevDashboardData[index] };

                            if (receivedData.type === "pid_result") {
                                newItem.der_control_panel = receivedData.payload.der_control_panel;
                            } else if (receivedData.type === "srec_result") {
                                setSrecMetricsMap(prev => ({ ...prev, [newItem._id]: receivedData.payload }));
                                // newItem.srec_metrics = receivedData.payload;
                            }
                            
                            const newList = [...prevDashboardData];
                            newList[index] = newItem;

                            if (String(activeIdRef.current) === String(payloadId)) {
                                setActiveData(newItem);
                            }

                            return newList;
                        });
                    }

                } catch (error) {
                    console.error("Failed to parse WebSocket message:", error);
                }
            };

            socketInstance.onclose = () => {
                socketRef.current = null;
                if (connectAttempts < maxConnectAttempts) {
                    retryTimeoutRef.current = setTimeout(connect, retryDelays[connectAttempts]);
                    connectAttempts++;
                }
            };

            socketInstance.onerror = (error) => {
                console.error("WebSocket error:", error);
                socketInstance.close();
            };
        };

        connect();

        return () => {
            if (retryTimeoutRef.current) clearTimeout(retryTimeoutRef.current);
            if (socketRef.current) {
                socketRef.current.onclose = null;
                socketRef.current.close();
                socketRef.current = null;
            }
        };
    }, [setDashboardData/* , activeData */]);

    useEffect(() => {
        if (isUpdating || isFiltering) { 
            const timer = setInterval(() => {
                setLoadingMessageIndex(prev => (prev + 1) % loadingMessages.length);
            }, 3000);
            return () => clearInterval(timer);
        }
    }, [isUpdating, isFiltering]);

    const handleConfirmChanges = (newUserMix: { [key: string]: number }, targetId: string) => {
        const dataForPayload = dashboardData?.find(d => String(d._id) === String(targetId));
        
        if (socketRef.current?.readyState === WebSocket.OPEN && dataForPayload) {
            const requestPayload = {
                type: "pid_request", 
                // source: dataForPayload.source,
                zipcode: dataForPayload.zipcode, 
                location: dataForPayload.location,
                id: String(dataForPayload.emission_id),
                current_mix_pct: newUserMix
            };
            console.log("Sending PID request payload:", requestPayload);
            socketRef.current.send(JSON.stringify(requestPayload));
            setIsUpdating(true);
            setHasUnsavedChanges(false);
        }
    };

    // const handleSourceChange = (newSource: string) => {
    //     if (newSource !== selectedSource) {
    //         setSelectedSource(newSource);
    //     }
    // };

    const handleSrecChangeCommitted = (percentage: number, targetData?: DashboardDataObject | null) => {
        const dataContext = targetData || activeData;
        if (socketRef.current?.readyState === WebSocket.OPEN && dataContext) {
            if (percentage === 0) {
                setSrecMetricsMap(prev => ({
                    ...prev,
                    [dataContext._id]: dataContext.srec_metrics
                }));
                return; 
            }
            const requestPayload = {
                type: "srec_calc",
                // source: activeData.source,
                zipcode: dataContext?.zipcode,
                location: dataContext?.location,
                id: String(dataContext?.emission_id),
                percentage_selected: percentage
            };
            console.log("Sending SREC calculation request:", requestPayload);
            socketRef.current.send(JSON.stringify(requestPayload));
            setIsUpdating(true); 
        }
    };

    const handleSrecPercentageChange = (value: number) => {
        setSrecPercentages(prev => ({
            ...prev,
            [currentDataKey]: value
        }));
    };

    const handleProjectSelectChange = (formattedKey: string) => {
        setProjectSelections(prev => {
            const currentSelections = prev[currentDataKey] || {};
            return {
                ...prev,
                [currentDataKey]: {
                    ...currentSelections,
                    [formattedKey]: !currentSelections[formattedKey], 
                }
            };
        });
    };

    if (isInitialLoading) return <Box display="flex" justifyContent="center" alignItems="center" height="80vh"><CircularProgress /></Box>;
    if (!dashboardData || dashboardData.length === 0) return <Box display="flex" justifyContent="center" alignItems="center" height="80vh" flexDirection="column"><Typography variant="h6" color="textSecondary">No dashboard data available.</Typography></Box>;
    if (!activeData) return <Box display="flex" justifyContent="center" alignItems="center" height="80vh" flexDirection="column" gap={2}><CircularProgress /><Typography variant="h6" color="textSecondary">Loading dashboard...</Typography></Box>;

    const currentSrecMetrics = srecMetricsMap[currentDataKey] || activeData?.srec_metrics || null;
    const currentDerMetrics = derMetricsMap[currentDataKey] || null;

    return (
        <Box>
            <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.modal + 1, backdropFilter: 'blur(3px)', display: 'flex', flexDirection: 'column', gap: 2 }} open={isUpdating || isFiltering}>
                <CircularProgress color="inherit" />
                <Typography variant="h6">{loadingMessages[loadingMessageIndex]}</Typography>
            </Backdrop>
            <EmissionsDashboard
                allData={dashboardData} 
                onConfirmChanges={handleConfirmChanges}
                hasUnsavedChanges={hasUnsavedChanges}
                setHasUnsavedChanges={setHasUnsavedChanges}
                selectedLocation={selectedLocation}
                onLocationChange={setSelectedLocation}
                selectedLocations={uniqueLocations}
                onLocationsChange={(locations: string[]) => {
                    if (!locations.includes(selectedLocation)) {
                        setSelectedLocation(locations[0] || '');
                    }
                }}
                // selectedSource={selectedSource}
                // onSourceChange={handleSourceChange}
                selectedYear={selectedYear}
                onYearChange={setSelectedYear}
                projectSelections={projectSelections[currentDataKey] || {}}
                onProjectSelectChange={handleProjectSelectChange}
                srecPercentage={srecPercentages[currentDataKey] || 0}
                onSrecPercentageChange={handleSrecPercentageChange} 
                onSrecChangeCommitted={handleSrecChangeCommitted} 
                calculatedSrecMetrics={currentSrecMetrics} 
                calculatedDer={currentDerMetrics}
            />
        </Box>
    );
};

export default EmissionsDashboardWrapper;