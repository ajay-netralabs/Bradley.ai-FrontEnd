import React, { useState } from 'react'; 
import { Box, Typography, Radio, RadioGroup, FormControlLabel, TextField, Tooltip } from '@mui/material'; 

const SubStep2: React.FC = () => { 
  const [leaseSelected, setLeaseSelected] = useState(false);
  return ( 
    <Box sx={{ display: 'flex', flexDirection: 'column', fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.75rem', p: 1, pr: 4, pl: 1, pt: 1 }}>
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Nunito+Sans:ital,opsz,wght@0,6..12,200..1000;1,6..12,200..1000&display=swap');
      </style>
      <Typography variant="h6" sx={{ mb: 1, fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.85rem', fontWeight: 'bold', textAlign: 'center' }}>
        <h2>Other Details</h2>
      </Typography> 
      <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 0 }}>
        <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 2, pt: '10px', pb: '10px', pl: '160px', pr: '160px' }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', mt: 1 }}>
        <Typography variant="subtitle2" sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.75rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
  <Box sx={{ flex: 1 }}>
    <b><h3>Property Ownership</h3></b>
  </Box>
  <Box sx={{ flex: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <RadioGroup 
                  sx={{ fontSize: '0.7rem', gap: '162px' }} 
                  row 
                  onChange={(e) => setLeaseSelected(e.target.value === 'lease')}
                >
                  <FormControlLabel 
                    value="own" 
                    control={<Radio sx={{ padding: '2px' }} />} 
                    label={<Typography sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.8rem' }}>I own a property</Typography>} 
                  />
                  <FormControlLabel 
                    value="lease" 
                    control={<Radio sx={{ padding: '2px' }} />} 
                    label={<Typography sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.8rem' }}>I lease some space</Typography>} 
                  />
                </RadioGroup>
              </Box>
            </Typography>
            {leaseSelected && (
  <Typography variant="subtitle2" sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.75rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
  <Box sx={{ flex: 0.5 }}>
    <b><h3>Lease Period: </h3></b>
  </Box>
  <Box sx={{ flex: 0.5, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
    <Tooltip title="Start date" placement='left' arrow>
    <TextField
      variant="outlined"
      type="date"
      name="startUpTime"
      size="small"
      sx={{
        flex: 0.4,
        fontSize: '0.7rem',
        fontFamily: 'Nunito Sans, sans-serif',
        '& .MuiInputBase-root': {
          height: '40px',
          padding: '0 6px',
        },
        '& input': {
          padding: 0,
          fontFamily: 'Nunito Sans, sans-serif',
          fontSize: '0.8rem',
        },
      }}
    /></Tooltip>
      to
    <Tooltip title="End date" placement='right' arrow>
    <TextField
      variant="outlined"
      type="date"
      name="setBackTime"
      size="small"
      sx={{
        flex: 0.4,
        fontSize: '0.7rem',
        fontFamily: 'Nunito Sans, sans-serif',
        '& .MuiInputBase-root': {
          height: '40px',
          padding: '0 6px',
        },
        '& input': {
          padding: 0,
          fontFamily: 'Nunito Sans, sans-serif',
          fontSize: '0.8rem',
        },
      }}
    /></Tooltip>
  </Box></Typography>
)}



<Typography variant="subtitle2" sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.75rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
  <Box sx={{ flex: 1 }}>
<b><h3>Long - Term Site Occupancy</h3></b></Box>
<Box sx={{ flex: 1, display: 'flex', justifyContent: 'space-between' }}>
    <RadioGroup sx={{ fontSize: '0.7rem', gap: '158.5px' }} row>
      <FormControlLabel 
        value="own" 
        control={<Radio sx={{ padding: '2px' }} />} 
        label={<Typography sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.8rem' }}>15-20 years plan</Typography>} 
      />
      <FormControlLabel 
        value="lease" 
        control={<Radio sx={{ padding: '2px' }} />} 
        label={<Typography sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.8rem' }}>Short - Term plan</Typography>} 
      />
    </RadioGroup>
  </Box>
</Typography>
          </Box>
        </Box>
      </Box>
    </Box>


  ); };

export default SubStep2;
