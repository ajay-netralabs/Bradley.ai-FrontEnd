import React, { useState, useEffect } from 'react';
import { Box, TextField, Typography, FormControlLabel, MenuItem, Switch, Select, Tooltip } from '@mui/material';

const SubStep2: React.FC = () => {
  const [showSteam, setShowSteam] = useState(false);
  const [annualSteamUsage, setAnnualSteamUsage] = useState<number | null>(null);
  const [condensateReturn, setCondensateReturn] = useState<number | null>(null);
  const [condensateReturnEfficiency, setCondensateReturnEfficiency] = useState<number | null>(null);
  const [returnFLOW, setReturnFLOW] = useState<number | null>(null);
  const [returnMass, setReturnMass] = useState<number | null>(null);
  const [makeUpWater, setMakeUpWater] = useState<number | null>(null);

  useEffect(() => {
    if (annualSteamUsage !== null && condensateReturn !== null && annualSteamUsage > 0) {
      setCondensateReturnEfficiency((condensateReturn / annualSteamUsage) * 100);
    } else {
      setCondensateReturnEfficiency(null);
    }
  }, [annualSteamUsage, condensateReturn]);

  const handleAnnualSteamUsageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value ? parseFloat(event.target.value) : null;
    setAnnualSteamUsage(value);
    // calculateCondensateReturnEfficiency();
  };

  const handleCondensateReturnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value ? parseFloat(event.target.value) : null;
    setCondensateReturn(value);
    // calculateCondensateReturnEfficiency();
  };

  const handleReturnFLOWChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value ? parseFloat(event.target.value) : null;
    setReturnFLOW(value);
  };

  const handleReturnMassChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value ? parseFloat(event.target.value) : null;
    setReturnMass(value);
  };

  const handleMakeUpWaterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value ? parseFloat(event.target.value) : null;
    setMakeUpWater(value);
  };

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
              control={<Switch checked={showSteam} onChange={() => setShowSteam(!showSteam)} size="small" />}
              label="Does your facility require steam?"
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
                    <Typography sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.75rem', minWidth: '150px', flex: 0.25 }}>
                      <b>Annual Steam Usage:</b> (in MLbs)
                    </Typography>
                    <Tooltip title="Enter the total annual steam usage in MLbs" placement='top-end' arrow>
                      <TextField
                        variant="outlined"
                        placeholder='Enter the total annual steam usage in MLbs'
                        size="small"
                        type="number"
                        value={annualSteamUsage === null ? '' : annualSteamUsage}
                        onChange={handleAnnualSteamUsageChange}
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
                      <b>Steam Pressure Range:</b>
                    </Typography>
                    <Tooltip title="Select the steam pressure range" placement='top-end' arrow>
                      <Select
                        size="small"
                        variant="outlined"
                        defaultValue="0.5-15"
                        sx={{
                          flex: 0.75,
                          fontFamily: 'Nunito Sans, sans-serif',
                          fontSize: '0.7rem',
                          height: '40px',
                          '& .MuiInputBase-root': { padding: '0 6px' },
                          '& .MuiSelect-select': { padding: '4px 6px', fontSize: '0.7rem' },
                        }}
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
                        variant="outlined"
                        size="small"
                        type="number"
                        placeholder='Enter the exact steam pressure in PSI'
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
                      <b>Steam Usage Consistency:</b>
                    </Typography>
                    <Tooltip title="Select the steam pressure range" placement='top-end' arrow>
                      <Select
                        size="small"
                        variant="outlined"
                        defaultValue="select"
                        sx={{
                          flex: 0.75,
                          fontFamily: 'Nunito Sans, sans-serif',
                          fontSize: '0.7rem',
                          height: '40px',
                          '& .MuiInputBase-root': { padding: '0 6px' },
                          '& .MuiSelect-select': { padding: '4px 6px', fontSize: '0.7rem' },
                        }}
                      >
                        <MenuItem disabled value="select" sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem' }}>Select</MenuItem>
                        <MenuItem value="constant" sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem' }}>Constant</MenuItem>
                        <MenuItem value="variable" sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem' }}>Variable</MenuItem>
                      </Select>
                    </Tooltip>
                  </Box>

                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Typography sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.75rem', minWidth: '150px', flex: 0.25 }}>
                      <b>Condensate Return:</b> (in MLbs)
                    </Typography>
                    <Tooltip title="Enter the condensate return in MLbs" placement='top-end' arrow>
                      <TextField
                        variant="outlined"
                        size="small"
                        type="number"
                        placeholder='Enter the condensate return in MLbs'
                        value={condensateReturn === null ? '' : condensateReturn}
                        onChange={handleCondensateReturnChange}
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
                      <b>Condensate Return Efficiency:</b>
                    </Typography>
                    <Tooltip title="C.R. Efficiency will be calculated automatically." placement='top-end' arrow>
                    <TextField
                      variant="outlined"
                      size="small"
                      type="number"
                      placeholder='Condensate Return Efficiency'
                      value={condensateReturnEfficiency === null ? '' : condensateReturnEfficiency.toFixed(2)}
                      disabled
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
                      <b>Return FLOW:</b> (in gallons/minute)
                    </Typography>
                    <Tooltip title="Enter the amount of return FLOW in gallons per minute" placement='top-end' arrow>
                      <TextField
                        variant="outlined"
                        size="small"
                        type="number"
                        placeholder='Enter gallons per minute'
                        value={returnFLOW === null ? '' : returnFLOW}
                        onChange={handleReturnFLOWChange}
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
                      <b>Return Mass:</b> (in K)
                    </Typography>
                    <Tooltip title="Enter the temperature of the average condensate that is returned at a specific atmospheric pressure in K" placement='top-end' arrow>
                      <TextField
                        variant="outlined"
                        size="small"
                        type="number"
                        placeholder='Enter return mass (temperature) in K'
                        value={returnMass === null ? '' : returnMass}
                        onChange={handleReturnMassChange}
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
                      <b>Make up water:</b> (in gallons/minute)
                    </Typography>
                    <Tooltip title="Enter the amount of make up water in gallons per minute added to steam loop" placement='top-end' arrow>
                      <TextField
                        variant="outlined"
                        size="small"
                        type="number"
                        placeholder='Enter gallons per minute'
                        value={makeUpWater === null ? '' : makeUpWater}
                        onChange={handleMakeUpWaterChange}
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
              </Box>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default SubStep2;