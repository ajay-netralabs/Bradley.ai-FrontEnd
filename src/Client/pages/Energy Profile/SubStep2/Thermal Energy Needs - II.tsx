import React, { useState } from 'react';
import { Box, TextField, Typography, FormControlLabel, Switch, Tooltip } from '@mui/material';

const SubStep2: React.FC = () => { 
  const [showSteam, setShowSteam] = useState(false);
  const [showHotWaterBoilers, setShowHotWaterBoilers] = useState(false)
  const [showSteam2HWDomestic, setShowSteam2HWDomestic] = useState(false)
  const [showSteam2HWAHU, setShowSteam2HWAHU] = useState(false)
  const [showSteam4Washdowns, setShowSteam4Washdowns] = useState(false)
  const [hotWaterUsage, setHotWaterUsage] = useState<number | null>(null);

  const handleHotWaterUsageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value ? parseFloat(event.target.value) : null;
      setHotWaterUsage(value);
    };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.75rem', p: 1, pr: 4, pl: 1, pt: 1 }}>
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Nunito+Sans:ital,opsz,wght@0,6..12,200..1000;1,6..12,200..1000&display=swap');
      </style>
      <Typography variant="h6" sx={{ mb: 1, fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.85rem', fontWeight: 'bold', textAlign: 'center' }}>
        <h2>Thermal Energy Needs - II</h2>
      </Typography>
      
      <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 0 }}>
        <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 2, pt: '10px', pb: '10px', pl: '160px', pr: '160px' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Tooltip title="Click to expand or move on to the next step." placement='right' arrow>
          <FormControlLabel
            control={<Switch checked={showSteam} onChange={() => setShowSteam(!showSteam)} size="small" />}
            label="Does your facility require hot water for HVAC / other non-domestic processes?"
            sx={{
              '& .MuiFormControlLabel-label': {
                fontFamily: 'Nunito Sans, sans-serif',
                fontSize: '0.9rem'
              }
            }}
          /></Tooltip>

          </Box>

          {showSteam && (
            <Box sx={{ mb: 0, pl: 0 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 0 }}>
        <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 2, pt: '10px' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Typography sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.75rem', minWidth: '150px', flex: 0.25 }}><b>Hot Water Usage:</b> (in kGal)</Typography>
          <Tooltip title="Enter the total hot water usage in kGal" placement='top-end' arrow>
            <TextField
              variant="outlined"
              placeholder='Enter the total hot water usage in kGal'
              size="small"
              type="number"
              value={hotWaterUsage === null ? '' : hotWaterUsage}
              onChange={handleHotWaterUsageChange}
              sx={{
                flex: 0.75, fontFamily: 'Nunito Sans, sans-serif',
                fontSize: '0.7rem',
                '& .MuiInputBase-root': { height: '40px', padding: '0 6px' },
                '& input': { padding: 0, fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.8rem' }
              }}
            />
          </Tooltip>
        </Box>


        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Typography sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.75rem', minWidth: '150px', flex: 0.25 }}><b>Hot Water Temperature:</b> (°F)</Typography>
          <Tooltip title="Enter the hot water temperature in °F" placement='top-end' arrow>
          <TextField
            variant="outlined" 
            placeholder='Enter the hot water temperature in °F'
            size="small" 
            type="number" 
            sx={{
              flex: 0.75, fontFamily: 'Nunito Sans, sans-serif',
              fontSize: '0.7rem',
              '& .MuiInputBase-root': { height: '40px', padding: '0 6px' },
              '& input': { padding: 0, fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.8rem' }
            }}
          />
          </Tooltip>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
  <Typography sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.75rem', minWidth: '150px', flex: 0.25 }}>
    <b>Hot Water Usage Type in Kilo-Gallons (kGal):</b> (Optional)
  </Typography>
</Box>


        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Typography sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.75rem', minWidth: '150px', flex: 0.25 }}><b>Domestic Hot Water:</b></Typography>
          <Tooltip title="Enter the annual domestic hot water usage in kGal" placement='top-end' arrow>
          <TextField
            variant="outlined" 
            size="small" 
            type="number"
            placeholder='Annual Usage (kGal)' 
            sx={{
              flex: 0.75, fontFamily: 'Nunito Sans, sans-serif',
              fontSize: '0.7rem',
              '& .MuiInputBase-root': { height: '40px', padding: '0 6px' },
              '& input': { padding: 0, fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem' },
              '& .MuiInputBase-input::placeholder': {
                fontFamily: 'Nunito Sans, sans-serif',
                fontSize: '0.7rem',
              }
            }}
          />
          </Tooltip>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Typography sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.75rem', minWidth: '150px', flex: 0.25 }}><b>Domestic Hot Water on Demand:</b></Typography>
          <Tooltip title="Enter the annual domestic hot water on-demand usage in kGal" placement='top-end' arrow>
          <TextField
            variant="outlined" 
            size="small" 
            type="number"
            placeholder='Annual Usage (kGal)' 
            sx={{
              flex: 0.75, fontFamily: 'Nunito Sans, sans-serif',
              fontSize: '0.7rem',
              '& .MuiInputBase-root': { height: '40px', padding: '0 6px' },
              '& input': { padding: 0, fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem' },
              '& .MuiInputBase-input::placeholder': {
                fontFamily: 'Nunito Sans, sans-serif',
                fontSize: '0.7rem',
              }
            }}
          />
          </Tooltip>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Typography sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.75rem', minWidth: '150px', flex: 0.25 }}><b>Domestic Hot Water Circulation Loop:</b></Typography>
          <Tooltip title="Enter the annual domestic hot water circulation loop usage in kGal" placement='top-end' arrow>
          <TextField
            variant="outlined" 
            size="small" 
            type="number"
            placeholder='Annual Usage (kGal)' 
            sx={{
              flex: 0.75, fontFamily: 'Nunito Sans, sans-serif',
              fontSize: '0.7rem',
              '& .MuiInputBase-root': { height: '40px', padding: '0 6px' },
              '& input': { padding: 0, fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem' },
              '& .MuiInputBase-input::placeholder': {
                fontFamily: 'Nunito Sans, sans-serif',
                fontSize: '0.7rem',
              }
            }}
          />
          </Tooltip>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Typography sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.75rem', minWidth: '150px', flex: 0.25 }}><b>Preheat for Steam:</b></Typography>
          <Tooltip title="Enter the annual preheat for steam usage in kGal" placement='top-end' arrow>
          <TextField
            variant="outlined" 
            size="small" 
            type="number"
            placeholder='Annual Usage (kGal)' 
            sx={{
              flex: 0.75, fontFamily: 'Nunito Sans, sans-serif',
              fontSize: '0.7rem',
              '& .MuiInputBase-root': { height: '40px', padding: '0 6px' },
              '& input': { padding: 0, fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem' },
              '& .MuiInputBase-input::placeholder': {
                fontFamily: 'Nunito Sans, sans-serif',
                fontSize: '0.7rem',
              }
            }}
          />
          </Tooltip>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Typography sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.75rem', minWidth: '150px', flex: 0.25 }}><b>Food Preparations/Washdowns:</b></Typography>
          <Tooltip title="Enter the annual food preparations/washdowns usage in kGal" placement='top-end' arrow>
          <TextField
            variant="outlined" 
            size="small" 
            type="number"
            placeholder='Annual Usage (kGal)' 
            sx={{
              flex: 0.75, fontFamily: 'Nunito Sans, sans-serif',
              fontSize: '0.7rem',
              '& .MuiInputBase-root': { height: '40px', padding: '0 6px' },
              '& input': { padding: 0, fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem' },
              '& .MuiInputBase-input::placeholder': {
                fontFamily: 'Nunito Sans, sans-serif',
                fontSize: '0.7rem',
              }
            }}
          />
          </Tooltip>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Typography sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.75rem', minWidth: '150px', flex: 0.25 }}><b>Other:</b></Typography>
          <Tooltip title="Enter other annual usages in kGal" placement='top-end' arrow>
          <TextField
            variant="outlined" 
            size="small" 
            type="number"
            placeholder='Annual Usage (kGal)' 
            sx={{
              flex: 0.75, fontFamily: 'Nunito Sans, sans-serif',
              fontSize: '0.7rem',
              '& .MuiInputBase-root': { height: '40px', padding: '0 6px' },
              '& input': { padding: 0, fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem' },
              '& .MuiInputBase-input::placeholder': {
                fontFamily: 'Nunito Sans, sans-serif',
                fontSize: '0.7rem',
              }
            }}
          />
          </Tooltip>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, pt: '10px', pb: '10px' }}>
        <Tooltip title="Click to expand if you have HW Boilers for domestic use." placement='right' arrow>
          <FormControlLabel
            control={<Switch checked={showHotWaterBoilers} onChange={() => setShowHotWaterBoilers(!showHotWaterBoilers)} size="small" />}
            label="Do you have Hot Water Boilers for domestic use?"
            sx={{
              '& .MuiFormControlLabel-label': {
                fontFamily: 'Nunito Sans, sans-serif',
                fontSize: '0.9rem'
              }
            }}
          /></Tooltip>

          </Box>

          {showHotWaterBoilers && (
            <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 2, pt: '10px' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.75rem', minWidth: '150px', flex: 0.25 }}><b>What size boiler(s) provide domestic hot water?</b></Typography>
            <Tooltip title="Enter the size of boiler(s)" placement='top-end' arrow>
              <TextField
                variant="outlined"
                placeholder='Enter the size of boiler(s)'
                size="small"
                type="text"
                sx={{
                  flex: 0.75, fontFamily: 'Nunito Sans, sans-serif',
                  fontSize: '0.7rem',
                  '& .MuiInputBase-root': { height: '40px', padding: '0 6px' },
                  '& input': { padding: 0, fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.8rem' }
                }}
              />
            </Tooltip>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.75rem', minWidth: '150px', flex: 0.25 }}><b>How many boiler(s) exist?</b></Typography>
            <Tooltip title="Enter the total number of existing boiler(s)" placement='top-end' arrow>
              <TextField
                variant="outlined"
                placeholder='Enter the total number of existing boiler(s)'
                size="small"
                type="number"
                sx={{
                  flex: 0.75, fontFamily: 'Nunito Sans, sans-serif',
                  fontSize: '0.7rem',
                  '& .MuiInputBase-root': { height: '40px', padding: '0 6px' },
                  '& input': { padding: 0, fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.8rem' }
                }}
              />
            </Tooltip>
          </Box>
          </Box>
          )}

<Box sx={{ display: 'flex', alignItems: 'center', gap: 1, pt: '10px', pb: '10px' }}>
          <FormControlLabel
            control={<Switch checked={showSteam2HWDomestic} onChange={() => setShowSteam2HWDomestic(!showSteam2HWDomestic)} size="small" />}
            label="Do you have a Steam to HW Heat Exchanger for domestic use?"
            sx={{
              '& .MuiFormControlLabel-label': {
                fontFamily: 'Nunito Sans, sans-serif',
                fontSize: '0.9rem'
              }
            }}
          />

          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, pt: '10px', pb: '10px' }}>
          <FormControlLabel
            control={<Switch checked={showSteam2HWAHU} onChange={() => setShowSteam2HWAHU(!showSteam2HWAHU)} size="small" />}
            label="Do you have Steam to HW Heat Exchangers in the AHU?"
            sx={{
              '& .MuiFormControlLabel-label': {
                fontFamily: 'Nunito Sans, sans-serif',
                fontSize: '0.9rem'
              }
            }}
          />

          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, pt: '10px', pb: '10px' }}>
          <FormControlLabel
            control={<Switch checked={showSteam4Washdowns} onChange={() => setShowSteam4Washdowns(!showSteam4Washdowns)} size="small" />}
            label="Do you use Steam for Wash Downs (Space cleaning, Kitchen cleaning, Industrial Equipment cleaning)?"
            sx={{
              '& .MuiFormControlLabel-label': {
                fontFamily: 'Nunito Sans, sans-serif',
                fontSize: '0.9rem'
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
                      <i><b>Hint: </b>All values need to be near estimates, not exact. Please be as accurate as possible as the answers may alter my recommendation.</i><br />
                    </Typography>
                  </Box>

        </Box>
      </Box>
    </Box>
  );
};

export default SubStep2;