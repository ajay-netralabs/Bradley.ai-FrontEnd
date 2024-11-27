import React from 'react'; 
import { Box, Typography, Radio, RadioGroup, FormControlLabel, TextField } from '@mui/material'; 

const SubStep3: React.FC = () => { 
  return ( 
    <Box sx={{ display: 'flex', flexDirection: 'column', fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.75rem', p: 1, pr: 4, pl: 1, pt: 1 }}>
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Nunito+Sans:ital,opsz,wght@0,6..12,200..1000;1,6..12,200..1000&display=swap');
      </style>
      <Typography variant="h6" sx={{ mb: 1, fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.85rem', fontWeight: 'bold', textAlign: 'center' }}>
        <h2>Roofing Considerations</h2>
      </Typography> 
      <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 0 }}>
        <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 2, pt: '10px', pb: '10px', pl: '160px', pr: '160px' }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', mt: 1 }}>
        
          <Typography sx={{ mt: 1, fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.75rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
  <b>Would You Allow Roof Penetration Anchoring Methods For Solar Panel Installation?</b>
  <RadioGroup row sx={{ fontSize: '0.7rem', m: 0, gap: 5.5 }}>
    <FormControlLabel value="yes" control={<Radio sx={{ padding: '2px' }} />} label={<Typography sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem' }}>Yes</Typography>} />
    <FormControlLabel value="no" control={<Radio sx={{ padding: '2px' }} />} label={<Typography sx={{  fontFamily: 'Nunito Sans, sans-serif',fontSize: '0.7rem' }}>No</Typography>} />
  </RadioGroup>
</Typography>

<Box sx={{ mt: 1, display: 'flex', alignItems: 'center', gap: 10 }}>
  <Typography sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.75rem', flex: 0.685 }}>
    <b>What Remaining Term Do You Have On Your Roof Warranty?</b>
  </Typography>
  <TextField
            variant="outlined" 
            size="small" 
            type="text" 
						placeholder='1 Year, 20 Years, etc...'
            sx={{
              flex: 0.5, fontFamily: 'Nunito Sans, sans-serif',
              fontSize: '0.7rem',
              '& .MuiInputBase-root': { height: '40px', padding: '0 6px' },
              '& input': { padding: 0, fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.8rem' },
							'& .MuiInputBase-input::placeholder': {
                fontFamily: 'Nunito Sans, sans-serif',
                fontSize: '0.7rem',
              }
            }}
          />
</Box>

<Typography sx={{ mt: 1.5, fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.75rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
  <b>What Is The Condition Of Your Roof?</b>
  <RadioGroup row sx={{ fontSize: '0.7rem', m: 0, gap: 5.5 }}>
    <FormControlLabel value="great" control={<Radio sx={{ padding: '2px' }} />} label={<Typography sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem' }}>Great</Typography>} />
    <FormControlLabel value="fair" control={<Radio sx={{ padding: '2px' }} />} label={<Typography sx={{  fontFamily: 'Nunito Sans, sans-serif',fontSize: '0.7rem' }}>Fair</Typography>} />
		<FormControlLabel value="poor" control={<Radio sx={{ padding: '2px' }} />} label={<Typography sx={{  fontFamily: 'Nunito Sans, sans-serif',fontSize: '0.7rem' }}>Poor</Typography>} />
  </RadioGroup>
</Typography>

<Box sx={{ mt: 2, display: 'flex', alignItems: 'center', gap: 10 }}>
  <Typography sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.75rem', flex: 0.685 }}>
    <b>Roof Insurance Provider: </b>(Optional)
  </Typography>
</Box>

<Box sx={{ mt: 0, display: 'flex', alignItems: 'center', gap: 10 }}>
  <Typography sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.75rem', flex: 1 }}>
		Some Insurance Providers Have Specific Requirements For Solar Installations That May Impact System Design & Costs.
  </Typography>
</Box>

<Box sx={{ mt: 2, display: 'flex', alignItems: 'center', gap: 10 }}>
  <Typography sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.75rem', flex: 0.685 }}>
	<li><b>Enter Your Provider Name:</b></li>
  </Typography>
  <TextField
            variant="outlined" 
            size="small" 
            type="text" 
						placeholder='Provider Name'
            sx={{
              flex: 0.5, fontFamily: 'Nunito Sans, sans-serif',
              fontSize: '0.7rem',
              '& .MuiInputBase-root': { height: '40px', padding: '0 6px' },
              '& input': { padding: 0, fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.8rem' },
							'& .MuiInputBase-input::placeholder': {
                fontFamily: 'Nunito Sans, sans-serif',
                fontSize: '0.7rem',
              }
            }}
          />
</Box>

<Box sx={{ mt: 2, display: 'flex', alignItems: 'center', gap: 10 }}>
  <Typography sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.75rem', flex: 0.685 }}>
    <li><b>Enter Your Policy ID:</b></li>
  </Typography>
  <TextField
            variant="outlined" 
            size="small" 
            type="text" 
						placeholder='Policy ID'
            sx={{
              flex: 0.5, fontFamily: 'Nunito Sans, sans-serif',
              fontSize: '0.7rem',
              '& .MuiInputBase-root': { height: '40px', padding: '0 6px' },
              '& input': { padding: 0, fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.8rem' },
							'& .MuiInputBase-input::placeholder': {
                fontFamily: 'Nunito Sans, sans-serif',
                fontSize: '0.7rem',
              }
            }}
          />
</Box>

          </Box>
        </Box>
      </Box>
    </Box>


  ); };

export default SubStep3;
