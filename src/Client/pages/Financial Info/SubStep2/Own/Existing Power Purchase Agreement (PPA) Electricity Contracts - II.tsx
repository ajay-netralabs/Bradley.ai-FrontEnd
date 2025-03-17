import React, { useState } from 'react';
import { Box, TextField, Typography, FormControlLabel, Switch, Tooltip, InputAdornment } from '@mui/material';

const SubStep2: React.FC = () => { 
  const [showSteam, setShowSteam] = useState(false);
  const [ppaRate, setPpaRate] = useState('');
  const [ppaEscalation, setPpaEscalation] = useState('');

  const handlePpaRateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let value = event.target.value;
    if (/^(0(\.\d{0,2})?)?$/.test(value)) {
      setPpaRate(value);
    }
  };

  const handlePpaEscalationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let value = event.target.value;
    if (/^[1-9]?$/.test(value)) {
      setPpaEscalation(value);
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.75rem', p: 1, pr: 4, pl: 1, pt: 1 }}>
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Nunito+Sans:ital,wght@0,200..1000;1,200..1000&display=swap');
      </style>
      <Typography variant="h6" sx={{ mb: 1, fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.85rem', fontWeight: 'bold', textAlign: 'center' }}>
        <h2>Existing Power Purchase Agreement (PPA) Electricity Contracts - II</h2>
      </Typography>
      
      <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 0 }}>
        <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 2, pt: '10px', pb: '10px', pl: '160px', pr: '160px' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Tooltip title="PPAs are a third-party agreements whereby you are buying a specific minimum of kWh at a defined initial rate and escalation rate for electricity or therms. These commitments are critical to properly evaluate the financial performance of the DER recommendation and will help me propose the most optimized DER recommendation to match to your priorities." placement='right' arrow>
              <FormControlLabel
                control={<Switch checked={showSteam} onChange={() => setShowSteam(!showSteam)} size="small" />}
                label="Do you have any existing Power Purchase Agreements (PPAs)?"
                sx={{ '& .MuiFormControlLabel-label': { fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.9rem' } }}
              />
            </Tooltip>
          </Box>

          {showSteam && (
            <Box sx={{ mb: 0, pl: 0 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 0 }}>
                <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 2, pt: '10px' }}>
                  
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Typography sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.75rem', minWidth: '150px', flex: 0.5 }}><b>PPA Provider:</b></Typography>
                    <TextField variant="outlined" size="small" type="text" placeholder='Enter Provider Name' sx={textFieldStyles} />
                  </Box>

                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Typography sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.75rem', minWidth: '150px', flex: 0.5 }}><b>PPA Term Start Date:</b></Typography>
                    <TextField variant="outlined" size="small" type="date" sx={textFieldStyles} />
                  </Box>

                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Typography sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.75rem', minWidth: '150px', flex: 0.5 }}><b>PPA End Date:</b></Typography>
                    <TextField variant="outlined" size="small" type="date" sx={textFieldStyles} />
                  </Box>

                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Typography sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.75rem', minWidth: '150px', flex: 0.5 }}><b>PPA Rate (Initial Year): </b>(Per kWh)</Typography>
                    <TextField
                      variant="outlined"
                      size="small"
                      type="text"
                      placeholder='0.01 - 0.99'
                      value={ppaRate}
                      onChange={handlePpaRateChange}
                      sx={textFieldStyles}
                      InputProps={{startAdornment: <InputAdornment position="start">$</InputAdornment>}}
                    />
                  </Box>

                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Typography sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.75rem', minWidth: '150px', flex: 0.5 }}><b>PPA Escalation Rate: </b>(In %)</Typography>
                    <TextField
                      variant="outlined"
                      size="small"
                      type="text"
                      placeholder='1 - 9%'
                      value={ppaEscalation}
                      onChange={handlePpaEscalationChange}
                      sx={textFieldStyles}
                      inputProps={{
                        onBlur: () => {
                          if (ppaEscalation && !ppaEscalation.includes('%')) {
                            setPpaEscalation(ppaEscalation + '%');
                          }
                        }
                      }}
                    />
                  </Box>

                </Box>
              </Box>
            </Box>
          )}

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography sx={{ mt: 1, fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.75rem', minWidth: '200px', flex: 1 }}>
              <i><b>* </b>If <b>Yes</b>, please provide details in the fields or upload the agreement and Bradley will autopopulate the fields for you.</i>
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

const textFieldStyles = {
  flex: 0.5,
  fontFamily: 'Nunito Sans, sans-serif',
  fontSize: '0.7rem',
  '& .MuiInputBase-root': { height: '40px', padding: '0 6px' },
  '& input': { padding: 0, fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem' },
  '& .MuiInputBase-input::placeholder': { fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem' }
};

export default SubStep2;
