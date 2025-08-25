import React, { useEffect, useState, useRef } from 'react';
import { Box, CircularProgress, Typography, Backdrop } from '@mui/material';
import { useDashboardData, type DashboardData } from '../../../../Context/DashboardDataContext';
import EmissionsDashboard, { type DashboardState } from './EmissionsDashboard';

const loadingMessages = [
    "Recalculating emissions based on new parameters...",
    "Fact: A single large office building can consume over 20 million kWh of electricity a year.",
    "Analyzing DER (Distributed Energy Resources) impact...",
    "Fact: Combined Heat and Power (CHP) systems can achieve efficiencies over 80%.",
    "Fetching updated projections from the server...",
];

const EmissionsDashboardWrapper: React.FC = () => {
    const { dashboardData, setDashboardData, isLoading: isInitialLoading } = useDashboardData();
    const [socket, setSocket] = useState<WebSocket | null>(null);
    const socketRef = useRef<WebSocket | null>(null);

    // State lifted from child to preserve it across re-renders
    const [dashboardState, setDashboardState] = useState<DashboardState | null>(null);
    const [isUpdating, setIsUpdating] = useState(false);
    const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
    const [loadingMessageIndex, setLoadingMessageIndex] = useState(0);

    // Effect to set the initial filter state
    useEffect(() => {
        if (dashboardData && !dashboardState) {
            const firstLocation = dashboardData[0]?.location || '';
            const firstSource = dashboardData.find(d => d.location === firstLocation)?.source || '';
            const allYears = Array.from(new Set(dashboardData.flatMap(d => d.emissions.map(em => em.Year as number)))).sort((a, b) => b - a);
            const latestYear = allYears[0] || '';

            setDashboardState({
                selectedLocationName: firstLocation,
                selectedSource: firstSource,
                selectedYear: latestYear,
                co2eGoal: 10,
                derAllocation: { 'PLANT': 100, 'Solar PV': 0, 'CHP': 0, 'Simple Cycle Turbines': 0, 'Fuel Cells': 0, 'Linear Generation': 0, 'Battery Storage': 0 },
            });
        }
    }, [dashboardData, dashboardState]);

    // Effect for the WebSocket connection
    useEffect(() => {
        if (dashboardData && !socketRef.current) {
            const socketInstance = new WebSocket('ws://127.0.0.1:8000/ws');
            socketRef.current = socketInstance;

            socketInstance.onopen = () => {
                console.log('WebSocket connected successfully.');
                setSocket(socketInstance);
            };
            
            socketInstance.onmessage = (event) => {
                setIsUpdating(false); // Stop loading on any response
                try {
                    const receivedData = JSON.parse(event.data);
                    if (Array.isArray(receivedData)) {
                        setDashboardData(receivedData as DashboardData);
                    } else {
                        console.log('Received non-data message, ignoring:', receivedData);
                    }
                } catch (error) {
                    console.error("Failed to parse incoming WebSocket message:", error);
                }
            };

            socketInstance.onclose = () => {
                console.log('WebSocket disconnected.');
                socketRef.current = null;
                setSocket(null);
                setIsUpdating(false);
            };

            socketInstance.onerror = (error) => {
                console.error("WebSocket error:", error);
                socketRef.current = null;
                setSocket(null);
                setIsUpdating(false);
            };
        }

        return () => {
            if (socketRef.current) {
                socketRef.current.close();
                socketRef.current = null;
            }
        };
    }, [dashboardData, setDashboardData]);

    // Effect for the loading message timer
    useEffect(() => {
        if (isUpdating) {
            const timer = setInterval(() => {
                setLoadingMessageIndex(prevIndex => (prevIndex + 1) % loadingMessages.length);
            }, 3000);
            return () => clearInterval(timer);
        }
    }, [isUpdating]);

    const handleDashboardUpdate = (payload: DashboardState) => {
        if (socket && socket.readyState === WebSocket.OPEN) {
            socket.send(JSON.stringify(payload));
            setIsUpdating(true);
        } else {
            console.error('Socket is not connected or available.');
        }
    };

    if (isInitialLoading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="50vh">
                <CircularProgress />
            </Box>
        );
    }

    if (!Array.isArray(dashboardData) || dashboardData.length === 0 || !dashboardState) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="50vh">
                <Typography color="error">
                    Dashboard data is not available or in the wrong format.
                </Typography>
            </Box>
        );
    }

    return (
        <Box>
            <Backdrop
                sx={{ 
                    color: '#fff', 
                    zIndex: (theme) => theme.zIndex.drawer + 1, 
                    position: 'absolute', 
                    backdropFilter: 'blur(3px)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2
                }}
                open={isUpdating}
            >
                <CircularProgress color="inherit" />
                <Typography variant="h6" sx={{ fontFamily: 'Nunito Sans, sans-serif' }}>
                    {loadingMessages[loadingMessageIndex]}
                </Typography>
            </Backdrop>

            <EmissionsDashboard
                data={dashboardData}
                onUpdate={handleDashboardUpdate}
                dashboardState={dashboardState}
                setDashboardState={setDashboardState}
                hasUnsavedChanges={hasUnsavedChanges}
                setHasUnsavedChanges={setHasUnsavedChanges}
            />
        </Box>
    );
};

export default EmissionsDashboardWrapper;