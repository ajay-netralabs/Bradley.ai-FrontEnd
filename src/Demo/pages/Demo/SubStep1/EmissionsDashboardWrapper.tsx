import React from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';
import { useDashboardData } from '../../../../Context/DashboardDataContext';
import EmissionsDashboard from './EmissionsDashboard';

const EmissionsDashboardWrapper: React.FC = () => {
  const { dashboardData, isLoading } = useDashboardData();

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="50vh">
        <CircularProgress />
      </Box>
    );
  }

  if (!dashboardData || dashboardData.length === 0) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="50vh">
        <Typography color="error">
          Dashboard data is not available. Please go back and ensure bills were uploaded correctly.
        </Typography>
      </Box>
    );
  }

  // If data exists, render the actual dashboard and pass the data
  return <EmissionsDashboard data={dashboardData} />;
};

export default EmissionsDashboardWrapper;