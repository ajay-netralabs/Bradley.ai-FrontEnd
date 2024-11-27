import React from 'react'; 
import { Box, TextField, Typography, MenuItem, Select, Slider } from '@mui/material'; 

const SubStep2: React.FC = () => { 
  return ( 
    <Box sx={{ display: 'flex', flexDirection: 'column', fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.75rem', p: 1, pr: 4, pl: 1, pt: 1 }}>
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Nunito+Sans:ital,opsz,wght@0,6..12,200..1000;1,6..12,200..1000&display=swap');
      </style>
      <Typography variant="h6" sx={{ mb: 1, fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.85rem', fontWeight: 'bold', textAlign: 'center' }}>
        <h2>Prioritization - II</h2>
      </Typography> 
      <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 0 }}>
        <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 2, p: '10px' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, justifyContent: 'center' }}>
  <Typography sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.8rem', flex: 0.75 }}>
    <b>Set Your Targets:</b> (For Top 3 Priorities)
    <p></p>
  </Typography>
</Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, justifyContent: 'center' }}>
  <Typography sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.75rem', flex: 0.3 }}>
    <b>Reduce your existing SCOPE 2 carbon emissions by: </b>(in %)
  </Typography>
  <Slider
	sx={{
		flex: 0.448,
	}}
  defaultValue={50}
  aria-label="Small"
  valueLabelDisplay="auto"
  valueLabelFormat={(value) => `${value} %`}
/>
</Box>

<Box sx={{ display: 'flex', alignItems: 'center', gap: 1, justifyContent: 'center' }}>
  <Typography sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.75rem', flex: 0.3 }}>
    <b>Reduce your energy costs by: </b>(in %)
  </Typography>
  <Slider
	sx={{
		flex: 0.448,
	}}
  defaultValue={50}
  aria-label="Small"
  valueLabelDisplay="auto"
  valueLabelFormat={(value) => `${value} %`}
/>
</Box>

<Box sx={{ display: 'flex', alignItems: 'center', gap: 1, justifyContent: 'center' }}>
  <Typography sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.75rem', flex: 0.3 }}>
    <b>Desired Backup Power Duration: </b>(hours)
  </Typography>
  <TextField
            variant="outlined" 
            size="small" 
            type="number" 
						placeholder='Input'
            sx={{
              flex: 0.448, fontFamily: 'Nunito Sans, sans-serif',
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

<Box sx={{ display: 'flex', alignItems: 'center', gap: 1, justifyContent: 'center' }}>
  <Typography sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.75rem', flex: 0.3 }}>
		<b>Desired Renewable System Size: </b>(kW)
  </Typography>
  <TextField
            variant="outlined" 
            size="small" 
            type="number" 
						placeholder='Input'
            sx={{
              flex: 0.448, fontFamily: 'Nunito Sans, sans-serif',
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


<Box sx={{ display: 'flex', alignItems: 'center', gap: 1, justifyContent: 'center' }}>
  <Typography sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.75rem', flex: 0.305 }}>
		<b>Decarbonization Target:</b>
  </Typography>
  <TextField
            variant="outlined" 
            size="small" 
            type="number" 
						placeholder='Input'
            sx={{
              flex: 0.25, fontFamily: 'Nunito Sans, sans-serif',
              fontSize: '0.7rem',
              '& .MuiInputBase-root': { height: '40px', padding: '0 6px' },
              '& input': { padding: 0, fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.8rem' },
							'& .MuiInputBase-input::placeholder': {
                fontFamily: 'Nunito Sans, sans-serif',
                fontSize: '0.7rem',
              }
            }}
          />
	<Select
            size="small"
            variant="outlined"
            defaultValue="%"
            sx={{
              flex: 0.08,
              fontFamily: 'Nunito Sans, sans-serif',
              fontSize: '0.7rem',
              height: '40px',
              '& .MuiInputBase-root': { padding: '0 6px' },
              '& .MuiSelect-select': { padding: '4px 6px', fontSize: '0.7rem' },
            }}
          >
            <MenuItem value="%" sx={{fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem',}}>%</MenuItem>
            <MenuItem value="kWh" sx={{fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem',}}>kWh</MenuItem>
            <MenuItem value="days" sx={{fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem',}}>days</MenuItem>
          </Select>
					<TextField
            variant="outlined" 
            size="small" 
            type="date" 
            sx={{
              flex: 0.11, fontFamily: 'Nunito Sans, sans-serif',
              fontSize: '0.7rem',
              '& .MuiInputBase-root': { height: '40px', padding: '0 6px' },
              '& input': { padding: 0, fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.8rem' }
            }}
          />
</Box>


<Box sx={{ display: 'flex', alignItems: 'center', gap: 1, justifyContent: 'center' }}>
  <Typography sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.75rem', flex: 0.305 }}>
		<b>Energy Savings Target:</b>
  </Typography>
	<TextField
            variant="outlined" 
            size="small" 
            type="number" 
						placeholder='Input'
            sx={{
              flex: 0.25, fontFamily: 'Nunito Sans, sans-serif',
              fontSize: '0.7rem',
              '& .MuiInputBase-root': { height: '40px', padding: '0 6px' },
              '& input': { padding: 0, fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.8rem' },
							'& .MuiInputBase-input::placeholder': {
                fontFamily: 'Nunito Sans, sans-serif',
                fontSize: '0.7rem',
              }
            }}
          />
	<Select
            size="small"
            variant="outlined"
            defaultValue="%"
            sx={{
              flex: 0.08,
              fontFamily: 'Nunito Sans, sans-serif',
              fontSize: '0.7rem',
              height: '40px',
              '& .MuiInputBase-root': { padding: '0 6px' },
              '& .MuiSelect-select': { padding: '4px 6px', fontSize: '0.7rem' },
            }}
          >
            <MenuItem value="%" sx={{fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem',}}>%</MenuItem>
            <MenuItem value="kWh" sx={{fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem',}}>kWh</MenuItem>
            <MenuItem value="days" sx={{fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem',}}>days</MenuItem>
          </Select>
					<TextField
            variant="outlined" 
            size="small" 
            type="date" 
            sx={{
              flex: 0.11, fontFamily: 'Nunito Sans, sans-serif',
              fontSize: '0.7rem',
              '& .MuiInputBase-root': { height: '40px', padding: '0 6px' },
              '& input': { padding: 0, fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.8rem' }
            }}
          />
</Box>
        </Box>
      </Box>
    </Box> 
  ); 
}; 

export default SubStep2;
