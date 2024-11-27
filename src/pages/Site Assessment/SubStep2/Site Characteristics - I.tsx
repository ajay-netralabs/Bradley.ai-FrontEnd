import React, { useState } from 'react'; 
import { Box, TextField, Select, MenuItem, Typography, Switch, FormControlLabel } from '@mui/material'; 

const SubStep2: React.FC = () => { 

	const [isBreakerSpaceAvailable, setIsBreakerSpaceAvailable] = useState(false);

  return ( 
    <Box sx={{ display: 'flex', flexDirection: 'column', fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.75rem', p: 1, pr: 4, pl: 1, pt: 1 }}>
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Nunito+Sans:ital,opsz,wght@0,6..12,200..1000;1,6..12,200..1000&display=swap');
      </style>
      <Typography variant="h6" sx={{ mb: 1, fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.85rem', fontWeight: 'bold', textAlign: 'center' }}>
        <h2>Site Characteristics - I</h2>
      </Typography> 
  
			<Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 0 }}>
        <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 2, p: '10px' }}>

<Box sx={{ display: 'flex', alignItems: 'center', gap: 1, justifyContent: 'center' }}>
  <Typography sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.75rem', flex: 0.3 }}>
    <b>Overall Facility Size, incl. Common Area: </b>(in Sq. Ft.)
  </Typography>
  <TextField
            variant="outlined" 
            size="small" 
            type="number" 
						placeholder='Input'
            sx={{
              flex: 0.448, fontFamily: 'Nunito Sans, sans-serif',
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

<Box sx={{ display: 'flex', alignItems: 'center', gap: 1, justifyContent: 'center' }}>
  <Typography sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.75rem', flex: 0.3 }}>
		<b>Common Area Square Footage: </b>(in Sq. Ft.)
  </Typography>
  <TextField
            variant="outlined" 
            size="small" 
            type="number" 
						placeholder='Input'
            sx={{
              flex: 0.448, fontFamily: 'Nunito Sans, sans-serif',
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

<Box sx={{ display: 'flex', alignItems: 'center', gap: 1, justifyContent: 'center' }}>
  <Typography sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.75rem', flex: 0.3 }}>
		<b>Year Building was Placed in Operation:</b>
  </Typography>
  <TextField
            variant="outlined" 
            size="small" 
            type="number" 
						placeholder='Input'
            sx={{
              flex: 0.448, fontFamily: 'Nunito Sans, sans-serif',
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

<Box sx={{ display: 'flex', alignItems: 'center', gap: 1, justifyContent: 'center' }}>
  <Typography sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.75rem', flex: 0.3 }}>
		<b>Primary Electric Utility Entry Point at Property:</b>
  </Typography>
  <Select
            size="small"
            variant="outlined"
            defaultValue="Option 1"
            sx={{
              flex: 0.448,
              fontFamily: 'Nunito Sans, sans-serif',
              fontSize: '0.7rem',
              height: '40px',
              '& .MuiInputBase-root': { padding: '0 6px' },
              '& .MuiSelect-select': { padding: '4px 6px', fontSize: '0.7rem' },
            }}
          >
            <MenuItem value="Option 1" sx={{fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem',}}>North</MenuItem>
            <MenuItem value="Option 2" sx={{fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem',}}>South</MenuItem>
            <MenuItem value="Option 3" sx={{fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem',}}>East</MenuItem>
            <MenuItem value="Option 4" sx={{fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem',}}>West</MenuItem>
          </Select>
</Box>

<Box sx={{ display: 'flex', alignItems: 'center', gap: 1, justifyContent: 'center' }}>
  <Typography sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.75rem', flex: 0.3 }}>
		<b>Secondary Electric Utility Entry Point: </b>(If Available)
  </Typography>
  <Select
            size="small"
            variant="outlined"
            defaultValue="Option 0"
            sx={{
              flex: 0.448,
              fontFamily: 'Nunito Sans, sans-serif',
              fontSize: '0.7rem',
              height: '40px',
              '& .MuiInputBase-root': { padding: '0 6px' },
              '& .MuiSelect-select': { padding: '4px 6px', fontSize: '0.7rem' },
            }}
          >
            <MenuItem value="Option 0" disabled sx={{fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem',}}>Select</MenuItem>
						<MenuItem value="Option 1" sx={{fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem',}}>North</MenuItem>
            <MenuItem value="Option 2" sx={{fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem',}}>South</MenuItem>
            <MenuItem value="Option 3" sx={{fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem',}}>East</MenuItem>
            <MenuItem value="Option 4" sx={{fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem',}}>West</MenuItem>
          </Select>
</Box>

<Box sx={{ display: 'flex', alignItems: 'center', gap: 1, justifyContent: 'center' }}>
            <Typography sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.75rem', flex: 0.3 }}>
              <b>Open Breaker Space Available?</b>
            </Typography>
            <FormControlLabel
              control={
                <Switch
                  size="small"
                  checked={isBreakerSpaceAvailable}
                  onChange={() => setIsBreakerSpaceAvailable(!isBreakerSpaceAvailable)}
                />
              }
              label=""
              sx={{
                flex: 0.448,
                justifyContent: 'flex-start',
                '& .MuiSwitch-root': { marginLeft: '5px' }
              }}
            />
          </Box>

          {isBreakerSpaceAvailable && (
						<Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, justifyContent: 'center' }}>
              <Typography sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.75rem', flex: 0.3 }}>
                <b>Number of Open Breakers:</b>
              </Typography>
              <TextField
                variant="outlined" 
                size="small" 
                type="number" 
                placeholder='Input'
                sx={{
                  flex: 0.448, fontFamily: 'Nunito Sans, sans-serif',
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
						<Box sx={{ display: 'flex', alignItems: 'center', gap: 1, justifyContent: 'center' }}>
              <Typography sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.75rem', flex: 0.3 }}>
                <b>Breaker Type and Amperage:</b>
              </Typography>
              <TextField
                variant="outlined" 
                size="small" 
                type="text" 
                placeholder='Input'
                sx={{
                  flex: 0.448, fontFamily: 'Nunito Sans, sans-serif',
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
						</Box>
          )}
        </Box>
      </Box>
    </Box> 
  ); 
}; 

export default SubStep2;
