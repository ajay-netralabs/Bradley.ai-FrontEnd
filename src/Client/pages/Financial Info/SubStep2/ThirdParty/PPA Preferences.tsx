import React from 'react';
import { Box, TextField, Typography, Slider, Tooltip, InputAdornment } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../../../../store/hooks';
import { updatePPAPrefField, PPAPreferencesState } from '../../../../../store/slices/financialInfoSlice';

const SubStep2: React.FC = () => {
  const dispatch = useAppDispatch();
  const ppaPreferencesState = useAppSelector((state) => state.financialInfo.ppaPreferences);
  const { electricityRate, thermalRate, ppaTerm, escalationRate } = ppaPreferencesState;

  const handleUpdateField = (field: keyof PPAPreferencesState, value: string | number) => {
      dispatch(updatePPAPrefField({ field, value }));
  };

  const handleElectricityRateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (/^0(\.\d{0,2})?$/.test(value) || value === '0' || value === '') {
      handleUpdateField('electricityRate', value);
    }
  };

  const handleThermalRateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (/^\d{0,2}(\.\d{0,2})?$/.test(value)) {
      handleUpdateField('thermalRate', value);
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.75rem', p: 1, pr: 4, pl: 1, pt: 1 }}>
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Nunito+Sans:ital,opsz,wght@0,6..12,200..1000;1,6..12,200..1000&display=swap');
      </style>
      <Typography variant="h6" sx={{ mb: 1, fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.85rem', fontWeight: 'bold', textAlign: 'center' }}>
        <h2>Power Purchase Agreement (PPA) for Electricity or<br />Energy Services Agreement (ESA) for Electricity and Thermal Preferences</h2><br />
        Please enter in terms that are most likely to be acceptable to your organization.
      </Typography><br />
      <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 0 }}>
        <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 2, p: '10px' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, justifyContent: 'center' }}>
            <Typography sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.75rem', flex: 0.4 }}><b>Desired Term of the PPA: </b>(10 - 25 Years)</Typography>
            <Slider
              sx={{ flex: 0.348 }}
              value={ppaTerm}
              onChange={(_, value) => handleUpdateField('ppaTerm', value as number)}
              aria-label="PPA Term"
              valueLabelDisplay="auto"
              min={10}
              max={25}
              valueLabelFormat={(value) => `${value} Years`}
            />
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, justifyContent: 'center' }}>
            <Typography sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.75rem', flex: 0.4 }}><b>Desired Initial Electricity Rate: </b>(in $ / kWh)</Typography>
            <TextField
              variant="outlined" size="small" type="text" placeholder='Start typing from 0.00'
              value={electricityRate}
              onChange={handleElectricityRateChange}
              sx={{ flex: 0.348, fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem', '& .MuiInputBase-root': { height: '40px', padding: '0 6px' }, '& input': { padding: 0, fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.8rem' }, '& .MuiInputBase-input::placeholder': { fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem' } }}
              InputProps={{ startAdornment: <InputAdornment position="start">$</InputAdornment> }}
            />
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, justifyContent: 'center' }}>
            <Typography sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.75rem', flex: 0.4 }}><b>Desired Initial Thermal Rate: </b>(in $ / therm)</Typography>
            <TextField
              variant="outlined" size="small" type="text" placeholder='Max 99.99'
              value={thermalRate}
              onChange={handleThermalRateChange}
              sx={{ flex: 0.348, fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem', '& .MuiInputBase-root': { height: '40px', padding: '0 6px' }, '& input': { padding: 0, fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.8rem' }, '& .MuiInputBase-input::placeholder': { fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem' } }}
              InputProps={{ startAdornment: <InputAdornment position="start">$</InputAdornment> }}
            />
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, justifyContent: 'center' }}>
            <Tooltip title="Please select an escalation rate that is acceptable to you, which will be used to escalate the kWh and/or thermal rate annually over the term of the PPA. I will use this input to configure the PPA rates. The industry norm is 2-3% annual escalation, but you can select whatever escalation rate you prefer." placement='bottom-start' arrow>
              <Typography sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.75rem', flex: 0.4 }}><b>Escalation Rate from Year 2 to End of Agreement: </b>(in %)</Typography>
            </Tooltip>
            <Slider
              sx={{ flex: 0.348 }}
              value={escalationRate}
              onChange={(_, value) => handleUpdateField('escalationRate', value as number)}
              aria-label="Escalation Rate"
              valueLabelDisplay="auto"
              min={0.5} max={5}
              valueLabelFormat={(value) => `${value} %`}
              step={0.5}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default SubStep2;