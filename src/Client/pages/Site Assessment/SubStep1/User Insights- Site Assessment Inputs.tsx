import React, { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';

const SubStep1: React.FC = () => {
  // State to manage the user's name
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    // Simulate an asynchronous username fetch
    const fetchUsername = () => {
      setTimeout(() => {
        setUsername('Brad'); // Placeholder for dynamic data fetch
      }, 1000); // Simulating network delay
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
        <h2>User Insights: Site Assessment Inputs</h2>
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
          <b>Access Your Site's DER Potential</b>
        </Typography>
        <Typography
          sx={{
            fontFamily: 'Nunito Sans, sans-serif',
            fontSize: '0.75rem',
          }}
        >
          In this step, you will provide more granular details about your use of energy across various systems. Bradley will analyze your inputs to determine its suitability for alternate Distributed Energy Resources system arrangements. This part of the assessment will consider factors such as solar potential, wind resources, geothermal feasibility, grid connection, space constraints, interconnect limitations, and local regulations.
        </Typography>
        <Typography
          sx={{
            fontFamily: 'Nunito Sans, sans-serif',
            fontSize: '0.75rem',
          }}
        >
          This will take about 20 minutes.
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
          <b>Site Location & Characteristics</b> <br />
          Confirm your site location and provide details about its characteristics.
        </Typography>
        <Typography
          component="li"
          sx={{
            fontFamily: 'Nunito Sans, sans-serif',
            fontSize: '0.75rem',
            mb: 2,
          }}
        >
          <b>DER Potential</b> <br />
          Assess your site's potential for solar and wind energy generation.
        </Typography>
      </Box>
    </Box>
  );
};

export default SubStep1;
