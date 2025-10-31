import React from 'react';
import { 
  Box, 
  Typography, 
} from '@mui/material';

const SubStep2: React.FC = () => {


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
        <h2>Don't Have Interval Electric Load Data? It's EASY, Request It From Your Utility!</h2>
      </Typography>
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          pt: '10px',
          pb: '10px',
          textAlign: 'center',
        }}
      >
        <Typography
          sx={{
            fontFamily: 'Nunito Sans, sans-serif',
            fontSize: '0.75rem',
            lineHeight: '1.5',
          }}
        >
          If you don't have your interval data readily available, we can request it directly from your utility provider on your behalf.
        </Typography>
        <Typography
          sx={{
            fontFamily: 'Nunito Sans, sans-serif',
            fontSize: '0.75rem',
            lineHeight: '1.5',
          }}
        >
          This requires your authorization.
        </Typography>
        <Typography
          sx={{
            fontFamily: 'Nunito Sans, sans-serif',
            fontSize: '0.75rem',
            lineHeight: '1.5',
          }}
        >
          Click on <b>Next</b> to review and electronically sign a <b>LETTER OF AUTHORIZATION</b> or Skip.
        </Typography>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 0 }}>
        <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 2, pt: '10px', pb: '10px', pl: '160px', pr: '160px' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                      <Typography
                                        sx={{
                                          mt: 1,
                                          fontFamily: 'Nunito Sans, sans-serif',
                                          fontSize: '0.75rem',
                                          minWidth: '200px',
                                          flex: 1,
                                        }}
                                      >
                                        <i><b>Hint: </b>CarbonCheckIQ+ has direct access to submit requests and receive responses from the Utility. Once the Utility provides the files CarbonCheckIQ+ can complete its analysis. However Utility companies historically respond between 1 and 3 business days.</i><br />
                                      </Typography>
                                    </Box></Box></Box>

      </Box>
    </Box>
  );
};

export default SubStep2;
