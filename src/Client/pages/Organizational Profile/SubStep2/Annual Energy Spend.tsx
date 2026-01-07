import React/* , { useState } */ from 'react';
import { Box, TextField, Typography, Tooltip, InputAdornment } from '@mui/material';
import { useAnnualEnergySpend } from '../../../Context/Organizational Profile/SubStep2/Annual Energy Spend Context';

const formatNumber = (value: string) => {
  if (!value) return '';
  const parts = value.split('.');
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return parts.join('.');
};

const parseInput = (value: string) => {
  return value.replace(/,/g, '');
};

const SubStep2: React.FC = () => {
  const { annualEnergySpend, updateAnnualEnergySpend } = useAnnualEnergySpend();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
  
    if (name === 'otherLabel') {
      updateAnnualEnergySpend({ [name]: value });
      return;
    }

    const parsedValue = parseInput(value);

    if (!/^\d*\.?\d*$/.test(parsedValue)) {
      return;
    }
    
    updateAnnualEnergySpend({ [name]: parsedValue });
  };

  const renderCurrencyField = (label: string, name: keyof typeof annualEnergySpend, tooltip: string) => (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, justifyContent: 'center' }}>
      <Tooltip title={tooltip} placement="left-end" arrow>
        <Typography sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.75rem', minWidth: '150px', flex: 0.25 }}>
          <b>{label}</b>
        </Typography>
      </Tooltip>
      <Tooltip title={`Enter the total annual spend on ${label.toLowerCase()}`} placement="top-end" arrow>
        <TextField
          fullWidth
          variant="outlined"
          placeholder={`Enter the total annual spend on ${label.toLowerCase()}`}
          size="small"
          type="text"
          value={formatNumber(annualEnergySpend[name])}
          onChange={handleChange}
          name={name}
          InputProps={{
            startAdornment: <InputAdornment position="start">$</InputAdornment>,
          }}
          sx={{
            flex: 0.5,
            fontSize: '0.7rem',
            fontFamily: 'Nunito Sans, sans-serif',
            '& .MuiInputBase-root': { height: '40px', padding: '0 6px' },
            '& input': { padding: 0, fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.8rem' },
          }}
        />
      </Tooltip>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.75rem', p: 1, pr: 4, pl: 1, pt: 1 }}>
      <style>
        {`@import url('https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@200..1000&display=swap');`}
      </style>

      <Typography variant="h6" sx={{ mb: 1, fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.85rem', fontWeight: 'bold', textAlign: 'center' }}>
        <h2>Annual Energy Spend</h2>
      </Typography>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 0 }}>
        <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 2, p: '10px' }}>
          {renderCurrencyField('Electricity', 'electricity', 'Used for verifying unit prices and presenting pre/post design costs')}
          {renderCurrencyField('Natural Gas', 'naturalGas', 'Used for verifying unit prices and presenting pre/post design costs')}
          {renderCurrencyField('Water', 'water', 'Used for verifying unit prices and presenting pre/post design costs')}
          {renderCurrencyField('Oil', 'oil', 'Used for verifying unit prices and presenting pre/post design costs')}
          {renderCurrencyField('Propane', 'propane', 'Used for verifying unit prices and presenting pre/post design costs')}
          {renderCurrencyField('Steam', 'steam', 'Used for verifying unit prices and presenting pre/post design costs')}
          {renderCurrencyField('Chilled Water', 'chilledWater', 'Used for verifying unit prices and presenting pre/post design costs')}

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, justifyContent: 'center' }}>
            <Tooltip title="Used for verifying unit prices and presenting pre/post design costs" placement="left-end" arrow>
              <Typography sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.75rem', minWidth: '150px', flex: 0.25 }}>
                <b>Other:</b>
              </Typography>
            </Tooltip>

            <TextField
              fullWidth
              variant="outlined"
              placeholder="If 'Other', please specify"
              size="small"
              type="text"
              value={annualEnergySpend.otherLabel || ''}
              onChange={handleChange}
              name="otherLabel"
              sx={{
                flex: 0.245,
                fontSize: '0.7rem',
                fontFamily: 'Nunito Sans, sans-serif',
                '& .MuiInputBase-root': { height: '40px', padding: '0 6px' },
                '& input': { padding: 0, fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.8rem' },
              }}
            />

            <TextField
              fullWidth
              variant="outlined"
              placeholder={`Enter total annual spend on ${annualEnergySpend.otherLabel || 'other'}`}
              size="small"
              type="text"
              value={formatNumber(annualEnergySpend.other)}
              onChange={handleChange}
              name="other"
              InputProps={{
                startAdornment: <InputAdornment position="start">$</InputAdornment>,
              }}
              sx={{
                flex: 0.25,
                fontSize: '0.7rem',
                fontFamily: 'Nunito Sans, sans-serif',
                '& .MuiInputBase-root': { height: '40px', padding: '0 6px' },
                '& input': { padding: 0, fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.8rem' },
              }}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default SubStep2;