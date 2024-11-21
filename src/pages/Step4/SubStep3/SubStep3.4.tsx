import React from 'react';
import { Box, TextField, Typography, Select, MenuItem, FormControlLabel, Radio, RadioGroup } from '@mui/material';

const SubStep3: React.FC = () => {

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
        <h2>Carport - Mounted Solar (Optional)</h2>
      </Typography>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: '10px', pb: '10px', px: '160px' }}>

			<Box sx={{ display: 'flex', flexDirection: 'column', mt: 1 }}>
				<Typography sx={{ mt: 1, fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.75rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
  <b>Would You Allow Roof Penetration Anchoring Methods For Solar Panel Installation?</b>
  <RadioGroup row sx={{ fontSize: '0.7rem', m: 0, gap: 5.5 }}>
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
              flex: 0.3,
            }}
          >
            <b>No. of Total Parking Spots:</b> (Optional)
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
              '& .MuiInputBase-root': { height: '24px', padding: '0 6px' },
              '& input': { padding: 0, fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.8rem' },
							'& .MuiInputBase-input::placeholder': {
                fontFamily: 'Nunito Sans, sans-serif',
                fontSize: '0.7rem',
              }
            }}
          />
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Typography
            sx={{
              fontFamily: 'Nunito Sans, sans-serif',
              fontSize: '0.75rem',
              minWidth: '200px',
              flex: 0.3,
            }}
          >
            <b>Parking Garage:</b> (Optional)
          </Typography>
          <Select
            size="small"
            defaultValue="default"
            sx={{
              flex: 0.5,
							marginLeft: 'auto',
              fontFamily: 'Nunito Sans, sans-serif',
              fontSize: '0.7rem',
              height: '24px',
              '& .MuiInputBase-root': { padding: '0 6px' },
              '& .MuiSelect-select': { padding: '4px 6px', fontSize: '0.7rem' },
            }}
          >
            <MenuItem value="default" disabled sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem' }}>
              Input No. of Parking Spots at the Top Level
            </MenuItem>
            <MenuItem value="flat" sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem' }}>
              Flat
            </MenuItem>
            <MenuItem value="sloped" sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem' }}>
              Sloped
            </MenuItem>
						<MenuItem value="hilly" sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem' }}>
              Hilly
            </MenuItem>
						<MenuItem value="partially covered" sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem' }}>
              Partially Covered
            </MenuItem>
          </Select>
        </Box>

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
            <i><b>Hint: </b>If the total sq ft of the top level of your parking garage contains 170 parking spots or greater it is likely a solar carport solution will be financially viable. If there are no enteries for garage solar carport Bradley will ignore this option.</i>
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default SubStep3;
