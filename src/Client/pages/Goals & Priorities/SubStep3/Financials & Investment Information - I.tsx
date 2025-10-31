import React from 'react';
import { Box, TextField, Typography } from '@mui/material';
import { useFinancialsI } from '../../../../Context/Goals & Priorities/SubStep3/Financials & Investment Information - I Context';

const SubStep3: React.FC = () => {
  const { financialsIState, updateField } = useFinancialsI();
  const { acceptableIRR, minimumROI, paybackPeriod } = financialsIState;

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.75rem', p: 1, pr: 4, pl: 1, pt: 1 }}>
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Nunito+Sans:ital,opsz,wght@0,6..12,200..1000;1,6..12,200..1000&display=swap');
      </style>
      <Typography variant="h6" sx={{ mb: 1, fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.85rem', fontWeight: 'bold', textAlign: 'center' }}>
        <h2>Financials & Investment Information - I</h2>
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 0 }}>
        <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 2, p: '10px' }}>
          <Box sx={{ width: 'calc(100% - 300px)', marginLeft: 'auto', marginRight: 'auto', display: 'flex', flexDirection: 'column', gap: 2, textAlign: 'justify', lineHeight: 1.5 }}>
            <Typography sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.8rem' }}>
              Upon full completion of this section, CarbonCheckIQ+ shall be enabled to prepare a comprehensive balance-sheet estimate for the optimized DER solution, including calculation of Internal Rate of Return (IRR), Net Operating Income (NOI), Simple Payback Period, Net Present Value (NPV), and projected cost-savings under an ownership model. Accurate entry of all required data inputs is a condition precedent to delivery of empirically validated financial forecasts for each DER concept over its anticipated service life.
            </Typography>
            <Typography sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.8rem' }}>
              This will take you less than 10 minutes to complete.
            </Typography>
            <Typography sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.8rem' }}>
              <b>Here's what we'll cover:</b>
            </Typography>
            <Typography component="li" sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.8rem', mb: 2 }}>
              <b>Financial Preferences & Method of DER Ownership</b> <br />
              Provide information about your financial preferences, ownership preferences (your asset or a third party owned asset), and context regarding any existing energy supply/PPA or other energy contracts.
            </Typography>
            <Typography component="li" sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.8rem', mb: 2 }}>
              <b>Budgetary Goals</b> <br />
              Tell us about your budget and investment goals for this project.
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, justifyContent: 'center' }}>
            <Typography sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.8rem', flex: 0.75 }}>
              <b>Financial Goals:</b>
              <p></p>
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, justifyContent: 'center' }}>
            <Typography sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.75rem', flex: 0.3 }}>
              <b>Desired Minimally Acceptable IRR:</b><br />(Hint: CarbonCheckIQ+ auto-sets the IRR to 10%.)
            </Typography>
            <TextField variant="outlined" size="small" type="number" placeholder='Input' value={acceptableIRR} onChange={(e) => updateField('acceptableIRR', e.target.value)} sx={{ flex: 0.448, fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem', '& .MuiInputBase-root': { height: '40px', padding: '0 6px' }, '& input': { padding: 0, fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.8rem' }, '& .MuiInputBase-input::placeholder': { fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem' } }} />
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, justifyContent: 'center' }}>
            <Typography sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.75rem', flex: 0.3 }}>
              <b>Desired Minimum ROI: </b>(5 - 15 years)
            </Typography>
            <TextField variant="outlined" size="small" type="number" placeholder='Input' value={minimumROI} onChange={(e) => updateField('minimumROI', e.target.value)} sx={{ flex: 0.448, fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem', '& .MuiInputBase-root': { height: '40px', padding: '0 6px' }, '& input': { padding: 0, fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.8rem' }, '& .MuiInputBase-input::placeholder': { fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem' } }} />
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, justifyContent: 'center' }}>
            <Typography sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.75rem', flex: 0.3 }}>
              <b>Minimum Acceptable Payback Period: </b>(in years)
            </Typography>
            <TextField variant="outlined" size="small" type="number" placeholder='Input' value={paybackPeriod} onChange={(e) => updateField('paybackPeriod', e.target.value)} sx={{ flex: 0.448, fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem', '& .MuiInputBase-root': { height: '40px', padding: '0 6px' }, '& input': { padding: 0, fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.8rem' }, '& .MuiInputBase-input::placeholder': { fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem' } }} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default SubStep3;