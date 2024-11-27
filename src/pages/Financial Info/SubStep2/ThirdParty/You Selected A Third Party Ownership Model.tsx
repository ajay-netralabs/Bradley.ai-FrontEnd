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
        <h2>You Selected A Third Party Ownership Model</h2>
      </Typography>
      <Box
        sx={{
          width: 'calc(100% - 320px)',
          marginLeft: 'auto',
          marginRight: 'auto',
          display: 'flex',
          flexDirection: 'column',
          textAlign: 'center',
          lineHeight: 1.5,
          mb: 2,
          mt: 2,
        }}
      >
        <Typography
          sx={{
            fontFamily: 'Nunito Sans, sans-serif',
            fontSize: '0.8rem',
            lineHeight: 1.8,
            padding: '0 10px',
          }}
        >
          <b>This financial output will demonstrate what a potential third party would charge you for energy rates if they build, own, operate the DER system through an Energy/Power Purchase Agreement. In most cases rates are less than what you pay now, will require rights to first energy sold, will be limited to 80% of the equipments useful life. Rates will be impacted based on your credit rating.</b>
        </Typography>
      </Box>
    </Box>
  );
};

export default SubStep1;
