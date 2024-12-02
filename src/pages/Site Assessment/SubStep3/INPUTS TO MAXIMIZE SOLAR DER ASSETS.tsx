import React, { useState } from 'react';
import { Box, TextField, Typography, IconButton, Select, MenuItem } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DeleteIcon from '@mui/icons-material/Delete';

const SubStep3: React.FC = () => {
  const [roofSections, setRoofSections] = useState<number[]>([0, 1, 2]);

  const handleAddSection = () => {
    setRoofSections([...roofSections, roofSections.length]);
  };

  const handleRemoveSection = (index: number) => {
    setRoofSections(roofSections.filter((_, i) => i !== index));
  };

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
        <h2>INPUTS TO MAXIMIZE SOLAR DER ASSETS</h2>
      </Typography>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: '10px', pb: '10px', px: '160px' }}>
        <Box
  sx={{
    display: 'flex',
    alignItems: 'center',
    gap: 1,
  }}
>
  <Typography
    sx={{
      fontFamily: 'Nunito Sans, sans-serif',
      fontSize: '0.75rem',
      minWidth: '200px',
      flex: 0.3,
    }}
  >
    <b>Total Roof Space:</b> (in Sq. Ft.)<br /> Click on the '⨁' icon for multiple roof sections.
  </Typography>

  <Box
    sx={{
      display: 'flex',
      alignItems: 'center',
      gap: 1,
      flex: 0.7,
      maxWidth: 'calc(100% - 200px)',
    }}
  >
    {roofSections.map((_, index) => (
      <TextField
        key={index}
        variant="outlined"
        size="small"
        type="number"
        placeholder={`Sec. ${index + 1} Area`}
        sx={{
          flex: 1,
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
    ))}
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, ml: 1 }}>
      <IconButton
        onClick={handleAddSection}
        color="primary"
        sx={{ p: 0, '&:focus': {
      outline: 'none',
    } }}
      >
        <AddCircleOutlineIcon fontSize="small" />
      </IconButton>
      <IconButton
        onClick={() => handleRemoveSection(roofSections.length - 1)}
        sx={{ p: 0, '&:focus': {
      outline: 'none',
    } }}
        disabled={roofSections.length === 1}
      >
        <DeleteIcon fontSize="small" />
      </IconButton>
    </Box>
  </Box>
</Box>



        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Typography
            sx={{
              fontFamily: 'Nunito Sans, sans-serif',
              fontSize: '0.75rem',
              minWidth: '200px',
              flex: 0.3,
            }}
          >
            <b>Roof Load Rating Capacity:</b> (in Lbs / Sq. Ft.) (Optional)
          </Typography>
          <TextField
            variant="outlined"
            size="small"
            type="number"
            sx={{
              flex: 0.7,
              fontFamily: 'Nunito Sans, sans-serif',
              fontSize: '0.7rem',
              '& .MuiInputBase-root': { height: '40px', padding: '0 6px' },
              '& input': { padding: 0, fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.8rem' },
            }}
          />
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Typography
            sx={{
              fontFamily: 'Nunito Sans, sans-serif',
              fontSize: '0.75rem',
              minWidth: '200px',
              flex: 0.3,
            }}
          >
            <b>Building Classification:</b> (Optional)
          </Typography>
          <Select
            size="small"
            defaultValue="default"
            sx={{
              flex: 0.7,
              fontFamily: 'Nunito Sans, sans-serif',
              fontSize: '0.7rem',
              height: '40px',
              '& .MuiInputBase-root': { padding: '0 6px' },
              '& .MuiSelect-select': { padding: '4px 6px', fontSize: '0.7rem' },
            }}
          >
            <MenuItem value="default" disabled sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem' }}>
              Select Classification
            </MenuItem>
            <MenuItem value="Class 3" sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem' }}>
              Class 3
            </MenuItem>
            <MenuItem value="Class 4" sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem' }}>
              Class 4
            </MenuItem>
          </Select>
        </Box>
      </Box>
    </Box>
  );
};

export default SubStep3;
