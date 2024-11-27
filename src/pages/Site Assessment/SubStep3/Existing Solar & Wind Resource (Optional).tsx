import React from 'react';
import { Box, TextField, Typography, FormControlLabel, Radio, RadioGroup } from '@mui/material';

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
        <h2>Existing Solar & Wind Resource (Optional)</h2><br />
				Let Bradley Know If You Have Existing Solar Assets
      </Typography>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: '10px', pb: '10px', px: '160px' }}>

			
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
					
          <Typography
            sx={{
              fontFamily: 'Nunito Sans, sans-serif',
              fontSize: '0.75rem',
              minWidth: '200px',
              flex: 0.4,
            }}
          >
            <b>Existing Solar Installation At The Property: </b>(In kW)
          </Typography>
          <TextField
            variant="outlined"
            size="small"
            type="number"
						placeholder='Input'
            sx={{
              flex: 0.25,
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

				<Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
					
          <Typography
            sx={{
              fontFamily: 'Nunito Sans, sans-serif',
              fontSize: '0.75rem',
              minWidth: '200px',
              flex: 0.4,
            }}
          >
            <b>Existing Wind Installation At The Property: </b>(In kW)
          </Typography>
          <TextField
            variant="outlined"
            size="small"
            type="number"
						placeholder='Input'
            sx={{
              flex: 0.25,
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

				<Box sx={{ display: 'flex', flexDirection: 'column', mt: 0 }}>
				<Typography sx={{ mt: 0, fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.75rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
  <b>Consider Wind Recommendation In Analysis?</b>
  <RadioGroup row sx={{ fontSize: '0.7rem', m: 0, gap: 5.5 }}>
    <FormControlLabel value="yes" control={<Radio sx={{ padding: '2px' }} />} label={<Typography sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem' }}>Yes</Typography>} />
    <FormControlLabel value="no" control={<Radio sx={{ padding: '2px' }} />} label={<Typography sx={{  fontFamily: 'Nunito Sans, sans-serif',fontSize: '0.7rem' }}>No</Typography>} />
  </RadioGroup>
</Typography>
</Box>

				<Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Typography
            sx={{
							mt: 0,
              fontFamily: 'Nunito Sans, sans-serif',
              fontSize: '0.75rem',
              minWidth: '200px',
              flex: 1,
            }}
          >
            <i><b>*</b>If you select <b>Yes</b>, Bradley will assess your site's wind resource potential using <b>Wind Resource Maps, Data and Geo-Spatial Data for North America</b> from the <b>National Renewable Energy Lab, Department of Energy</b>.</i>
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default SubStep3;
