import React from 'react';
import { Box, TextField, Typography } from '@mui/material';
import { useAdditionalPPAPreferences } from '../../../../Context/Financial Info/SubStep2/Third Party/Additional PPA Preferences (Optional) Context';

const SubStep2: React.FC = () => {
  const { additionalPPAPreferencesState, updateField } = useAdditionalPPAPreferences();
  const { preferencesText } = additionalPPAPreferencesState;

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.75rem', p: 1, pr: 4, pl: 1, pt: 1 }}>
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Nunito+Sans:ital,opsz,wght@0,6..12,200..1000;1,6..12,200..1000&display=swap');
      </style>
      <Typography variant="h6" sx={{ mb: 1, fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.85rem', fontWeight: 'bold', textAlign: 'center' }}>
        <h2>Additional PPA Preferences (Optional)</h2>
      </Typography>
      
      <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 0 }}>
        <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 2, pt: '10px', pb: '10px', pl: '160px', pr: '160px' }}>
          <TextField
            fullWidth
            multiline
            rows={5}
            variant="outlined"
            placeholder="Possible additional preferences would be to hold the PPA rate firm for a limited time at the beginning of the PPA and then allowing escalation."
            value={preferencesText}
            onChange={(e) => updateField('preferencesText', e.target.value)}
            sx={{
              fontFamily: 'Nunito Sans, sans-serif',
              fontSize: '0.9rem',
              '& .MuiInputBase-root': { fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.9rem' },
              '& .MuiInputBase-input': { fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.9rem' },
              '& .MuiInputBase-input::placeholder': { fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.9rem' },
            }}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default SubStep2;