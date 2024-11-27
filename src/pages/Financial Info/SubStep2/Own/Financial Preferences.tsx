import React from 'react';
import { Box, TextField, Typography, Select, MenuItem, FormControlLabel, Radio, RadioGroup } from '@mui/material';

const SubStep2: React.FC = () => {

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
        <h2>Financial Preferences</h2>
      </Typography>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: '10px', pb: '10px', px: '160px' }}>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1 }}>
          <Typography
            sx={{
              fontFamily: 'Nunito Sans, sans-serif',
              fontSize: '0.75rem',
              minWidth: '200px',
              flex: 0.5,
            }}
          >
            <b>Preferred Method Of Depreciation:</b>
          </Typography>
          <Select
            size="small"
            defaultValue="default"
            sx={{
              flex: 0.5,
							marginLeft: 'auto',
              fontFamily: 'Nunito Sans, sans-serif',
              fontSize: '0.7rem',
              height: '40px',
              '& .MuiInputBase-root': { padding: '0 6px' },
              '& .MuiSelect-select': { padding: '4px 6px', fontSize: '0.7rem' },
            }}
          >
            <MenuItem value="default" disabled sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem' }}>
              Select
            </MenuItem>
            <MenuItem value="3year" sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem' }}>
              MACRS 3-Year
            </MenuItem>
            <MenuItem value="5year" sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem' }}>
            MACRS 5-Year
            </MenuItem>
						<MenuItem value="7year" sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem' }}>
            MACRS 7-Year
            </MenuItem>
						<MenuItem value="straight line" sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem' }}>
              Straight Line
            </MenuItem>
            <MenuItem value="other" sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem' }}>
            Other
            </MenuItem>
          </Select>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
					
          <Typography
            sx={{
              fontFamily: 'Nunito Sans, sans-serif',
              fontSize: '0.75rem',
              minWidth: '200px',
              flex: 0.5,
            }}
          >
            <b>Tax Rate:</b> (In %)
          </Typography>
          <TextField
            variant="outlined"
            size="small"
            type="number"
						placeholder='Input'
            sx={{
              flex: 0.5,
							marginLeft: 'auto',
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
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
				<Typography sx={{ mt: 1, fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.75rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flex: 0.5 }}>
  <b>Tax Appetite In First Year?</b>
  <RadioGroup row sx={{ fontSize: '0.7rem', m: 0, gap: 5.5, flex: 0.58 }}>
    <FormControlLabel value="yes" control={<Radio sx={{ padding: '2px' }} />} label={<Typography sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem' }}>Yes</Typography>} />
    <FormControlLabel value="no" control={<Radio sx={{ padding: '2px' }} />} label={<Typography sx={{  fontFamily: 'Nunito Sans, sans-serif',fontSize: '0.7rem' }}>No</Typography>} />
  </RadioGroup>
</Typography>
</Box>

<Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
					
          <Typography
            sx={{
              fontFamily: 'Nunito Sans, sans-serif',
              fontSize: '0.75rem',
              minWidth: '200px',
              flex: 0.5,
            }}
          >
            <b>If NO, When Does Your Tax Appetite Return?</b>
          </Typography>
          <TextField
            variant="outlined"
            size="small"
            type="date"
            sx={{
              flex: 0.5,
							marginLeft: 'auto',
              fontFamily: 'Nunito Sans, sans-serif',
              fontSize: '0.7rem',
              '& .MuiInputBase-root': { height: '40px', padding: '0 6px' },
              '& input': { padding: 0, fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.8rem' },
            }}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default SubStep2;
