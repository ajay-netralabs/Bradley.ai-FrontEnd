import React from 'react';
import { Box, TextField, Select, MenuItem, Typography, Switch, FormControlLabel, Button, IconButton, SelectChangeEvent } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import { useAppDispatch, useAppSelector } from '../../../../store/hooks';
import { 
    updateSiteIField, 
    setNumberOfBreakers, 
    addBreaker, 
    removeBreaker, 
    updateAmperageField,
    SiteCharacteristicsIState
} from '../../../../store/slices/siteAssessmentSlice';

const SubStep2: React.FC = () => {
  const dispatch = useAppDispatch();
  const siteCharacteristicsIState = useAppSelector((state) => state.siteAssessment.siteCharacteristicsI);
  
  const {
    isBreakerSpaceAvailable,
    overallFacilitySize,
    commonAreaSquareFootage,
    yearBuildingOperation,
    primaryUtilityEntry,
    secondaryUtilityEntry,
    numberOfOpenBreakers,
    breakers
  } = siteCharacteristicsIState;

  const handleUpdateField = (field: keyof Omit<SiteCharacteristicsIState, 'breakers' | 'numberOfOpenBreakers'>, value: string | boolean) => {
      dispatch(updateSiteIField({ field, value }));
  };

  const handleNumberOfBreakersChange = (value: string) => {
      dispatch(setNumberOfBreakers(value));
  };

  const handleAddBreaker = () => {
      dispatch(addBreaker());
  };

  const handleRemoveBreaker = (breakerIndex: number) => {
      dispatch(removeBreaker(breakerIndex));
  };

  const handleUpdateAmperageField = (breakerIndex: number, fieldIndex: number, value: string) => {
      dispatch(updateAmperageField({ breakerIndex, fieldIndex, value }));
  };

  const formatNumber = (num: string) => {
    if (!num) return '';
    const cleanNum = num.replace(/[^0-9]/g, '');
    if (cleanNum === '') return '';
    const number = parseInt(cleanNum, 10);
    if (isNaN(number)) return '';
    return new Intl.NumberFormat('en-US').format(number);
  };

  const handleFormattedNumericInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    fieldName: 'overallFacilitySize' | 'commonAreaSquareFootage'
  ) => {
    handleUpdateField(fieldName, e.target.value.replace(/[^0-9]/g, ''));
  };

  const handleYearInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/[^0-9]/g, '');
    if (value.length > 4) value = value.slice(0, 4);
    handleUpdateField('yearBuildingOperation', value);
  };

  const handleYearInputBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.length > 0 && value.length < 4) {
      handleUpdateField('yearBuildingOperation', '');
    } else if (value.length === 4) {
      const year = parseInt(value, 10);
      const maxYear = new Date().getFullYear();
      if (isNaN(year) || year < 1000 || year > maxYear) {
        handleUpdateField('yearBuildingOperation', '');
      }
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.75rem', p: 1, pr: 4, pl: 1, pt: 1 }}>
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Nunito+Sans:ital,opsz,wght@0,6..12,200..1000;1,6..12,200..1000&display=swap');
      </style>
      <Typography variant="h6" sx={{ mb: 1, fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.85rem', fontWeight: 'bold', textAlign: 'center' }}>
        <h2>Site Characteristics - I</h2>
      </Typography>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 0 }}>
        <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 2, p: '10px' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, justifyContent: 'center' }}>
            <Typography sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.75rem', flex: 0.3 }}><b>Overall Facility Size, incl. Common Area: </b>(in Sq. Ft.)</Typography>
            <TextField variant="outlined" size="small" type="text" placeholder='Input' value={formatNumber(overallFacilitySize)} onChange={(e) => handleFormattedNumericInputChange(e, 'overallFacilitySize')} sx={{ flex: 0.448, fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem', '& .MuiInputBase-root': { height: '40px', padding: '0 6px' }, '& input': { padding: 0, fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.8rem' }, '& .MuiInputBase-input::placeholder': { fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem' } }} />
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, justifyContent: 'center' }}>
            <Typography sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.75rem', flex: 0.3 }}><b>Common Area Square Footage: </b>(in Sq. Ft.)</Typography>
            <TextField variant="outlined" size="small" type="text" placeholder='Input' value={formatNumber(commonAreaSquareFootage)} onChange={(e) => handleFormattedNumericInputChange(e, 'commonAreaSquareFootage')} sx={{ flex: 0.448, fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem', '& .MuiInputBase-root': { height: '40px', padding: '0 6px' }, '& input': { padding: 0, fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.8rem' }, '& .MuiInputBase-input::placeholder': { fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem' } }} />
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, justifyContent: 'center' }}>
            <Typography sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.75rem', flex: 0.3 }}><b>Year Building was Placed in Operation:</b></Typography>
            <TextField variant="outlined" size="small" type="text" placeholder='YYYY' value={yearBuildingOperation} onChange={handleYearInputChange} onBlur={handleYearInputBlur} inputProps={{ inputMode: 'numeric', maxLength: 4, pattern: '[0-9]{4}' }} sx={{ flex: 0.448, fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem', '& .MuiInputBase-root': { height: '40px', padding: '0 6px' }, '& input': { padding: 0, fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.8rem' }, '& .MuiInputBase-input::placeholder': { fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem' } }} />
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, justifyContent: 'center' }}>
            <Typography sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.75rem', flex: 0.3 }}><b>Primary Electric Utility Entry Point at Property:</b></Typography>
            <Select size="small" variant="outlined" value={primaryUtilityEntry} onChange={(e: SelectChangeEvent) => handleUpdateField('primaryUtilityEntry', e.target.value)} sx={{ flex: 0.448, fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem', height: '40px', '& .MuiInputBase-root': { padding: '0 6px' }, '& .MuiSelect-select': { padding: '4px 6px', fontSize: '0.7rem' } }}>
              <MenuItem value="Option 1" sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem' }}>North</MenuItem>
              <MenuItem value="Option 2" sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem' }}>South</MenuItem>
              <MenuItem value="Option 3" sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem' }}>East</MenuItem>
              <MenuItem value="Option 4" sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem' }}>West</MenuItem>
            </Select>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, justifyContent: 'center' }}>
            <Typography sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.75rem', flex: 0.3 }}><b>Secondary Electric Utility Entry Point: </b>(If Available)</Typography>
            <Select size="small" variant="outlined" value={secondaryUtilityEntry} onChange={(e: SelectChangeEvent) => handleUpdateField('secondaryUtilityEntry', e.target.value)} sx={{ flex: 0.448, fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem', height: '40px', '& .MuiInputBase-root': { padding: '0 6px' }, '& .MuiSelect-select': { padding: '4px 6px', fontSize: '0.7rem' } }}>
              <MenuItem value="Option 0" disabled sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem' }}>Select</MenuItem>
              <MenuItem value="Option 1" sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem' }}>North</MenuItem>
              <MenuItem value="Option 2" sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem' }}>South</MenuItem>
              <MenuItem value="Option 3" sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem' }}>East</MenuItem>
              <MenuItem value="Option 4" sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem' }}>West</MenuItem>
            </Select>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, justifyContent: 'center' }}>
            <Typography sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.75rem', flex: 0.3 }}><b>Open Breaker Space Available?</b></Typography>
            <FormControlLabel control={<Switch size="small" checked={isBreakerSpaceAvailable} onChange={(e) => handleUpdateField('isBreakerSpaceAvailable', e.target.checked)} />} label="" sx={{ flex: 0.448, justifyContent: 'flex-start', '& .MuiSwitch-root': { marginLeft: '5px' } }} />
          </Box>
          {isBreakerSpaceAvailable && (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, justifyContent: 'center' }}>
                <Typography sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.75rem', flex: 0.3 }}><b>Number of Open Breakers:</b></Typography>
                <TextField variant="outlined" size="small" type="number" placeholder='Max 5' value={numberOfOpenBreakers} onChange={(e) => handleNumberOfBreakersChange(e.target.value)} inputProps={{ min: 1, max: 5 }} sx={{ flex: 0.448, fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem', '& .MuiInputBase-root': { height: '40px', padding: '0 6px' }, '& input': { padding: 0, fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.8rem' }, '& .MuiInputBase-input::placeholder': { fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem' } }} />
              </Box>
              {breakers.map((breaker, breakerIndex) => (
                <Box key={breaker.id} sx={{ display: 'flex', alignItems: 'center', gap: 1, justifyContent: 'center' }}>
                  <Typography sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.75rem', flex: 0.3 }}><b>Breaker {breakerIndex + 1} Amperage:</b></Typography>
                  <Box sx={{ flex: 0.448, display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Box sx={{ display: 'flex', gap: 1, flex: 1 }}>
                      {breaker.amperageFields.map((field, fieldIndex) => (
                        <TextField key={field.id} variant="outlined" size="small" type="number" placeholder='Amp.' value={field.value} onChange={(e) => handleUpdateAmperageField(breakerIndex, fieldIndex, e.target.value)} sx={{ flex: 1, fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem', '& .MuiInputBase-root': { height: '40px', padding: '0 6px' }, '& input': { padding: 0, fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.8rem' }, '& .MuiInputBase-input::placeholder': { fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem' } }} />
                      ))}
                    </Box>
                    {/* <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                      {breaker.amperageFields.length < 3 && <IconButton size="small" onClick={() => addAmperageField(breakerIndex)} sx={{ p: 0.5, '&:focus': { outline: 'none' } }}><AddIcon fontSize="small" /></IconButton>}
                      {breaker.amperageFields.length > 1 && <IconButton size="small" onClick={() => removeAmperageField(breakerIndex, breaker.amperageFields.length - 1)} sx={{ p: 0.5, '&:focus': { outline: 'none' } }}><DeleteIcon fontSize="small" /></IconButton>}
                    </Box> */}
                  </Box>
                </Box>
              ))}
              {breakers.length > 0 && (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, justifyContent: 'center' }}>
                  <Box sx={{ flex: 0.3, display: 'flex', justifyContent: 'flex-start' }}>
                    <Button startIcon={<AddCircleIcon />} onClick={handleAddBreaker} size="small" disabled={breakers.length >= 5} sx={{ textTransform: 'none', fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.75rem', '&:focus': { outline: 'none' } }}>
                      Add Another Breaker
                    </Button>
                  </Box>
                  <Box sx={{ flex: 0.448, display: 'flex', justifyContent: 'flex-end' }}>
                    <IconButton onClick={() => handleRemoveBreaker(breakers.length - 1)} size="small" disabled={breakers.length === 1} sx={{ '&:focus': { outline: 'none' } }}>
                      <DeleteIcon fontSize="medium" />
                    </IconButton>
                  </Box>
                </Box>
              )}
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default SubStep2;