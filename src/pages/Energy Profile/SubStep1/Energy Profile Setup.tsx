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
        <h2>Energy Profile Setup</h2>
      </Typography>
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
          <b>Tell Us About Your Energy Consumption</b>
        </Typography>
        <Typography
          sx={{
            fontFamily: 'Nunito Sans, sans-serif',
            fontSize: '0.75rem',
            lineHeight: '1.5',
          }}
        >
          Provide details about your facility's energy consumption and usage patterns. <br />
          This information will help Bradley create the most accurate and effective DER concepts for you.
        </Typography>
        <Typography
          sx={{
            fontFamily: 'Nunito Sans, sans-serif',
            fontSize: '0.75rem',
            lineHeight: '1.5',
          }}
        >
          This will take about 15 minutes.
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
          <b>Energy Load Profile</b> <br />
          Analyze your energy consumption patterns over time.
        </Typography>
      </Box>
    </Box>
  );
};

export default SubStep1;
