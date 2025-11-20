import React/* , { useState } */, {useRef} from 'react';
import { Box, TextField, Typography, FormControlLabel, Checkbox, Tooltip, Select, MenuItem, /* OutlinedInput, */ FormControl, SelectChangeEvent, InputAdornment, IconButton } from '@mui/material';
import { useFacilityOperation } from '../../../../Context/Organizational Profile/SubStep2/Facility Operation Description Context';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

// interface DescriptionState {
//   twoPipeSystem: string;
//   fourPipeSystem: string;
//   steamDistribution: string;
//   steamToBuilding: string;
//   autoLightSensors: string;
//   waterTreatment: string[];
//   freeCooling: string;
// }

const SubStep2: React.FC = () => {
  // 2. Get the entire state object and the update function from the context.
  const { facilityOperation, updateFacilityOperation } = useFacilityOperation();
  const { checked, description, operationalHours, typicalHours, setbackTemperature, facilityTenantTemperature } = facilityOperation;

  // 3. Create handlers that update the central context state.
  const handleCheck = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked: isChecked } = event.target as { name: keyof typeof checked, checked: boolean };

    // Create a new 'checked' object with the updated value and exclusive logic
    const newChecked = {
      ...checked,
      [name]: isChecked,
      ...(name === 'twoPipeSystem' && isChecked && { fourPipeSystem: false }),
      ...(name === 'fourPipeSystem' && isChecked && { twoPipeSystem: false }),
    };

    // If unchecking water treatment, also clear its description
    if (name === 'waterTreatment' && !isChecked) {
      updateFacilityOperation({
        checked: newChecked,
        description: { ...description, waterTreatment: [] }
      });
    } else {
      updateFacilityOperation({ checked: newChecked });
    }
  };

  const handleDescriptionChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target as { name: keyof typeof description, value: string };
    updateFacilityOperation({
      description: { ...description, [name]: value }
    });
  };

  const handleWaterTreatmentChange = (event: SelectChangeEvent<string[]>) => {
    const { target: { value } } = event;
    updateFacilityOperation({
      description: { ...description, waterTreatment: typeof value === 'string' ? value.split(',') : value }
    });
  };

  const handleHoursChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    type: 'operationalHours' | 'typicalHours'
  ) => {
    const { name, value } = event.target;
    updateFacilityOperation({
      [type]: { ...facilityOperation[type], [name]: value }
    });
  };

  const handleSetbackTemperatureChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (value.length <= 2) {
      updateFacilityOperation({
        setbackTemperature: { ...setbackTemperature, [name]: value }
      });
    }
  };

  const handleFacilityTenantTemperatureChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    if (value.length <= 2) {
      updateFacilityOperation({ facilityTenantTemperature: value });
    }
  };

  const waterTreatmentOptionsFlat = [
    "Closed-Loop: Inhibitors & Biocides",
    "Closed-Loop: Regular Testing (pH, Cond, Glycol)",
    "Closed-Loop: Scale, Corrosion, Microbio Prevention",
    "Open-Loop: Chemical Feed System",
    "Open-Loop: Conductivity & Auto Blowdown",
    "Open-Loop: Biocides, Algaecides, Anti-scalants",
    "Boiler: Water Softening, Scale/O2 Corrosion Prevention",
    "Boiler: Feedwater Dosing (O2 Scavengers, pH, Antiscalants)",
    "Boiler: Daily Chemistry Testing",
  ];

  const labelStyle = {
    fontFamily: 'Nunito Sans, sans-serif',
    fontSize: '0.75rem',
    minWidth: '150px',
    flex: 0.35,
    textAlign: 'left',
  };

  const setbackStyle = {
    fontFamily: 'Nunito Sans, sans-serif',
    fontSize: '0.75rem',
    minWidth: '356px',
    flex: 0.35,
    textAlign: 'left',
  };

  const labelStyle2 = {
    fontFamily: 'Nunito Sans, sans-serif',
    fontSize: '0.75rem',
    flex: 0.391,
    textAlign: 'left'
  };

  const inputStyle = {
    flex: 0.39,
    fontSize: '0.7rem',
    fontFamily: 'Nunito Sans, sans-serif',
    '& .MuiInputBase-root': { height: '40px', padding: '0 6px' },
    '& input': { padding: 0, fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.8rem' }
  };

  const inputStyle2 = {
    flex: 0.192,
    fontSize: '0.7rem',
    fontFamily: 'Nunito Sans, sans-serif',
    '& .MuiInputBase-root': { height: '40px', padding: '0 6px' },
    '& input': { padding: 0, fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.8rem' }
  };

  const opStartTimeRef = useRef<HTMLInputElement>(null);
  const opSetBackTimeRef = useRef<HTMLInputElement>(null);
  const typicalStartTimeRef = useRef<HTMLInputElement>(null);
  const typicalSetBackTimeRef = useRef<HTMLInputElement>(null);

  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      fontFamily: 'Nunito Sans, sans-serif',
      fontSize: '0.75rem',
      p: 1,
      pr: 4,
      pl: 1,
      pt: 1
    }}>
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Nunito+Sans:ital,opsz,wght@0,6..12,200..1000;1,6..12,200..1000&display=swap');
      </style>

      <Typography variant="h6" sx={{
        mb: 1,
        fontFamily: 'Nunito Sans, sans-serif',
        fontSize: '0.85rem',
        fontWeight: 'bold',
        textAlign: 'center'
      }}>
        <h2>Facility Operation Description</h2>
      </Typography>

      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        p: '10px'
      }}>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, justifyContent: 'center' }}>
          <Typography sx={{ ...labelStyle, opacity: checked.fourPipeSystem ? 0.5 : 1, pointerEvents: checked.fourPipeSystem ? 'none' : 'auto' }}>
            <b>2 pipe system with seasonal change overs:</b>
          </Typography>
          <Tooltip title="Check if your facility uses a 2 pipe system with seasonal change overs occurring in October to heat and April to cooling." placement='left' arrow>
            <FormControlLabel
              control={
                <Checkbox
                  checked={checked.twoPipeSystem}
                  onChange={handleCheck}
                  name="twoPipeSystem"
                  size="small"
                  sx={{
                    opacity: checked.fourPipeSystem ? 0.5 : 1,
                    pointerEvents: checked.fourPipeSystem ? 'none' : 'auto',
                  }}
                  disabled={checked.fourPipeSystem}
                />
              }
              label=""
              sx={{ flex: 0.0 }}
            />
          </Tooltip>
          <Tooltip title="Add description here." placement='right' arrow>
            <TextField
              fullWidth
              variant="outlined"
              placeholder={checked.twoPipeSystem ? "Add Description" : "Check the Box to Add Description"}
              name="twoPipeSystem"
              value={description.twoPipeSystem}
              onChange={handleDescriptionChange}
              size="small"
              sx={inputStyle}
              disabled={!checked.twoPipeSystem}
            /></Tooltip>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, justifyContent: 'center' }}>
          <Typography sx={{ ...labelStyle, opacity: checked.twoPipeSystem ? 0.5 : 1, pointerEvents: checked.twoPipeSystem ? 'none' : 'auto' }}>
            <b>4 pipe system:</b>
          </Typography>
          <Tooltip title="Check if your facility uses a 4 pipe system with simultaneous heating and cooling capability." placement='left' arrow>
            <FormControlLabel
              control={
                <Checkbox
                  checked={checked.fourPipeSystem}
                  onChange={handleCheck}
                  name="fourPipeSystem"
                  size="small"
                  sx={{
                    opacity: checked.twoPipeSystem ? 0.5 : 1,
                    pointerEvents: checked.twoPipeSystem ? 'none' : 'auto',
                  }}
                  disabled={checked.twoPipeSystem}
                />
              }
              label=""
              sx={{ flex: 0.0 }}
            />
          </Tooltip>
          <Tooltip title="Add description here." placement='right' arrow>
            <TextField
              fullWidth
              variant="outlined"
              placeholder={checked.fourPipeSystem ? "Add Description" : "Check the Box to Add Description"}
              name="fourPipeSystem"
              value={description.fourPipeSystem}
              onChange={handleDescriptionChange}
              size="small"
              sx={inputStyle}
              disabled={!checked.fourPipeSystem}
            /></Tooltip>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, justifyContent: 'center' }}>
          <Typography sx={labelStyle2}>
            <b>Operational Hours:</b> (00:00 - 23:59)
          </Typography>
          <Tooltip title="Start Up Time" placement='left' arrow>
            <TextField
              fullWidth
              variant="outlined"
              type="time"
              name="startUpTime"
              value={operationalHours.startUpTime}
              onChange={(e) => handleHoursChange(e, 'operationalHours')}
              inputRef={opStartTimeRef}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => opStartTimeRef.current?.showPicker()} edge="end" sx={{ mr: -1 }}>
                      <AccessTimeIcon fontSize='small' />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              size="small"
              sx={{
                flex: 0.177,
                fontSize: '0.7rem',
                fontFamily: 'Nunito Sans, sans-serif',
                '& .MuiInputBase-root': { height: '40px', padding: '0 6px' },
                '& input': { padding: 0, fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.8rem' }
              }}
            /></Tooltip>
          to
          <Tooltip title="Set Back Time" placement='right' arrow>
            <TextField
              fullWidth
              variant="outlined"
              type="time"
              name="setBackTime"
              value={operationalHours.setBackTime}
              onChange={(e) => handleHoursChange(e, 'operationalHours')}
              inputRef={opSetBackTimeRef}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => opSetBackTimeRef.current?.showPicker()} edge="end" sx={{ mr: -1 }}>
                      <AccessTimeIcon fontSize='small' />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              size="small"
              sx={{
                flex: 0.177,
                fontSize: '0.7rem',
                fontFamily: 'Nunito Sans, sans-serif',
                '& .MuiInputBase-root': { height: '40px', padding: '0 6px' },
                '& input': { padding: 0, fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.8rem' }
              }}
            /></Tooltip>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, justifyContent: 'center' }}>
          <Typography sx={labelStyle2}>
            <b>Typical weekday timing:</b> (00:00 - 23:59)
          </Typography>
          <Tooltip title="Start Up Time" placement='left' arrow>
            <TextField
              fullWidth
              variant="outlined"
              type="time"
              name="startUpTime"
              value={typicalHours.startUpTime}
              onChange={(e) => handleHoursChange(e, 'typicalHours')}
              inputRef={typicalStartTimeRef}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => typicalStartTimeRef.current?.showPicker()} edge="end" sx={{ mr: -1 }}>
                      <AccessTimeIcon fontSize='small' />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              size="small"
              sx={{
                flex: 0.177,
                fontSize: '0.7rem',
                fontFamily: 'Nunito Sans, sans-serif',
                '& .MuiInputBase-root': { height: '40px', padding: '0 6px' },
                '& input': { padding: 0, fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.8rem' }
              }}
            /></Tooltip>
          to
          <Tooltip title="Set Back Time" placement='right' arrow>
            <TextField
              fullWidth
              variant="outlined"
              type="time"
              name="setBackTime"
              value={typicalHours.setBackTime}
              onChange={(e) => handleHoursChange(e, 'typicalHours')}
              inputRef={typicalSetBackTimeRef}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => typicalSetBackTimeRef.current?.showPicker()} edge="end" sx={{ mr: -1 }}>
                      <AccessTimeIcon fontSize='small' />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              size="small"
              sx={{
                flex: 0.177,
                fontSize: '0.7rem',
                fontFamily: 'Nunito Sans, sans-serif',
                '& .MuiInputBase-root': { height: '40px', padding: '0 6px' },
                '& input': { padding: 0, fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.8rem' }
              }}
            /></Tooltip>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, justifyContent: 'center' }}>
          <Typography sx={labelStyle}>
            <b>Auto light sensors:</b>
          </Typography>
          <Tooltip title="Check if your facility uses auto light sensors throughout all space." placement='left' arrow>
            <FormControlLabel
              control={
                <Checkbox
                  checked={checked.autoLightSensors}
                  onChange={handleCheck}
                  name="autoLightSensors"
                  size="small"
                />
              }
              label=""
              sx={{ flex: 0.0 }}
            />
          </Tooltip>
          <Tooltip title="Add description here." placement='right' arrow>
            <TextField
              fullWidth
              variant="outlined"
              placeholder={checked.autoLightSensors ? "Add Description" : "Check the Box to Add Description"}
              name="autoLightSensors"
              value={description.autoLightSensors}
              onChange={handleDescriptionChange}
              size="small"
              sx={inputStyle}
              disabled={!checked.autoLightSensors}
            /></Tooltip>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, justifyContent: 'center' }}>
          <Typography sx={labelStyle}>
            <b>Water treatment:</b>
          </Typography>
          <Tooltip title="Check if your facility uses water treatment in accordance with boiler and chiller specifications." placement='left' arrow>
            <FormControlLabel
              control={
                <Checkbox
                  checked={checked.waterTreatment}
                  onChange={handleCheck}
                  name="waterTreatment"
                  size="small"
                />
              }
              label=""
              sx={{ flex: 0.0 }}
            />
          </Tooltip>
          <Tooltip title="Select all applicable water treatment methods." placement='right' arrow>
            <FormControl
              sx={{ flex: inputStyle.flex }}
              fullWidth
              size="small"
              disabled={!checked.waterTreatment}
              variant="outlined"
            >
              <Select
                multiple
                value={description.waterTreatment}
                onChange={handleWaterTreatmentChange}
                variant="outlined"
                size="small"
                renderValue={(selected) => {
                  const s = selected as string[];
                  if (s.length === 0) {
                    return "";
                  }
                  return `${s.length} Selected`;
                }}
                displayEmpty
                sx={{
                  fontFamily: 'Nunito Sans, sans-serif',
                  fontSize: '0.7rem',
                  height: '40px',
                  '& .MuiSelect-select': {
                    padding: '4px 6px',
                    fontSize: '0.7rem',
                    fontFamily: 'Nunito Sans, sans-serif',
                    lineHeight: '30px',
                  },
                  '& .MuiSelect-select.MuiInputBase-input.MuiOutlinedInput-input:not([aria-expanded="true"])': {
                    '&:empty::before': {
                      content: `"${checked.waterTreatment ? "Select Options" : "Check Box to Select"}"`,
                      fontFamily: 'Nunito Sans, sans-serif',
                      fontSize: '0.7rem',
                      opacity: 0.6,
                    },
                  },
                }}
              >
                <MenuItem
                  disabled
                  value="WATER_TREATMENT_PLACEHOLDER_TOP"
                  style={{ display: 'none' }}
                >
                </MenuItem>
                {waterTreatmentOptionsFlat.map((option) => (
                  <MenuItem
                    key={option}
                    value={option}
                    sx={{
                      fontFamily: 'Nunito Sans, sans-serif',
                      fontSize: '0.7rem',
                    }}
                  >
                    {option}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Tooltip>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, justifyContent: 'center' }}>
          <Tooltip title="EmissionCheckIQ+ needs to confirm what temperature you provide to your tenant occupied areas for weather normalization and new load demand forecasting." placement='left' arrow>
            <Typography sx={{
              fontFamily: 'Nunito Sans, sans-serif',
              fontSize: '0.75rem',
              minWidth: '409px',
              flex: 0.376,
              textAlign: 'left'
            }}>
              <b>Facility Tenant Temperate:</b> (in °F)
            </Typography></Tooltip>
          <Tooltip title="Enter the temperature in °F" placement='right' arrow>
            <TextField
              fullWidth
              type='number'
              variant="outlined"
              placeholder='Enter the temperature in °F'
              name="facilityTenantTemperature"
              value={facilityTenantTemperature}
              onChange={handleFacilityTenantTemperatureChange}
              size="small"
              sx={{
                flex: 0.376,
                minWidth: '150px',
                fontSize: '0.7rem',
                fontFamily: 'Nunito Sans, sans-serif',
                '& .MuiInputBase-root': { height: '40px', padding: '0 6px' },
                '& input': { padding: 0, fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.8rem' }
              }}
            /></Tooltip>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, justifyContent: 'center' }}>
          <Typography sx={setbackStyle}>
            <b>Does HVAC Controls allow for setback<br />during unoccupied times?</b> (in °F)
          </Typography>
          <Tooltip title="Check if your facility has HVAC controls that allow for setback during unoccupied times." placement='left' arrow>
            <FormControlLabel
              control={
                <Checkbox
                  checked={checked.setbackTemperature}
                  onChange={handleCheck}
                  name="setbackTemperature"
                  size="small"
                />
              }
              label=""
              sx={{ flex: 0.0 }}
            />
          </Tooltip>
          <Tooltip title="Setback temp. for summer" placement='left' arrow>
            <TextField
              type='number'
              fullWidth
              variant="outlined"
              placeholder={checked.setbackTemperature ? "Enter temp. in °F (Summer)" : "Summer Setback Temp."}
              name="summer"
              value={setbackTemperature.summer}
              onChange={handleSetbackTemperatureChange}
              size="small"
              sx={inputStyle2}
              disabled={!checked.setbackTemperature}
            /></Tooltip>
          <Tooltip title="Setback temp. for winter" placement='right' arrow>
            <TextField
              type='number'
              fullWidth
              variant="outlined"
              placeholder={checked.setbackTemperature ? "Enter temp. in °F (Winter)" : "Winter Setback Temp."}
              name="winter"
              value={setbackTemperature.winter}
              onChange={handleSetbackTemperatureChange}
              size="small"
              sx={inputStyle2}
              disabled={!checked.setbackTemperature}
            /></Tooltip>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, justifyContent: 'center' }}>
          <Typography sx={labelStyle}>
            <b>Does your facility utilize free cooling?</b>
          </Typography>
          <Tooltip title="Check if your facility utilizes free cooling." placement='left' arrow>
            <FormControlLabel
              control={
                <Checkbox
                  checked={checked.freeCooling}
                  onChange={handleCheck}
                  name="freeCooling"
                  size="small"
                />
              }
              label=""
              sx={{ flex: 0.0 }}
            />
          </Tooltip>
          <Tooltip title="Add description here." placement='right' arrow>
            <TextField
              fullWidth
              variant="outlined"
              placeholder={checked.freeCooling ? "Add Description" : "Check the Box to Add Description"}
              name="freeCooling"
              value={description.freeCooling}
              onChange={handleDescriptionChange}
              size="small"
              sx={inputStyle}
              disabled={!checked.freeCooling}
            /></Tooltip>
        </Box>

      </Box>
    </Box>
  );
};

export default SubStep2;