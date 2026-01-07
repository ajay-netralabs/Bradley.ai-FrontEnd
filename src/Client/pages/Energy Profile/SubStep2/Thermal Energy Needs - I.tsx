import React, { useState, useEffect } from 'react';
import { Box, TextField, Typography, FormControlLabel, MenuItem, Switch, Select, Tooltip, SelectChangeEvent } from '@mui/material';
import { useThermalEnergyNeedsI } from '../../../Context/Energy Profile/SubStep2/Thermal Energy Needs - I Context';

// Helper function to format a string representing a number with commas
const formatNumberWithCommas = (numStr: string) => {
  if (!numStr) return '';
  const parts = numStr.split('.');
  parts[0] = parts[0].replace(/,/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return parts.join('.');
};

// Helper function to parse a formatted string back to a plain number string
const parseNumberString = (str: string) => {
  return str.replace(/[^0-9.]/g, '');
};

const SubStep2: React.FC = () => {
  // Get the entire state object and the update function from the context
  const { thermalNeedsIState, updateField } = useThermalEnergyNeedsI();
  const { showSteam, annualSteamUsage, steamPressureRange, exactSteamPressure, steamUsageConsistency, condensateReturn, returnFLOW, returnCondensateTemperature, makeUpWater } = thermalNeedsIState;

  // This derived state remains local as it's calculated on the fly
  const [condensateReturnEfficiency, setCondensateReturnEfficiency] = useState<number | null>(null);

  useEffect(() => {
    const annualUsageNum = parseFloat(annualSteamUsage);
    const condensateReturnNum = parseFloat(condensateReturn);

    if (!isNaN(annualUsageNum) && !isNaN(condensateReturnNum) && annualUsageNum > 0) {
      setCondensateReturnEfficiency((condensateReturnNum / annualUsageNum) * 100);
    } else {
      setCondensateReturnEfficiency(null);
    }
  }, [annualSteamUsage, condensateReturn]);
  
  // Generic handler for text fields that should contain numbers
  const handleNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    updateField(name as keyof typeof thermalNeedsIState, parseNumberString(value));
  };
  
  // Generic handler for Select components
  const handleSelectChange = (event: SelectChangeEvent<string>) => {
    const { name, value } = event.target;
    updateField(name as keyof typeof thermalNeedsIState, value);
  };
  
  // Generic handler for regular text fields
  // const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const { name, value } = event.target;
  //   updateField(name as keyof typeof thermalNeedsIState, value);
  // };

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
            <Tooltip title="Click to expand or move on to the next step." placement='right' arrow>
              <FormControlLabel
                control={<Switch checked={showSteam} onChange={(e) => updateField('showSteam', e.target.checked)} size="small" />}
                label="Does your facility require steam?"
                sx={{
                  '& .MuiFormControlLabel-label': {
                    fontFamily: 'Nunito Sans, sans-serif',
                    fontSize: '0.9rem'
                  }
                }}
              />
            </Tooltip>
          </Box>

          {showSteam && (
            <Box sx={{ mb: 0, pl: 0 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 0 }}>
                <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 2, pt: '10px' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Typography sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.75rem', minWidth: '150px', flex: 0.25 }}>
                      <b>Annual Steam Usage:</b> (in MLbs)
                    </Typography>
                    <Tooltip title="Enter the total annual steam usage in MLbs" placement='top-end' arrow>
                      <TextField
                        name="annualSteamUsage"
                        variant="outlined"
                        placeholder='Enter the total annual steam usage in MLbs'
                        size="small"
                        type="text"
                        value={formatNumberWithCommas(annualSteamUsage)}
                        onChange={handleNumberChange}
                        sx={{ flex: 0.75, fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem', '& .MuiInputBase-root': { height: '40px', padding: '0 6px' }, '& input': { padding: 0, fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.8rem' } }}
                      />
                    </Tooltip>
                  </Box>

                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Typography sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.75rem', minWidth: '150px', flex: 0.25 }}>
                      <b>Steam Pressure Range:</b>
                    </Typography>
                    <Tooltip title="Select the steam pressure range" placement='top-end' arrow>
                      <Select
                        name="steamPressureRange"
                        size="small"
                        variant="outlined"
                        value={steamPressureRange}
                        onChange={handleSelectChange}
                        sx={{ flex: 0.75, fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem', height: '40px', '& .MuiInputBase-root': { padding: '0 6px' }, '& .MuiSelect-select': { padding: '4px 6px', fontSize: '0.7rem' }, }}
                      >
                        <MenuItem value="0.5-15" sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem' }}>0.5-15 PSI</MenuItem>
                        <MenuItem value="16-150" sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem' }}>16-150 PSI</MenuItem>
                        <MenuItem value="150-300" sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem' }}>150-300 PSI</MenuItem>
                      </Select>
                    </Tooltip>
                  </Box>

                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Typography sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.75rem', minWidth: '150px', flex: 0.25 }}>
                      <b>Exact Steam Pressure:</b> (PSI)
                    </Typography>
                    <Tooltip title="Enter the exact steam pressure in PSI" placement='top-end' arrow>
                      <TextField
                        name="exactSteamPressure"
                        variant="outlined"
                        size="small"
                        type="text"
                        placeholder='Enter the exact steam pressure in PSI'
                        value={formatNumberWithCommas(exactSteamPressure)}
                        onChange={handleNumberChange}
                        sx={{ flex: 0.75, fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem', '& .MuiInputBase-root': { height: '40px', padding: '0 6px' }, '& input': { padding: 0, fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.8rem' } }}
                      />
                    </Tooltip>
                  </Box>

                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Typography sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.75rem', minWidth: '150px', flex: 0.25 }}>
                      <b>Steam Usage Consistency:</b>
                    </Typography>
                    <Tooltip title="Select the steam usage consistency" placement='top-end' arrow>
                      <Select
                        name="steamUsageConsistency"
                        size="small"
                        variant="outlined"
                        value={steamUsageConsistency}
                        onChange={handleSelectChange}
                        sx={{ flex: 0.75, fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem', height: '40px', '& .MuiInputBase-root': { padding: '0 6px' }, '& .MuiSelect-select': { padding: '4px 6px', fontSize: '0.7rem' }, }}
                      >
                        <MenuItem disabled value="select" sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem' }}>Select</MenuItem>
                        <MenuItem value="constant" sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem' }}>Constant</MenuItem>
                        <MenuItem value="variable" sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem' }}>Variable</MenuItem>
                      </Select>
                    </Tooltip>
                  </Box>

                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Typography sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.75rem', minWidth: '150px', flex: 0.25 }}>
                      <b>Condensate Return:</b> (in kGals)
                    </Typography>
                    <Tooltip title="Enter the condensate return in kGals" placement='top-end' arrow>
                      <TextField
                        name="condensateReturn"
                        variant="outlined"
                        size="small"
                        type="text"
                        placeholder='Enter the condensate return in kGals'
                        value={formatNumberWithCommas(condensateReturn)}
                        onChange={handleNumberChange}
                        sx={{ flex: 0.75, fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem', '& .MuiInputBase-root': { height: '40px', padding: '0 6px' }, '& input': { padding: 0, fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.8rem' } }}
                      />
                    </Tooltip>
                  </Box>

                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Typography sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.75rem', minWidth: '150px', flex: 0.25 }}>
                      <b>Condensate Return Efficiency:</b>
                    </Typography>
                    <Tooltip title="C.R. Efficiency will be calculated automatically." placement='top-end' arrow>
                      <TextField
                        variant="outlined"
                        size="small"
                        type="text"
                        placeholder='Condensate Return Efficiency'
                        value={condensateReturnEfficiency === null ? '' : condensateReturnEfficiency.toFixed(2) + ' %'}
                        disabled
                        sx={{ flex: 0.75, fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem', '& .MuiInputBase-root': { height: '40px', padding: '0 6px' }, '& input': { padding: 0, fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.8rem' } }}
                      />
                    </Tooltip>
                  </Box>

                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Typography sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.75rem', minWidth: '150px', flex: 0.25 }}>
                      <b>Return FLOW:</b> (in gallons/minute)
                    </Typography>
                    <Tooltip title="Enter the amount of return FLOW in gallons per minute" placement='top-end' arrow>
                      <TextField
                        name="returnFLOW"
                        variant="outlined"
                        size="small"
                        type="text"
                        placeholder='Enter gallons per minute'
                        value={formatNumberWithCommas(returnFLOW)}
                        onChange={handleNumberChange}
                        sx={{ flex: 0.75, fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem', '& .MuiInputBase-root': { height: '40px', padding: '0 6px' }, '& input': { padding: 0, fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.8rem' } }}
                      />
                    </Tooltip>
                  </Box>

                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Typography sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.75rem', minWidth: '150px', flex: 0.25 }}>
                      <b>Return Condensate Temperature:</b> (in F)
                    </Typography>
                    <Tooltip title="Enter the condensate return average temperature in F" placement='top-end' arrow>
                      <TextField
                        name="returnCondensateTemperature"
                        variant="outlined"
                        size="small"
                        type="text"
                        placeholder='Enter condensate return average temperature in F'
                        value={formatNumberWithCommas(returnCondensateTemperature)}
                        onChange={handleNumberChange}
                        sx={{ flex: 0.75, fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem', '& .MuiInputBase-root': { height: '40px', padding: '0 6px' }, '& input': { padding: 0, fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.8rem' } }}
                      />
                    </Tooltip>
                  </Box>

                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Typography sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.75rem', minWidth: '150px', flex: 0.25 }}>
                      <b>Make up water:</b> (in gallons/minute)
                    </Typography>
                    <Tooltip title="Enter the amount of make up water in gallons per minute added to steam loop" placement='top-end' arrow>
                      <TextField
                        name="makeUpWater"
                        variant="outlined"
                        size="small"
                        type="text"
                        placeholder='Enter gallons per minute'
                        value={formatNumberWithCommas(makeUpWater)}
                        onChange={handleNumberChange}
                        sx={{ flex: 0.75, fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem', '& .MuiInputBase-root': { height: '40px', padding: '0 6px' }, '& input': { padding: 0, fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.8rem' } }}
                      />
                    </Tooltip>
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