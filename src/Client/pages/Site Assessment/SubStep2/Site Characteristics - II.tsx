import React from 'react'; 
import { Box, Typography, Radio, RadioGroup, FormControlLabel, TextField } from '@mui/material'; 

const SubStep2: React.FC = () => { 
  return ( 
    <Box sx={{ display: 'flex', flexDirection: 'column', fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.75rem', p: 1, pr: 4, pl: 1, pt: 1 }}>
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Nunito+Sans:ital,opsz,wght@0,6..12,200..1000;1,6..12,200..1000&display=swap');
      </style>
      <Typography variant="h6" sx={{ mb: 1, fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.85rem', fontWeight: 'bold', textAlign: 'center' }}>
        <h2>Site Characteristics - II</h2>
      </Typography> 
      <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 0 }}>
        <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 2, pt: '10px', pb: '10px', pl: '160px', pr: '160px' }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', mt: 1 }}>
        
          <Typography sx={{ mt: 1, fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.75rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
  <b>Humidification Issues?</b>
  <RadioGroup row sx={{ fontSize: '0.7rem', m: 0, gap: 5.5 }}>
    <FormControlLabel value="yes" control={<Radio sx={{ padding: '2px' }} />} label={<Typography sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem' }}>Yes</Typography>} />
    <FormControlLabel value="no" control={<Radio sx={{ padding: '2px' }} />} label={<Typography sx={{  fontFamily: 'Nunito Sans, sans-serif',fontSize: '0.7rem' }}>No</Typography>} />
  </RadioGroup>
</Typography>

<Typography sx={{ mt: 1, fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.75rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
  <b>Hot / Cold Spots?</b>
  <RadioGroup row sx={{ fontSize: '0.7rem', m: 0, gap: 5.5 }}>
    <FormControlLabel value="yes" control={<Radio sx={{ padding: '2px' }} />} label={<Typography sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem' }}>Yes</Typography>} />
    <FormControlLabel value="no" control={<Radio sx={{ padding: '2px' }} />} label={<Typography sx={{  fontFamily: 'Nunito Sans, sans-serif',fontSize: '0.7rem' }}>No</Typography>} />
  </RadioGroup>
</Typography>

<Typography sx={{ mt: 1, fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.75rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
  <b>Outdoor Air Supply Issues?</b>
  <RadioGroup row sx={{ fontSize: '0.7rem', m: 0, gap: 5.5 }}>
    <FormControlLabel value="yes" control={<Radio sx={{ padding: '2px' }} />} label={<Typography sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem' }}>Yes</Typography>} />
    <FormControlLabel value="no" control={<Radio sx={{ padding: '2px' }} />} label={<Typography sx={{  fontFamily: 'Nunito Sans, sans-serif',fontSize: '0.7rem' }}>No</Typography>} />
  </RadioGroup>
</Typography>


<Box sx={{ mt: 1, display: 'flex', alignItems: 'center', gap: 10 }}>
  <Typography sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.75rem', flex: 0.685 }}>
    <b>Number of Shifts Per Day:</b>
  </Typography>
  <TextField
            variant="outlined" 
            size="small" 
            type="number" 
						placeholder='Input'
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

<Typography sx={{ mt: 1,mb: 1, fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.75rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
  <b>HVAC System Operation: <span style={{ fontWeight: 'normal' }}>(Pick One)</span></b>
  <RadioGroup row sx={{ fontSize: '0.7rem', m: 0 }}>
    <FormControlLabel value="Simultaneous Heating & Cooling" control={<Radio sx={{ padding: '2px' }} />} label={<Typography sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem' }}>Simultaneous Heating & Cooling</Typography>} />
    <FormControlLabel value="Seasonal Switchover" control={<Radio sx={{ padding: '2px' }} />} label={<Typography sx={{  fontFamily: 'Nunito Sans, sans-serif',fontSize: '0.7rem' }}>Seasonal Switchover</Typography>} />
  </RadioGroup>
</Typography>
          </Box>
        </Box>
      </Box>
    </Box>


  ); };

export default SubStep2;
