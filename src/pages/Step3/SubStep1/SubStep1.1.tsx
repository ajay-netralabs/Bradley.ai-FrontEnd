import React from 'react';
import { Box, Typography } from '@mui/material';

const SubStep1: React.FC = () => {
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
        <h2>Your Goal(s) & Priorities Setup</h2>
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
          <b>Welcome, [User Name]!</b>
        </Typography>
        <Typography
          sx={{
            fontFamily: 'Nunito Sans, sans-serif',
            fontSize: '0.75rem',
          }}
        >
          <b>Tell Us About Your Goals & Priorities</b>
        </Typography>
        <Typography
          sx={{
            fontFamily: 'Nunito Sans, sans-serif',
            fontSize: '0.75rem',
          }}
        >
          Provide details about the goals you want to achieve through your customized DER System, including your financial requirements. This information will help Bradley create the most accurate and effective DER conceptualization based on your direction.
        </Typography>
        <Typography
          sx={{
            fontFamily: 'Nunito Sans, sans-serif',
            fontSize: '0.75rem',
          }}
        >
          This will take about 10 minutes. The more details you provide, the better Bradley will perform.
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
          <b>Priorities (Decarbonize, Increase Resiliency, Maximize Cost Reductions)</b> <br />
          Define your priorities for DER implementation and set specific targets for your goals. Bradley creates the DER solution based on your priorities.
        </Typography>
        <Typography
          component="li"
          sx={{
            fontFamily: 'Nunito Sans, sans-serif',
            fontSize: '0.75rem',
            mb: 2,
          }}
        >
          <b>Financial Goals & Targets (IRR, ROI, Simple Payback)</b> <br />
          Outline your financial objectives and investment preferences. Bradley can adjust how DER projects allocate cash, rebates, and grants in the financial proforma, as well as adjust depreciation based on your tax position.
        </Typography>
      </Box>
    </Box>
  );
};

export default SubStep1;
