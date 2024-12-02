import React, { useState } from 'react';
import { 
  Box, 
  TextField, 
  Button, 
  Typography, 
  MenuItem, 
  IconButton 
} from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DeleteIcon from '@mui/icons-material/Delete';

const SubStep2: React.FC = () => {
  const [wasteHeatSources, setWasteHeatSources] = useState([
    { type: '', capacity: '', fuelSource: '', efficiency: '', age: '' , operatingPressure: '', history: '', utilization: '', volume: ''},
  ]);  

  const handleAddWasteHeatSource = () => {
    setWasteHeatSources([
      ...wasteHeatSources,
      { type: '', capacity: '', fuelSource: '', efficiency: '', age: '' , operatingPressure: '', history: '', utilization: '', volume: ''},
    ]);
  };

  const handleRemoveWasteHeatSource = (index: number) => {
    setWasteHeatSources(wasteHeatSources.filter((_, i) => i !== index));
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.75rem', p: 1, pr: 4, pl: 1, pt: 1 }}>
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Nunito+Sans:ital,opsz,wght@0,6..12,200..1000;1,6..12,200..1000&display=swap');
      </style>
      <Typography variant="h6" sx={{ mb: 1, fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.85rem', fontWeight: 'bold', textAlign: 'center' }}>
        <h2>Existing Boiler/Cogeneration</h2>
      </Typography>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 0 }}>
        <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 2, pt: '10px', pb: '10px', pl: '160px', pr: '160px' }}>
            {wasteHeatSources.map((source, index) => (
              <Box
                key={index}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 2,
                  mb: 1,
                  flexWrap: 'wrap',
                }}
              >
                <TextField
                  size="small"
                  label="Type"
                  select
                  fullWidth
                  value={source.type}
                  onChange={(e) =>
                    setWasteHeatSources(
                      wasteHeatSources.map((s, i) =>
                        i === index ? { ...s, type: e.target.value } : s
                      )
                    )
                  }
                  sx={{
                    fontFamily: 'Nunito Sans, sans-serif',
                    fontSize: '0.8rem',
                    '& .MuiInputBase-root': {
                      fontFamily: 'Nunito Sans, sans-serif',
                      fontSize: '0.8rem',
                      height: '40px',
                    },
                  }}
                  InputLabelProps={{
                    style: {
                      fontFamily: 'Nunito Sans, sans-serif',
                      fontSize: '0.8rem',
                    },
                  }}
                >
                  <MenuItem value="Boiler" sx={{fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem',}}>Boiler</MenuItem>
                  <MenuItem value="Cogeneration Unit" sx={{fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem',}}>Cogeneration Unit</MenuItem>
                </TextField>

                <TextField
                  size="small"
                  label="Capacity"
                  type="number"
                  fullWidth
                  placeholder="in Mlbs per hour"
                  value={source.capacity}
                  onChange={(e) =>
                    setWasteHeatSources(
                      wasteHeatSources.map((s, i) =>
                        i === index ? { ...s, capacity: e.target.value } : s
                      )
                    )
                  }
                  sx={{
                    fontFamily: 'Nunito Sans, sans-serif',
                    '& .MuiInputBase-root': {
                      fontFamily: 'Nunito Sans, sans-serif',
                      fontSize: '0.8rem',
                      height: '40px',
                    },
                  }}
                  InputLabelProps={{
                    style: {
                      fontFamily: 'Nunito Sans, sans-serif',
                      fontSize: '0.8rem',
                    },
                  }}
                />

                <TextField
                  size="small"
                  label="Fuel Source"
                  select
                  fullWidth
                  value={source.fuelSource}
                  onChange={(e) =>
                    setWasteHeatSources(
                      wasteHeatSources.map((s, i) =>
                        i === index ? { ...s, fuelSource: e.target.value } : s
                      )
                    )
                  }
                  sx={{
                    fontFamily: 'Nunito Sans, sans-serif',
                    fontSize: '0.8rem',
                    '& .MuiInputBase-root': {
                      fontFamily: 'Nunito Sans, sans-serif',
                      fontSize: '0.8rem',
                      height: '40px',
                    },
                  }}
                  InputLabelProps={{
                    style: {
                      fontFamily: 'Nunito Sans, sans-serif',
                      fontSize: '0.8rem',
                    },
                  }}
                >
                  <MenuItem value="Natural Gas" sx={{fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem',}}>Natural Gas</MenuItem>
                  <MenuItem value="Oil" sx={{fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem',}}>Oil</MenuItem>
                  <MenuItem value="Biomass" sx={{fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem',}}>Biomass</MenuItem>
                  <MenuItem value="Coal" sx={{fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem',}}>Coal</MenuItem>
                  <MenuItem value="Electricity" sx={{fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem',}}>Electricity</MenuItem>
                </TextField>

                <TextField
                  size="small"
                  label="Efficiency"
                  type="number"
                  fullWidth
                  placeholder="In Percentage"
                  value={source.efficiency}
                  onChange={(e) =>
                    setWasteHeatSources(
                      wasteHeatSources.map((s, i) =>
                        i === index ? { ...s, efficiency: e.target.value } : s
                      )
                    )
                  }
                  sx={{
                    fontFamily: 'Nunito Sans, sans-serif',
                    '& .MuiInputBase-root': {
                      fontFamily: 'Nunito Sans, sans-serif',
                      fontSize: '0.8rem',
                      height: '40px',
                    },
                  }}
                  InputLabelProps={{
                    style: {
                      fontFamily: 'Nunito Sans, sans-serif',
                      fontSize: '0.8rem',
                    },
                  }}
                />

<TextField
                  size="small"
                  label="Age"
                  type="number"
                  fullWidth
                  placeholder="In Years"
                  value={source.age}
                  onChange={(e) =>
                    setWasteHeatSources(
                      wasteHeatSources.map((s, i) =>
                        i === index ? { ...s, age: e.target.value } : s
                      )
                    )
                  }
                  sx={{
                    fontFamily: 'Nunito Sans, sans-serif',
                    '& .MuiInputBase-root': {
                      fontFamily: 'Nunito Sans, sans-serif',
                      fontSize: '0.8rem',
                      height: '40px',
                    },
                  }}
                  InputLabelProps={{
                    style: {
                      fontFamily: 'Nunito Sans, sans-serif',
                      fontSize: '0.8rem',
                    },
                  }}
                />

<TextField
                  size="small"
                  label="Operating Pressure"
                  type="number"
                  fullWidth
                  placeholder="In Psi"
                  value={source.operatingPressure}
                  onChange={(e) =>
                    setWasteHeatSources(
                      wasteHeatSources.map((s, i) =>
                        i === index ? { ...s, operatingPressure: e.target.value } : s
                      )
                    )
                  }
                  sx={{
                    fontFamily: 'Nunito Sans, sans-serif',
                    '& .MuiInputBase-root': {
                      fontFamily: 'Nunito Sans, sans-serif',
                      fontSize: '0.8rem',
                      height: '40px',
                    },
                  }}
                  InputLabelProps={{
                    style: {
                      fontFamily: 'Nunito Sans, sans-serif',
                      fontSize: '0.8rem',
                    },
                  }}
                />


<TextField
                  size="small"
                  label="History"
                  type="text"
                  fullWidth
                  placeholder="Maintenance History (Optional)"
                  value={source.history}
                  onChange={(e) =>
                    setWasteHeatSources(
                      wasteHeatSources.map((s, i) =>
                        i === index ? { ...s, history: e.target.value } : s
                      )
                    )
                  }
                  sx={{
                    fontFamily: 'Nunito Sans, sans-serif',
                    '& .MuiInputBase-root': {
                      fontFamily: 'Nunito Sans, sans-serif',
                      fontSize: '0.8rem',
                      height: '40px',
                    },
                  }}
                  InputLabelProps={{
                    style: {
                      fontFamily: 'Nunito Sans, sans-serif',
                      fontSize: '0.8rem',
                    },
                  }}
                />

<TextField
                  size="small"
                  label="Utilization"
                  select
                  fullWidth
                  value={source.utilization}
                  onChange={(e) =>
                    setWasteHeatSources(
                      wasteHeatSources.map((s, i) =>
                        i === index ? { ...s, utilization: e.target.value } : s
                      )
                    )
                  }
                  sx={{
                    fontFamily: 'Nunito Sans, sans-serif',
                    fontSize: '0.8rem',
                    '& .MuiInputBase-root': {
                      fontFamily: 'Nunito Sans, sans-serif',
                      fontSize: '0.8rem',
                      height: '40px',
                    },
                  }}
                  InputLabelProps={{
                    style: {
                      fontFamily: 'Nunito Sans, sans-serif',
                      fontSize: '0.8rem',
                    },
                  }}
                >
                  <MenuItem value="Electricity Generation" sx={{fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem',}}>Electricity Generation</MenuItem>
                  <MenuItem value="Space Heating" sx={{fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem',}}>Space Heating</MenuItem>
                  <MenuItem value="Process Heating" sx={{fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem',}}>Process Heating</MenuItem>
                  <MenuItem value="None" sx={{fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem',}}>None</MenuItem>
                  <MenuItem value="Other" sx={{fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem',}}>Other</MenuItem>
                </TextField>

                <TextField
                  size="small"
                  label="Volume"
                  type="number"
                  fullWidth
                  placeholder="Annual Waste Heat Volume in MMBTu"
                  value={source.volume}
                  onChange={(e) =>
                    setWasteHeatSources(
                      wasteHeatSources.map((s, i) =>
                        i === index ? { ...s, volume: e.target.value } : s
                      )
                    )
                  }
                  sx={{
                    fontFamily: 'Nunito Sans, sans-serif',
                    '& .MuiInputBase-root': {
                      fontFamily: 'Nunito Sans, sans-serif',
                      fontSize: '0.8rem',
                      height: '40px',
                    },
                  }}
                  InputLabelProps={{
                    style: {
                      fontFamily: 'Nunito Sans, sans-serif',
                      fontSize: '0.8rem',
                    },
                  }}
                />
                
                <Button
              startIcon={<AddCircleIcon />}
              onClick={handleAddWasteHeatSource}
              size="small"
              sx={{
                textTransform: 'none',
                fontFamily: 'Nunito Sans, sans-serif',
                fontSize: '0.8rem',
                '&:focus': {
      outline: 'none',
    }
              }}
            >
              Add Another Entry
            </Button>
                <IconButton
                  onClick={() => handleRemoveWasteHeatSource(index)}
                  size="large"
                  disabled={wasteHeatSources.length === 1}
                  sx={{ ml: 'auto', '&:focus': {
      outline: 'none',
    } }}
                >
                  <DeleteIcon fontSize="medium" />
                </IconButton>
              </Box>
            ))}
          </Box>
      </Box>
    </Box>
  );
};

export default SubStep2;
