import React, { useState } from "react";
import { Box, TextField, Select, MenuItem, Typography, SelectChangeEvent } from "@mui/material";

const SubStep2: React.FC = () => {
  const [facilityUsage, setFacilityUsage] = useState<string[]>([]);
  const [daysOfOperation, setDaysOfOperation] = useState<string[]>([]);

  const handleFacilityUsageChange = (event: SelectChangeEvent<string[]>) => {
    setFacilityUsage(event.target.value as string[]);
  };

  const handleDaysOfOperationChange = (event: SelectChangeEvent<string[]>) => {
    setDaysOfOperation(event.target.value as string[]);
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", fontFamily: "Nunito Sans, sans-serif", fontSize: "0.75rem", p: 1, pr: 4, pl: 1, pt: 1 }}>
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Nunito+Sans:ital,opsz,wght@0,6..12,200..1000;1,6..12,200..1000&display=swap');
      </style>
      <Typography
        variant="h6"
        sx={{ mb: 1, fontFamily: "Nunito Sans, sans-serif", fontSize: "0.85rem", fontWeight: "bold", textAlign: "center" }}
      >
        <h2>Facility Usage & Operating Days</h2>
      </Typography>
      <Box sx={{ display: "flex", justifyContent: "space-between", gap: 0 }}>
        <Box sx={{ width: "100%", display: "flex", flexDirection: "column", gap: 2, p: "10px" }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, justifyContent: "center" }}>
            <Typography sx={{ fontFamily: "Nunito Sans, sans-serif", fontSize: "0.75rem", flex: 0.3 }}>
              <b>Select Facility Usage:</b>
            </Typography>
            <Select
              size="small"
              variant="outlined"
              value={facilityUsage}
              onChange={handleFacilityUsageChange}
              multiple
              sx={{
                flex: 0.448,
                fontFamily: "Nunito Sans, sans-serif",
                fontSize: "0.7rem",
                height: "40px",
                "& .MuiInputBase-root": { padding: "0 6px" },
                "& .MuiSelect-select": { padding: "4px 6px", fontSize: "0.7rem" },
              }}
              renderValue={(selected) => (selected as string[]).join(", ")}
            >
              <MenuItem disabled value="Option 0" sx={{ fontFamily: "Nunito Sans, sans-serif", fontSize: "0.7rem" }}>
                Select
              </MenuItem>
              {["School", "Office", "Admin", "Storage", "Manufacturing", "Data Center", "Others"].map((option, index) => (
                <MenuItem key={index} value={option} sx={{ fontFamily: "Nunito Sans, sans-serif", fontSize: "0.7rem" }}>
                  {option}
                </MenuItem>
              ))}
            </Select>
          </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, justifyContent: 'center' }}>
  <Typography sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.75rem', flex: 0.3 }}>
        <b>Facility Details:</b>
  </Typography>
  <TextField
            variant="outlined" 
            size="small" 
            type="text" 
                        placeholder='Provide any additional information regarding your facility.'
            sx={{
              flex: 0.448, fontFamily: 'Nunito Sans, sans-serif',
              fontSize: '0.7rem',
              '& .MuiInputBase-root': { height: '40px', padding: '0 6px' },
              '& input': { padding: 0, fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.8rem' },
                            '& .MuiInputBase-input::placeholder': {
                fontFamily: 'Nunito Sans, sans-serif',
                fontSize: '0.7rem',
              }
            }}
          />
</Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: 1, justifyContent: "center" }}>
            <Typography sx={{ fontFamily: "Nunito Sans, sans-serif", fontSize: "0.75rem", flex: 0.3 }}>
              <b>Days of Operation:</b>
            </Typography>
            <Select
              size="small"
              variant="outlined"
              value={daysOfOperation}
              onChange={handleDaysOfOperationChange}
              multiple
              sx={{
                flex: 0.448,
                fontFamily: "Nunito Sans, sans-serif",
                fontSize: "0.7rem",
                height: "40px",
                "& .MuiInputBase-root": { padding: "0 6px" },
                "& .MuiSelect-select": { padding: "4px 6px", fontSize: "0.7rem" },
              }}
              renderValue={(selected) => (selected as string[]).join(", ")}
            >
              <MenuItem disabled value="Option 0" sx={{ fontFamily: "Nunito Sans, sans-serif", fontSize: "0.7rem" }}>
                Select the days on which the building is occupied.
              </MenuItem>
              {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map((day, index) => (
                <MenuItem key={index} value={day} sx={{ fontFamily: "Nunito Sans, sans-serif", fontSize: "0.7rem" }}>
                  {day}
                </MenuItem>
              ))}
            </Select>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: 1, justifyContent: "center" }}>
            <Typography sx={{ fontFamily: "Nunito Sans, sans-serif", fontSize: "0.75rem", flex: 0.3 }}>
              <b>Hours of Operation:</b>
            </Typography>
            <TextField
              variant="outlined"
              size="small"
              type="number"
              placeholder="Provide the HVAC operating hours of the building."
              sx={{
                flex: 0.448,
                fontFamily: "Nunito Sans, sans-serif",
                fontSize: "0.7rem",
                "& .MuiInputBase-root": { height: "40px", padding: "0 6px" },
                "& input": { padding: 0, fontFamily: "Nunito Sans, sans-serif", fontSize: "0.8rem" },
                "& .MuiInputBase-input::placeholder": { fontFamily: "Nunito Sans, sans-serif", fontSize: "0.7rem" },
              }}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default SubStep2;
