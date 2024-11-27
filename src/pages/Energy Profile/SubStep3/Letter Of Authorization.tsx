import React, { useState } from 'react';
import { Box, Button, Checkbox, TextField, Typography } from '@mui/material';

const SubStep3: React.FC = () => {

  const [signature, setSignature] = useState<string>('');

  const handleClearSignature = () => {
    setSignature('');
  };
  
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.75rem', p: 1, pr: 4, pl: 1, pt: 1 }}>
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Nunito+Sans:ital,opsz,wght@0,6..12,200..1000;1,6..12,200..1000&display=swap');
      </style>
      <Typography variant="h6" sx={{ mb: 1, fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.85rem', fontWeight: 'bold', textAlign: 'center' }}>
        <h2>LETTER OF AUTHORIZATION FOR ELECTRIC DATA</h2>
      </Typography>
      
      <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 0 }}>
      <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 2, pt: '10px', pb: '10px', pl: '160px', pr: '160px' }}>
        <Box sx={{ alignItems: 'center', gap: 1 }}>
          <Typography sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.75rem', minWidth: '150px', textAlign: 'justify' }}>
            Please complete this form in its entirety and press the Authorize & Send Request button, This will automatically send the request to your regulated utility. This request only authorizes Bradley to recieve an excel or CVS data file containing your usage profile.
          </Typography>
          <Typography sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.75rem', mt: 3, textAlign: 'justify', lineHeight: 1.8 }}>
  On this 
  <TextField
    variant="standard"
    type="text"
    placeholder="(DAY)"
    sx={{
      width: '50px',
      fontFamily: 'Nunito Sans, sans-serif',
      '& .MuiInputBase-root': { padding: 0, marginBottom: '-2px' },
      '& input': { textAlign: 'center', fontSize: '0.8rem', padding: 0 },
      '& .MuiInputBase-input::placeholder': { fontSize: '0.7rem' },
    }}
  />{' '}
  day of{' '}
  <TextField
    variant="standard"
    type="text"
    placeholder="(MONTH)"
    sx={{
      width: '80px',
      fontFamily: 'Nunito Sans, sans-serif',
      '& .MuiInputBase-root': { padding: 0, marginBottom: '-2px' },
      '& input': { textAlign: 'center', fontSize: '0.8rem', padding: 0 },
      '& .MuiInputBase-input::placeholder': { fontSize: '0.7rem' },
    }}
  />
  , 2024, the{' '}
  <TextField
    variant="standard"
    type="text"
    placeholder="(CUSTOMER NAME)"
    sx={{
      width: '150px',
      fontFamily: 'Nunito Sans, sans-serif',
      '& .MuiInputBase-root': { padding: 0, marginBottom: '-2px' },
      '& input': { textAlign: 'center', fontSize: '0.8rem', padding: 0 },
      '& .MuiInputBase-input::placeholder': { fontSize: '0.7rem' },
    }}
  />
  {' '} (Customer) appoints Bradley.ai as its Agent to obtain any and all usage information Bradley deems necessary to EVALUATE the Customer electricity, gas, or all steam supply at our location in{' '}
  <TextField
    variant="standard"
    type="text"
    placeholder="(ADDRESS)"
    sx={{
      width: '200px',
      fontFamily: 'Nunito Sans, sans-serif',
      '& .MuiInputBase-root': { padding: 0, marginBottom: '-2px' },
      '& input': { textAlign: 'center', fontSize: '0.8rem', padding: 0 },
      '& .MuiInputBase-input::placeholder': { fontSize: '0.7rem' },
    }}
  />
  . Customer Point of Contact is Mr./Mrs.{' '}
  <TextField
    variant="standard"
    type="text"
    placeholder="(NAME)"
    sx={{
      width: '120px',
      fontFamily: 'Nunito Sans, sans-serif',
      '& .MuiInputBase-root': { padding: 0, marginBottom: '-2px' },
      '& input': { textAlign: 'center', fontSize: '0.8rem', padding: 0 },
      '& .MuiInputBase-input::placeholder': { fontSize: '0.7rem' },
    }}
  />
  {' '} listed below with their contact information and the information identifying our accounts.
</Typography>

        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, justifyContent: 'center', mt: 3 }}>
          <Typography sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.75rem', minWidth: '150px', flex: 0.25 }}><b>Name:</b></Typography>
          <TextField
    fullWidth
    variant="outlined"
    size="small"
    type="text"
    placeholder='Customer / Company Name Here'
    sx={{
      flex: 0.5,
      fontSize: '0.7rem', fontFamily: 'Nunito Sans, sans-serif',
      '& .MuiInputBase-root': { height: '24px', padding: '0 6px' },
      '& input': { padding: 0, fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.8rem' },
      '& .MuiInputBase-input::placeholder': {
                fontFamily: 'Nunito Sans, sans-serif',
                fontSize: '0.7rem',
              }
    }}
  />
  <Typography sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.75rem', minWidth: '150px', flex: 0.25 }}><b>Service Address:</b></Typography>
          <TextField
    fullWidth
    variant="outlined"
    size="small"
    type="text"
    placeholder='1212 USA Lane'
    sx={{
      flex: 0.5,
      fontSize: '0.7rem', fontFamily: 'Nunito Sans, sans-serif',
      '& .MuiInputBase-root': { height: '24px', padding: '0 6px' },
      '& input': { padding: 0, fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.8rem' },
      '& .MuiInputBase-input::placeholder': {
                fontFamily: 'Nunito Sans, sans-serif',
                fontSize: '0.7rem',
              }
    }}
  />
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, justifyContent: 'center' }}>
          <Typography sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.75rem', minWidth: '150px', flex: 0.25 }}><b>Full Address:</b></Typography>
          <TextField
    fullWidth
    variant="outlined"
    size="small"
    placeholder='Full Address with City, State, Zip'
    type="text"
    sx={{
      flex: 0.5,
      fontSize: '0.7rem', fontFamily: 'Nunito Sans, sans-serif',
      '& .MuiInputBase-root': { height: '24px', padding: '0 6px' },
      '& input': { padding: 0, fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.8rem' },
      '& .MuiInputBase-input::placeholder': {
                fontFamily: 'Nunito Sans, sans-serif',
                fontSize: '0.7rem',
              }
    }}
  />
  <Typography sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.75rem', minWidth: '150px', flex: 0.25 }}><b>City/State:</b></Typography>
          <TextField
    fullWidth
    variant="outlined"
    size="small"
    placeholder='Springfield, IL'
    type="text"
    sx={{
      flex: 0.5,
      fontSize: '0.7rem', fontFamily: 'Nunito Sans, sans-serif',
      '& .MuiInputBase-root': { height: '24px', padding: '0 6px' },
      '& input': { padding: 0, fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.8rem' },
      '& .MuiInputBase-input::placeholder': {
                fontFamily: 'Nunito Sans, sans-serif',
                fontSize: '0.7rem',
              }
    }}
  />
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, justifyContent: 'center' }}>
          <Typography sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.75rem', minWidth: '150px', flex: 0.25 }}><b>Ph. No.:</b></Typography>
          <TextField
    fullWidth
    variant="outlined"
    size="small"
    type="text"
    placeholder='Enter Contact No. Here'
    sx={{
      flex: 0.5,
      fontSize: '0.7rem', fontFamily: 'Nunito Sans, sans-serif',
      '& .MuiInputBase-root': { height: '24px', padding: '0 6px' },
      '& input': { padding: 0, fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.8rem' },
      '& .MuiInputBase-input::placeholder': {
                fontFamily: 'Nunito Sans, sans-serif',
                fontSize: '0.7rem',
              }
    }}
  />
  <Typography sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.75rem', minWidth: '150px', flex: 0.25 }}><b>Zip:</b></Typography>
          <TextField
    fullWidth
    variant="outlined"
    size="small"
    placeholder='07036'
    type="number"
    sx={{
      flex: 0.5,
      fontSize: '0.7rem', fontFamily: 'Nunito Sans, sans-serif',
      '& .MuiInputBase-root': { height: '24px', padding: '0 6px' },
      '& input': { padding: 0, fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.8rem' },
      '& .MuiInputBase-input::placeholder': {
                fontFamily: 'Nunito Sans, sans-serif',
                fontSize: '0.7rem',
              }
    }}
  />
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, justifyContent: 'center' }}>
          <Typography sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.75rem', minWidth: '150px', flex: 0.25 }}><b>Email Address:</b></Typography>
          <TextField
    fullWidth
    variant="outlined"
    size="small"
    placeholder='Enter Email Here'
    type="text"
    sx={{
      flex: 0.5,
      fontSize: '0.7rem', fontFamily: 'Nunito Sans, sans-serif',
      '& .MuiInputBase-root': { height: '24px', padding: '0 6px' },
      '& input': { padding: 0, fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.8rem' },
      '& .MuiInputBase-input::placeholder': {
                fontFamily: 'Nunito Sans, sans-serif',
                fontSize: '0.7rem',
              }
    }}
  />
  <Typography sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.75rem', minWidth: '150px', flex: 0.25 }}><b>Service Acc. No.:</b></Typography>
          <TextField
    fullWidth
    variant="outlined"
    size="small"
    type="number"
    placeholder='12345678910111213'
    sx={{
      flex: 0.5,
      fontSize: '0.7rem', fontFamily: 'Nunito Sans, sans-serif',
      '& .MuiInputBase-root': { height: '24px', padding: '0 6px' },
      '& input': { padding: 0, fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.8rem' },
      '& .MuiInputBase-input::placeholder': {
                fontFamily: 'Nunito Sans, sans-serif',
                fontSize: '0.7rem',
              }
    }}
  />
        </Box>
        <Typography sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.75rem', minWidth: '150px', mt: 3, textAlign: 'justify' }}>
        I/We authorize Bradley.ai to retrieve/receive demand/consumption/billing information through applicable means for the electricity account numbers specified below as well as any future accounts that Customer requests to add to the applicable electricity supply agreement.
        I/We authorize Bradley.ai to complete any web-based authorization form on the relevant electric distribution company website(s) for the electricity account numbers specified below as well as any future accounts that Customer requests to add to the applicable electricity supply agreement.
        Unless otherwise required by state regulation, this authorization shall be effective immediately and remain in effect for as long as there is an electricity supply agreement between Customer and Bradley.ai.
        Bradley.ai may assign this Letter of Authorization to other entities.
          </Typography>

          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              justifyContent: 'center',
            }}
          >
            <Typography
              sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.75rem', flex: 0.5 }}
            >
              <b>Electronic Signature:</b>
            </Typography>
            <TextField
              fullWidth
              variant="outlined"
              size="small"
              value={signature}
              onChange={(e) => setSignature(e.target.value)}
              sx={{
                flex: 0.5,
                fontFamily: 'Nunito Sans, sans-serif',
                fontSize: '0.7rem',
                minWidth: '414px',
                pl: '1px',
                pr: '1px',
                '& .MuiInputBase-root': { height: '24px', padding: '0 6px' },
                '& input': {
                  padding: 0,
                  fontFamily: 'Nunito Sans, sans-serif',
                  fontSize: '0.8rem',
                },
                '& .MuiInputBase-input::placeholder': {
                  fontFamily: 'Nunito Sans, sans-serif',
                  fontSize: '0.7rem',
                },
              }}
              placeholder="Sign Here..."
            />
            <Button
              variant="outlined"
              onClick={handleClearSignature}
              sx={{
                flex: 0.24,
                fontFamily: 'Nunito Sans, sans-serif',
                fontSize: '0.65rem',
                padding: '2px 1px',
                pr: '15px',
                pl: '15px',
                alignSelf: 'flex-end',
                textTransform: 'none',
              }}
            >
              Clear Signature
            </Button>
          </Box>

<Box sx={{ display: 'flex', alignItems: 'center', gap: 1, justifyContent: 'flex-start', mt: 1 }}>
  <Checkbox
    sx={{
      padding: '0 0',
      '& .MuiSvgIcon-root': { fontSize: '1.1rem' },
    }}
  />
  <Typography sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.75rem' }}>
    I have read and agreed to the terms of this Letter of Authorization.
  </Typography>
</Box>


    </Box></Box></Box>
  );
};

export default SubStep3;