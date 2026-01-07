import React from 'react';
import { Box, TextField, Typography, IconButton, Select, MenuItem, SelectChangeEvent } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DeleteIcon from '@mui/icons-material/Delete';
import { useSolarAssets } from '../../../Context/Site Assessment/SubStep3/INPUTS TO MAXIMIZE SOLAR DER ASSETS Context';

const SubStep3: React.FC = () => {
  const { solarAssetsState, updateField, addRoofSection, removeRoofSection, updateRoofSection } = useSolarAssets();
  const { roofSections, roofLoadCapacity, buildingClassification } = solarAssetsState;

  const formatNumber = (value: string): string => {
    const numericValue = value.replace(/[^0-9]/g, '');
    if (numericValue === '') return '';
    return Number(numericValue).toLocaleString('en-US', { maximumFractionDigits: 0 });
  };

  const handleRoofSectionChange = (index: number, value: string) => {
    updateRoofSection(index, formatNumber(value));
  };
  
  const handleRoofSectionBlur = (index: number) => {
    updateRoofSection(index, formatNumber(roofSections[index]));
  };

  const handleRoofLoadCapacityChange = (value: string) => {
    updateField('roofLoadCapacity', formatNumber(value));
  };

  const handleRoofLoadCapacityBlur = () => {
    updateField('roofLoadCapacity', formatNumber(roofLoadCapacity));
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.75rem', p: 1, pr: 4, pl: 1, pt: 1 }}>
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@200..1000&display=swap');
      </style>
      <Typography variant="h6" sx={{ mb: 1, fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.85rem', fontWeight: 'bold', textAlign: 'center' }}>
        <h2>INPUTS TO MAXIMIZE SOLAR DER ASSETS</h2>
      </Typography>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: '10px', pb: '10px', px: '160px' }}>
        <Typography sx={{ fontSize: '0.75rem', fontFamily: 'Nunito Sans, sans-serif', mb: 2.5, textAlign: 'center' }}>
          <b>I am going to ask you for specific details to assist in the proper sizing of roof, ground or carport solar arrays. We start with the roof(s).</b>
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Typography sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.75rem', minWidth: '200px', flex: 0.3 }}>
            <b>Total Roof Space:</b> (in Sq. Ft.)<br /> Click on the '⨁' icon for multiple roof sections.
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flex: 0.7, maxWidth: 'calc(100% - 200px)' }}>
            {roofSections.map((value, index) => (
              <TextField key={index} variant="outlined" size="small" type="text" value={value} onChange={(e) => handleRoofSectionChange(index, e.target.value)} onBlur={() => handleRoofSectionBlur(index)} placeholder={`Sec. ${index + 1} Area`} sx={{ flex: 1, fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem', '& .MuiInputBase-root': { height: '40px', padding: '0 6px' }, '& input': { padding: 0, fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.8rem' }, '& .MuiInputBase-input::placeholder': { fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem' } }} />
            ))}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, ml: 1 }}>
              <IconButton onClick={addRoofSection} color="primary" sx={{ p: 0, '&:focus': { outline: 'none' } }}>
                <AddCircleOutlineIcon fontSize="small" />
              </IconButton>
              <IconButton onClick={() => removeRoofSection(roofSections.length - 1)} sx={{ p: 0, '&:focus': { outline: 'none' } }} disabled={roofSections.length === 1}>
                <DeleteIcon fontSize="small" />
              </IconButton>
            </Box>
          </Box>
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.75rem', minWidth: '200px', flex: 0.3 }}>
              <b>Existing Roof Load Rating Capacity:</b> (in Lbs / Sq. in) (Optional)
            </Typography>
            <TextField variant="outlined" size="small" type="text" value={roofLoadCapacity} onChange={(e) => handleRoofLoadCapacityChange(e.target.value)} onBlur={handleRoofLoadCapacityBlur} placeholder='Roof Load Capacity' sx={{ flex: 0.7, fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem', '& .MuiInputBase-root': { height: '40px', padding: '0 6px' }, '& input': { padding: 0, fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.8rem' } }} />
          </Box>
          <Typography sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.68rem', fontStyle: 'italic', textAlign: 'right', mt: 0.5, width: '100%', pr: '0px' }}>
            <b>*</b>A solar array with typical racking, inverters and ancillary equipment average 3-5 pounds per square foot<br />of dead load.
          </Typography>
          <Typography sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.68rem', fontStyle: 'italic', textAlign: 'right', mt: 0.5, width: '100%', pr: '0px' }}>
            <b>**</b>IF you do not know your roof load capacity I will still provide 90% conceptual design of an excellent roof<br />mount solar array system for you. I will note in the report that during the final design phase the dead load<br />must be calculated by a Professional Engineer.
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Typography sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.75rem', minWidth: '200px', flex: 0.3 }}>
            <b>Building Classification:</b> (Optional)
          </Typography>
          <Select size="small" value={buildingClassification} onChange={(e: SelectChangeEvent) => updateField('buildingClassification', e.target.value)} sx={{ flex: 0.7, fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem', height: '40px', '& .MuiInputBase-root': { padding: '0 6px' }, '& .MuiSelect-select': { padding: '4px 6px', fontSize: '0.7rem' } }}>
            <MenuItem value="default" disabled sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem' }}>Select Classification</MenuItem>
            <MenuItem value="Class 3" sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem' }}>Class 3 (loads must be restored automatically by the emergency power system within a set time<br />(typically 10 seconds), but carry a lower reliability requirement than Class 4 “life‐safety” loads)</MenuItem>
            <MenuItem value="Class 4" sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem' }}>Class 4 (highest priority load - requires increased reliability, with automatic transfer, redundancy,<br />and routine testing)</MenuItem>
          </Select>
        </Box>
      </Box>
    </Box>
  );
};

export default SubStep3;