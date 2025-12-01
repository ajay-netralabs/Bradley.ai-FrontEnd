import React, { useEffect, useState, useRef, useMemo } from 'react';
import { Box, CircularProgress, Typography, Backdrop } from '@mui/material';
import { useDashboardData, type DashboardData, type DashboardDataObject, type SRECMetrics } from '../../../../Context/DashboardDataContext';
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

    const [isUpdating, setIsUpdating] = useState(false);
    const [isFiltering, setIsFiltering] = useState(false); 
    const [loadingMessageIndex, setLoadingMessageIndex] = useState(0);
    const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

    const [selectedLocation, setSelectedLocation] = useState<string>('');
    const [selectedSource, setSelectedSource] = useState<string>('');
    const [selectedYear, setSelectedYear] = useState<number | string>('');

    const [activeData, setActiveData] = useState<DashboardDataObject | null>(null);

    // --- State for Tab 4 now lives in the wrapper and is stored in maps ---
    // This ensures state is persistent when switching between locations/sources
    const [projectSelections, setProjectSelections] = useState<{ [locationSourceKey: string]: { [key: string]: boolean } }>({});
    const [srecPercentages, setSrecPercentages] = useState<{ [locationSourceKey: string]: number }>({});
    const [srecMetricsMap, setSrecMetricsMap] = useState<{ [locationSourceKey: string]: SRECMetrics | null }>({});
    
    // Create a stable key for the current view
    const currentDataKey = useMemo(() => {
        if (!selectedLocation || !selectedSource) return 'default';
        return `${selectedLocation}-${selectedSource}`;
    }, [selectedLocation, selectedSource]);
    // --- End State Updates ---


    const uniqueLocations = useMemo(() => {
        if (!dashboardData) return [];
        return Array.from(new Set(dashboardData.map(d => d.location)));
    }, [dashboardData]);

    const availableSources = useMemo(() => {
        if (!dashboardData || !selectedLocation) return [];
        return Array.from(new Set(
            dashboardData.filter(d => d.location === selectedLocation).map(d => d.source)
        ));
    }, [dashboardData, selectedLocation]);

    const nextData = useMemo(() => {
        if (!dashboardData || !selectedLocation || !selectedSource) return null;
        return dashboardData.find(d => d.location === selectedLocation && d.source === selectedSource) || null;
    }, [dashboardData, selectedLocation, selectedSource]);


    const availableYears = useMemo(() => {
        if (!nextData) return []; 
        const years = new Set(nextData.monthly_tracking.monthly_emissions.map(em => em.year as number));
        return Array.from(years).sort((a, b) => b - a);
    }, [nextData]);

    // Effect 1: Set initial location
    useEffect(() => {
        if (uniqueLocations.length > 0 && !selectedLocation) {
            setSelectedLocation(uniqueLocations[0]);
        }
    }, [uniqueLocations, selectedLocation]);

    // Effect 2: Set source based on location
    useEffect(() => {
        if (selectedLocation) {
            setIsFiltering(true); 
            if (availableSources.length > 0) {
                if (!availableSources.includes(selectedSource)) {
                    setSelectedSource(availableSources[0]);
                }
            } else {
                setSelectedSource('');
            }
        }
    }, [selectedLocation, availableSources, selectedSource]);

    // Effect 3: Set year and Active Data. This now *initializes* state for new keys, it doesn't reset existing ones.
    useEffect(() => {
        if (availableYears.length > 0 && !availableYears.includes(Number(selectedYear))) {
            setSelectedYear(availableYears[0]);
        } else if (availableYears.length === 0) {
            setSelectedYear('');
        }
        
        if (nextData) {
            setActiveData(nextData);
            const key = `${nextData.location}-${nextData.source}`;

            // Initialize state for this key *only if it doesn't exist*
            setProjectSelections(prev => ({
                ...prev,
                [key]: prev[key] || {} // Keep existing selections or set to empty object
            }));
            setSrecPercentages(prev => ({
                ...prev,
                [key]: prev[key] || 0 // Keep existing percentage or set to 0
            }));
            setSrecMetricsMap(prev => ({
                ...prev,
                [key]: prev[key] || nextData.srec_metrics // Keep existing metrics or set to base
            }));
            
            setIsFiltering(false); 
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [availableYears, selectedYear, nextData]); // Intentionally omitting maps from deps

    // Effect 4: WebSocket connection
    useEffect(() => {
        let connectAttempts = 0;
        const maxConnectAttempts = 4;
        const retryDelays = [3000, 6000, 10000];

        const connect = () => {
            if (socketRef.current || connectAttempts >= maxConnectAttempts) return;

            // Use the environment variable for the WebSocket URL
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

                    if (receivedData.type && activeData) {
                        // Determine which key this update belongs to. Assume it's the active one.
                        const key = `${activeData.location}-${activeData.source}`;
                        let updatedObject: DashboardDataObject | null = null;

                        switch (receivedData.type) {
                            case "pid_result":
                                console.log(`WS: Received 'pid_result' for file_id: ${activeData.file_id}`);
                                updatedObject = {
                                    ...activeData,
                                    der_control_panel: receivedData.payload.der_control_panel
                                };
                                break;
                            
                            case "srec_result":
                                console.log(`WS: Received 'srec_result' for file_id: ${activeData.file_id}`);
                                const newSrecMetrics = receivedData.payload as SRECMetrics;
                                
                                // Update the srecMetricsMap with the new calculated values
                                setSrecMetricsMap(prev => ({
                                    ...prev,
                                    [key]: newSrecMetrics
                                }));
                                
                                // Create the updated main data object
                                updatedObject = {
                                    ...activeData,
                                    // IMPORTANT: We only update the map, not the *base* srec_metrics in activeData
                                    // This allows resetting the slider to 0 to show the base values again.
                                    // However, if you want the *base* data to reflect the last calculation,
                                    // you would uncomment the line below:
                                    // srec_metrics: newSrecMetrics 
                                };
                                break;
                            
                            default:
                                console.warn("Received unknown WS data type:", receivedData.type);
                                return;
                        }

                        if (updatedObject) {
                            setActiveData(updatedObject); // Update active view
                            
                            // Update the master list in context
                            setDashboardData((prevDashboardData) => {
                                if (!prevDashboardData) return null;
                                return prevDashboardData.map(item => 
                                    String(item.file_id) === String(activeData.file_id) ? updatedObject! : item
                                );
                            });
                        }
                    }

                } catch (error) {
                    console.error("Failed to parse WebSocket message:", error);
                }
            };

            socketInstance.onclose = () => {
                socketRef.current = null;
                if (connectAttempts < maxConnectAttempts) {
                    const delay = retryDelays[connectAttempts];
                    console.warn(`WebSocket closed. Retrying in ${delay / 1000}s...`);
                    retryTimeoutRef.current = setTimeout(connect, delay);
                    connectAttempts++;
                } else {
                    console.error("WebSocket connection failed after multiple retries.");
                }
            };

            socketInstance.onerror = (error) => {
                console.error("WebSocket error:", error);
                socketInstance.close();
            };
        };

        connect();

        return () => {
            if (retryTimeoutRef.current) {
                clearTimeout(retryTimeoutRef.current);
            }
            if (socketRef.current) {
                socketRef.current.onclose = null;
                socketRef.current.close();
                socketRef.current = null;
            }
        };
    }, [setDashboardData, activeData]); // Depends on activeData to have file_id

    // Effect 5: Loading message spinner
    useEffect(() => {
        if (isUpdating || isFiltering) { 
            const timer = setInterval(() => {
                setLoadingMessageIndex(prev => (prev + 1) % loadingMessages.length);
            }, 3000);
            return () => clearInterval(timer);
        }
    }, [isUpdating, isFiltering]);

    // DER Panel "Confirm Changes" Handler
    const handleConfirmChanges = (newUserMix: { [key: string]: number }, location: string, source: string) => {
        const dataForPayload = dashboardData?.find(d => d.location === location && d.source === source);
        if (socketRef.current?.readyState === WebSocket.OPEN && dataForPayload) {
            
            const requestPayload = {
                type: "pid_request", 
                source: dataForPayload.source,
                zipcode: (dataForPayload as any).zipcode, 
                location: dataForPayload.location,
                file_id: String(dataForPayload.file_id),
                current_mix_pct: newUserMix
            };

            socketRef.current.send(JSON.stringify(requestPayload));
            setIsUpdating(true);
            setHasUnsavedChanges(false);
        } else {
            console.error('Socket not connected or active data is missing.');
        }
    };

    // Handler for Source Change
    const handleSourceChange = (newSource: string) => {
        if (newSource !== selectedSource) {
            setIsFiltering(true); // Show loader
            setSelectedSource(newSource);
            // State initialization for the new source will be handled by Effect 3
        }
    };

    // SREC Slider "On Release" Handler
    const handleSrecChangeCommitted = (percentage: number) => {
        if (socketRef.current?.readyState === WebSocket.OPEN && activeData) {
            // If slider is moved back to 0, reset to base metrics without a WS call
            if (percentage === 0) {
                setSrecMetricsMap(prev => ({
                    ...prev,
                    [currentDataKey]: activeData.srec_metrics
                }));
                return; // Don't send a WS call for 0%
            }

            const requestPayload = {
                type: "srec_calc",
                source: activeData.source,
                zipcode: (activeData as any).zipcode,
                location: activeData.location,
                file_id: String(activeData.file_id),
                percentage_selected: percentage
            };
            socketRef.current.send(JSON.stringify(requestPayload));
            setIsUpdating(true); // Show loading backdrop
        } else {
            console.error('Socket not connected or active data is missing for SREC update.');
        }
    };

    // SREC Slider "On Change" (Visual) Handler
    const handleSrecPercentageChange = (value: number) => {
        setSrecPercentages(prev => ({
            ...prev,
            [currentDataKey]: value
        }));
    };

    // Project Checkbox Handler
    const handleProjectSelectChange = (formattedKey: string) => {
        setProjectSelections(prev => {
            const currentSelections = prev[currentDataKey] || {};
            return {
                ...prev,
                [currentDataKey]: {
                    ...currentSelections,
                    [formattedKey]: !currentSelections[formattedKey], // Toggle
                }
            };
        });
    };

    // --- RENDER LOGIC ---

    if (isInitialLoading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="80vh">
                <CircularProgress />
            </Box>
        );
    }

    if (!dashboardData || dashboardData.length === 0) {
        return (
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                height="80vh"
                flexDirection="column"
            >
                <Typography variant="h6" color="textSecondary">
                    No dashboard data available.
                </Typography>
                <Typography variant="body2" color="textSecondary">
                    Please ensure that you have uploaded the necessary data files.
                </Typography>
            </Box>
        );
    }

    // Main loading gate. Waits for filters to be set and data to be found.
    if (!activeData) { 
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="80vh" flexDirection="column" gap={2}>
                <CircularProgress />
                <Typography variant="h6" color="textSecondary">
                    Loading dashboard...
                </Typography>
            </Box>
        );
    }

    // Get the correct SREC metrics to display
    // Fallback to the base metrics from activeData if the map doesn't have an entry
    const currentSrecMetrics = srecMetricsMap[currentDataKey] || activeData.srec_metrics;

    return (
        <Box>
            <Backdrop
                sx={{
                    color: '#fff',
                    zIndex: (theme) => theme.zIndex.modal + 1,
                    backdropFilter: 'blur(3px)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2
                }}
                open={isUpdating || isFiltering}
            >
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
                    // If the current selected location is not in the new list, reset it
                    if (!locations.includes(selectedLocation)) {
                        setSelectedLocation(locations[0] || '');
                    }
                }}
                selectedSource={selectedSource}
                onSourceChange={handleSourceChange}
                selectedYear={selectedYear}
                onYearChange={setSelectedYear}
                
                // --- Pass down state specific to the current data key ---
                projectSelections={projectSelections[currentDataKey] || {}}
                onProjectSelectChange={handleProjectSelectChange}
                
                srecPercentage={srecPercentages[currentDataKey] || 0}
                onSrecPercentageChange={handleSrecPercentageChange} 
                onSrecChangeCommitted={handleSrecChangeCommitted} 
                calculatedSrecMetrics={currentSrecMetrics} 
            />
        </Box>
    );
};

export default EmissionsDashboardWrapper;

