import React from 'react'; 
import { Box, TextField, Button, Typography, MenuItem, Select, Slider, Radio, RadioGroup, FormControlLabel } from '@mui/material'; 

const SubStep2: React.FC = () => { 
  return ( 
    <Box sx={{ display: 'flex', flexDirection: 'column', fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.75rem', p: 1, pr: 4, pl: 1, pt: 1 }}>
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Nunito+Sans:ital,opsz,wght@0,6..12,200..1000;1,6..12,200..1000&display=swap');
      </style>
      <Typography variant="h6" sx={{ mb: 1, fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.85rem', fontWeight: 'bold', textAlign: 'center' }}>
        <h2>PPA Preferences</h2>
      </Typography> 
      <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 0 }}>
        <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 2, p: '10px' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, justifyContent: 'center' }}>
  <Typography sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.75rem', flex: 0.3 }}>
    <b>Desired Term of the PPA: </b>(10 - 25 Years)
  </Typography>
  <Slider
	sx={{
		flex: 0.448,
	}}
  defaultValue={10}
  aria-label="Small"
  valueLabelDisplay="auto"
	min={10}
	max={25}
	valueLabelFormat={(value) => `${value} Years`}
/>
</Box>

<Box sx={{ display: 'flex', alignItems: 'center', gap: 1, justifyContent: 'center' }}>
  <Typography sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.75rem', flex: 0.3 }}>
    <b>Desired Initial Electricity Rate: </b>(in $ / kWh)
  </Typography>
  <TextField
            variant="outlined" 
            size="small" 
            type="number" 
						placeholder='Input'
            sx={{
              flex: 0.448, fontFamily: 'Nunito Sans, sans-serif',
              fontSize: '0.7rem',
              '& .MuiInputBase-root': { height: '24px', padding: '0 6px' },
              '& input': { padding: 0, fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.8rem' },
							'& .MuiInputBase-input::placeholder': {
                fontFamily: 'Nunito Sans, sans-serif',
                fontSize: '0.7rem',
              }
            }}
          />
</Box>

<Box sx={{ display: 'flex', alignItems: 'center', gap: 1, justifyContent: 'center' }}>
  <Typography sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.75rem', flex: 0.3 }}>
    <b>Desired Initial Thermal Rate: </b>(in $ / therm)
  </Typography>
  <TextField
            variant="outlined" 
            size="small" 
            type="number" 
						placeholder='Input'
            sx={{
              flex: 0.448, fontFamily: 'Nunito Sans, sans-serif',
              fontSize: '0.7rem',
              '& .MuiInputBase-root': { height: '24px', padding: '0 6px' },
              '& input': { padding: 0, fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.8rem' },
							'& .MuiInputBase-input::placeholder': {
                fontFamily: 'Nunito Sans, sans-serif',
                fontSize: '0.7rem',
              }
            }}
          />
</Box>

<Box sx={{ display: 'flex', alignItems: 'center', gap: 1, justifyContent: 'center' }}>
<Typography sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.75rem', flex: 0.3 }}>
  <b>Agreement Type:</b>
	</Typography>
  <RadioGroup row sx={{ fontSize: '0.7rem', m: 0, gap: 15, flex: 0.448 }}>
    <FormControlLabel value="ppa" control={<Radio sx={{ padding: '2px' }} />} label={<Typography sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem' }}>PPA (Default - Power Only)</Typography>} />
    <FormControlLabel value="esa" control={<Radio sx={{ padding: '2px' }} />} label={<Typography sx={{  fontFamily: 'Nunito Sans, sans-serif',fontSize: '0.7rem' }}>ESA (Power And Thermal)</Typography>} />
  </RadioGroup>
</Box>

<Box sx={{ display: 'flex', alignItems: 'center', gap: 1, justifyContent: 'center' }}>
  <Typography sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.75rem', flex: 0.3 }}>
    <b>Escalation Rate from Year 2 to End of Agreement: </b>(in %)
  </Typography>
  <Slider
	sx={{
		flex: 0.448,
	}}
  defaultValue={0.5}
  aria-label="Small"
  valueLabelDisplay="auto"
	min={0.5}
	max={5}
	valueLabelFormat={(value) => `${value} %`}
	step={0.5}
/>
</Box>
        </Box>
      </Box>
    </Box> 
  ); 
}; 

export default SubStep2;
