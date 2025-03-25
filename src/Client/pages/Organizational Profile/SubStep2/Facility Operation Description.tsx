import React, { useState } from 'react';
import { Box, TextField, Typography, FormControlLabel, Checkbox, Tooltip } from '@mui/material';

const SubStep2: React.FC = () => {
  const [checked, setChecked] = useState({
    twoPipeSystem: false,
    fourPipeSystem: false,
    steamDistribution: false,
    steamToBuilding: false,
    autoLightSensors: false,
    waterTreatment: false,
  });

  const [description, setDescription] = useState({
    twoPipeSystem: '',
    fourPipeSystem: '',
    steamDistribution: '',
    steamToBuilding: '',
    autoLightSensors: '',
    waterTreatment: '',
  });

  const [operationalHours, setOperationalHours] = useState({
    startUpTime: '',
    setBackTime: '',
  });

  const [typicalHours, setTypicalHours] = useState({
    startUpTime: '',
    setBackTime: '',
  });

  const handleCheck = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked({ ...checked, [event.target.name]: event.target.checked });
  };

  const handleDescriptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDescription({ ...description, [event.target.name]: event.target.value });
  };

  const handleOperationalHoursChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setOperationalHours({ ...operationalHours, [event.target.name]: event.target.value });
  };

  const handleTypicalHoursChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTypicalHours({ ...typicalHours, [event.target.name]: event.target.value });
  };

  const labelStyle = {
    fontFamily: 'Nunito Sans, sans-serif',
    fontSize: '0.75rem',
    minWidth: '150px',
    flex: 0.35,
    textAlign: 'left'
  };

  const labelStyle2 = {
    fontFamily: 'Nunito Sans, sans-serif',
    fontSize: '0.75rem',
    minWidth: '450px',
    flex: 0.375,
    textAlign: 'left'
  };

  const inputStyle = {
    flex: 0.39,
    fontSize: '0.7rem',
    fontFamily: 'Nunito Sans, sans-serif',
    '& .MuiInputBase-root': { height: '40px', padding: '0 6px' },
    '& input': { padding: 0, fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.8rem' }
  };

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
          <Typography sx={labelStyle}>
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
          <Typography sx={labelStyle}>
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
          <Typography sx={labelStyle}>
            <b>Steam distribution to Hot Water conversion:</b>
          </Typography>
          <Tooltip title="Check if your facility uses steam distribution." placement='left' arrow>
            <FormControlLabel
              control={
                <Checkbox
                  checked={checked.steamDistribution}
                  onChange={handleCheck}
                  name="steamDistribution"
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
            placeholder={checked.steamDistribution ? "Add Description" : "Check the Box to Add Description"}
            name="steamDistribution"
            value={description.steamDistribution}
            onChange={handleDescriptionChange}
            size="small"
            sx={inputStyle}
            disabled={!checked.steamDistribution}
          /></Tooltip>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, justifyContent: 'center' }}>
          <Typography sx={labelStyle}>
            <b>Steam to entire building:</b>
          </Typography>
          <Tooltip title="Check if your facility uses steam to heat the entire building." placement='left' arrow>
            <FormControlLabel
              control={
                <Checkbox
                  checked={checked.steamToBuilding}
                  onChange={handleCheck}
                  name="steamToBuilding"
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
            placeholder={checked.steamToBuilding ? "Add Description" : "Check the Box to Add Description"}
            name="steamToBuilding"
            value={description.steamToBuilding}
            onChange={handleDescriptionChange}
            size="small"
            sx={inputStyle}
            disabled={!checked.steamToBuilding}
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
              onChange={handleOperationalHoursChange}
              size="small"
              sx={{
                flex: 0.185,
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
              onChange={handleOperationalHoursChange}
              size="small"
              sx={{
                flex: 0.185,
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
              onChange={handleTypicalHoursChange}
              size="small"
              sx={{
                flex: 0.185,
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
              onChange={handleTypicalHoursChange}
              size="small"
              sx={{
                flex: 0.185,
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
          <Tooltip title="Add description here." placement='right' arrow>
          <TextField
            fullWidth
            variant="outlined"
            placeholder={checked.waterTreatment ? "Add Description" : "Check the Box to Add Description"}
            name="waterTreatment"
            value={description.waterTreatment}
            onChange={handleDescriptionChange}
            size="small"
            sx={inputStyle}
            disabled={!checked.waterTreatment}
          /></Tooltip>
        </Box>
      </Box>
    </Box>
  );
};

export default SubStep2;
