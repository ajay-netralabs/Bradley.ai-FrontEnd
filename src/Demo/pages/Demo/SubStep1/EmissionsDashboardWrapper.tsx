import React, { useEffect, useState, useRef, useMemo } from 'react';
import { Box, CircularProgress, Typography, Backdrop } from '@mui/material';
import { useDashboardData, type DashboardData, type DERControlPanel } from '../../../../Context/DashboardDataContext';
import EmissionsDashboard from './EmissionsDashboard';

const loadingMessages = [
    "Recalculating emissions based on new parameters...",
    "Analyzing DER (Distributed Energy Resources) impact...",
    "Fetching updated projections from the server...",
];

const EmissionsDashboardWrapper: React.FC = () => {
    const { dashboardData, setDashboardData, isLoading: isInitialLoading } = useDashboardData();
   
    const socketRef = useRef<WebSocket | null>(null);
    const retryTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    const [isUpdating, setIsUpdating] = useState(false);
    const [loadingMessageIndex, setLoadingMessageIndex] = useState(0);
    const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

    const [selectedLocation, setSelectedLocation] = useState<string>('');
    const [selectedSource, setSelectedSource] = useState<string>('');

    const uniqueLocations = useMemo(() => {
        if (!dashboardData) return [];
        return Array.from(new Set(dashboardData.map(d => d.location)));
    }, [dashboardData]);

    useEffect(() => {
        if (dashboardData && uniqueLocations.length > 0 && !selectedLocation) {
            const firstLocation = uniqueLocations[0];
            setSelectedLocation(firstLocation);
            const firstSource = dashboardData.find(d => d.location === firstLocation)?.source || '';
            setSelectedSource(firstSource);
        }
    }, [dashboardData, uniqueLocations, selectedLocation]);

    const activeDashboardData = useMemo(() => {
        if (!dashboardData || !selectedLocation || !selectedSource) return null;
        return dashboardData.find(d => d.location === selectedLocation && d.source === selectedSource) || null;
    }, [dashboardData, selectedLocation, selectedSource]);

    useEffect(() => {
        let connectAttempts = 0;
        const maxConnectAttempts = 4;
        const retryDelays = [3000, 6000, 10000];

        const connect = () => {
            if (socketRef.current || connectAttempts >= maxConnectAttempts) return;

            const socketInstance = new WebSocket('wss://bradley-emission.onrender.com/ws');
            socketRef.current = socketInstance;

            socketInstance.onopen = () => {
                console.log("WebSocket connected.");
                connectAttempts = 0;
            };
           
            socketInstance.onmessage = (event) => {
                setIsUpdating(false);
                try {
                    const receivedData = JSON.parse(event.data);
                   
                    setDashboardData((prevDashboardData) => {
                        if (Array.isArray(receivedData)) {
                            return receivedData as DashboardData;
                        }
                        // Handle partial DER updates - use the currently active dashboard data for identification
                        else if (receivedData.der_control_panel && prevDashboardData && activeDashboardData) {
                            return prevDashboardData.map(item => {
                                // Update the item that matches the currently active dashboard data
                                if (String(item.file_id) === String(activeDashboardData.file_id)) {
                                    return { 
                                        ...item, 
                                        der_control_panel: receivedData.der_control_panel as DERControlPanel 
                                    };
                                }
                                return item;
                            });
                        }
                        return prevDashboardData;
                    });

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
    }, [setDashboardData, activeDashboardData]); // Added activeDashboardData as dependency

    useEffect(() => {
        if (isUpdating) {
            const timer = setInterval(() => {
                setLoadingMessageIndex(prev => (prev + 1) % loadingMessages.length);
            }, 3000);
            return () => clearInterval(timer);
        }
    }, [isUpdating]);

    const handleConfirmChanges = (newUserMix: { [key: string]: number }) => {
        if (socketRef.current?.readyState === WebSocket.OPEN && activeDashboardData) {
            const payload = {
                source: activeDashboardData.source,
                zipcode: activeDashboardData.zipcode,
                location: activeDashboardData.location,
                file_id: String(activeDashboardData.file_id),
                current_mix_pct: newUserMix
            };
            socketRef.current.send(JSON.stringify(payload));
            setIsUpdating(true);
            setHasUnsavedChanges(false);
        } else {
            console.error('Socket not connected or active data is missing.');
        }
    };

    if (isInitialLoading || !activeDashboardData) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="80vh">
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Box>
            <Backdrop 
                sx={{ 
                    color: '#fff', 
                    zIndex: (theme) => theme.zIndex.drawer + 1, 
                    backdropFilter: 'blur(3px)', 
                    display: 'flex', 
                    flexDirection: 'column', 
                    gap: 2 
                }} 
                open={isUpdating}
            >
                <CircularProgress color="inherit" />
                <Typography variant="h6">{loadingMessages[loadingMessageIndex]}</Typography>
            </Backdrop>
            <EmissionsDashboard
                data={activeDashboardData}
                onConfirmChanges={handleConfirmChanges}
                hasUnsavedChanges={hasUnsavedChanges}
                setHasUnsavedChanges={setHasUnsavedChanges}
            />
        </Box>
    );
};

export default EmissionsDashboardWrapper;