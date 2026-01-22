import React from 'react';
import { Box, Button, Typography, MenuItem, Select, TextField, Tooltip } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../../../store/hooks';
import { updatePrioritizationIRank, updatePrioritizationIDescription, clearPrioritizationI } from '../../../../store/slices/goalsSlice';

const options = [
  "Select one",
  "Decarbonization",
  "Cost Reduction",
  "Increased Resiliency",
  "Maximize Renewable Generation"
];

const SubStep2: React.FC = () => {
  const dispatch = useAppDispatch();
  const prioritizationIState = useAppSelector((state) => state.goals.prioritizationI);
  const { selectedRanks, descriptions } = prioritizationIState;

  const handleUpdateRank = (rank: number, value: string) => {
      dispatch(updatePrioritizationIRank({ rank, value }));
  };

  const handleUpdateDescription = (rank: number, value: string) => {
      dispatch(updatePrioritizationIDescription({ rank, value }));
  };

  const handleClearAllPriorities = () => {
      dispatch(clearPrioritizationI());
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
              <Button variant="outlined" size="small" onClick={handleClearAllPriorities} sx={{ fontSize: '0.7rem', textTransform: 'none', flex: 0.06 }}>
                Clear All
              </Button>
            </Tooltip>
            <p></p><br />
          </Box>
          {[1, 2, 3, 4].map((rank) => (
            <Box key={rank} sx={{ display: 'flex', alignItems: 'center', gap: 1, justifyContent: 'center' }}>
              <Typography sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.75rem', flex: 0.1 }}>
                <b>Rank {rank}:</b>
              </Typography>
              <Select
                size="small"
                variant="outlined"
                value={selectedRanks[rank] || "Select one"}
                onChange={(e) => handleUpdateRank(rank, e.target.value)}
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
                  onChange={(e) => handleUpdateDescription(rank, e.target.value)}
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
                    '&:focus': { outline: 'none' }
                  }}
                />
              </Tooltip>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default SubStep2;