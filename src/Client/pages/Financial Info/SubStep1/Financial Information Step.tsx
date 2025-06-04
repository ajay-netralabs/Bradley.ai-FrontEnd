import React, { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';

const SubStep1: React.FC = () => {
  // State for username
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    // Simulating a fetch call for the username
    const fetchUsername = () => {
      setTimeout(() => {
        setUsername('Brad'); // Replace with real data fetch logic
      }, 1000); // Simulate a delay for fetching
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
        @import url('https://fonts.googleapis.com/css2?family=Nunito+Sans:ital,opsz,wght@0,6..12,200..1000;1,6..12,200..1000&display=swap');
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
        <h2>Financial Information Step</h2>
      </Typography>
      <Box
        sx={{
          width: 'calc(100% - 320px)',
          marginLeft: 'auto',
          marginRight: 'auto',
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          textAlign: 'justify',
          lineHeight: 1.5,
        }}
      >
        <Typography
          sx={{
            fontFamily: 'Nunito Sans, sans-serif',
            fontSize: '0.75rem',
          }}
        >
          <b>Welcome, {username || 'Loading...'}!</b>
        </Typography>
        <Typography
          sx={{
            fontFamily: 'Nunito Sans, sans-serif',
            fontSize: '0.75rem',
          }}
        >
          <b>Provide Financial Details</b>
        </Typography>
        <Typography
          sx={{
            fontFamily: 'Nunito Sans, sans-serif',
            fontSize: '0.75rem',
          }}
        >
          Completing this section enables Bradley to accurately calculate a “balance sheet” estimate of your optimized DER recommended solution; providing IRR, NOI, Simple Payback, NPV and cost reductions if you want to own the system. Correctly completing these inputs enables empirically accurate financial projections for the DER concept(s) over their expected lifetime.
        </Typography>
        <Typography
          sx={{
            fontFamily: 'Nunito Sans, sans-serif',
            fontSize: '0.75rem',
          }}
        >
          This will take you less than 10 minutes to complete.
        </Typography>
        <Typography
          sx={{
            fontFamily: 'Nunito Sans, sans-serif',
            fontSize: '0.75rem',
          }}
        >
          <b>Here's what we'll cover:</b>
        </Typography>
        <Typography
          component="li"
          sx={{
            fontFamily: 'Nunito Sans, sans-serif',
            fontSize: '0.75rem',
            mb: 2,
          }}
        >
          <b>Financial Preferences & Method of DER Ownership</b> <br />
          Provide information about your financial preferences, ownership preferences (your asset or a third party owned asset), and context regarding any existing energy supply/PPA or other energy contracts.
        </Typography>
        <Typography
          component="li"
          sx={{
            fontFamily: 'Nunito Sans, sans-serif',
            fontSize: '0.75rem',
            mb: 2,
          }}
        >
          <b>Budgetary Goals</b> <br />
          Tell us about your budget and investment goals for this project.
        </Typography>
      </Box>
    </Box>
  );
};

export default SubStep1;
