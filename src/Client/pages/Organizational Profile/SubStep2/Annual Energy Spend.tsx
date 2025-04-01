import React, { useState } from 'react'; 
import { Box, TextField, Typography, Tooltip, InputAdornment } from '@mui/material'; 

const SubStep2: React.FC = () => { 
  const [electricity, setElectricity] = useState("");
  const [naturalGas, setNaturalGas] = useState("");
  const [water, setWater] = useState("");
  const [oil, setOil] = useState("");
  const [propane, setPropane] = useState("");
  const [steam, setSteam] = useState("");
  const [chilledWater, setChilledWater] = useState("");
  const [other, setOther] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    let inputValue = value.replace(/[^0-9.]/g, "");
    // if (inputValue) {
    //   inputValue = `$${inputValue}`;
    // }
    switch (name) {
      case 'electricity':
        setElectricity(inputValue);
        break;
      case 'naturalGas':
        setNaturalGas(inputValue);
        break;
      case 'water':
        setWater(inputValue);
        break;
      case 'oil':
        setOil(inputValue);
        break;
      case 'propane':
        setPropane(inputValue);
        break;
      case 'steam':
        setSteam(inputValue);
        break;
      case 'chilledWater':
        setChilledWater(inputValue);
        break;
      case 'other':
        setOther(inputValue);
        break;
      default:
        break;
    }
  };
  return ( 
    <Box sx={{ display: 'flex', flexDirection: 'column', fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.75rem', p: 1, pr: 4, pl: 1, pt: 1 }}>
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Nunito+Sans:ital,opsz,wght@0,6..12,200..1000;1,6..12,200..1000&display=swap');
      </style>
      <Typography variant="h6" sx={{ mb: 1, fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.85rem', fontWeight: 'bold', textAlign: 'center' }}>
        <h2>Annual Energy Spend</h2>
      </Typography> 
      <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 0 }}>
        <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 2, p: '10px' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, justifyContent: 'center' }}>
        <Tooltip title="Bradley collects this data to properly compare pre DER costs to the energy consumed to verify unit prices and extract anomalies; to properly present pre DER costs to the 30% conceptual design post design forecasted costs." placement='left-end' arrow>
          <Typography sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.75rem', minWidth: '150px', flex: 0.25 }}><b>Electricity:</b></Typography></Tooltip>
          <Tooltip title="Enter the total annual spend on electricity (in USD)." placement='top-end' arrow>
          <TextField
    fullWidth
    variant="outlined"
    placeholder='Enter the total annual spend on electricity (in USD).'
    size="small"
    type="text"
    value={electricity}
    onChange={handleChange}
    InputProps={{
      startAdornment: <InputAdornment position="start">$</InputAdornment>,
    }}
    sx={{
      flex: 0.5,
      fontSize: '0.7rem', fontFamily: 'Nunito Sans, sans-serif',
      '& .MuiInputBase-root': { height: '40px', padding: '0 6px' },
      '& input': { padding: 0, fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.8rem' }
    }}
    name="electricity"
  /></Tooltip>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, justifyContent: 'center' }}>
        <Tooltip title="Bradley collects this data to properly compare pre DER costs to the energy consumed to verify unit prices and extract anomalies; to properly present pre DER costs to the 30% conceptual design post design forecasted costs." placement='left-end' arrow>
          <Typography sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.75rem', minWidth: '150px', flex: 0.25 }}><b>Natural Gas:</b></Typography></Tooltip>
          <Tooltip title="Enter the total annual spend on natural gas (in USD)." placement='top-end' arrow>
          <TextField
    fullWidth
    variant="outlined"
    placeholder='Enter the total annual spend on natural gas (in USD).'
    size="small"
    type="text"
    value={naturalGas}
    onChange={handleChange}
    InputProps={{
          startAdornment: <InputAdornment position="start">$</InputAdornment>,
        }}
    sx={{
      flex: 0.5,
      fontSize: '0.7rem', fontFamily: 'Nunito Sans, sans-serif',
      '& .MuiInputBase-root': { height: '40px', padding: '0 6px' },
      '& input': { padding: 0, fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.8rem' }
    }}
    name='naturalGas'
  /></Tooltip>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, justifyContent: 'center' }}>
        <Tooltip title="Bradley collects this data to properly compare pre DER costs to the energy consumed to verify unit prices and extract anomalies; to properly present pre DER costs to the 30% conceptual design post design forecasted costs." placement='left-end' arrow>
          <Typography sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.75rem', minWidth: '150px', flex: 0.25 }}><b>Water:</b></Typography></Tooltip>
          <Tooltip title="Enter the total annual spend on water (in USD)." placement='top-end' arrow>
          <TextField
    fullWidth
    variant="outlined"
    placeholder='Enter the total annual spend on water (in USD).'
    size="small"
    type="text"
    value={water}
    onChange={handleChange}
    InputProps={{
          startAdornment: <InputAdornment position="start">$</InputAdornment>,
        }}
    sx={{
      flex: 0.5,
      fontSize: '0.7rem', fontFamily: 'Nunito Sans, sans-serif',
      '& .MuiInputBase-root': { height: '40px', padding: '0 6px' },
      '& input': { padding: 0, fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.8rem' }
    }}
    name="water"
  /></Tooltip>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, justifyContent: 'center' }}>
        <Tooltip title="Bradley collects this data to properly compare pre DER costs to the energy consumed to verify unit prices and extract anomalies; to properly present pre DER costs to the 30% conceptual design post design forecasted costs." placement='left-end' arrow>
          <Typography sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.75rem', minWidth: '150px', flex: 0.25 }}><b>Oil:</b></Typography></Tooltip>
          <Tooltip title="Enter the total annual spend on oil (in USD)." placement='top-end' arrow>
          <TextField
    fullWidth
    variant="outlined"
    placeholder='Enter the total annual spend on oil (in USD).'
    size="small"
    type="text"
    value={oil}
    onChange={handleChange}
    InputProps={{
          startAdornment: <InputAdornment position="start">$</InputAdornment>,
        }}
    sx={{
      flex: 0.5,
      fontSize: '0.7rem', fontFamily: 'Nunito Sans, sans-serif',
      '& .MuiInputBase-root': { height: '40px', padding: '0 6px' },
      '& input': { padding: 0, fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.8rem' }
    }}
    name="oil"
  /></Tooltip>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, justifyContent: 'center' }}>
        <Tooltip title="Bradley collects this data to properly compare pre DER costs to the energy consumed to verify unit prices and extract anomalies; to properly present pre DER costs to the 30% conceptual design post design forecasted costs." placement='left-end' arrow>
          <Typography sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.75rem', minWidth: '150px', flex: 0.25 }}><b>Propane:</b></Typography></Tooltip>
          <Tooltip title="Enter the total annual spend on propane (in USD)." placement='top-end' arrow>
          <TextField
    fullWidth
    variant="outlined"
    placeholder='Enter the total annual spend on propane (in USD).'
    size="small"
    type="text"
    value={propane}
    onChange={handleChange}
    InputProps={{
          startAdornment: <InputAdornment position="start">$</InputAdornment>,
        }}
    sx={{
      flex: 0.5,
      fontSize: '0.7rem', fontFamily: 'Nunito Sans, sans-serif',
      '& .MuiInputBase-root': { height: '40px', padding: '0 6px' },
      '& input': { padding: 0, fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.8rem' }
    }}
    name="propane"
  /></Tooltip>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, justifyContent: 'center' }}>
        <Tooltip title="Bradley collects this data to properly compare pre DER costs to the energy consumed to verify unit prices and extract anomalies; to properly present pre DER costs to the 30% conceptual design post design forecasted costs." placement='left-end' arrow>
          <Typography sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.75rem', minWidth: '150px', flex: 0.25 }}><b>Steam:</b> (in MLbs)</Typography></Tooltip>
          <Tooltip title="Enter the total annual spend on steam (in MLbs)." placement='top-end' arrow>
          <TextField
    fullWidth
    variant="outlined"
    placeholder='Enter the total annual spend on steam (in MLbs).'
    size="small"
    type="text"
    value={steam}
    onChange={handleChange}
    sx={{
      flex: 0.5,
      fontSize: '0.7rem', fontFamily: 'Nunito Sans, sans-serif',
      '& .MuiInputBase-root': { height: '40px', padding: '0 6px' },
      '& input': { padding: 0, fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.8rem' }
    }}
    name="steam"
  /></Tooltip>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, justifyContent: 'center' }}>
        <Tooltip title="Bradley collects this data to properly compare pre DER costs to the energy consumed to verify unit prices and extract anomalies; to properly present pre DER costs to the 30% conceptual design post design forecasted costs." placement='left-end' arrow>
          <Typography sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.75rem', minWidth: '150px', flex: 0.25 }}><b>Chilled Water:</b> (in Tons/hr)</Typography></Tooltip>
          <Tooltip title="Enter the total annual spend on chilled water (in Tons/hr)." placement='top-end' arrow>
          <TextField
    fullWidth
    variant="outlined"
    placeholder='Enter the total annual spend on chilled water (in Tons/hr).'
    size="small"
    type="text"
    value={chilledWater}
    onChange={handleChange}
    sx={{
      flex: 0.5,
      fontSize: '0.7rem', fontFamily: 'Nunito Sans, sans-serif',
      '& .MuiInputBase-root': { height: '40px', padding: '0 6px' },
      '& input': { padding: 0, fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.8rem' }
    }}
    name="chilledWater"
  /></Tooltip>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, justifyContent: 'center' }}>
        <Tooltip title="Bradley collects this data to properly compare pre DER costs to the energy consumed to verify unit prices and extract anomalies; to properly present pre DER costs to the 30% conceptual design post design forecasted costs." placement='left-end' arrow>
          <Typography sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.75rem', minWidth: '150px', flex: 0.25 }}><b>Other:</b></Typography></Tooltip>
          <Tooltip title="Enter the total annual spend on other energy sources (in USD)." placement='top-end' arrow>
          <TextField
    fullWidth
    variant="outlined"
    placeholder='Enter the total annual spend on other energy sources (in USD).'
    size="small"
    type="text"
    value={other}
    onChange={handleChange}
    InputProps={{
          startAdornment: <InputAdornment position="start">$</InputAdornment>,
        }}
    sx={{
      flex: 0.5,
      fontSize: '0.7rem', fontFamily: 'Nunito Sans, sans-serif',
      '& .MuiInputBase-root': { height: '40px', padding: '0 6px' },
      '& input': { padding: 0, fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.8rem' }
    }}
    name="other"
  /></Tooltip>
        </Box>

        </Box>
      </Box>
    </Box> 
  ); 
}; 

export default SubStep2;
