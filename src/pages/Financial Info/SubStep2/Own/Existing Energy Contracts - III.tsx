import React, { useState } from 'react';
import { Box, TextField, Typography, FormControlLabel, Switch } from '@mui/material';

const SubStep2: React.FC = () => { 

  const [showSteam, setShowSteam] = useState(false);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.75rem', p: 1, pr: 4, pl: 1, pt: 1 }}>
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Nunito+Sans:ital,opsz,wght@0,6..12,200..1000;1,6..12,200..1000&display=swap');
      </style>
      <Typography variant="h6" sx={{ mb: 1, fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.85rem', fontWeight: 'bold', textAlign: 'center' }}>
        <h2>Existing Energy Contracts - III</h2>
      </Typography>
      
      <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 0 }}>
        <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 2, pt: '10px', pb: '10px', pl: '160px', pr: '160px' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <FormControlLabel
            control={<Switch checked={showSteam} onChange={() => setShowSteam(!showSteam)} size="small" />}
            label="Do you have any existing CHP Contracts?"
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
          <Typography sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.75rem', minWidth: '150px', flex: 0.5 }}><b>Rate: </b>(In $/kWh Or $/therm)</Typography>
          <TextField
            variant="outlined" 
            size="small" 
            type="text"
            placeholder='Input' 
            sx={{
              flex: 0.5, fontFamily: 'Nunito Sans, sans-serif',
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
          <Typography sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.75rem', minWidth: '150px', flex: 0.5 }}><b>Escalator: </b>(in %)</Typography>
          <TextField
            variant="outlined" 
            size="small" 
            type="number"
            placeholder='Input' 
            sx={{
              flex: 0.5, fontFamily: 'Nunito Sans, sans-serif',
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
          <Typography sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.75rem', minWidth: '150px', flex: 0.5 }}><b>Term: </b>(In Years)</Typography>
          <TextField
            variant="outlined" 
            size="small" 
            type="number"
            placeholder='Input' 
            sx={{
              flex: 0.5, fontFamily: 'Nunito Sans, sans-serif',
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
              
            </Box>
          )}
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
            <i><b>* </b>If <b>Yes</b>, please provide details in the fields or upload the agreement and Bradley will autopopulate the fields for you.</i><br />
            <i><b>** </b>If <b>No</b>, Bradley will assume you are on the standard offer rate from the regulated electric utility and will gather data from the utility tariff.</i>
          </Typography>
        </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default SubStep2;