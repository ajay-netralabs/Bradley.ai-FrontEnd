import React from 'react';
import { Box, TextField, Typography, FormControlLabel, Checkbox, FormGroup } from '@mui/material';

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
        @import url('https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@200..1000&display=swap');
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
        <h2>Financing Preferences</h2>
      </Typography>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: '10px', pb: '10px', px: '160px' }}>
        
        

			<Typography
  sx={{
    mt: 1,
    fontFamily: 'Nunito Sans, sans-serif',
    fontSize: '0.75rem',
    display: 'flex',
    justifyContent: 'space-between',
    flex: 0.5,
  }}
>
<b>
    How Would You Prefer To Finance This Project?
    <br />
    <span style={{ fontWeight: 'normal' }}>
      (You must pick one.)
    </span>
  </b>
  <FormGroup
    row
    sx={{
      fontSize: '0.7rem',
      m: 0,
      gap: 1,
      flex: 0.8,
      flexDirection: 'column',
    }}
  >
    <FormControlLabel
      control={<Checkbox sx={{ padding: '2px' }} />}
      label={
        <Typography
          sx={{
            fontFamily: 'Nunito Sans, sans-serif',
            fontSize: '0.7rem',
          }}
        >
          Pay For The Project (Cash Payments During Construction Period)
        </Typography>
      }
    />
    <FormControlLabel
      control={<Checkbox sx={{ padding: '2px' }} />}
      label={
        <Typography
          sx={{
            fontFamily: 'Nunito Sans, sans-serif',
            fontSize: '0.7rem',
          }}
        >
          Finance The Project (You Own & Operate The DER System And Start Payments When System Is Operating)
        </Typography>
      }
    />
    <FormControlLabel
      control={<Checkbox sx={{ padding: '2px' }} />}
      label={
        <Typography
          sx={{
            fontFamily: 'Nunito Sans, sans-serif',
            fontSize: '0.7rem',
          }}
        >
          Have a 3rd Party Own & Operate The DER System And You Contract For Energy Supply Through ESA/PPA
        </Typography>
      }
    />
    <FormControlLabel
      control={<Checkbox sx={{ padding: '2px' }} />}
      label={
        <Typography
          sx={{
            fontFamily: 'Nunito Sans, sans-serif',
            fontSize: '0.7rem',
          }}
        >
          Explore Other Options
        </Typography>
      }
    />
  </FormGroup>
</Typography>

  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Typography sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.75rem', minWidth: '150px', flex: 0.5 }}><b>Please Specify Other Financing: </b>(Optional)</Typography>
          <TextField
            variant="outlined" 
            size="small" 
            type="text"
            placeholder='Describe Your Preferred Financing Method Here...' 
            sx={{
              flex: 0.68, fontFamily: 'Nunito Sans, sans-serif',
              fontSize: '0.7rem',
              '& .MuiInputBase-root': { height: '24px', padding: '0 6px' },
              '& input': { padding: 0, fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem' },
              '& .MuiInputBase-input::placeholder': {
                fontFamily: 'Nunito Sans, sans-serif',
                fontSize: '0.7rem',
              }
            }}
          />
        </Box>
</Box>

      </Box>
  );
};

export default SubStep2;
