import React from 'react'; 
import { Box, TextField, Button, Typography } from '@mui/material'; 

const SubStep2: React.FC = () => { 
  return ( 
    <Box sx={{ display: 'flex', flexDirection: 'column', fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.75rem', p: 1, pr: 4, pl: 1, pt: 1 }}>
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Nunito+Sans:ital,opsz,wght@0,6..12,200..1000;1,6..12,200..1000&display=swap');
      </style>
      <Typography variant="h6" sx={{ mb: 1, fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.85rem', fontWeight: 'bold' }}>
        <h2>Facility Address</h2>
      </Typography> 
  
  <Box sx={{ display: 'flex', gap: 2, p: '10px' }}>
      
      <Box sx={{ flex: 1, height: '200px', border: '1px solid lightgrey', borderRadius: 1 }}>
        <iframe 
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.086238560343!2d-122.41941548468154!3d37.77492977975966!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085808c2e5b1bff%3A0xdbf30509b4e22a90!2sGoogle!5e0!3m2!1sen!2sus!4v1666474302084!5m2!1sen!2sus" 
          width="100%" 
          height="100%" 
          style={{ border: 0 }} 
          allowFullScreen={false} 
          loading="lazy"
        ></iframe>
      </Box>
      
      <Box sx={{ flex: 1, border: '1px solid lightgrey', p: 1, borderRadius: 1, height: '184.5px' }}>
        <Typography variant="subtitle2" sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.75rem', display: 'flex', justifyContent: 'flex-end' }}>
          <Button 
            variant="outlined" 
            size="small" 
            sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem', minWidth: '60px', padding: '2px 4px', textTransform: 'none' }}
          >
            Confirm Location
          </Button>
        </Typography><br />
        <Box sx={{ fontFamily: 'Nunito Sans, sans-serif', display: 'flex', flexDirection: 'column', gap: 1.5 }}>
          {["Street Address:", "City:", "State:", "Zip Code:"].map((label, index) => (
            <Box key={index} sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <Typography sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.75rem', width: '150px', flex: 0.5 }}><b>{label}</b></Typography>
              <TextField 
                variant="outlined" 
                size="small" 
                type="text" 
                sx={{ 
                  flex: 1,
                  fontSize: '0.7rem', fontFamily: 'Nunito Sans, sans-serif', 
                  '& .MuiInputBase-root': { height: '24px', padding: '0 6px' },
                  '& input': { padding: 0 }
                }} 
              />
            </Box>
          ))}
        </Box>
      </Box>
  </Box>
</Box>


  ); };

export default SubStep2;
