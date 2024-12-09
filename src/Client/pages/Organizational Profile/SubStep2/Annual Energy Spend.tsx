import React from 'react'; 
import { Box, TextField, Typography } from '@mui/material'; 

const SubStep2: React.FC = () => { 
  return ( 
    <Box sx={{ display: 'flex', flexDirection: 'column', fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.75rem', p: 1, pr: 4, pl: 1, pt: 1 }}>
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Nunito+Sans:ital,opsz,wght@0,6..12,200..1000;1,6..12,200..1000&display=swap');
      </style>
      <Typography variant="h6" sx={{ mb: 1, fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.85rem', fontWeight: 'bold', textAlign: 'center' }}>
        <h2>Annual Energy Spend</h2>
      </Typography> 
      <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 0 }}>
        <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 2, p: '10px' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, justifyContent: 'center' }}>
          <Typography sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.75rem', minWidth: '150px', flex: 0.25 }}><b>Electricity:</b></Typography>
          <TextField
    fullWidth
    variant="outlined"
    size="small"
    type="text"
    sx={{
      flex: 0.5,
      fontSize: '0.7rem', fontFamily: 'Nunito Sans, sans-serif',
      '& .MuiInputBase-root': { height: '40px', padding: '0 6px' },
      '& input': { padding: 0, fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.8rem' }
    }}
  />
        </Box>


        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, justifyContent: 'center' }}>
          <Typography sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.75rem', minWidth: '150px', flex: 0.25 }}><b>Natural Gas:</b></Typography>
          <TextField
    fullWidth
    variant="outlined"
    size="small"
    type="text"
    sx={{
      flex: 0.5,
      fontSize: '0.7rem', fontFamily: 'Nunito Sans, sans-serif',
      '& .MuiInputBase-root': { height: '40px', padding: '0 6px' },
      '& input': { padding: 0, fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.8rem' }
    }}
  />
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, justifyContent: 'center' }}>
          <Typography sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.75rem', minWidth: '150px', flex: 0.25 }}><b>Water:</b></Typography>
          <TextField
    fullWidth
    variant="outlined"
    size="small"
    type="text"
    sx={{
      flex: 0.5,
      fontSize: '0.7rem', fontFamily: 'Nunito Sans, sans-serif',
      '& .MuiInputBase-root': { height: '40px', padding: '0 6px' },
      '& input': { padding: 0, fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.8rem' }
    }}
  />
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, justifyContent: 'center' }}>
          <Typography sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.75rem', minWidth: '150px', flex: 0.25 }}><b>Other: </b>(Oil, Propane, PPAs, Steam, etc...)</Typography>
          <TextField
    fullWidth
    variant="outlined"
    size="small"
    type="text"
    sx={{
      flex: 0.5,
      fontSize: '0.7rem', fontFamily: 'Nunito Sans, sans-serif',
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
