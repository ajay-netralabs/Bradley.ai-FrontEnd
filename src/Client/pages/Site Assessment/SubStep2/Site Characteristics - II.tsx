import React, { useState } from 'react';
import { Box, Typography, TextField, Select, MenuItem, FormControl } from '@mui/material';

const SubStep2: React.FC = () => {
  const [shifts, setShifts] = useState('');
  const [humidification, setHumidification] = useState('');
  const [hotColdSpots, setHotColdSpots] = useState('');
  const [outdoorAirSupply, setOutdoorAirSupply] = useState('');
  const [hvacOperation, setHvacOperation] = useState('');

  const handleShiftsChange = (event: { target: { value: any } }) => {
    const value = event.target.value;
    if (/^[0-3]$|^$/.test(value)) {
      setShifts(value);
    }
  };

  const handleHumidificationChange = (event: { target: { value: any } }) => {
    setHumidification(event.target.value);
  };

  const handleHotColdSpotsChange = (event: { target: { value: any } }) => {
    setHotColdSpots(event.target.value);
  };

  const handleOutdoorAirSupplyChange = (event: { target: { value: any } }) => {
    setOutdoorAirSupply(event.target.value);
  };

  const handleHvacOperationChange = (event: { target: { value: any } }) => {
    setHvacOperation(event.target.value);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.75rem', p: 1, pr: 4, pl: 1, pt: 1 }}>
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Nunito+Sans:ital,opsz,wght@0,6..12,200..1000;1,6..12,200..1000&display=swap');
      </style>
      <Typography variant="h6" sx={{ mb: 1, fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.85rem', fontWeight: 'bold', textAlign: 'center' }}>
        <h2>Site Characteristics - II</h2>
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 0 }}>
        <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 2, pt: '10px', pb: '10px', pl: '160px', pr: '160px' }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', mt: 1 }}>

          <Box sx={{ mt: 1, display: 'flex', alignItems: 'center', gap: 10 }}>
              <Typography sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.75rem', flex: 0.685 }}>
                <b>Humidification Issues?</b>
              </Typography>
              <FormControl sx={{ flex: 0.5, minWidth: 120 }}>
                <Select
                  value={humidification}
                  onChange={handleHumidificationChange}
                  displayEmpty
                  size="small"
                  sx={{
                    fontFamily: 'Nunito Sans, sans-serif',
                    fontSize: '0.7rem',
                    height: '40px',
                          '& .MuiInputBase-root': { padding: '0 6px' },
                          '& .MuiSelect-select': { padding: '4px 6px', fontSize: '0.7rem' },
                  }}
                >
                  <MenuItem disabled value="" sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem' }}>
                    Select Yes or No
                  </MenuItem>
                  <MenuItem value="yes" sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem' }}>
                    Yes
                  </MenuItem>
                  <MenuItem value="no" sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem' }}>
                    No
                  </MenuItem>
                </Select>
              </FormControl>
            </Box>

            <Box sx={{ mt: 1, display: 'flex', alignItems: 'center', gap: 10 }}>
              <Typography sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.75rem', flex: 0.685 }}>
                <b>Hot / Cold Spots?</b>
              </Typography>
              <FormControl sx={{ flex: 0.5, minWidth: 120 }}>
                <Select
                  value={hotColdSpots}
                  onChange={handleHotColdSpotsChange}
                  displayEmpty
                  size="small"
                  sx={{
                    fontFamily: 'Nunito Sans, sans-serif',
                    fontSize: '0.7rem',
                    height: '40px',
                          '& .MuiInputBase-root': { padding: '0 6px' },
                          '& .MuiSelect-select': { padding: '4px 6px', fontSize: '0.7rem' },
                  }}
                >
                  <MenuItem disabled value="" sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem' }}>
                    Select Yes or No
                  </MenuItem>
                  <MenuItem value="yes" sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem' }}>
                    Yes
                  </MenuItem>
                  <MenuItem value="no" sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem' }}>
                    No
                  </MenuItem>
                </Select>
              </FormControl>
            </Box>

            <Box sx={{ mt: 1, display: 'flex', alignItems: 'center', gap: 10 }}>
              <Typography sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.75rem', flex: 0.685 }}>
                <b>Outdoor Air Supply Issues?</b>
              </Typography>
              <FormControl sx={{ flex: 0.5, minWidth: 120 }}>
                <Select
                  value={outdoorAirSupply}
                  onChange={handleOutdoorAirSupplyChange}
                  displayEmpty
                  size="small"
                  sx={{
                    fontFamily: 'Nunito Sans, sans-serif',
                    fontSize: '0.7rem',
                    height: '40px',
                          '& .MuiInputBase-root': { padding: '0 6px' },
                          '& .MuiSelect-select': { padding: '4px 6px', fontSize: '0.7rem' },
                  }}
                >
                  <MenuItem disabled value="" sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem' }}>
                    Select Yes or No
                  </MenuItem>
                  <MenuItem value="yes" sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem' }}>
                    Yes
                  </MenuItem>
                  <MenuItem value="no" sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem' }}>
                    No
                  </MenuItem>
                </Select>
              </FormControl>
            </Box>

            <Box sx={{ mt: 1, display: 'flex', alignItems: 'center', gap: 10 }}>
              <Typography sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.75rem', flex: 0.685 }}>
                <b>Number of Shifts Per Day:</b> (Max 3)
              </Typography>
              <TextField
                variant="outlined"
                size="small"
                type="text"
                placeholder="Input (Max 3)"
                value={shifts}
                onChange={handleShiftsChange}
                sx={{
                  flex: 0.5,
                  fontFamily: 'Nunito Sans, sans-serif',
                  fontSize: '0.7rem',
                  '& .MuiInputBase-root': { height: '40px', padding: '0 6px' },
                  '& input': { padding: 0, fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.8rem' },
                  '& .MuiInputBase-input::placeholder': {
                    fontFamily: 'Nunito Sans, sans-serif',
                    fontSize: '0.7rem',
                  },
                }}
              />
            </Box>

            <Box sx={{ mt: 1, display: 'flex', alignItems: 'center', gap: 10 }}>
              <Typography sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.75rem', flex: 0.685 }}>
                <b>HVAC System Operation:</b> <span style={{ fontWeight: 'normal' }}>(Pick One)</span>
              </Typography>
              <FormControl sx={{ flex: 0.5, minWidth: 120 }}>
                <Select
                  value={hvacOperation}
                  onChange={handleHvacOperationChange}
                  displayEmpty
                  size="small"
                  sx={{
                    fontFamily: 'Nunito Sans, sans-serif',
                    fontSize: '0.7rem',
                    height: '40px',
                          '& .MuiInputBase-root': { padding: '0 6px' },
                          '& .MuiSelect-select': { padding: '4px 6px', fontSize: '0.7rem' },
                  }}
                >
                  <MenuItem disabled value="" sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem' }}>
                    Select Operation
                  </MenuItem>
                  <MenuItem value="Simultaneous Heating & Cooling" sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem' }}>
                    Simultaneous Heating & Cooling
                  </MenuItem>
                  <MenuItem value="Seasonal Switchover" sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem' }}>
                    Seasonal Switchover
                  </MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default SubStep2;