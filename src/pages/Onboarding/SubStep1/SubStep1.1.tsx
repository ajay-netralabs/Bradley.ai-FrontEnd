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
        @import
        url('https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@200..1000&display=swap');
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
        <h2>DER Analysis By Bradley.ai Is Underway!</h2>
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: '10px', pb: '10px', px: '160px' }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '100%',
          padding: '10px',
          borderRadius: '8px',
          backgroundColor: '#f9f9f9',
          mb: 2,
        }}
      >
        <Typography
          sx={{
            fontFamily: 'Nunito Sans, sans-serif',
            fontSize: '0.85rem',
            fontWeight: 'bold',
            textAlign: 'left',
            flex: 1,
          }}
        >
          Estimated Completion Time:
        </Typography>
        <Typography
          sx={{
            fontFamily: 'Nunito Sans, sans-serif',
            fontSize: '0.85rem',
            fontWeight: 'bold',
            color: '#036CA1',
            textAlign: 'right',
            flex: 1,
          }}
        >
          2 - 3 Days
        </Typography>
      </Box>

        <Typography
        variant="h6"
        sx={{
          mb: -1,
          fontFamily: 'Nunito Sans, sans-serif',
          fontSize: '0.85rem',
          fontWeight: 'bold',
          textAlign: 'center',
        }}
      >
        <h2>Analysis Progress</h2>
      </Typography>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '100%', mt: 2 }}>
        </Box>
      </Box>
    </Box>
  );
};

export default SubStep1;
