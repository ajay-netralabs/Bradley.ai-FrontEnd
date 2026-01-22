import React from 'react';
import { Box, TextField, Typography, Select, MenuItem, SelectChangeEvent } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../../../store/hooks';
import { updateOtherField, OtherSiteCharacteristicsState } from '../../../../store/slices/siteAssessmentSlice';

const SubStep2: React.FC = () => {
  const dispatch = useAppDispatch();
  const otherCharacteristicsState = useAppSelector((state) => state.siteAssessment.otherCharacteristics);

  const handleUpdateField = (field: keyof OtherSiteCharacteristicsState, value: string) => {
      dispatch(updateOtherField({ field, value }));
  };

  const voltageFields = [
    { 
      name: 'primaryVoltageService', 
      label: "Primary Volt. Service To The Building / Property:",
      hasDefault: true,
      options: ["Low (< 1000 V)", "Med. (1000 V - 100 kV)", "Hi./Extra Hi. (100 kV - 1000 kV)"]
    },
    { 
      name: 'primaryVoltageFacility', 
      label: "Primary Volt. distributed at the Facility Level:",
      hasDefault: true,
      options: ["Low (< 1000 V)", "Med. (1000 V - 100 kV)", "Hi./Extra Hi. (100 kV - 1000 kV)"]
    },
    { 
      name: 'secondaryVoltageService', 
      label: "Secondary Volt. Service:", 
      hasDefault: true,
      options: ["Low (< 1000 V)", "Med. (1000 V - 100 kV)", "Hi./Extra Hi. (100 kV - 1000 kV)"]
    }
  ];

  const topographyField = { 
    name: 'topography', 
    label: "Topography:", 
    options: ["Flat", "Sloped", "Hilly", "Partially Tree Covered", "Tree Covered"]
  };

  const shouldShowCustomVoltageInput = (fieldName: string): boolean => {
    const value = otherCharacteristicsState[fieldName as keyof typeof otherCharacteristicsState];
    return value !== 'Option 0' && value !== '';
  };

  // Format number with commas
  const formatNumberWithCommas = (value: string): string => {
    // Remove any non-digit characters
    const numericValue = value.replace(/\D/g, '');
    
    // Add commas every 3 digits
    return numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  // Remove commas and return numeric value
  const getNumericValue = (formattedValue: string): string => {
    return formattedValue.replace(/,/g, '');
  };

  // Handle voltage input change with validation and formatting
  const handleVoltageInputChange = (fieldName: string, value: string) => {
    // Remove commas to get numeric value
    const numericValue = getNumericValue(value);
    
    // Validate range (1 to 1,000,000)
    const numValue = parseInt(numericValue, 10);
    
    if (numericValue === '' || (numValue >= 1 && numValue <= 1000000)) {
      // Format with commas and update state
      const formattedValue = formatNumberWithCommas(numericValue);
      handleUpdateField(`${fieldName}CustomValue` as keyof typeof otherCharacteristicsState, formattedValue);
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.75rem', p: 1, pr: 4, pl: 1, pt: 1 }}>
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Nunito+Sans:ital,opsz,wght@0,6..12,200..1000;1,6..12,200..1000&display=swap');
      </style>
      <Typography variant="h6" sx={{ mb: 1, fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.85rem', fontWeight: 'bold', textAlign: 'center' }}>
        <h2>Other Site Characteristics</h2>
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 0 }}>
        <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 2, p: '10px' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, justifyContent: 'center' }}>
            <Typography sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.75rem', minWidth: '200px', flex: 0.35 }}>
              <b>Please Describe Any Unique Site Features That Might Impact DER System Placement Or Installation: </b>(Optional)
            </Typography>
            <TextField
              fullWidth
              variant="outlined"
              size="small"
              placeholder='E.g., Historical Facades, Easements, Height Restrictions'
              multiline
              rows={2}
              value={otherCharacteristicsState.uniqueFeatures}
              onChange={(e) => handleUpdateField('uniqueFeatures', e.target.value)}
              sx={{
                flex: 0.4,
                fontSize: '0.7rem',
                fontFamily: 'Nunito Sans, sans-serif',
                '& .MuiInputBase-root': { padding: '0 6px' },
                '& textarea': { fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.8rem', pt: '5px', pb: '5px', pl: '1px' }
              }}
            />
          </Box>

          {/* Topography Field */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, justifyContent: 'center' }}>
            <Typography sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.75rem', minWidth: '200px', flex: 0.35 }}>
              <b>{topographyField.label}</b>
            </Typography>
            <Select
              fullWidth
              size="small"
              variant="outlined"
              value={otherCharacteristicsState[topographyField.name as keyof typeof otherCharacteristicsState]}
              onChange={(e: SelectChangeEvent) => handleUpdateField(topographyField.name as keyof typeof otherCharacteristicsState, e.target.value)}
              sx={{
                flex: 0.4,
                fontFamily: 'Nunito Sans, sans-serif',
                fontSize: '0.7rem',
                minWidth: '310px',
                height: '40px',
                '& .MuiInputBase-root': { height: '40px', padding: '0 6px' },
                '& .MuiSelect-select': { padding: '4px 6px', fontSize: '0.7rem' },
              }}
            >
              {topographyField.options.map((option, idx) => (
                <MenuItem key={idx} value={`Option ${idx + 1}`} sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem' }}>
                  {option}
                </MenuItem>
              ))}
            </Select>
          </Box>

          {/* Voltage Fields */}
          {voltageFields.map((field, index) => (
            <Box key={index} sx={{ display: 'flex', alignItems: 'center', gap: 2, justifyContent: 'center' }}>
              <Typography sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.75rem', minWidth: '200px', flex: 0.35 }}>
                <b>{field.label}</b>{field.hasDefault ? " (If Any)" : ""}
              </Typography>
              <Box sx={{ flex: 0.4, display: 'flex', gap: 1, minWidth: '310px' }}>
                <Select
                  fullWidth
                  size="small"
                  variant="outlined"
                  value={otherCharacteristicsState[field.name as keyof typeof otherCharacteristicsState]}
                  onChange={(e: SelectChangeEvent) => handleUpdateField(field.name as keyof typeof otherCharacteristicsState, e.target.value)}
                  sx={{
                    flex: shouldShowCustomVoltageInput(field.name) ? 0.5 : 1,
                    fontFamily: 'Nunito Sans, sans-serif',
                    fontSize: '0.7rem',
                    height: '40px',
                    '& .MuiInputBase-root': { height: '40px', padding: '0 6px' },
                    '& .MuiSelect-select': { padding: '4px 6px', fontSize: '0.7rem' },
                  }}
                >
                  {field.hasDefault && (
                    <MenuItem value="Option 0" disabled sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem' }}>
                      Select
                    </MenuItem>
                  )}
                  {field.options.map((option, idx) => (
                    <MenuItem key={idx} value={`Option ${idx + 1}`} sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem' }}>
                      {option}
                    </MenuItem>
                  ))}
                </Select>
                
                {/* Inline Custom Voltage Input Field */}
                {shouldShowCustomVoltageInput(field.name) && (
                  <TextField
                    size="small"
                    variant="outlined"
                    placeholder="Enter value (1-1,000,000 V)"
                    value={otherCharacteristicsState[`${field.name}CustomValue` as keyof typeof otherCharacteristicsState] || ''}
                    onChange={(e) => handleVoltageInputChange(field.name, e.target.value)}
                    sx={{
                      flex: 0.5,
                      fontSize: '0.7rem',
                      fontFamily: 'Nunito Sans, sans-serif',
                      '& .MuiInputBase-root': { height: '40px', padding: '0 6px' },
                      '& input': { fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem', padding: '4px 6px' }
                    }}
                  />
                )}
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default SubStep2;