import React, { useState } from 'react';
import { Box, TextField, Typography, IconButton, Select, MenuItem, FormControlLabel, Radio, RadioGroup } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DeleteIcon from '@mui/icons-material/Delete';

const SubStep2: React.FC = () => {
  const [yearBudget, setyearBudget] = useState<number[]>([0, 1, 2]);

  const handleAddSection = () => {
    setyearBudget([...yearBudget, yearBudget.length]);
  };

  const handleRemoveSection = (index: number) => {
    setyearBudget(yearBudget.filter((_, i) => i !== index));
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        fontFamily: 'Nunito Sans, sans-serif',
        fontSize: '0.75rem',
        p: 1,
        pr: 4,
        pl: 1,
        pt: 1,
      }}
    >
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@200..1000&display=swap');
      </style>
      <Typography
        variant="h6"
        sx={{
          mb: 1,
          fontFamily: 'Nunito Sans, sans-serif',
          fontSize: '0.85rem',
          fontWeight: 'bold',
          textAlign: 'center',
        }}
      >
        <h2>What Are Your Budget & Investment Goals</h2>
      </Typography>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: '10px', pb: '10px', px: '160px' }}>
        
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Typography
            sx={{
              fontFamily: 'Nunito Sans, sans-serif',
              fontSize: '0.75rem',
              minWidth: '200px',
              flex: 0.5,
            }}
          >
            <b>Maximum Acceptable Payback Period:</b><br />
						(Select this only if you're going to own/finance the DER ownership system.)
          </Typography>
          <Select
            size="small"
            defaultValue="default"
            sx={{
              flex: 0.5,
              fontFamily: 'Nunito Sans, sans-serif',
							marginLeft: 'auto',
              fontSize: '0.7rem',
              height: '40px',
              '& .MuiInputBase-root': { padding: '0 6px' },
              '& .MuiSelect-select': { padding: '4px 6px', fontSize: '0.7rem' },
            }}
          >
            <MenuItem value="default" disabled sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem' }}>
              Select
            </MenuItem>
            <MenuItem value="<5" sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem' }}>
              Less Than 5 Years
            </MenuItem>
            <MenuItem value="5-10" sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem' }}>
              5 - 10 Years
            </MenuItem>
						<MenuItem value=">10" sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem' }}>
              More Than 10 Years
            </MenuItem>
          </Select>
        </Box>

				<Typography sx={{ mt: 1, fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.75rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flex: 0.5 }}>
  <b>Do You Have Available Funds For This Project?</b>
  <RadioGroup row sx={{ fontSize: '0.7rem', m: 0, gap: 5.5, flex: 0.69 }}>
    <FormControlLabel value="yes" control={<Radio sx={{ padding: '2px' }} />} label={<Typography sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem' }}>Yes</Typography>} />
    <FormControlLabel value="no" control={<Radio sx={{ padding: '2px' }} />} label={<Typography sx={{  fontFamily: 'Nunito Sans, sans-serif',fontSize: '0.7rem' }}>No</Typography>} />
  </RadioGroup>
</Typography>

<Box
  sx={{
    display: 'flex',
    alignItems: 'center',
    gap: 1,
  }}
>
  <Typography
    sx={{
      fontFamily: 'Nunito Sans, sans-serif',
      fontSize: '0.75rem',
      minWidth: '200px',
      flex: 0.5,
    }}
  >
    <b>If YES, Provide the Amt. Of Budget By Year: </b>(in $)<br /> This will be treated as a cash buy down in any finance output.
  </Typography>

  <Box
    sx={{
      display: 'flex',
      alignItems: 'center',
      gap: 1,
      flex: 0.5,
      maxWidth: 'calc(100% - 200px)',
    }}
  >
    {yearBudget.map((_, index) => (
      <TextField
        key={index}
        variant="outlined"
        size="small"
        type="number"
        placeholder={`Year ${index + 1}`}
        sx={{
          flex: 1,
          fontFamily: 'Nunito Sans, sans-serif',
          fontSize: '0.7rem',
          '& .MuiInputBase-root': { height: '40px', padding: '0 6px' },
          '& input': { padding: 0, fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.8rem' },
          '& .MuiInputBase-input::placeholder': {
            fontFamily: 'Nunito Sans, sans-serif',
            fontSize: '0.7rem',
          }
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
        onClick={() => handleRemoveSection(yearBudget.length - 1)}
        sx={{ p: 0 }}
        disabled={yearBudget.length === 1}
      >
        <DeleteIcon fontSize="small" />
      </IconButton>
    </Box>
  </Box>
</Box>


      </Box>
    </Box>
  );
};

export default SubStep2;
