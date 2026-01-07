import React from 'react';
import { Box, TextField, Typography, FormControlLabel, Switch, Tooltip } from '@mui/material';
import { useThermalEnergyNeedsIII } from '../../../Context/Energy Profile/SubStep2/Thermal Energy Needs - III Context';

const SubStep2: React.FC = () => {
  const { thermalNeedsIIIState, updateField } = useThermalEnergyNeedsIII();
  const {
    showChilledWater,
    chilledCapacity,
    coolingTonHours,
    temperatureLeaving,
    additionalDemand,
    temperatureReturning,
    pumpHp,
    pumpCount
  } = thermalNeedsIIIState;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const cleanedValue = value.replace(/,/g, "").replace(/\D/g, "");
    updateField(name as keyof typeof thermalNeedsIIIState, cleanedValue);
  };

  const formatNumber = (value: string) => {
    if (!value) return "";
    return value.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const textFieldSx = {
    flex: 0.5,
    fontFamily: 'Nunito Sans, sans-serif',
    fontSize: '0.7rem',
    '& .MuiInputBase-root': { height: '40px', padding: '0 6px' },
    '& input': { padding: 0, fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem' },
    '& .MuiInputBase-input::placeholder': {
      fontFamily: 'Nunito Sans, sans-serif',
      fontSize: '0.7rem',
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.75rem', p: 1, pr: 4, pl: 1, pt: 1 }}>
      <style>
        {`@import url('https://fonts.googleapis.com/css2?family=Nunito+Sans:ital,opsz,wght@0,6..12,200..1000;1,6..12,200..1000&display=swap');`}
      </style>
      <Typography variant="h6" sx={{ mb: 1, fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.85rem', fontWeight: 'bold', textAlign: 'center' }}>
        <h2>Thermal Energy Needs - III</h2>
      </Typography>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 0 }}>
        <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 2, pt: '10px', pb: '10px', pl: '160px', pr: '160px' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Tooltip title="Click to expand or move on to the next step." placement="right" arrow>
              <FormControlLabel
                control={<Switch checked={showChilledWater} onChange={(e) => updateField('showChilledWater', e.target.checked)} size="small" />}
                label="Does your facility require chilled water?"
                sx={{ '& .MuiFormControlLabel-label': { fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.9rem' } }}
              />
            </Tooltip>
          </Box>

          {showChilledWater && (
            <Box sx={{ mb: 0, pl: 0 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 0 }}>
                <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 2, pt: '10px' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Typography sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.75rem', minWidth: '150px', flex: 0.5 }}><b>How many tons of chilled water capacity do you have at the facility?</b></Typography>
                    <Tooltip title="Enter capacity in Tons" placement="right" arrow>
                      <TextField name="chilledCapacity" variant="outlined" size="small" type="text" placeholder="Chilled water capacity at facility (in Tons)" value={formatNumber(chilledCapacity)} onChange={handleChange} sx={textFieldSx} />
                    </Tooltip>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Typography sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.75rem', minWidth: '150px', flex: 0.5 }}><b>How many cooling ton hours used annually?</b></Typography>
                    <Tooltip title="Enter annual usage in hours" placement="right" arrow>
                      <TextField name="coolingTonHours" variant="outlined" size="small" type="text" placeholder="Chilled water ton hours annually" value={formatNumber(coolingTonHours)} onChange={handleChange} sx={textFieldSx} />
                    </Tooltip>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Typography sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.75rem', minWidth: '150px', flex: 0.5 }}><b>Chilled Water Temperature leaving the plant:</b></Typography>
                    <Tooltip title="Enter temperature in K" placement="right" arrow>
                      <TextField name="temperatureLeaving" variant="outlined" size="small" type="text" placeholder="Enter Temperature in K" value={formatNumber(temperatureLeaving)} onChange={handleChange} sx={textFieldSx} />
                    </Tooltip>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Typography sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.75rem', minWidth: '150px', flex: 0.5 }}><b>Additional Chilled Water Demand:</b></Typography>
                    <Tooltip title="Enter CW Demand in Tons" placement="right" arrow>
                      <TextField name="additionalDemand" variant="outlined" size="small" type="text" placeholder="Optional (Tons)" value={formatNumber(additionalDemand)} onChange={handleChange} sx={textFieldSx} />
                    </Tooltip>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Typography sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.75rem', minWidth: '150px', flex: 0.5 }}><b>Chilled water temperature returning to the plant:</b></Typography>
                    <Tooltip title="Enter temperature in K" placement="right" arrow>
                      <TextField name="temperatureReturning" variant="outlined" size="small" type="text" placeholder="Enter chilled water temperature returning to the plant" value={formatNumber(temperatureReturning)} onChange={handleChange} sx={textFieldSx} />
                    </Tooltip>
                  </Box>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Typography sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.75rem', minWidth: '150px', flex: 0.5 }}><b>CW Pump HP Size:</b></Typography>
                      <Tooltip title="Enter pump size in HP" placement="right" arrow>
                        <TextField name="pumpHp" variant="outlined" size="small" type="text" placeholder="Enter pump HP size" value={formatNumber(pumpHp)} onChange={handleChange} sx={textFieldSx} />
                      </Tooltip>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Typography sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.75rem', minWidth: '150px', flex: 0.5 }}><b>Number of CW Pumps:</b></Typography>
                      <Tooltip title="Enter number of pumps" placement="right" arrow>
                        <TextField name="pumpCount" variant="outlined" size="small" type="text" placeholder="Enter number of pumps" value={formatNumber(pumpCount)} onChange={handleChange} sx={textFieldSx} />
                      </Tooltip>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Box>
          )}

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography sx={{ mt: 1, fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.75rem', minWidth: '200px', flex: 1 }}>
              <i><b>Hint: </b>All values need to be near estimates, not exact. Please be as accurate as possible as the answers may alter my recommendation.</i><br />
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default SubStep2;