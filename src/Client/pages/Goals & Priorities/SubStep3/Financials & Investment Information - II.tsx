import React from 'react';
import { Box, TextField, Typography, MenuItem, Select, IconButton, InputAdornment, SelectChangeEvent } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DeleteIcon from '@mui/icons-material/Delete';
import { useAppDispatch, useAppSelector } from '../../../../store/hooks';
import { 
    updateFinancialsIIField, 
    addInvestmentAmount, 
    removeInvestmentAmount, 
    updateInvestmentAmount,
    FinancialsIIState
} from '../../../../store/slices/goalsSlice';

const SubStep3: React.FC = () => {
  const dispatch = useAppDispatch();
  const financialsIIState = useAppSelector((state) => state.goals.financialsII);
  const { investmentAmounts, financeOption, financeDetails, desiredCostReduction, preferredTerm } = financialsIIState;

  const handleUpdateField = (field: keyof Omit<FinancialsIIState, 'investmentAmounts'>, value: string) => {
      dispatch(updateFinancialsIIField({ field, value }));
  };
  
  const handleAddInvestmentAmount = () => {
      dispatch(addInvestmentAmount());
  };
  
  const handleRemoveInvestmentAmount = (index: number) => {
      dispatch(removeInvestmentAmount(index));
  };
  
  const handleUpdateInvestmentAmount = (index: number, value: string) => {
      dispatch(updateInvestmentAmount({ index, value }));
  };

  const formatCurrency = (value: string): string => {
    const numericValue = value.replace(/[^0-9.]/g, '');
    if (numericValue === '') return '';
    const parts = numericValue.split('.');
    const integerPart = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    let decimalPart = parts.length > 1 ? '.' + parts[1] : '';
    if (decimalPart.length > 3) {
      decimalPart = decimalPart.substring(0, 3);
    }
    return integerPart + decimalPart;
  };

  const handleInvestmentAmountChange = (index: number, value: string) => {
    handleUpdateInvestmentAmount(index, formatCurrency(value));
  };
  
  const handleInvestmentAmountBlur = (index: number) => {
    handleUpdateInvestmentAmount(index, formatCurrency(investmentAmounts[index]));
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.75rem', p: 1, pr: 4, pl: 1, pt: 1 }}>
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Nunito+Sans:ital,opsz,wght@0,6..12,200..1000;1,6..12,200..1000&display=swap');
      </style>
      <Typography variant="h6" sx={{ mb: 2.5, fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.85rem', fontWeight: 'bold', textAlign: 'center' }}>
        <h2>Financials & Investment Information - II</h2>
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 0 }}>
        <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 2, p: '10px' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, justifyContent: 'center' }}>
            <Typography sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.8rem', flex: 0.75 }}>
              <b>Investment Details:</b>
              <Typography sx={{ fontSize: '0.75rem', fontFamily: 'Nunito Sans, sans-serif', mt: 1 }}><i>If your company has cash to invest, these amounts will be placed in the appropriate year to demonstrate the financial strength of the DER recommendation.<br />Cash investment is not required to perform the analysis.</i></Typography>
              <p></p>
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, justifyContent: 'center' }}>
            <Typography sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.75rem', flex: 0.30 }}>
              <b>Maximum Investment Amount: </b>(Optional, in USD)<br />Enter your DER investment budget for each year.<br />Infusions of capital in any year will improve financial results if funds are available.
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flex: 0.5, maxWidth: 'calc(100% - 600px)' }}>
              {investmentAmounts.map((value, index) => (
                <TextField key={index} variant="outlined" size="small" type="text" value={value} onChange={(e) => handleInvestmentAmountChange(index, e.target.value)} onBlur={() => handleInvestmentAmountBlur(index)} placeholder={`Yr ${index + 1} - Budget Amt.`} InputProps={{ startAdornment: <InputAdornment position="start">$</InputAdornment> }} sx={{ flex: 1, fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem', '& .MuiInputBase-root': { height: '40px', padding: '0 6px' }, '& input': { padding: 0, fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.8rem' }, '& .MuiInputBase-input::placeholder': { fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem' } }} />
              ))}
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, ml: 1 }}>
                <IconButton onClick={handleAddInvestmentAmount} color="primary" sx={{ p: 0, '&:focus': { outline: 'none' } }}>
                  <AddCircleOutlineIcon fontSize="small" />
                </IconButton>
                <IconButton onClick={() => handleRemoveInvestmentAmount(investmentAmounts.length - 1)} sx={{ p: 0, '&:focus': { outline: 'none' } }} disabled={investmentAmounts.length === 1}>
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </Box>
            </Box>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, justifyContent: 'center' }}>
            <Typography sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.75rem', flex: 0.3 }}><b>Desired Cost Reduction Annually: </b>(in USD)</Typography>
            <TextField variant="outlined" size="small" type="text" placeholder="Input" value={desiredCostReduction} onChange={(e) => handleUpdateField('desiredCostReduction', formatCurrency(e.target.value))} onBlur={() => handleUpdateField('desiredCostReduction', formatCurrency(desiredCostReduction))} InputProps={{ startAdornment: <InputAdornment position="start">$</InputAdornment> }} sx={{ flex: 0.448, fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem', '& .MuiInputBase-root': { height: '40px', padding: '0 6px' }, '& input': { padding: 0, fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.8rem' }, '& .MuiInputBase-input::placeholder': { fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem' } }} />
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, justifyContent: 'center' }}>
            <Typography sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.75rem', flex: 0.3 }}><b>Preferred Term of Finance Arrangement: </b>(in Years)</Typography>
            <TextField variant="outlined" size="small" type="number" placeholder='Input : EmissionCheckIQ+ needs to know the contract duration in case of a 3rd party DER ownership.' value={preferredTerm} onChange={(e) => handleUpdateField('preferredTerm', e.target.value.replace(/[^0-9]/g, ''))} sx={{ flex: 0.448, fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem', '& .MuiInputBase-root': { height: '40px', padding: '0 6px' }, '& input': { padding: 0, fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.8rem' }, '& .MuiInputBase-input::placeholder': { fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem' } }} />
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, justifyContent: 'center' }}>
            <Typography sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.75rem', flex: 0.3 }}><b>How would you prefer to finance your DER system?</b></Typography>
            <Box sx={{ display: 'flex', gap: 1, flex: 0.448 }}>
              <Select size="small" variant="outlined" value={financeOption} onChange={(e: SelectChangeEvent) => handleUpdateField('financeOption', e.target.value)} sx={{ flex: financeOption === "Other" ? 0.5 : 1, fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem', height: '40px', '& .MuiInputBase-root': { padding: '0 6px' }, '& .MuiSelect-select': { padding: '4px 6px', fontSize: '0.7rem' } }}>
                <MenuItem value="default" disabled sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem' }}>Select</MenuItem>
                <MenuItem value="Cash Purchase" sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem' }}>Cash Purchase</MenuItem>
                <MenuItem value="Finance" sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem' }}>Finance</MenuItem>
                <MenuItem value="Power Purchase Agreement (PPA)" sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem' }}>Power Purchase Agreement (PPA)</MenuItem>
                <MenuItem value="Lease" sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem' }}>Lease</MenuItem>
                <MenuItem value="Other" sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem' }}>Other</MenuItem>
              </Select>
                {financeOption === "Other" && (
                <TextField
                  size="small"
                  variant="outlined"
                  type="text"
                  placeholder="If Other, please specify"
                  value={financeDetails}
                  onChange={(e) => handleUpdateField('financeDetails', e.target.value)}
                  sx={{
                  flex: 0.5,
                  fontFamily: 'Nunito Sans, sans-serif',
                  fontSize: '0.7rem',
                  '& .MuiInputBase-root': { height: '40px', padding: '0 6px' },
                  '& input': { padding: 0, fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.8rem' },
                  '& .MuiInputBase-input::placeholder': { fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem' }
                  }}
                />
                )}
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default SubStep3;