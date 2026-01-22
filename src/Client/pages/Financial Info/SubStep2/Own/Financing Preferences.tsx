import React from 'react';
import { Box, TextField, Typography, Select, MenuItem, SelectChangeEvent } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../../../../store/hooks';
import { updateFinancingField, FinancingPreferencesState } from '../../../../../store/slices/financialInfoSlice';

const SubStep2: React.FC = () => {
  const dispatch = useAppDispatch();
  const financingPreferencesState = useAppSelector((state) => state.financialInfo.financingPreferences);
  const { selectedOption, otherText } = financingPreferencesState;
  
  const handleUpdateField = (field: keyof FinancingPreferencesState, value: string) => {
      dispatch(updateFinancingField({ field, value }));
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.75rem', p: 1, pr: 4, pl: 1, pt: 1 }}>
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@200..1000&display=swap');
      </style>
      <Typography variant="h6" sx={{ mb: 1, fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.85rem', fontWeight: 'bold', textAlign: 'center' }}>
        <h2>Financing Preferences</h2>
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: '10px', pb: '10px', px: '160px' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Typography sx={{ mt: 1, fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.75rem', flex: 0.5 }}>
            <b>How Would You Prefer To Finance This Project?<br /><span style={{ fontWeight: 'normal' }}>(You must pick one.)</span></b>
          </Typography>
          <Select
            id='financing-preferences'
            value={selectedOption}
            onChange={(e: SelectChangeEvent) => handleUpdateField('selectedOption', e.target.value)}
            displayEmpty
            sx={{ flex: 0.68, fontFamily: 'Nunito Sans, sans-serif', marginLeft: 'auto', fontSize: '0.7rem', height: '40px', '& .MuiInputBase-root': { padding: '0 6px' }, '& .MuiSelect-select': { padding: '4px 6px', fontSize: '0.7rem' } }}
          >
            <MenuItem disabled value="" sx={{ fontSize: '0.7rem' }}>Select</MenuItem>
            <MenuItem value="cash" sx={{ fontSize: '0.7rem' }}>Pay For The Project<br />(Cash Payments During Construction Period)</MenuItem>
            <MenuItem value="finance" sx={{ fontSize: '0.7rem' }}>Finance The Project<br />(You Own & Operate The DER System And Start Payments When System Is Operating)</MenuItem>
            <MenuItem value="other" sx={{ fontSize: '0.7rem' }}>Explore Other Options</MenuItem>
          </Select>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Typography sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.75rem', flex: 0.5, opacity: selectedOption !== 'other' ? 0.5 : 1 }}>
            <b>Please Specify Other Financing: </b>(Optional)
          </Typography>
          <TextField
            variant="outlined"
            size="small"
            type="text"
            placeholder="Describe Your Preferred Financing Method Here..."
            disabled={selectedOption !== 'other'}
            value={otherText}
            onChange={(e) => handleUpdateField('otherText', e.target.value)}
            sx={{ flex: 0.68, width: '100%', fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem', '& .MuiInputBase-root': { height: '40px', padding: '0 6px' }, '& input': { padding: '10px', fontSize: '0.7rem' } }}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default SubStep2;