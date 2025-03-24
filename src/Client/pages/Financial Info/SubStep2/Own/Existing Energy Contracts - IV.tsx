import React, { useState } from 'react';
import { Box, TextField, Typography, FormControlLabel, Switch, InputAdornment, Tooltip, Select, MenuItem } from '@mui/material';

const SubStep2: React.FC = () => { 

  const [showSteam, setShowSteam] = useState(false);
  const [condensate, setCondensate] = useState<string>('no');

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.75rem', p: 1, pr: 4, pl: 1, pt: 1 }}>
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Nunito+Sans:ital,opsz,wght@0,6..12,200..1000;1,6..12,200..1000&display=swap');
      </style>
      <Typography variant="h6" sx={{ mb: 1, fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.85rem', fontWeight: 'bold', textAlign: 'center' }}>
        <h2>Existing Energy Contracts - IV</h2>
      </Typography>
      
      <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 0 }}>
        <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 2, pt: '10px', pb: '10px', pl: '160px', pr: '160px' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Tooltip title="Steam contracts are a third-party agreement to sell therms (in MLBs of steam) to you with pre-agreed upon units of energy (min/max), pricing per unit of energy and escalators. Knowing these commitments will help Bradley propose the most optimized DER recommendation to match to your priorities. Steam contracts are rare, but steam systems like CONED in NY, Baltimore City Maryland, Atlantic City NJ, and Las Vegas NV are good examples where large steam users can access third party contracts for steam." placement='right-start' arrow>
          <FormControlLabel
            control={<Switch checked={showSteam} onChange={() => setShowSteam(!showSteam)} size="small" />}
            label="Do you have any existing Steam Contracts?"
            sx={{
              '& .MuiFormControlLabel-label': {
                fontFamily: 'Nunito Sans, sans-serif',
                fontSize: '0.9rem'
              }
            }}
          /></Tooltip>

          </Box>
          

          {showSteam && (
            <Box sx={{ mb: 0, pl: 0 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 0 }}>
        <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 2, pt: '10px' }}>

				<Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Typography sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.75rem', minWidth: '150px', flex: 0.5 }}><b>Rate: </b>(In MLBs of steam)</Typography>
          <TextField
            variant="outlined" 
            size="small" 
            type="number"
            placeholder='Enter Rate in USD' 
            InputProps={{
              startAdornment: <InputAdornment position="start">$</InputAdornment>,
            }}
            inputProps={{
              min: 0,
              max: 99
            }}
            onChange={(e) => {
              let value = e.target.value;
              if (value === "" || /^\d{1,2}$/.test(value)) {
                e.target.value = value;
              } else {
                e.target.value = value.slice(0, 2);
              }
            }}
            sx={{
              flex: 0.5, fontFamily: 'Nunito Sans, sans-serif',
              fontSize: '0.7rem',
              '& .MuiInputBase-root': { height: '40px', padding: '0 6px' },
              '& input': { padding: 0, fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem' },
              '& .MuiInputBase-input::placeholder': {
                fontFamily: 'Nunito Sans, sans-serif',
                fontSize: '0.7rem',
              }
            }}
          />
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Typography sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.75rem', minWidth: '150px', flex: 0.5 }}><b>Escalator: </b>(in %)</Typography>
          <TextField
  variant="outlined"
  size="small"
  type="number"
  placeholder="Enter percentage"
  InputProps={{
    endAdornment: <InputAdornment position="end">%</InputAdornment>,
  }}
  inputProps={{
    min: 1,
    max: 9
  }}
  onChange={(e) => {
    let value = parseInt(e.target.value, 10);
    if (value < 1) value = 1;
    if (value > 9) value = 9;
    e.target.value = value.toString();
  }}
  sx={{
    flex: 0.5,
    fontFamily: "Nunito Sans, sans-serif",
    fontSize: "0.7rem",
    "& .MuiInputBase-root": { height: "40px", padding: "0 6px" },
    "& input": { padding: 0, fontFamily: "Nunito Sans, sans-serif", fontSize: "0.7rem" },
    "& .MuiInputBase-input::placeholder": {
      fontFamily: "Nunito Sans, sans-serif",
      fontSize: "0.7rem",
    },
  }}
/>

        </Box>
				<Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Typography sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.75rem', minWidth: '150px', flex: 0.5 }}><b>Offtake Requirements:</b><br />(Required amount of offtake per your agreement, typically narrated as the minimum amount of MLBs)</Typography>
          <TextField
            variant="outlined" 
            size="small" 
            type="text"
            placeholder='Input' 
            sx={{
              flex: 0.5, fontFamily: 'Nunito Sans, sans-serif',
              fontSize: '0.7rem',
              '& .MuiInputBase-root': { height: '40px', padding: '0 6px' },
              '& input': { padding: 0, fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem' },
              '& .MuiInputBase-input::placeholder': {
                fontFamily: 'Nunito Sans, sans-serif',
                fontSize: '0.7rem',
              }
            }}
          />
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
  <Typography sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.75rem', minWidth: '150px', flex: 0.5 }}>
    <b>Contract Requirements for Return of Condensate:</b>
  </Typography>
    <Select
                size="small"
                id="condensate-select"
                value={condensate}
                onChange={(e) => setCondensate(e.target.value)}
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
      <MenuItem value="yes" sx={{ fontSize: '0.7rem' }}>
        Yes
      </MenuItem>
      <MenuItem value="no" sx={{ fontSize: '0.7rem' }}>
        No
      </MenuItem>
    </Select>
</Box>
        {condensate === "yes" && (
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Typography sx={{ fontFamily: "Nunito Sans, sans-serif", fontSize: "0.75rem", minWidth: "150px", flex: 0.5 }}>
            <b>What Percentage of Condensate is Required to be Returned? </b>(in %)
          </Typography>
          <TextField
            variant="outlined"
            size="small"
            type="number"
            placeholder="Enter percentage"
            InputProps={{
              endAdornment: <InputAdornment position="end">%</InputAdornment>,
            }}
            sx={{
              flex: 0.5,
              fontFamily: "Nunito Sans, sans-serif",
              fontSize: "0.7rem",
              "& .MuiInputBase-root": { height: "40px", padding: "0 6px" },
              "& input": { padding: 0, fontFamily: "Nunito Sans, sans-serif", fontSize: "0.7rem" },
              "& .MuiInputBase-input::placeholder": {
                fontFamily: "Nunito Sans, sans-serif",
                fontSize: "0.7rem",
              },
            }}
          />
        </Box>
      )}
        </Box>
      </Box>
              
            </Box>
          )}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Typography
            sx={{
							mt: 1,
              fontFamily: 'Nunito Sans, sans-serif',
              fontSize: '0.75rem',
              minWidth: '200px',
              flex: 1,
            }}
          >
            <i><b>* </b>If <b>Yes</b>, please provide details in the fields or upload the agreement and Bradley will autopopulate the fields for you.</i><br />
            {/* <i><b>** </b>If <b>No</b>, Bradley will assume you are on the standard offer rate from the regulated electric utility and will gather data from the utility tariff.</i> */}
          </Typography>
        </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default SubStep2;