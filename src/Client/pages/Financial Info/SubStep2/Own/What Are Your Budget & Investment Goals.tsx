import React from 'react';
import { Box, TextField, Typography, IconButton, Select, MenuItem, Tooltip, SelectChangeEvent } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DeleteIcon from '@mui/icons-material/Delete';
import { useAppDispatch, useAppSelector } from '../../../../../store/hooks';
import { updateBudgetField, addYearBudget, removeYearBudget, updateYearBudget, BudgetGoalsState } from '../../../../../store/slices/financialInfoSlice';

const SubStep2: React.FC = () => {
  const dispatch = useAppDispatch();
  const budgetGoalsState = useAppSelector((state) => state.financialInfo.budgetGoals);
  const { yearBudget, availableFunds, simplePayback } = budgetGoalsState;

  const handleUpdateField = (field: keyof Omit<BudgetGoalsState, 'yearBudget'>, value: string) => {
      dispatch(updateBudgetField({ field, value }));
  };

  const handleAddYearBudget = () => {
      dispatch(addYearBudget());
  };
  
  const handleRemoveYearBudget = (index: number) => {
      dispatch(removeYearBudget(index));
  };
  
  const handleUpdateYearBudget = (index: number, value: string) => {
      dispatch(updateYearBudget({ index, value }));
  };
  
  const currencyFormatter = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2 });

  const handleChange = (value: string, index: number) => {
    const updatedValue = value.replace(/[^\d.]/g, '');
    handleUpdateYearBudget(index, updatedValue);
  };

  const handleBlur = (index: number) => {
    const num = parseFloat(yearBudget[index]);
    if (!isNaN(num)) {
      handleUpdateYearBudget(index, currencyFormatter.format(num));
    } else {
      handleUpdateYearBudget(index, '');
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.75rem', p: 1, pr: 4, pl: 1, pt: 1 }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@200..1000&display=swap');`}</style>
      <Typography variant="h6" sx={{ mb: 1, fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.85rem', fontWeight: 'bold', textAlign: 'center' }}>
        <h2>What Are Your Budget & Investment Goals</h2>
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: '10px', pb: '10px', px: '160px' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Typography sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.75rem', minWidth: '200px', flex: 0.5 }}>
            <b>Do you have a current budget (this year) to invest in carbon reduction, energy resiliency or cost reductions that could be<br />applied to this project?</b>
          </Typography>
          <Select id="availableFunds-select" value={availableFunds} onChange={(e: SelectChangeEvent) => handleUpdateField('availableFunds', e.target.value)} sx={{ flex: 0.5, fontFamily: 'Nunito Sans, sans-serif', marginLeft: 'auto', fontSize: '0.7rem', height: '40px', '& .MuiInputBase-root': { padding: '0 6px' }, '& .MuiSelect-select': { padding: '4px 6px', fontSize: '0.7rem' } }}>
            <MenuItem value="yes" sx={{ fontSize: '0.7rem' }}>Yes</MenuItem>
            <MenuItem value="no" sx={{ fontSize: '0.7rem' }}>No</MenuItem>
          </Select>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, opacity: availableFunds !== 'yes' ? 0.5 : 1 }}>
          <Typography sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.75rem', minWidth: '200px', flex: 0.5 }}>
            <b>If YES, Provide the Amt. Of Budget By Year: </b>(in $)<br /> This will be treated as a cash buy down in any finance output.
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flex: 0.5, maxWidth: 'calc(100% - 200px)' }}>
            {yearBudget.map((value, index) => (
              <TextField key={index} variant="outlined" size="small" placeholder={`Year ${index + 1}`} disabled={availableFunds !== 'yes'} value={value} onChange={(e) => handleChange(e.target.value, index)} onBlur={() => handleBlur(index)} sx={{ flex: 1, fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem', '& .MuiInputBase-root': { height: '40px', padding: '0 6px' }, '& input': { padding: 0, fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.8rem' }, '& .MuiInputBase-input::placeholder': { fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem' } }} />
            ))}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, ml: 1 }}>
              <IconButton onClick={handleAddYearBudget} color="primary" disabled={availableFunds !== 'yes'} sx={{ p: 0, '&:focus': { outline: 'none' } }}><AddCircleOutlineIcon fontSize="small" /></IconButton>
              <IconButton onClick={() => handleRemoveYearBudget(yearBudget.length - 1)} sx={{ p: 0, '&:focus': { outline: 'none' } }} disabled={availableFunds !== 'yes' || yearBudget.length === 1}><DeleteIcon fontSize="small" /></IconButton>
            </Box>
          </Box>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Typography sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.75rem', minWidth: '200px', flex: 0.5 }}>
            <Tooltip title="The average range for DER simple paybacks is 7-15 years." placement="bottom-start" arrow>
              <span><b>Preferred Simple Payback in Years:</b><br />(Select this only if you're going to own/finance the DER ownership system.)</span>
            </Tooltip>
          </Typography>
          <Select size="small" value={simplePayback} onChange={(e: SelectChangeEvent) => handleUpdateField('simplePayback', e.target.value)} sx={{ flex: 0.5, fontFamily: 'Nunito Sans, sans-serif', marginLeft: 'auto', fontSize: '0.7rem', height: '40px', '& .MuiInputBase-root': { padding: '0 6px' }, '& .MuiSelect-select': { padding: '4px 6px', fontSize: '0.7rem' } }}>
            <MenuItem value="default" disabled sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem' }}>Select</MenuItem>
            <MenuItem value="<5" sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem' }}>Less Than 5 Years</MenuItem>
            <MenuItem value="5-10" sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem' }}>5 - 10 Years</MenuItem>
            <MenuItem value=">10" sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem' }}>More Than 10 Years</MenuItem>
          </Select>
        </Box>
      </Box>
    </Box>
  );
};

export default SubStep2;