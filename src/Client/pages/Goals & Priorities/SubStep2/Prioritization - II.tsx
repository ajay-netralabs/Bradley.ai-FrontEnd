import React from 'react';
import { Box, TextField, Typography, MenuItem, Select, Slider, SelectChangeEvent } from '@mui/material';
import { usePrioritizationII/* , PrioritizationIIState */ } from '../../../../Context/Goals & Priorities/SubStep2/Prioritization - II Context';
import { usePrioritizationI } from '../../../../Context/Goals & Priorities/SubStep2/Prioritization - I Context';

const SubStep2: React.FC = () => {
  const { prioritizationIIState, updateField, updateTargetField } = usePrioritizationII();
  const {
    resiliencyIncrease,
    scope2Reduction,
    costReduction,
    renewableGeneration,
    blackStartCapability,
    islandModeCapability,
    gridIndependentDuration,
    backupPowerDuration,
    renewableSystemSize,
    decarbonizationTarget1,
    decarbonizationTarget2,
    energySavingsTarget
  } = prioritizationIIState;
  
  const { prioritizationIState } = usePrioritizationI();
  const { selectedRanks } = prioritizationIState;

  const handleSliderChange = (
    field: 'resiliencyIncrease' | 'scope2Reduction' | 'costReduction' | 'renewableGeneration', 
    value: number | number[]
  ) => {
    updateField(field, value as number);
  };
  
  const rankedSliders: { [key: string]: React.ReactNode } = {
    "Increased Resiliency": (
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, justifyContent: 'center' }}>
        <Typography sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.75rem', flex: 0.3 }}><b>Resiliency Increase: </b>(in %)</Typography>
        <Slider value={resiliencyIncrease} onChange={(_e, v) => handleSliderChange('resiliencyIncrease', v)} sx={{ flex: 0.448 }} aria-label="Small" valueLabelDisplay="auto" valueLabelFormat={(value) => `${value} %`} />
      </Box>
    ),
    "Decarbonization": (
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, justifyContent: 'center' }}>
        <Typography sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.75rem', flex: 0.3 }}><b>Reduce your existing SCOPE 2 carbon emissions by: </b>(in %)</Typography>
        <Slider value={scope2Reduction} onChange={(_e, v) => handleSliderChange('scope2Reduction', v)} sx={{ flex: 0.448 }} aria-label="Small" valueLabelDisplay="auto" valueLabelFormat={(value) => `${value} %`} />
      </Box>
    ),
    "Cost Reduction": (
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, justifyContent: 'center' }}>
        <Typography sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.75rem', flex: 0.3 }}><b>Reduce your energy costs by: </b>(in %)</Typography>
        <Slider value={costReduction} onChange={(_e, v) => handleSliderChange('costReduction', v)} sx={{ flex: 0.448 }} aria-label="Small" valueLabelDisplay="auto" valueLabelFormat={(value) => `${value} %`} />
      </Box>
    ),
    "Maximize Renewable Generation": (
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, justifyContent: 'center' }}>
        <Typography sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.75rem', flex: 0.3 }}><b>Maximize Renewable Generation by: </b>(in %)</Typography>
        <Slider value={renewableGeneration} onChange={(_e, v) => handleSliderChange('renewableGeneration', v)} sx={{ flex: 0.448 }} aria-label="Small" valueLabelDisplay="auto" valueLabelFormat={(value) => `${value} %`} />
      </Box>
    )
  };

  const top3Priorities = Object.values(selectedRanks).filter(rank => rank !== "Select one" && rankedSliders[rank]).slice(0, 3);
  
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.75rem', p: 1, pr: 4, pl: 1, pt: 1 }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@200..1000&display=swap');`}</style>
      <Typography variant="h6" sx={{ mb: 1, fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.85rem', fontWeight: 'bold', textAlign: 'center' }}>
        <h2>Prioritization - II</h2>
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 0 }}>
        <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 2, p: '10px' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, justifyContent: 'center' }}>
            <Typography sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.8rem', flex: 0.75 }}>
              <b>Set Your Targets:</b> (For Top 3 Priorities)
              <p></p>
            </Typography>
          </Box>
          
          {/* Render the sliders in their original static positions, but with dynamic content */}
          {top3Priorities[0] && rankedSliders[top3Priorities[0]]}
          {top3Priorities[1] && rankedSliders[top3Priorities[1]]}
          {top3Priorities[2] && rankedSliders[top3Priorities[2]]}

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, justifyContent: 'center' }}>
            <Typography sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.75rem', flex: 0.3 }}><b>Do you want black start mode capability?</b> (Start without external grid power)</Typography>
            <Select size="small" variant="outlined" value={blackStartCapability} onChange={(e: SelectChangeEvent) => updateField('blackStartCapability', e.target.value)} displayEmpty sx={{ flex: 0.448, fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem', height: '40px', '& .MuiInputBase-root': { padding: '0 6px' }, '& .MuiSelect-select': { padding: '4px 6px', fontSize: '0.7rem' } }}>
              <MenuItem value="" disabled sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem' }}>Select</MenuItem>
              <MenuItem value="Yes" sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem' }}>Yes</MenuItem>
              <MenuItem value="No" sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem' }}>No</MenuItem>
            </Select>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, justifyContent: 'center' }}>
            <Typography sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.75rem', flex: 0.3 }}><b>Do you want island mode capability?</b> (Operate independent of the grid)</Typography>
            <Select size="small" variant="outlined" value={islandModeCapability} onChange={(e: SelectChangeEvent) => updateField('islandModeCapability', e.target.value)} displayEmpty sx={{ flex: 0.448, fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem', height: '40px', '& .MuiInputBase-root': { padding: '0 6px' }, '& .MuiSelect-select': { padding: '4px 6px', fontSize: '0.7rem' } }}>
              <MenuItem value="" disabled sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem' }}>Select</MenuItem>
              <MenuItem value="Yes" sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem' }}>Yes</MenuItem>
              <MenuItem value="No" sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem' }}>No</MenuItem>
            </Select>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, justifyContent: 'center' }}>
            <Typography sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.75rem', flex: 0.3 }}><b>Desired duration for grid independent operations under normal conditions: </b>(in sequential hours)</Typography>
            <TextField variant="outlined" size="small" type="number" placeholder='Input' value={gridIndependentDuration} onChange={(e) => updateField('gridIndependentDuration', e.target.value)} sx={{ flex: 0.448, fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem', '& .MuiInputBase-root': { height: '40px', padding: '0 6px' }, '& input': { padding: 0, fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.8rem' }, '& .MuiInputBase-input::placeholder': { fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem' } }} />
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, justifyContent: 'center' }}>
            <Typography sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.75rem', flex: 0.3 }}><b>Desired Backup Power Duration when grid is non-operational: </b>(hours)</Typography>
            <TextField variant="outlined" size="small" type="number" placeholder='Input' value={backupPowerDuration} onChange={(e) => updateField('backupPowerDuration', e.target.value)} sx={{ flex: 0.448, fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem', '& .MuiInputBase-root': { height: '40px', padding: '0 6px' }, '& input': { padding: 0, fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.8rem' }, '& .MuiInputBase-input::placeholder': { fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem' } }} />
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, justifyContent: 'center' }}>
            <Typography sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.75rem', flex: 0.3 }}><b>Desired Renewable System Size: </b>(kW)</Typography>
            <TextField variant="outlined" size="small" type="number" placeholder='Input' value={renewableSystemSize} onChange={(e) => updateField('renewableSystemSize', e.target.value)} sx={{ flex: 0.448, fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem', '& .MuiInputBase-root': { height: '40px', padding: '0 6px' }, '& input': { padding: 0, fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.8rem' }, '& .MuiInputBase-input::placeholder': { fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem' } }} />
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, justifyContent: 'center' }}>
            <Typography sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.75rem', flex: 0.307 }}><b>Decarbonization Target: </b>(County)</Typography>
            <TextField variant="outlined" size="small" type="number" placeholder='Input' value={decarbonizationTarget1.value} onChange={(e) => updateTargetField('decarbonizationTarget1', 'value', e.target.value)} sx={{ flex: 0.235, fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem', '& .MuiInputBase-root': { height: '40px', padding: '0 6px' }, '& input': { padding: 0, fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.8rem' }, '& .MuiInputBase-input::placeholder': { fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem' } }} />
            <Select size="small" variant="outlined" value={decarbonizationTarget1.unit} onChange={(e: SelectChangeEvent) => updateTargetField('decarbonizationTarget1', 'unit', e.target.value)} sx={{ flex: 0.07, fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem', height: '40px', '& .MuiInputBase-root': { padding: '0 6px' }, '& .MuiSelect-select': { padding: '4px 6px', fontSize: '0.7rem' } }}><MenuItem value="%" sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem' }}>%</MenuItem><MenuItem value="kWh" sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem' }}>kWh</MenuItem><MenuItem value="days" sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem' }}>days</MenuItem></Select>
            <Typography sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.75rem', flex: 0.02, textAlign: 'center' }}>by</Typography>
            <TextField variant="outlined" size="small" type="date" value={decarbonizationTarget1.date} onChange={(e) => updateTargetField('decarbonizationTarget1', 'date', e.target.value)} sx={{ flex: 0.11, fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem', '& .MuiInputBase-root': { height: '40px', padding: '0 6px' }, '& input': { padding: 0, fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.8rem' } }} />
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, justifyContent: 'center' }}>
            <Typography sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.75rem', flex: 0.307 }}><b>Decarbonization Target: </b>(State)</Typography>
            <TextField variant="outlined" size="small" type="number" placeholder='Input' value={decarbonizationTarget2.value} onChange={(e) => updateTargetField('decarbonizationTarget2', 'value', e.target.value)} sx={{ flex: 0.235, fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem', '& .MuiInputBase-root': { height: '40px', padding: '0 6px' }, '& input': { padding: 0, fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.8rem' }, '& .MuiInputBase-input::placeholder': { fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem' } }} />
            <Select size="small" variant="outlined" value={decarbonizationTarget2.unit} onChange={(e: SelectChangeEvent) => updateTargetField('decarbonizationTarget2', 'unit', e.target.value)} sx={{ flex: 0.07, fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem', height: '40px', '& .MuiInputBase-root': { padding: '0 6px' }, '& .MuiSelect-select': { padding: '4px 6px', fontSize: '0.7rem' } }}><MenuItem value="%" sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem' }}>%</MenuItem><MenuItem value="kWh" sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem' }}>kWh</MenuItem><MenuItem value="days" sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem' }}>days</MenuItem></Select>
            <Typography sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.75rem', flex: 0.02, textAlign: 'center' }}>by</Typography>
            <TextField variant="outlined" size="small" type="date" value={decarbonizationTarget2.date} onChange={(e) => updateTargetField('decarbonizationTarget2', 'date', e.target.value)} sx={{ flex: 0.11, fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem', '& .MuiInputBase-root': { height: '40px', padding: '0 6px' }, '& input': { padding: 0, fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.8rem' } }} />
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, justifyContent: 'center' }}><Typography sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.75rem', flex: 0.307 }}><b>Energy Savings Target:</b></Typography><TextField variant="outlined" size="small" type="number" placeholder='Input' value={energySavingsTarget.value} onChange={(e) => updateTargetField('energySavingsTarget', 'value', e.target.value)} sx={{ flex: 0.235, fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem', '& .MuiInputBase-root': { height: '40px', padding: '0 6px' }, '& input': { padding: 0, fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.8rem' }, '& .MuiInputBase-input::placeholder': { fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem' } }} /><Select size="small" variant="outlined" value={energySavingsTarget.unit} onChange={(e: SelectChangeEvent) => updateTargetField('energySavingsTarget', 'unit', e.target.value)} sx={{ flex: 0.07, fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem', height: '40px', '& .MuiInputBase-root': { padding: '0 6px' }, '& .MuiSelect-select': { padding: '4px 6px', fontSize: '0.7rem' } }}><MenuItem value="%" sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem' }}>%</MenuItem><MenuItem value="kWh" sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem' }}>kWh</MenuItem><MenuItem value="days" sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem' }}>days</MenuItem></Select><Typography sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.75rem', flex: 0.02, textAlign: 'center' }}>by</Typography><TextField variant="outlined" size="small" type="date" value={energySavingsTarget.date} onChange={(e) => updateTargetField('energySavingsTarget', 'date', e.target.value)} sx={{ flex: 0.11, fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem', '& .MuiInputBase-root': { height: '40px', padding: '0 6px' }, '& input': { padding: 0, fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.8rem' } }} /></Box>
        </Box>
      </Box>
    </Box>
  );
};

export default SubStep2;