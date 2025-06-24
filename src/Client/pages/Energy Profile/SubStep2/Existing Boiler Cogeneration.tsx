import React from 'react';
import { Box, TextField, Button, Typography, MenuItem, IconButton } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import { useBoilerCogeneration } from '../../../../Context/Energy Profile/SubStep2/Existing Boiler Cogeneration Context';

const SubStep2: React.FC = () => {
  const { boilerCogenerationState, addSource, removeSource, updateSourceField } = useBoilerCogeneration();
  const { sources } = boilerCogenerationState;

  // Helper to format the number string for display
  const formatNumber = (value: string) => {
    if (!value) return "";
    const cleaned = value.replace(/,/g, "");
    if (isNaN(parseFloat(cleaned))) return value; // Return original if not a number
    return parseFloat(cleaned).toLocaleString('en-US');
  };

  // Helper to handle input, removing formatting before updating state
  const handleChange = (
    index: number, 
    field: keyof typeof sources[0], 
    value: string
  ) => {
    const cleanedValue = value.replace(/[^0-9.]/g, ''); // Allow digits and a single dot
    updateSourceField(index, field, cleanedValue);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.75rem', p: 1, pr: 4, pl: 1, pt: 1 }}>
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Nunito+Sans:ital,opsz,wght@0,6..12,200..1000;1,6..12,200..1000&display=swap');
      </style>
      <Typography variant="h6" sx={{ mb: 1, fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.85rem', fontWeight: 'bold', textAlign: 'center' }}>
        <h2>Existing Boiler/Cogeneration</h2>
      </Typography>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 0 }}>
        <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 2, pt: '10px', pb: '10px', pl: '160px', pr: '123px' }}>
          {sources.map((source, index) => (
            <Box key={index} sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 1 }}>
              <Box sx={{ display: 'flex', width: '100%', gap: 2, flexWrap: 'wrap' }}>
                <TextField size="small" label="Type" select fullWidth value={source.type} onChange={(e) => updateSourceField(index, 'type', e.target.value)} sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.8rem', height: '40px', width: '32%', '& .MuiInputBase-root': { fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.8rem' } }} InputLabelProps={{ style: { fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.8rem' } }}>
                  <MenuItem value="Boiler (Hot Water)" sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem' }}>Boiler (Hot Water)</MenuItem>
                  <MenuItem value="Boiler (Steam)" sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem' }}>Boiler (Steam)</MenuItem>
                  <MenuItem value="Cogeneration Unit" sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem' }}>Cogeneration Unit</MenuItem>
                </TextField>
                <TextField size="small" label={ source.type === 'Boiler (Hot Water)' ? 'Capacity (in KGal)' : source.type === 'Boiler (Steam)' ? 'Capacity (in MLbs)' : 'Capacity (in MWh annually)' } type="text" fullWidth value={formatNumber(source.capacity)} onChange={(e) => handleChange(index, 'capacity', e.target.value)} placeholder={ source.type === 'Boiler (Hot Water)' ? 'in KGal' : source.type === 'Boiler (Steam)' ? 'in MLbs' : 'Enter Capacity' } sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.8rem', height: '40px', width: '32%', '& .MuiInputBase-root': { fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.8rem' } }} InputLabelProps={{ style: { fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.8rem' } }} />
                <TextField size="small" label="Fuel Source" select fullWidth value={source.fuelSource} onChange={(e) => updateSourceField(index, 'fuelSource', e.target.value)} sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.8rem', height: '40px', width: '32%', '& .MuiInputBase-root': { fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.8rem' } }} InputLabelProps={{ style: { fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.8rem' } }}>
                  <MenuItem value="Natural Gas" sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem' }}>Natural Gas</MenuItem>
                  <MenuItem value="Oil" sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem' }}>Oil</MenuItem>
                  <MenuItem value="Biomass" sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem' }}>Biomass</MenuItem>
                  <MenuItem value="Coal" sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem' }}>Coal</MenuItem>
                  <MenuItem value="Electricity" sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem' }}>Electricity</MenuItem>
                </TextField>
              </Box>
              <Box sx={{ display: 'flex', width: '100%', gap: 2, flexWrap: 'wrap' }}>
                <TextField size="small" label="Efficiency" type="text" fullWidth value={formatNumber(source.efficiency)} onChange={(e) => handleChange(index, 'efficiency', e.target.value)} placeholder="In Percentage" sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.8rem', height: '40px', width: '32%', '& .MuiInputBase-root': { fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.8rem' } }} InputLabelProps={{ style: { fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.8rem' } }} />
                <TextField size="small" label="Age" type="text" fullWidth value={formatNumber(source.age)} onChange={(e) => handleChange(index, 'age', e.target.value)} placeholder="In Years" sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.8rem', height: '40px', width: '32%', '& .MuiInputBase-root': { fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.8rem' } }} InputLabelProps={{ style: { fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.8rem' } }} />
                <TextField size="small" label="Operating Pressure" type="text" fullWidth value={formatNumber(source.operatingPressure)} onChange={(e) => handleChange(index, 'operatingPressure', e.target.value)} placeholder="In Psi" sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.8rem', height: '40px', width: '32%', '& .MuiInputBase-root': { fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.8rem' } }} InputLabelProps={{ style: { fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.8rem' } }} />
              </Box>
              <Box sx={{ display: 'flex', width: '100%', gap: 2, flexWrap: 'wrap' }}>
                <TextField size="small" label="History" type="text" fullWidth value={source.history} onChange={(e) => updateSourceField(index, 'history', e.target.value)} placeholder="Maintenance History (Optional)" sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.8rem', height: '40px', width: '32%', '& .MuiInputBase-root': { fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.8rem' } }} InputLabelProps={{ style: { fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.8rem' } }} />
                <TextField size="small" label={ source.type === 'Cogeneration Unit' ? 'Utilization of Waste Heat' : 'Utilization' } select fullWidth value={source.utilization} onChange={(e) => updateSourceField(index, 'utilization', e.target.value)} sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.8rem', height: '40px', width: '32%', '& .MuiInputBase-root': { fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.8rem' } }} InputLabelProps={{ style: { fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.8rem' } }}>
                  <MenuItem value="Electricity Generation" sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem' }}>Electricity Generation</MenuItem>
                  <MenuItem value="Space Heating" sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem' }}>Space Heating</MenuItem>
                  <MenuItem value="Process Heating" sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem' }}>Process Heating</MenuItem>
                  <MenuItem value="None" sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem' }}>None</MenuItem>
                  <MenuItem value="Other" sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem' }}>Other</MenuItem>
                </TextField>
                <TextField size="small" label={ source.type === 'Cogeneration Unit' ? 'Volume (in MLbs)' : 'Volume' } type="text" fullWidth value={formatNumber(source.volume)} onChange={(e) => handleChange(index, 'volume', e.target.value)} placeholder={ source.type === 'Cogeneration Unit' ? 'in MLbs' : 'Annual Waste Heat Vol. in MMBTu' } sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.8rem', height: '40px', width: '32%', '& .MuiInputBase-root': { fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.8rem' } }} InputLabelProps={{ style: { fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.8rem' } }} />
              </Box>
              {source.type === 'Cogeneration Unit' && (
                <Box sx={{ display: 'flex', width: '100%', gap: 2, flexWrap: 'wrap' }}>
                  <TextField size="small" label="Waste Heat Status" select fullWidth value={source.wasteHeatCaptured} onChange={(e) => updateSourceField(index, 'wasteHeatCaptured', e.target.value)} sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.8rem', height: '40px', width: '32%', '& .MuiInputBase-root': { fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.8rem' } }} InputLabelProps={{ style: { fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.8rem' } }}>
                    <MenuItem value="Captured" sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem' }}>Captured</MenuItem>
                    <MenuItem value="Released to Atmosphere" sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem' }}>Released to Atmosphere</MenuItem>
                  </TextField>
                </Box>
              )}
              <Box sx={{ display: 'flex', width: '100%', gap: 2, flexWrap: 'wrap' }}>
                <Button startIcon={<AddCircleIcon />} onClick={addSource} size="small" sx={{ textTransform: 'none', fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.8rem', '&:focus': { outline: 'none' } }}>
                  Add Another Entry
                </Button>
                <IconButton onClick={() => removeSource(index)} size="small" disabled={sources.length === 1} sx={{ ml: 'auto', '&:focus': { outline: 'none' } }}>
                  <DeleteIcon fontSize="medium" />
                </IconButton>
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default SubStep2;