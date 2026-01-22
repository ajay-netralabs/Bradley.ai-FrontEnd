import React from 'react';
import { Box, TextField, Button, Typography, FormControlLabel, MenuItem, Switch, IconButton, Select, Tooltip, SelectChangeEvent } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import { useAppDispatch, useAppSelector } from '../../../../store/hooks';
import { 
    updateThermalIV, 
    addWasteHeatSource, 
    removeWasteHeatSource, 
    updateWasteHeatSource, 
    ThermalEnergyNeedsIVState,
    WasteHeatSource 
} from '../../../../store/slices/energyProfileSlice';

const SubStep2: React.FC = () => {
  const dispatch = useAppDispatch();
  const thermalNeedsIVState = useAppSelector((state) => state.energyProfile.thermalNeedsIV);
  
  const { showWasteHeat, wasteHeatSources, benefitFromUtilization } = thermalNeedsIVState;

  const handleUpdateField = (field: keyof ThermalEnergyNeedsIVState, value: string | boolean) => {
      dispatch(updateThermalIV({ field, value }));
  };

  const handleAddWasteHeatSource = () => {
      dispatch(addWasteHeatSource());
  };

  const handleRemoveWasteHeatSource = (index: number) => {
      dispatch(removeWasteHeatSource(index));
  };

  const handleUpdateWasteHeatSourceField = (index: number, field: keyof WasteHeatSource, value: string) => {
      dispatch(updateWasteHeatSource({ index, field, value }));
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.75rem', p: 1, pr: 4, pl: 1, pt: 1 }}>
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Nunito+Sans:ital,opsz,wght@0,6..12,200..1000;1,6..12,200..1000&display=swap');
      </style>
      <Typography variant="h6" sx={{ mb: 1, fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.85rem', fontWeight: 'bold', textAlign: 'center' }}>
        <h2>Thermal Energy Needs - IV</h2>
      </Typography>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 0 }}>
        <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 2, pt: '10px', pb: '10px', pl: '160px', pr: '160px' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Tooltip title="Click to expand or move on to the next step." placement='right' arrow>
              <FormControlLabel
                control={<Switch checked={showWasteHeat} onChange={(e) => handleUpdateField('showWasteHeat', e.target.checked)} size="small" />}
                label="Does your facility generate waste heat? If so from what type of source, pick from the options below."
                sx={{ '& .MuiFormControlLabel-label': { fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.9rem' } }}
              />
            </Tooltip>
          </Box>

          {showWasteHeat && (
            <Box>
              {wasteHeatSources.map((source, index) => (
                <Box key={index} sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                  <TextField size="small" label="*Type" select value={source.type} onChange={(e) => handleUpdateWasteHeatSourceField(index, 'type', e.target.value)} sx={{ flex: 1, fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem', '& .MuiInputBase-root': { fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.8rem', height: '40px' } }} InputLabelProps={{ style: { fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.8rem' } }}>
                    <MenuItem value="Industrial Processes" sx={{fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem'}}>Industrial Processes</MenuItem>
                    <MenuItem value="Furnaces" sx={{fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem'}}>Furnaces</MenuItem>
                    <MenuItem value="Engines" sx={{fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem'}}>Engines</MenuItem>
                    <MenuItem value="Boilers" sx={{fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem'}}>Boilers</MenuItem>
                    <MenuItem value="Others" sx={{fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem'}}>Others</MenuItem>
                  </TextField>

                  <TextField size="small" label="*Temp. (°F)" type="number" value={source.temperature} onChange={(e) => handleUpdateWasteHeatSourceField(index, 'temperature', e.target.value)} sx={{ flex: 1, fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem', '& .MuiInputBase-root': { fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem', height: '40px' } }} InputLabelProps={{ style: { fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.8rem' } }} />
                  <TextField size="small" label="Flow Rate" placeholder="BTU/hr, lbs/hr" value={source.flowRate} onChange={(e) => handleUpdateWasteHeatSourceField(index, 'flowRate', e.target.value)} sx={{ flex: 1, fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem', '& .MuiInputBase-root': { fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem', height: '40px' } }} InputLabelProps={{ style: { fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.8rem' } }} />
                  <TextField size="small" label="Utilization" select value={source.utilization} onChange={(e) => handleUpdateWasteHeatSourceField(index, 'utilization', e.target.value)} sx={{ flex: 1, fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem', '& .MuiInputBase-root': { fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem', height: '40px' } }} InputLabelProps={{ style: { fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.8rem' } }}>
                    <MenuItem value="Not Utilized" sx={{fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem'}}>Not Utilized</MenuItem>
                    <MenuItem value="Space Heating" sx={{fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem'}}>Space Heating</MenuItem>
                    <MenuItem value="Process Heat" sx={{fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem'}}>Process Heat</MenuItem>
                    <MenuItem value="Other" sx={{fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem'}}>Other</MenuItem>
                  </TextField>

                  <IconButton onClick={() => handleRemoveWasteHeatSource(index)} size="small" disabled={wasteHeatSources.length === 1} sx={{ '&:focus': { outline: 'none' } }}>
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </Box>
              ))}

              <Button startIcon={<AddCircleIcon />} onClick={handleAddWasteHeatSource} size="small" sx={{ textTransform: 'none', fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.8rem', '&:focus': { outline: 'none' } }}>
                Add Another Entry
              </Button>
              
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 4, mt: 2 }}>
                <Typography sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.75rem', minWidth: '150px', flex: 0.5 }}>
                  <b>Can your facility benefit from utilization of waste heat?</b><br />(If so, pick where the waste heat could be used)
                </Typography>
                <Select
                  fullWidth
                  size="small"
                  variant="outlined"
                  value={benefitFromUtilization}
                  onChange={(e: SelectChangeEvent) => handleUpdateField('benefitFromUtilization', e.target.value)}
                  sx={{ flex: 0.5, fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem', minWidth: '414px', pl: '1px', pr: '1px', height: '40px', '& .MuiInputBase-root': { height: '40px', padding: '0 6px' }, '& .MuiSelect-select': { padding: '4px 6px', fontSize: '0.7rem' } }}
                  MenuProps={{ PaperProps: { sx: { maxHeight: '200px', '& .MuiMenuItem-root': { fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem' }, '&::-webkit-scrollbar': { display: 'none' }, msOverflowStyle: 'none', scrollbarWidth: 'none' } } }}
                >
                  <MenuItem value="Option 1" disabled>Select a source</MenuItem>
                  <MenuItem value="Option 2">Hot Water Preheat</MenuItem>
                  <MenuItem value="Option 3">Steam Make up Water Preheat</MenuItem>
                  <MenuItem value="Option 4">Incoming Fresh Air Make up Preheat</MenuItem>
                </Select>
                <Box sx={{flex: 0.035}}></Box>
              </Box>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default SubStep2;