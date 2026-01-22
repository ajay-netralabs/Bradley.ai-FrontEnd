import React from 'react';
import { Box, TextField, Select, MenuItem, Typography, SelectChangeEvent } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../../../store/hooks';
import { 
    updateFacilityUsageMultiSelect, 
    updateFacilityDetails, 
    updateOperatingHour 
} from '../../../../store/slices/siteAssessmentSlice';

const SubStep2: React.FC = () => {
  const dispatch = useAppDispatch();
  const facilityUsageState = useAppSelector((state) => state.siteAssessment.facilityUsage);
  const { facilityUsage, facilityDetails, daysOfOperation, operatingHours } = facilityUsageState;

  const dayAbbreviations: { [key: string]: string } = { Monday: "Mon", Tuesday: "Tue", Wednesday: "Wed", Thursday: "Thu", Friday: "Fri", Saturday: "Sat", Sunday: "Sun" };
  const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

  const handleUpdateMultiSelect = (field: 'facilityUsage' | 'daysOfOperation', value: string[]) => {
      dispatch(updateFacilityUsageMultiSelect({ field, value }));
  };

  const handleUpdateFacilityDetails = (value: string) => {
      dispatch(updateFacilityDetails(value));
  };

  const handleUpdateOperatingHour = (day: string, timeRange: string) => {
      dispatch(updateOperatingHour({ day, timeRange }));
  };

  const handleTimeRangeChange = (day: string, value: string) => {
    const digits = value.replace(/[^0-9]/g, '');
    let formatted = '';
    
    if (digits.length > 0) formatted += digits.substring(0, 2);
    if (digits.length >= 2) formatted += ':' + digits.substring(2, 4);
    if (digits.length >= 4) formatted += ' - ' + digits.substring(4, 6);
    if (digits.length >= 6) formatted += ':' + digits.substring(6, 8);
    
    handleUpdateOperatingHour(day, formatted.substring(0, 15));
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", fontFamily: "Nunito Sans, sans-serif", fontSize: "0.75rem", p: 1, pr: 4, pl: 1, pt: 1 }}>
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Nunito+Sans:ital,opsz,wght@0,6..12,200..1000;1,6..12,200..1000&display=swap');
      </style>
      <Typography variant="h6" sx={{ mb: 1, fontFamily: "Nunito Sans, sans-serif", fontSize: "0.85rem", fontWeight: "bold", textAlign: "center" }}>
        <h2>Facility Usage & Operating Days</h2>
      </Typography>
      <Box sx={{ display: "flex", justifyContent: "space-between", gap: 0 }}>
        <Box sx={{ width: "100%", display: "flex", flexDirection: "column", gap: 2, p: "10px" }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, justifyContent: "center" }}>
            <Typography sx={{ fontFamily: "Nunito Sans, sans-serif", fontSize: "0.75rem", flex: 0.3 }}>
              <b>Select Facility Usage:</b> (Select as many descriptors as is appropriate)
            </Typography>
            <Select
              size="small"
              variant="outlined"
              value={facilityUsage}
              onChange={(e: SelectChangeEvent<string[]>) => handleUpdateMultiSelect('facilityUsage', e.target.value as string[])}
              multiple
              MenuProps={{ PaperProps: { style: { maxHeight: 5 * 37, scrollbarWidth: 'none', msOverflowStyle: 'none' }, sx: { '&::-webkit-scrollbar': { display: 'none' } } } }}
              sx={{ flex: 0.448, fontFamily: "Nunito Sans, sans-serif", fontSize: "0.7rem", height: "40px", "& .MuiInputBase-root": { padding: "0 6px" }, "& .MuiSelect-select": { padding: "4px 6px", fontSize: "0.7rem" } }}
              renderValue={(selected) => `${(selected as string[]).length} Selected`}
            >
              <MenuItem disabled value="Option 0" sx={{ fontFamily: "Nunito Sans, sans-serif", fontSize: "0.7rem" }}>Select</MenuItem>
              {["Admin", "Cold storage", "Commercial office building (Highrise)", "Commercial office building (Low-rise)", "Commercial office building (single story)", "Data center", "Elder care facility", "Food storage", "Grocery chain", "Health Care", "Hospital", "Hospitality (hotel)", "Hospitality (long term stay)", "Industrial facility", "K-12", "Manufacturing", "Manufacturing facility", "Military Base", "Office", "Others", "School", "Stadium", "Storage", "Storage facility", "University"].map((option, index) => (
                <MenuItem key={index} value={option} sx={{ fontFamily: "Nunito Sans, sans-serif", fontSize: "0.7rem" }}>{option}</MenuItem>
              ))}
            </Select>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, justifyContent: 'center' }}>
            <Typography sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.75rem', flex: 0.3 }}><b>Facility Details:</b></Typography>
            <TextField
              variant="outlined" size="small" type="text" placeholder='Provide any additional information regarding your facility.'
              value={facilityDetails}
              onChange={(e) => handleUpdateFacilityDetails(e.target.value)}
              sx={{ flex: 0.448, fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem', '& .MuiInputBase-root': { height: '40px', padding: '0 6px' }, '& input': { padding: 0, fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.8rem' }, '& .MuiInputBase-input::placeholder': { fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem' } }}
            />
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, justifyContent: "center" }}>
            <Typography sx={{ fontFamily: "Nunito Sans, sans-serif", fontSize: "0.75rem", flex: 0.3 }}><b>Days of Operation:</b>  (Select as many days as is appropriate)</Typography>
            <Select
              size="small"
              variant="outlined"
              value={daysOfOperation}
              onChange={(e: SelectChangeEvent<string[]>) => handleUpdateMultiSelect('daysOfOperation', e.target.value as string[])}
              multiple
              sx={{ flex: 0.448, fontFamily: "Nunito Sans, sans-serif", fontSize: "0.7rem", height: "40px", "& .MuiInputBase-root": { padding: "0 6px" }, "& .MuiSelect-select": { padding: "4px 6px", fontSize: "0.7rem" } }}
              renderValue={(selected) => (selected as string[]).join(", ")}
            >
              <MenuItem disabled value="Option 0" sx={{ fontFamily: "Nunito Sans, sans-serif", fontSize: "0.7rem" }}>Select the days on which the building is occupied.</MenuItem>
              {daysOfWeek.map((day, index) => (
                <MenuItem key={index} value={day} sx={{ fontFamily: "Nunito Sans, sans-serif", fontSize: "0.7rem" }}>{day}</MenuItem>
              ))}
            </Select>
          </Box>
          {daysOfOperation.length > 0 && (
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, justifyContent: "center" }}>
              <Typography sx={{ fontFamily: "Nunito Sans, sans-serif", fontSize: "0.75rem", flex: 0.3 }}><b>Enter the time of each day that the building begins conditioning for occupancy and when the buildings conditioning stops (or when it setsback):</b></Typography>
              <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', justifyContent: 'center', flex: 0.448 }}>
                {[...daysOfOperation].sort((a, b) => daysOfWeek.indexOf(a) - daysOfWeek.indexOf(b)).map((day) => (
                  <TextField
                    key={day}
                    variant="outlined"
                    size="small"
                    type="text"
                    placeholder={`${dayAbbreviations[day]} (HH:MM-HH:MM)`}
                    value={operatingHours[day] || ''}
                    onChange={(e) => handleTimeRangeChange(day, e.target.value)}
                    sx={{
                      fontFamily: "Nunito Sans, sans-serif",
                      fontSize: "0.7rem",
                      "& .MuiInputBase-root": { height: "40px", padding: "0 6px" },
                      "& input": { padding: 0, fontFamily: "Nunito Sans, sans-serif", fontSize: "0.8rem", textAlign: 'center' },
                      "& .MuiInputBase-input::placeholder": { fontFamily: "Nunito Sans, sans-serif", fontSize: "0.7rem" },
                      flex: '1 1 30%',
                      minWidth: '120px'
                    }}
                  />
                ))}
              </Box>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default SubStep2;