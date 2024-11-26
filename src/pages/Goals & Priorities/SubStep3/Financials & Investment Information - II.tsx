import React, { useState } from 'react'; 
import { Box, TextField, Typography, MenuItem, Select, IconButton } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DeleteIcon from '@mui/icons-material/Delete';

const SubStep3: React.FC = () => { 
  const [investmentAmounts, setinvestmentAmounts] = useState<number[]>([0, 1, 2]);

  const handleAddSection = () => {
    setinvestmentAmounts([...investmentAmounts, investmentAmounts.length]);
  };

  const handleRemoveSection = (index: number) => {
    setinvestmentAmounts(investmentAmounts.filter((_, i) => i !== index));
  }; 
  
  return ( 
    <Box sx={{ display: 'flex', flexDirection: 'column', fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.75rem', p: 1, pr: 4, pl: 1, pt: 1 }}>
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Nunito+Sans:ital,opsz,wght@0,6..12,200..1000;1,6..12,200..1000&display=swap');
      </style>
      <Typography variant="h6" sx={{ mb: 1, fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.85rem', fontWeight: 'bold', textAlign: 'center' }}>
        <h2>Financials & Investment Information - II</h2>
      </Typography> 
      <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 0 }}>
        <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 2, p: '10px' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, justifyContent: 'center' }}>
  <Typography sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.8rem', flex: 0.75 }}>
    <b>Investment Details:</b>
    <p></p>
  </Typography>
</Box>

<Box sx={{ display: 'flex', alignItems: 'center', gap: 1, justifyContent: 'center' }}>
  <Typography sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.75rem', flex: 0.30 }}>
		<b>Maximum Investment Amount: </b>(Optional, in USD)<br />Enter your DER investment budget for each year.
  </Typography>
  <Box
    sx={{
      display: 'flex',
      alignItems: 'center',
      gap: 1,
      flex: 0.5,
      maxWidth: 'calc(100% - 665px)',
    }}
  >
    {investmentAmounts.map((_, index) => (
      <TextField
        key={index}
        variant="outlined"
        size="small"
        type="number"
        placeholder={`Year ${index + 1} - Budget Amt.`}
        sx={{
          flex: 1,
          fontFamily: 'Nunito Sans, sans-serif',
          fontSize: '0.7rem',
          '& .MuiInputBase-root': { height: '24px', padding: '0 6px' },
          '& input': { padding: 0, fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.8rem' },
        }}
      />
    ))}
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, ml: 1 }}>
      <IconButton
        onClick={handleAddSection}
        color="primary"
        sx={{ p: 0 }}
      >
        <AddCircleOutlineIcon fontSize="small" />
      </IconButton>
      <IconButton
        onClick={() => handleRemoveSection(investmentAmounts.length - 1)}
        sx={{ p: 0 }}
        disabled={investmentAmounts.length === 1}
      >
        <DeleteIcon fontSize="small" />
      </IconButton>
    </Box>
  </Box>
</Box>

<Box sx={{ display: 'flex', alignItems: 'center', gap: 1, justifyContent: 'center' }}>
  <Typography sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.75rem', flex: 0.3 }}>
    <b>Desired Cost Reduction Annually: </b>(in USD)
  </Typography>
  <TextField
            variant="outlined" 
            size="small" 
            type="number" 
						placeholder='Input'
            sx={{
              flex: 0.448, fontFamily: 'Nunito Sans, sans-serif',
              fontSize: '0.7rem',
              '& .MuiInputBase-root': { height: '24px', padding: '0 6px' },
              '& input': { padding: 0, fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.8rem' },
							'& .MuiInputBase-input::placeholder': {
                fontFamily: 'Nunito Sans, sans-serif',
                fontSize: '0.7rem',
              }
            }}
          />
</Box>

<Box sx={{ display: 'flex', alignItems: 'center', gap: 1, justifyContent: 'center' }}>
  <Typography sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.75rem', flex: 0.3 }}>
		<b>Term of Agreement: </b>(in Years) 
  </Typography>
  <TextField
            variant="outlined" 
            size="small" 
            type="number" 
						placeholder='Input : Bradley needs to know the contract duration in case of a 3rd party DER ownership.'
            sx={{
              flex: 0.448, fontFamily: 'Nunito Sans, sans-serif',
              fontSize: '0.7rem',
              '& .MuiInputBase-root': { height: '24px', padding: '0 6px' },
              '& input': { padding: 0, fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.8rem' },
							'& .MuiInputBase-input::placeholder': {
                fontFamily: 'Nunito Sans, sans-serif',
                fontSize: '0.7rem',
              }
            }}
          />
</Box>

<Box sx={{ display: 'flex', alignItems: 'center', gap: 1, justifyContent: 'center' }}>
  <Typography sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.75rem', flex: 0.3 }}>
		<b>How would you prefer to finance your DER system?</b>
  </Typography>
  <Select
            size="small"
            variant="outlined"
            defaultValue="Option 1"
            sx={{
              flex: 0.448,
              fontFamily: 'Nunito Sans, sans-serif',
              fontSize: '0.7rem',
              height: '24px',
              '& .MuiInputBase-root': { padding: '0 6px' },
              '& .MuiSelect-select': { padding: '4px 6px', fontSize: '0.7rem' },
            }}
          >
            <MenuItem value="Option 1" sx={{fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem',}}>Cash Purchase</MenuItem>
            <MenuItem value="Option 2" sx={{fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem',}}>Loan</MenuItem>
            <MenuItem value="Option 3" sx={{fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem',}}>Power Purchase Agreement (PPA)</MenuItem>
            <MenuItem value="Option 4" sx={{fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem',}}>Lease</MenuItem>
						<MenuItem value="Option 5" sx={{fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem',}}>Other</MenuItem>
          </Select>
</Box>
        </Box>
      </Box>
    </Box> 
  ); 
}; 

export default SubStep3;
