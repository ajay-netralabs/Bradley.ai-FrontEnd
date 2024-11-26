import React, { useState } from 'react';
import { Box, TextField, Typography, FormControlLabel, MenuItem, Switch, Select } from '@mui/material';

const SubStep2: React.FC = () => { 
  const [showSteam, setShowSteam] = useState(false);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.75rem', p: 1, pr: 4, pl: 1, pt: 1 }}>
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Nunito+Sans:ital,opsz,wght@0,6..12,200..1000;1,6..12,200..1000&display=swap');
      </style>
      <Typography variant="h6" sx={{ mb: 1, fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.85rem', fontWeight: 'bold', textAlign: 'center' }}>
        <h2>Thermal Energy Needs - III</h2>
      </Typography>
      
      <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 0 }}>
        <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 2, pt: '10px', pb: '10px', pl: '160px', pr: '160px' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <FormControlLabel
            control={<Switch checked={showSteam} onChange={() => setShowSteam(!showSteam)} size="small" />}
            label="Does your facility require chilled water?"
            sx={{
              '& .MuiFormControlLabel-label': {
                fontFamily: 'Nunito Sans, sans-serif',
                fontSize: '0.9rem'
              }
            }}
          />

          </Box>

          {showSteam && (
            <Box sx={{ mb: 0, pl: 0 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 0 }}>
        <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 2, pt: '10px' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Typography sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.75rem', minWidth: '150px', flex: 0.25 }}><b>Chilled Water Usage:</b></Typography>
          <TextField
            variant="outlined" 
            size="small" 
            type="number" 
            placeholder="Enter Annual Usage"
            sx={{
              flex: 0.5, fontFamily: 'Nunito Sans, sans-serif',
              fontSize: '0.7rem',
              '& .MuiInputBase-root': { height: '24px', padding: '0 6px' },
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
            defaultValue="Option 1"
            sx={{
              flex: 0.25,
              fontFamily: 'Nunito Sans, sans-serif',
              fontSize: '0.7rem',
              height: '24px',
              '& .MuiInputBase-root': { padding: '0 6px' },
              '& .MuiSelect-select': { padding: '4px 6px', fontSize: '0.7rem' },
            }}
          >
            <MenuItem value="Option 1" sx={{fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem',}}>Process Chilled Water</MenuItem>
            <MenuItem value="Option 2" sx={{fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem',}}>Space Cooling</MenuItem>
            <MenuItem value="Option 3" sx={{fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem',}}>Other</MenuItem>
          </Select>
        </Box>


        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Typography sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.75rem', minWidth: '150px', flex: 0.25 }}><b>Chilled Water Temperature:</b></Typography>
          <TextField
            variant="outlined" 
            size="small" 
            type="number"
            placeholder='Enter Temperature' 
            sx={{
              flex: 0.75, fontFamily: 'Nunito Sans, sans-serif',
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


        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Typography sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.75rem', minWidth: '150px', flex: 0.25 }}><b>Additional Chilled Water Demand:</b></Typography>
          <TextField
            variant="outlined" 
            size="small" 
            type="number" 
            placeholder="Optional (Tons)"
            sx={{
              flex: 0.75, fontFamily: 'Nunito Sans, sans-serif',
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
        </Box>
      </Box>
              
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default SubStep2;