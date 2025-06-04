import React, { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';

const SubStep1: React.FC = () => {
  // State to hold the username (can later be replaced with Redux or backend data)
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    // Simulate fetching the username (replace this with Redux or API call later)
    const fetchUsername = () => {
      setTimeout(() => {
        setUsername('Brad'); // Mock username, replace with dynamic fetch later
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
            <b>Tell Us About Your Company and how it Operates</b>
          </Typography>
          <Typography
            sx={{
              fontFamily: 'Nunito Sans, sans-serif',
              fontSize: '0.75rem',
              lineHeight: '1.5',
            }}
          >
            This is the first step in establishing a Distributed Energy Resource (DER) concept that is site-specific and personalized to attain your goals. I am an Energy Expert AI Agent, named Bradley. I will ask you a series of questions regarding the use and operation of your facility, gather key data about your energy use in order to conceptually design the ideal DER system, identify potential incentives (rebates, grants, tax benefits), and deliver the technical and financial attributes, in both qualitative and quantitative terms, that provide actionable metrics to decide the next steps in your pursuit of DER. Additionally Bradley offers an option to provide up to the minute emission calculations (Nox, Sox, CO2) that can be used for internal or external reporting requirements.
          </Typography>
          <Typography
            sx={{
              fontFamily: 'Nunito Sans, sans-serif',
              fontSize: '0.75rem',
              lineHeight: '1.5',
            }}
          >
            The Profile Setup will take about 5 minutes.
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
            Your company name, site address where the DER would be situated, your name and contact information (User), type of industry and other important aspects of your operations, that will be used to tailor the DER recommendation that best fits your demands., Your input helps us understand your organization's structure and operations, which influence I will generate DER concepts that best fit your prioritization.
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default SubStep1;
