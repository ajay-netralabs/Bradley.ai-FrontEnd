import React, { useState } from 'react';
import { Box, Button, Typography, MenuItem, Select, TextField, Tooltip } from '@mui/material';

const options = [
  "Select one",
  "Decarbonization",
  "Cost Reduction",
  "Increased Resiliency",
  "Maximize Renewable Generation"
];

const SubStep2: React.FC = () => {
  const [selectedRanks, setSelectedRanks] = useState<{ [key: number]: string }>(
    { 1: "Select one", 2: "Select one", 3: "Select one", 4: "Select one" }
  );

  const [descriptions, setDescriptions] = useState<{ [key: number]: string }>(
    { 1: "", 2: "", 3: "", 4: "" }
  );

  const handleChange = (rank: number, value: string) => {
    setSelectedRanks((prev) => {
      const newRanks = { ...prev };
      if (newRanks[rank] === value) {
        newRanks[rank] = "Select one";
      } else {
        const existingRank = Object.keys(newRanks).find(
          (key) => newRanks[Number(key)] === value
        );
        if (existingRank) {
          newRanks[Number(existingRank)] = "Select one";
        }
        newRanks[rank] = value;
      }
      return newRanks;
    });
  };

  const handleClearAll = () => {
    setSelectedRanks({ 1: "Select one", 2: "Select one", 3: "Select one", 4: "Select one" });
    setDescriptions({ 1: "", 2: "", 3: "", 4: "" });
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.75rem', p: 1, pr: 4, pl: 1, pt: 1 }}>
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@200..1000&display=swap');
      </style>
      <Typography variant="h6" sx={{ mb: 1, fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.85rem', fontWeight: 'bold', textAlign: 'center' }}>
        <h2>Prioritization - I</h2>
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 0 }}>
        <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 2, p: '10px' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, justifyContent: 'center' }}>
            <Typography sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.8rem', flex: 0.68 }}>
              <b>Rank Your Priorities:</b> (1 being the most important)
              <p></p>
            </Typography>
            <Tooltip title="Click to clear current form" placement='right' arrow>
            <Button variant="outlined" size="small" onClick={handleClearAll} sx={{ fontSize: '0.7rem', textTransform: 'none', flex: 0.06 }}>
              Clear All
            </Button></Tooltip><p></p><br />
          </Box>
          {[1, 2, 3, 4].map((rank) => (
            <Box key={rank} sx={{ display: 'flex', alignItems: 'center', gap: 1, justifyContent: 'center' }}>
              <Typography sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.75rem', flex: 0.1 }}>
                <b>Rank {rank}:</b>
              </Typography>
              <Select
                size="small"
                variant="outlined"
                value={selectedRanks[rank] || "Select One"}
                onChange={(e) => handleChange(rank, e.target.value)}
                sx={{
                  flex: 0.21,
                  fontFamily: 'Nunito Sans, sans-serif',
                  fontSize: '0.7rem',
                  height: '40px',
                  '& .MuiInputBase-root': { padding: '0 6px' },
                  '& .MuiSelect-select': { padding: '4px 6px', fontSize: '0.7rem' },
                }}
              >
                {options.map((option) => (
                  <MenuItem
                    key={option}
                    value={option}
                    disabled={option === "Select one" || (Object.values(selectedRanks).includes(option) && selectedRanks[rank] !== option)}
                    sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem' }}
                  >
                    {option}
                  </MenuItem>
                ))}
              </Select>
              <Tooltip title="Set rank to add explanation" placement='right' arrow>
              <TextField
                fullWidth
                variant="outlined"
                placeholder="Add Explanation"
                name={`description-${rank}`}
                size="small"
                value={descriptions[rank]}
                onChange={(e) => setDescriptions({ ...descriptions, [rank]: e.target.value })}
                disabled={selectedRanks[rank] === "Select one"}
                sx={{
                  flex: 0.43,
                  height: '40px',
                  fontFamily: 'Nunito Sans, sans-serif',
                  '& .MuiInputBase-root': { height: '40px', padding: '0 6px' },
                  '& input': { padding: 0, fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem' },
                  fontSize: '0.7rem',
                  padding: '2px 1px',
                  pr: '15px',
                  pl: '15px',
                  alignSelf: 'flex-end',
                  textTransform: 'none',
                  '&:focus': {
                    outline: 'none',
                  }
                }}
              /></Tooltip>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default SubStep2;