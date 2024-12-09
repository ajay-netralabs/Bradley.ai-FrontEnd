import React, { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';

const SubStep1: React.FC = () => {
  // State to hold the username (can later be replaced with Redux or backend data)
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    // Simulate fetching the username (replace this with Redux or API call later)
    const fetchUsername = () => {
      setTimeout(() => {
        setUsername('User Name'); // Mock username, replace with dynamic fetch later
      }, 1000); // Simulate network delay
    };
    fetchUsername();
  }, []);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        fontFamily: 'Nunito Sans, sans-serif',
        fontSize: '0.75rem',
        p: 1,
        pr: 4,
        pl: 1,
        pt: 1,
      }}
    >
      <style>
        @import
        url('https://fonts.googleapis.com/css2?family=Nunito+Sans:ital,opsz,wght@0,6..12,200..1000;1,6..12,200..1000&display=swap');
      </style>
      <Typography
        variant="h6"
        sx={{
          mb: 1,
          fontFamily: 'Nunito Sans, sans-serif',
          fontSize: '0.85rem',
          fontWeight: 'bold',
          textAlign: 'center',
        }}
      >
        <h2>Organization Profile Setup</h2>
      </Typography>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          gap: 0,
        }}
      >
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            pt: '10px',
            pb: '10px',
            pl: '160px',
            pr: '160px',
            textAlign: 'justify',
          }}
        >
          <Typography
            sx={{
              fontFamily: 'Nunito Sans, sans-serif',
              fontSize: '0.75rem',
              lineHeight: '1.5',
            }}
          >
            <b>Welcome, {username || 'Loading...'}!</b>
          </Typography>
          <Typography
            sx={{
              fontFamily: 'Nunito Sans, sans-serif',
              fontSize: '0.75rem',
              lineHeight: '1.5',
            }}
          >
            <b>Tell Us About Your Organization</b>
          </Typography>
          <Typography
            sx={{
              fontFamily: 'Nunito Sans, sans-serif',
              fontSize: '0.75rem',
              lineHeight: '1.5',
            }}
          >
            This is the first step in setting up your site-specific and personalized DER analysis with
            Bradley. I will ask you a series of questions around the use of your facility, gather some
            key information about your energy use in order to conceptually design the ideal distributed
            energy resource, identify potential incentives (rebates, grants, tax benefits), and deliver
            accurate results.
          </Typography>
          <Typography
            sx={{
              fontFamily: 'Nunito Sans, sans-serif',
              fontSize: '0.75rem',
              lineHeight: '1.5',
            }}
          >
            This will take about 5 minutes.
          </Typography>
          <Typography
            sx={{
              fontFamily: 'Nunito Sans, sans-serif',
              fontSize: '0.75rem',
              lineHeight: '1.5',
            }}
          >
            <b>Here's what we'll cover:</b>
          </Typography>
          <Typography
            component="li"
            sx={{
              fontFamily: 'Nunito Sans, sans-serif',
              fontSize: '0.75rem',
              lineHeight: '1.5',
              mb: 2,
            }}
          >
            <b>Organizational Details</b> <br />
            Your input helps us understand your organization's structure and operations, which influence
            how Bradley will generate DER concepts that best fit your prioritization.
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default SubStep1;
