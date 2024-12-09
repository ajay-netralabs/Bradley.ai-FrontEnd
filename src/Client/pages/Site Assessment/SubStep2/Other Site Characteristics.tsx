import React from 'react'; 
import { Box, TextField, Typography, Select, MenuItem } from '@mui/material'; 

const SubStep2: React.FC = () => { 
  return ( 
    <Box sx={{ display: 'flex', flexDirection: 'column', fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.75rem', p: 1, pr: 4, pl: 1, pt: 1 }}>
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Nunito+Sans:ital,opsz,wght@0,6..12,200..1000;1,6..12,200..1000&display=swap');
      </style>
      <Typography variant="h6" sx={{ mb: 1, fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.85rem', fontWeight: 'bold', textAlign: 'center' }}>
        <h2>Other Site Characteristics</h2>
      </Typography> 
      <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 0 }}>
        <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 2, p: '10px' }}>

				<Box sx={{ display: 'flex', alignItems: 'center', gap: 1, justifyContent: 'center' }}>
  <Typography sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.75rem', minWidth: '150px', flex: 0.25 }}><b>Please Describe Any Unique Site Features That Might Impact DER System Placement Or Installation: </b>(Optional)</Typography>
  <TextField
  fullWidth
  variant="outlined"
  size="small"
	placeholder='E.g., Historical Facades, Easements, Height Restrictions'
  multiline
  rows={2}
  sx={{
    flex: 0.5,
    fontSize: '0.7rem',
    fontFamily: 'Nunito Sans, sans-serif',
    '& .MuiInputBase-root': { padding: '0 6px' },
    '& textarea': {
      fontFamily: 'Nunito Sans, sans-serif',
      fontSize: '0.8rem',
			pt: '5px', pb: '5px', pl: '1px'
    }
  }}
/>

</Box>

<Box sx={{ display: 'flex', alignItems: 'center', gap: 1, justifyContent: 'center' }}>
  <Typography sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.75rem', minWidth: '150px', flex: 0.25 }}><b>Topography:</b></Typography>
  <Select
            fullWidth
            size="small"
            variant="outlined"
            defaultValue="Option 1"
            sx={{
              flex: 0.498,
              fontFamily: 'Nunito Sans, sans-serif',
              fontSize: '0.7rem', minWidth:'414px', pl: '1px', pr: '1px',
              height: '40px',
              '& .MuiInputBase-root': { height: '40px', padding: '0 6px' },
              '& .MuiSelect-select': { padding: '4px 6px', fontSize: '0.7rem' },
            }}
          >
            <MenuItem value="Option 1" sx={{fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem',}}>Flat</MenuItem>
            <MenuItem value="Option 2" sx={{fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem',}}>Sloped</MenuItem>
            <MenuItem value="Option 3" sx={{fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem',}}>Hilly</MenuItem>
            <MenuItem value="Option 4" sx={{fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem',}}>Partially Tree Covered</MenuItem>
						<MenuItem value="Option 5" sx={{fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem',}}>Tree Covered</MenuItem>
          </Select>
</Box>

<Box sx={{ display: 'flex', alignItems: 'center', gap: 1, justifyContent: 'center' }}>
  <Typography sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.75rem', minWidth: '150px', flex: 0.25 }}><b>Primary Volt. Service To The Building / Property:</b></Typography>
  <Select
            fullWidth
            size="small"
            variant="outlined"
            defaultValue="Option 1"
            sx={{
              flex: 0.498,
              fontFamily: 'Nunito Sans, sans-serif',
              fontSize: '0.7rem', minWidth:'414px', pl: '1px', pr: '1px',
              height: '40px',
              '& .MuiInputBase-root': { height: '40px', padding: '0 6px' },
              '& .MuiSelect-select': { padding: '4px 6px', fontSize: '0.7rem' },
            }}
          >
            <MenuItem value="Option 1" sx={{fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem',}}>480 V</MenuItem>
            <MenuItem value="Option 2" sx={{fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem',}}>277 V</MenuItem>
            <MenuItem value="Option 3" sx={{fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem',}}>120 V</MenuItem>
          </Select>
</Box>

<Box sx={{ display: 'flex', alignItems: 'center', gap: 1, justifyContent: 'center' }}>
  <Typography sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.75rem', minWidth: '150px', flex: 0.25 }}><b>Secondary Volt. Service: </b>(If Any)</Typography>
  <Select
            fullWidth
            size="small"
            variant="outlined"
            defaultValue="Option 0"
            sx={{
              flex: 0.498,
              fontFamily: 'Nunito Sans, sans-serif',
              fontSize: '0.7rem', minWidth:'414px', pl: '1px', pr: '1px',
              height: '40px',
              '& .MuiInputBase-root': { height: '40px', padding: '0 6px' },
              '& .MuiSelect-select': { padding: '4px 6px', fontSize: '0.7rem' },
            }}
          >
            <MenuItem value="Option 0" disabled sx={{fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem',}}>Select</MenuItem>
						<MenuItem value="Option 1" sx={{fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem',}}>480 V</MenuItem>
            <MenuItem value="Option 2" sx={{fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem',}}>277 V</MenuItem>
            <MenuItem value="Option 3" sx={{fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem',}}>120 V</MenuItem>
          </Select>
</Box>
        </Box>
      </Box>
    </Box> 
  ); 
}; 

export default SubStep2;
