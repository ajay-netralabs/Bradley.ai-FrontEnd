import React from 'react'; 
import { Box, Button, Typography, MenuItem,Select } from '@mui/material'; 

const SubStep2: React.FC = () => { 
  return ( 
    <Box sx={{ display: 'flex', flexDirection: 'column', fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.75rem', p: 1, pr: 4, pl: 1, pt: 1 }}>
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Nunito+Sans:ital,opsz,wght@0,6..12,200..1000;1,6..12,200..1000&display=swap');
      </style>
      <Typography variant="h6" sx={{ mb: 1, fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.85rem', fontWeight: 'bold', textAlign: 'center' }}>
        <h2>Prioritization - I</h2>
      </Typography> 
      <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 0 }}>
        <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 2, p: '10px' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, justifyContent: 'center' }}>
  <Typography sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.8rem', flex: 0.75 }}>
    <b>Rank Your Priorities:</b> (1 being the most important)
    <p></p>
  </Typography>
</Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, justifyContent: 'center' }}>
  <Typography sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.75rem', flex: 0.1 }}>
    <b>Rank 1:</b>
  </Typography>
  <Select
            size="small"
            variant="outlined"
            defaultValue="Decarbonization"
            sx={{
              flex: 0.5,
              fontFamily: 'Nunito Sans, sans-serif',
              fontSize: '0.7rem',
              height: '40px',
              '& .MuiInputBase-root': { padding: '0 6px' },
              '& .MuiSelect-select': { padding: '4px 6px', fontSize: '0.7rem' },
            }}
          >
            <MenuItem value="Decarbonization" sx={{fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem',}}>Decarbonization</MenuItem>
            <MenuItem value="Cost Reduction" sx={{fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem',}}>Cost Reduction</MenuItem>
            <MenuItem value="Increased Resiliency" sx={{fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem',}}>Increased Resiliency</MenuItem>
            <MenuItem value="Maximize Renewable Generation" sx={{fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem',}}>Maximize Renewable Generation</MenuItem>
          </Select>
  <Button
    variant="outlined"
    sx={{
      flex: 0.14,
      height: '40px',
      fontFamily: 'Nunito Sans, sans-serif',
      fontSize: '0.65rem',
      padding: '2px 1px',
      pr: '15px',
      pl: '15px',
      alignSelf: 'flex-end',
      textTransform: 'none',
      '&:focus': {
      outline: 'none',
    }
    }}
  >
    Explain
  </Button>
</Box>

<Box sx={{ display: 'flex', alignItems: 'center', gap: 1, justifyContent: 'center' }}>
  <Typography sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.75rem', flex: 0.1 }}>
    <b>Rank 2:</b>
  </Typography>
  <Select
            size="small"
            variant="outlined"
            defaultValue="Cost Reduction"
            sx={{
              flex: 0.5,
              fontFamily: 'Nunito Sans, sans-serif',
              fontSize: '0.7rem',
              height: '40px',
              '& .MuiInputBase-root': { padding: '0 6px' },
              '& .MuiSelect-select': { padding: '4px 6px', fontSize: '0.7rem' },
            }}
          >
            <MenuItem value="Decarbonization" sx={{fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem',}}>Decarbonization</MenuItem>
            <MenuItem value="Cost Reduction" sx={{fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem',}}>Cost Reduction</MenuItem>
            <MenuItem value="Increased Resiliency" sx={{fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem',}}>Increased Resiliency</MenuItem>
            <MenuItem value="Maximize Renewable Generation" sx={{fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem',}}>Maximize Renewable Generation</MenuItem>
          </Select>
  <Button
    variant="outlined"
    sx={{
      flex: 0.14,
      height: '40px',
      fontFamily: 'Nunito Sans, sans-serif',
      fontSize: '0.65rem',
      padding: '2px 1px',
      pr: '15px',
      pl: '15px',
      alignSelf: 'flex-end',
      textTransform: 'none',
      '&:focus': {
      outline: 'none',
    }
    }}
  >
    Explain
  </Button>
</Box>

<Box sx={{ display: 'flex', alignItems: 'center', gap: 1, justifyContent: 'center' }}>
  <Typography sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.75rem', flex: 0.1 }}>
    <b>Rank 3:</b>
  </Typography>
  <Select
            size="small"
            variant="outlined"
            defaultValue="Increased Resiliency"
            sx={{
              flex: 0.5,
              fontFamily: 'Nunito Sans, sans-serif',
              fontSize: '0.7rem',
              height: '40px',
              '& .MuiInputBase-root': { padding: '0 6px' },
              '& .MuiSelect-select': { padding: '4px 6px', fontSize: '0.7rem' },
            }}
          >
            <MenuItem value="Decarbonization" sx={{fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem',}}>Decarbonization</MenuItem>
            <MenuItem value="Cost Reduction" sx={{fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem',}}>Cost Reduction</MenuItem>
            <MenuItem value="Increased Resiliency" sx={{fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem',}}>Increased Resiliency</MenuItem>
            <MenuItem value="Maximize Renewable Generation" sx={{fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem',}}>Maximize Renewable Generation</MenuItem>
          </Select>
  <Button
    variant="outlined"
    sx={{
      flex: 0.14,
      height: '40px',
      fontFamily: 'Nunito Sans, sans-serif',
      fontSize: '0.65rem',
      padding: '2px 1px',
      pr: '15px',
      pl: '15px',
      alignSelf: 'flex-end',
      textTransform: 'none',
      '&:focus': {
      outline: 'none',
    }
    }}
  >
    Explain
  </Button>
</Box>

<Box sx={{ display: 'flex', alignItems: 'center', gap: 1, justifyContent: 'center' }}>
  <Typography sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.75rem', flex: 0.1 }}>
    <b>Rank 4:</b>
  </Typography>
  <Select
            size="small"
            variant="outlined"
            defaultValue="Maximize Renewable Generation"
            sx={{
              flex: 0.5,
              fontFamily: 'Nunito Sans, sans-serif',
              fontSize: '0.7rem',
              height: '40px',
              '& .MuiInputBase-root': { padding: '0 6px' },
              '& .MuiSelect-select': { padding: '4px 6px', fontSize: '0.7rem' },
            }}
          >
            <MenuItem value="Decarbonization" sx={{fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem',}}>Decarbonization</MenuItem>
            <MenuItem value="Cost Reduction" sx={{fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem',}}>Cost Reduction</MenuItem>
            <MenuItem value="Increased Resiliency" sx={{fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem',}}>Increased Resiliency</MenuItem>
            <MenuItem value="Maximize Renewable Generation" sx={{fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem',}}>Maximize Renewable Generation</MenuItem>
          </Select>
  <Button
    variant="outlined"
    sx={{
      flex: 0.14,
      height: '40px',
      fontFamily: 'Nunito Sans, sans-serif',
      fontSize: '0.65rem',
      padding: '2px 1px',
      pr: '15px',
      pl: '15px',
      alignSelf: 'flex-end',
      textTransform: 'none',
      '&:focus': {
      outline: 'none',
    }
    }}
  >
    Explain
  </Button>
</Box>
        </Box>
      </Box>
    </Box> 
  ); 
}; 

export default SubStep2;
