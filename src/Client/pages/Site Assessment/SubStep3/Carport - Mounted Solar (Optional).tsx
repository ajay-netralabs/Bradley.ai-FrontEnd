import React from 'react';
import { Box, TextField, Typography, Select, MenuItem, SelectChangeEvent } from '@mui/material';
import { useCarportSolar } from '../../../../Context/Site Assessment/SubStep3/Carport - Mounted Solar (Optional) Context';

const SubStep3: React.FC = () => {
  const { carportSolarState, updateField } = useCarportSolar();
  const { roofPenetration, totalParkingSpots, parkingGarageWidth, parkingGarageLength, switchgearFloor, topFloorHeight } = carportSolarState;

  const handleNumericChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    field: keyof typeof carportSolarState
  ) => {
    // Allow only numeric input
    const value = event.target.value.replace(/[^0-9]/g, '');
    updateField(field, value);
  };
  
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.75rem', p: 1, pr: 4, pl: 1, pt: 1 }}>
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@200..1000&display=swap');
      </style>
      <Typography variant="h6" sx={{ mb: 1, fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.85rem', fontWeight: 'bold', textAlign: 'center' }}>
        <h2>Carport - Mounted Solar (Optional)</h2>
      </Typography>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: '10px', pb: '10px', px: '160px' }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', mt: 1 }}></Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Typography sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.75rem', minWidth: '200px', flex: 0.7 }}>
            <b>Would You Allow Roof Penetration Anchoring Methods on an Existing Carport Structure For Solar Panel Installation?</b>
          </Typography>
          <Select size="small" value={roofPenetration} onChange={(e: SelectChangeEvent) => updateField('roofPenetration', e.target.value)} displayEmpty sx={{ flex: 0.3, marginLeft: 'auto', fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem', height: '40px', '& .MuiInputBase-root': { padding: '0 6px' }, '& .MuiSelect-select': { padding: '4px 6px', fontSize: '0.7rem' } }}>
            <MenuItem disabled value="" sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem' }}>Select Yes or No</MenuItem>
            <MenuItem value="yes" sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem' }}>Yes</MenuItem>
            <MenuItem value="no" sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem' }}>No</MenuItem>
          </Select>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Typography sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.75rem', minWidth: '200px', flex: 0.7 }}>
            <b>No. of Total Parking Spots:</b> (Optional)
          </Typography>
          <TextField variant="outlined" size="small" type="number" placeholder="Input" value={totalParkingSpots} onChange={(e) => handleNumericChange(e, 'totalParkingSpots')} sx={{ flex: 0.3, marginLeft: 'auto', fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem', '& .MuiInputBase-root': { height: '40px', padding: '0 6px' }, '& input': { padding: 0, fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.8rem' }, '& .MuiInputBase-input::placeholder': { fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem' } }} />
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Typography sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.75rem', minWidth: '200px', flex: 0.7 }}>
            <b>Parking Garage:</b> (Optional)<br />(<i>Provide the single floor dimensions of the parking garage. I need to know how many feet wide and long the garage is, I will design a system to cover the parking spaces and travel lanes.</i>)
          </Typography>
          <TextField variant="outlined" size="small" type="number" placeholder="Width (ft)" value={parkingGarageWidth} onChange={(e) => handleNumericChange(e, 'parkingGarageWidth')} sx={{ flex: 0.142, marginLeft: 'auto', fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem', '& .MuiInputBase-root': { height: '40px', padding: '0 6px' }, '& input': { padding: 0, fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.8rem' }, '& .MuiInputBase-input::placeholder': { fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem' } }} />
          <TextField variant="outlined" size="small" type="number" placeholder="Length (ft)" value={parkingGarageLength} onChange={(e) => handleNumericChange(e, 'parkingGarageLength')} sx={{ flex: 0.142, marginLeft: 'auto', fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem', '& .MuiInputBase-root': { height: '40px', padding: '0 6px' }, '& input': { padding: 0, fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.8rem' }, '& .MuiInputBase-input::placeholder': { fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem' } }} />
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Typography sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.75rem', minWidth: '200px', flex: 0.7 }}>
            <b>Incoming Electrical Switchgear Location:</b><br />(<i>Please let me know what floor the incoming electrical switchgear is located, typically this equipment is located on the first floor.</i>)
          </Typography>
          <TextField variant="outlined" size="small" type="number" placeholder="Input Floor No." value={switchgearFloor} onChange={(e) => handleNumericChange(e, 'switchgearFloor')} sx={{ flex: 0.3, marginLeft: 'auto', fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem', '& .MuiInputBase-root': { height: '40px', padding: '0 6px' }, '& input': { padding: 0, fontFamily: 'Nunito Sans, sans-serif', fontSize:'0.8rem' }, '& .MuiInputBase-input::placeholder': { fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem' } }} />
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Typography sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.75rem', minWidth: '200px', flex: 0.7 }}>
            <b>Top Floor Height:</b><br />(<i>What is the height of the top floor of the parking garage from ground level?</i>)
          </Typography>
          <TextField variant="outlined" size="small" type="text" placeholder="Input Height" value={topFloorHeight} onChange={(e) => updateField('topFloorHeight', e.target.value)} sx={{ flex: 0.3, marginLeft: 'auto', fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem', '& .MuiInputBase-root': { height: '40px', padding: '0 6px' }, '& input': { padding: 0, fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.8rem' }, '& .MuiInputBase-input::placeholder': { fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem' } }} />
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Typography sx={{ mt: 1, fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.75rem', minWidth: '200px', flex: 1 }}>
            <i><b>Hint: </b>If the total sq ft of the top level of your parking garage contains 170 parking spots or greater it is likely a solar carport solution will be financially viable. If there are no enteries for garage solar carport CarbonCheckIQ+ will ignore this option.</i>
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default SubStep3;