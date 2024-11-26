import React, { useState } from 'react';
import { Box, TextField, Typography, Radio, RadioGroup, FormControlLabel, MenuItem, Switch, Select } from '@mui/material';

const SubStep2: React.FC = () => { 
  const [showSteam, setShowSteam] = useState(false);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.75rem', p: 1, pr: 4, pl: 1, pt: 1 }}>
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Nunito+Sans:ital,opsz,wght@0,6..12,200..1000;1,6..12,200..1000&display=swap');
      </style>
      <Typography variant="h6" sx={{ mb: 1, fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.85rem', fontWeight: 'bold', textAlign: 'center' }}>
        <h2>Thermal Energy Needs - I</h2>
      </Typography>
      
      <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 0 }}>
        <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 2, pt: '10px', pb: '10px', pl: '160px', pr: '160px' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <FormControlLabel
            control={<Switch checked={showSteam} onChange={() => setShowSteam(!showSteam)} size="small" />}
            label="Does your facility require steam?"
            sx={{
              '& .MuiFormControlLabel-label': {
                fontFamily: 'Nunito Sans, sans-serif',
                fontSize: '0.9rem'
              }
            }}
          />

          </Box>

          {showSteam && (
            <Box sx={{ mb: 0, pl: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 0 }}>
        <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 2, pt: '10px' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Typography sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.75rem', minWidth: '150px', flex: 0.25 }}><b>Annual Steam Usage:</b></Typography>
          <TextField
            variant="outlined" 
            size="small" 
            type="number" 
            sx={{
              flex: 0.5, fontFamily: 'Nunito Sans, sans-serif',
              fontSize: '0.7rem',
              '& .MuiInputBase-root': { height: '24px', padding: '0 6px' },
              '& input': { padding: 0, fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.8rem' }
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
            <MenuItem value="Option 1" sx={{fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem',}}>Tons (Default)</MenuItem>
            <MenuItem value="Option 2" sx={{fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem',}}>MBtu</MenuItem>
            <MenuItem value="Option 3" sx={{fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem',}}>lbs</MenuItem>
            <MenuItem value="Option 4" sx={{fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem',}}>therms</MenuItem>
          </Select>
        </Box>


        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Typography sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.75rem', minWidth: '150px', flex: 0.25 }}><b>Steam Pressure:</b> (PSIG)</Typography>
          <Select
            size="small"
            variant="outlined"
            defaultValue="Option 1"
            sx={{
              flex: 0.75,
              fontFamily: 'Nunito Sans, sans-serif',
              fontSize: '0.7rem',
              height: '24px',
              '& .MuiInputBase-root': { padding: '0 6px' },
              '& .MuiSelect-select': { padding: '4px 6px', fontSize: '0.7rem' },
            }}
          >
            <MenuItem value="Option 1" sx={{fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem',}}>15 PSIG (Default)</MenuItem>
            <MenuItem value="Option 2" sx={{fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem',}}>30 PSIG</MenuItem>
            <MenuItem value="Option 3" sx={{fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem',}}>60 PSIG</MenuItem>
            <MenuItem value="Option 4" sx={{fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem',}}>120 PSIG</MenuItem>
          </Select>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
  <Typography sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.75rem', minWidth: '150px', flex: 0.25 }}>
    <b>Steam Usage Consistency:</b>
  </Typography>
  
  <RadioGroup
    row
    sx={{
      flex: 0.75,
      display: 'flex',
      gap: 10,
    }}
  >
    <FormControlLabel
      value="constant"
      control={<Radio size="small" sx={{ padding: '0 9px' }} />}
      label="Constant"
      sx={{
        fontFamily: 'Nunito Sans, sans-serif',
        fontSize: '0.7rem',
        '& .MuiFormControlLabel-label': {
          fontSize: '0.8rem',
          fontFamily: 'Nunito Sans, sans-serif',
        },
      }}
    />
    <FormControlLabel
      value="variable"
      control={<Radio size="small" sx={{ padding: '0 4px' }} />}
      label="Variable"
      sx={{
        fontFamily: 'Nunito Sans, sans-serif',
        fontSize: '0.7rem',
        '& .MuiFormControlLabel-label': {
          fontSize: '0.8rem',
          fontFamily: 'Nunito Sans, sans-serif',
        },
      }}
    />
  </RadioGroup>
</Box>


        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Typography sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.75rem', minWidth: '150px', flex: 0.25 }}><b>Condensate Return:</b> (Optional)</Typography>
          <TextField
            variant="outlined" 
            size="small" 
            type="number" 
            sx={{
              flex: 0.75, fontFamily: 'Nunito Sans, sans-serif',
              fontSize: '0.7rem',
              '& .MuiInputBase-root': { height: '24px', padding: '0 6px' },
              '& input': { padding: 0, fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.8rem' }
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