import React, { useState } from 'react';
import { Box, Typography, TextField, Select, MenuItem, FormControl } from '@mui/material';

const SubStep3: React.FC = () => {
  const [roofPenetration, setRoofPenetration] = useState('');
  const [roofWarrantyTerm, setRoofWarrantyTerm] = useState('');
  const [roofCondition, setRoofCondition] = useState('');
  const [insuranceProvider, setInsuranceProvider] = useState('');
  const [policyId, setPolicyId] = useState('');

  const handleRoofPenetrationChange = (event: { target: { value: any } }) => {
    setRoofPenetration(event.target.value);
  };

  const handleRoofWarrantyTermChange = (event: { target: { value: any } }) => {
    setRoofWarrantyTerm(event.target.value);
  };

  const handleRoofConditionChange = (event: { target: { value: any } }) => {
    setRoofCondition(event.target.value);
  };

  const handleInsuranceProviderChange = (event: { target: { value: any } }) => {
    setInsuranceProvider(event.target.value);
  };

  const handlePolicyIdChange = (event: { target: { value: any } }) => {
    setPolicyId(event.target.value);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.75rem', p: 1, pr: 4, pl: 1, pt: 1 }}>
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Nunito+Sans:ital,opsz,wght@0,6..12,200..1000;1,6..12,200..1000&display=swap');
      </style>
      <Typography variant="h6" sx={{ mb: 1, fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.85rem', fontWeight: 'bold', textAlign: 'center' }}>
        <h2>Roofing Considerations</h2>
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 0 }}>
        <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 2, pt: '10px', pb: '10px', pl: '160px', pr: '160px' }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', mt: 1 }}>
            <Box sx={{ mt: 1, display: 'flex', alignItems: 'center', gap: 10 }}>
              <Typography sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.75rem', flex: 0.685 }}>
                <b>Would You Allow Roof Penetration Anchoring Methods For Solar Panel Installation?</b>
              </Typography>
              <FormControl sx={{ flex: 0.5, minWidth: 120 }}>
                <Select
                  value={roofPenetration}
                  onChange={handleRoofPenetrationChange}
                  displayEmpty
                  size="small"
                  sx={{
                    fontFamily: 'Nunito Sans, sans-serif',
                    fontSize: '0.7rem',
                    height: '40px',
                    '& .MuiInputBase-root': { padding: '0 6px' },
                    '& .MuiSelect-select': { padding: '4px 6px', fontSize: '0.7rem' },
                  }}
                >
                  <MenuItem disabled value="" sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem' }}>
                    Select Yes or No
                  </MenuItem>
                  <MenuItem value="yes" sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem' }}>
                    Yes
                  </MenuItem>
                  <MenuItem value="no" sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem' }}>
                    No
                  </MenuItem>
                </Select>
              </FormControl>
            </Box>

            <Box sx={{ mt: 1, display: 'flex', alignItems: 'center', gap: 10 }}>
              <Typography sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.75rem', flex: 0.685 }}>
                <b>What Remaining Term Do You Have On Your Roof Warranty?</b>
              </Typography>
              <TextField
                variant="outlined"
                size="small"
                type="text"
                placeholder="1 Year, 20 Years, etc..."
                value={roofWarrantyTerm}
                onChange={handleRoofWarrantyTermChange}
                sx={{
                  flex: 0.5,
                  fontFamily: 'Nunito Sans, sans-serif',
                  fontSize: '0.7rem',
                  '& .MuiInputBase-root': { height: '40px', padding: '0 6px' },
                  '& input': { padding: 0, fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.8rem' },
                  '& .MuiInputBase-input::placeholder': {
                    fontFamily: 'Nunito Sans, sans-serif',
                    fontSize: '0.7rem',
                  },
                }}
              />
            </Box>

            <Box sx={{ mt: 1.5, display: 'flex', alignItems: 'center', gap: 10 }}>
              <Typography sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.75rem', flex: 0.685 }}>
                <b>What Is The Condition Of Your Roof?</b>
              </Typography>
              <FormControl sx={{ flex: 0.5, minWidth: 120 }}>
                <Select
                  value={roofCondition}
                  onChange={handleRoofConditionChange}
                  displayEmpty
                  size="small"
                  sx={{
                    fontFamily: 'Nunito Sans, sans-serif',
                    fontSize: '0.7rem',
                    height: '40px',
                    '& .MuiInputBase-root': { padding: '0 6px' },
                    '& .MuiSelect-select': { padding: '4px 6px', fontSize: '0.7rem' },
                  }}
                >
                  <MenuItem disabled value="" sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem' }}>
                    Select Condition
                  </MenuItem>
                  <MenuItem value="great" sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem' }}>
                    Great
                  </MenuItem>
                  <MenuItem value="fair" sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem' }}>
                    Fair
                  </MenuItem>
                  <MenuItem value="poor" sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem' }}>
                    Poor
                  </MenuItem>
                </Select>
              </FormControl>
            </Box>

            <Box sx={{ mt: 2, display: 'flex', alignItems: 'center', gap: 10 }}>
              <Typography sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.75rem', flex: 0.685 }}>
                <b>Roof Insurance Provider: </b>(Optional)
              </Typography>
            </Box>

            <Box sx={{ mt: 0, display: 'flex', alignItems: 'center', gap: 10 }}>
              <Typography sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.75rem', flex: 1 }}>
                Depending on your insurance carrier, they may or may not have FIRM requirements for solar material equipment (panels, wiring, racking, etc.) to ensure insurance coverage. While providing this information is optional, I can ensure my design meets the insurance companies stated solar array requirements. Without the information I will use best practices to generate the solar DER component.
              </Typography>
            </Box>

            <Box sx={{ mt: 2, display: 'flex', alignItems: 'center', gap: 10 }}>
              <Typography sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.75rem', flex: 0.685 }}>
                <li><b>Enter Your Provider Name:</b></li>
              </Typography>
              <TextField
                variant="outlined"
                size="small"
                type="text"
                placeholder="Provider Name"
                value={insuranceProvider}
                onChange={handleInsuranceProviderChange}
                sx={{
                  flex: 0.5,
                  fontFamily: 'Nunito Sans, sans-serif',
                  fontSize: '0.7rem',
                  '& .MuiInputBase-root': { height: '40px', padding: '0 6px' },
                  '& input': { padding: 0, fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.8rem' },
                  '& .MuiInputBase-input::placeholder': {
                    fontFamily: 'Nunito Sans, sans-serif',
                    fontSize: '0.7rem',
                  },
                }}
              />
            </Box>

            <Box sx={{ mt: 2, display: 'flex', alignItems: 'center', gap: 10 }}>
              <Typography sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.75rem', flex: 0.685 }}>
                <li><b>Enter Your Policy ID:</b></li>
              </Typography>
              <TextField
                variant="outlined"
                size="small"
                type="text"
                placeholder="Policy ID"
                value={policyId}
                onChange={handlePolicyIdChange}
                sx={{
                  flex: 0.5,
                  fontFamily: 'Nunito Sans, sans-serif',
                  fontSize: '0.7rem',
                  '& .MuiInputBase-root': { height: '40px', padding: '0 6px' },
                  '& input': { padding: 0, fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.8rem' },
                  '& .MuiInputBase-input::placeholder': {
                    fontFamily: 'Nunito Sans, sans-serif',
                    fontSize: '0.7rem',
                  },
                }}
              />
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default SubStep3;