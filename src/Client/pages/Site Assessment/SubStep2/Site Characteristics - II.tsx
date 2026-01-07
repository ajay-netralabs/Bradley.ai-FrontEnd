import React from 'react';
import { Box, TextField, Select, MenuItem, Typography, FormControl, SelectChangeEvent } from '@mui/material';
import { useSiteCharacteristicsII } from '../../../Context/Site Assessment/SubStep2/Site Characteristics - II Context';

const SubStep2: React.FC = () => {
  const { siteCharacteristicsIIState, updateField } = useSiteCharacteristicsII();
  const { shifts, humidification, hotColdSpots, outdoorAirSupply, hvacOperation } = siteCharacteristicsIIState;

  const handleShiftsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (/^[0-3]?$/.test(value)) {
      updateField('shifts', value);
    }
  };

  const handleSelectChange = (event: SelectChangeEvent<string>, field: keyof typeof siteCharacteristicsIIState) => {
    updateField(field, event.target.value);
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
                  onChange={(e) => handleSelectChange(e, 'humidification')}
                  displayEmpty
                  size="small"
                  sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem', height: '40px', '& .MuiSelect-select': { padding: '4px 6px', fontSize: '0.7rem' } }}
                >
                  <MenuItem disabled value="" sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem' }}>Select Yes or No</MenuItem>
                  <MenuItem value="yes" sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem' }}>Yes</MenuItem>
                  <MenuItem value="no" sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem' }}>No</MenuItem>
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
                  onChange={(e) => handleSelectChange(e, 'hotColdSpots')}
                  displayEmpty
                  size="small"
                  sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem', height: '40px', '& .MuiSelect-select': { padding: '4px 6px', fontSize: '0.7rem' } }}
                >
                  <MenuItem disabled value="" sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem' }}>Select Yes or No</MenuItem>
                  <MenuItem value="yes" sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem' }}>Yes</MenuItem>
                  <MenuItem value="no" sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem' }}>No</MenuItem>
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
                  onChange={(e) => handleSelectChange(e, 'outdoorAirSupply')}
                  displayEmpty
                  size="small"
                  sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem', height: '40px', '& .MuiSelect-select': { padding: '4px 6px', fontSize: '0.7rem' } }}
                >
                  <MenuItem disabled value="" sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem' }}>Select Yes or No</MenuItem>
                  <MenuItem value="yes" sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem' }}>Yes</MenuItem>
                  <MenuItem value="no" sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem' }}>No</MenuItem>
                </Select>
              </FormControl>
            </Box>

            <Box sx={{ mt: 1, display: 'flex', alignItems: 'center', gap: 10 }}>
              <Typography sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.75rem', flex: 0.685 }}>
                <b>Number of 8-hour Shifts Per Day:</b> (Max 3)
              </Typography>
              <TextField
                variant="outlined"
                size="small"
                type="text"
                placeholder="Input (Max 3)"
                value={shifts}
                onChange={handleShiftsChange}
                sx={{ flex: 0.5, fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem', '& .MuiInputBase-root': { height: '40px', padding: '0 6px' }, '& input': { padding: 0, fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.8rem' }, '& .MuiInputBase-input::placeholder': { fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem' } }}
              />
            </Box>

            <Box sx={{ mt: 1, display: 'flex', alignItems: 'center', gap: 10 }}>
              <Typography sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.75rem', flex: 0.685 }}>
                <b>HVAC System Operation:</b> <span style={{ fontWeight: 'normal' }}>(Pick One)</span>
              </Typography>
              <Box sx={{ flex: 0.5, minWidth: 120, display: 'flex', flexDirection: 'column' }}>
                <FormControl>
                  <Select
                    value={hvacOperation}
                    onChange={(e) => handleSelectChange(e, 'hvacOperation')}
                    displayEmpty
                    size="small"
                    sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem', height: '40px', '& .MuiSelect-select': { padding: '4px 6px', fontSize: '0.7rem' } }}
                  >
                    <MenuItem disabled value="" sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem' }}>Select Operation</MenuItem>
                    <MenuItem value="Simultaneous Heating & Cooling" sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem' }}>Simultaneous Heating & Cooling</MenuItem>
                    <MenuItem value="Seasonal Switchover" sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem' }}>Seasonal Switchover</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </Box>
            {hvacOperation === "Seasonal Switchover" && (
              <i style={{ fontSize: '0.65rem', marginTop: 6, marginLeft: 450, textAlign: 'right', color: '#666' }}>
                {window.location.pathname === '/demo' ? 'EmissionCheckIQ+' : 'Bradley.ai'} assumes a Fall switchover in Mid-October and a Spring<br />switchover in the last week of March for its energy calculations
              </i>
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default SubStep2;