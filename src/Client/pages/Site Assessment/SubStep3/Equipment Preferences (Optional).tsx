import React from 'react';
import { Box, Typography, Select, MenuItem, TextField, SelectChangeEvent } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../../../store/hooks';
import { updateEquipmentField, EquipmentPreferencesState } from '../../../../store/slices/siteAssessmentSlice';

// Moved constants here for now, or could be in a separate file
export const brandMapping = {
  "Reciprocating (Piston) Engines": ['Aggreko', 'AKSA', 'AP Electric & Generators', 'Briggs & Stratton', 'Caterpillar', 'Cummins', 'Deutz', 'Doosan', 'Generac', 'INNIO (Jenbacher, Waukesha)', 'Kohler', 'Kubota', 'MAN', 'MTU', 'Rolls-Royce', 'Taylor Power Systems', 'Wärtsilä'],
  "Gas Turbines (Aero-Derivative)": ['GE (General Electric)', 'MAN', 'Mitsubishi Hitachi Power Systems', 'MTU', 'Rolls-Royce', 'Siemens', 'Solar Turbines (Caterpillar)'],
  "Simple Cycle Gas Turbines": ['Caterpillar', 'GE', 'MAN', 'MTU', 'Rolls-Royce', 'Siemens', 'WR Grace'],
  "Linear Generators": ['Econiq', 'Linear Labs', 'Mainspring'],
  "Microreactors (Very Small SMRs)": ['Areva/Framatome', 'China National Nuclear Corporation (CNNC)', 'GE-Hitachi Nuclear', 'Korea Hydro & Nuclear Power (KHNP)', 'Rolls-Royce SMR (UK)', 'Rosatom', 'Westinghouse'],
  "Small nuclear (Light-Water SMRs - LWR-SMRs)": ['Areva/Framatome', 'China National Nuclear Corporation (CNNC)', 'GE-Hitachi Nuclear', 'Korea Hydro & Nuclear Power (KHNP)', 'Rolls-Royce SMR (UK)', 'Rosatom', 'Westinghouse'],
};
export const controlsBrands = ['ABB', 'Eaton', 'Emerson', 'GE', 'Honeywell', 'Mitsubishi Electric', 'Phoenix Contact', 'Rockwell Automation', 'Schneider Electric', 'Schweitzer Engineering Laboratories', 'Siemens', 'Yaskawa', 'Yokogawa'];
export const switchgearBrands = ['ABB', 'Baypower', 'Eaton', 'GE', 'Mitsubishi Electric', 'North American Switchgear', 'Phoenix Electric', 'Schneider Electric', 'Siemens', 'Switchgear Power Systems', 'Whatoop'];
export const standardsOptions = ['All (Default)', 'IEEE 1547', 'IEEE 1547.2-2023', 'NFPA 70', 'DFAR 252', 'UL 1741', 'IEEE 2800'];
export const primeMoverOptions = [
    { name: "Reciprocating (Piston) Engines", sizeRange: "50 kW – 5 MW" }, { name: "Gas Turbines (Aero-Derivative)", sizeRange: "1 MW – 50 MW" }, { name: "Simple Cycle Gas Turbines", sizeRange: "Varies" }, { name: "Linear Generators", sizeRange: "250 kW – 5 MW" }, { name: "Microreactors (Very Small SMRs)", sizeRange: "1 – 20 MW" }, { name: "Small nuclear (Light-Water SMRs - LWR-SMRs)", sizeRange: "60 – 470 MW" }, { name: "Microturbines", sizeRange: "25 kW – 500 kW" }, { name: "Micro-Engines / Stirling Engines", sizeRange: "1 kW – 50 kW" }, { name: "Fuel Cells", sizeRange: "100 kW – 10 MW" }, { name: "Steam Turbines (Gas-Fired Boiler)", sizeRange: "500 kW – 50 MW" }, { name: "Other", sizeRange: "" }
];

const SubStep3: React.FC = () => {
  const dispatch = useAppDispatch();
  const equipmentPreferencesState = useAppSelector((state) => state.siteAssessment.equipmentPreferences);
  
  const { primeMover, primeMoverOther, primeMoverBrand, controlsBrand, controlsBrandOther, switchgearBrand, switchgearBrandOther, standard, standardOther } = equipmentPreferencesState;

  const handleUpdateField = (field: keyof EquipmentPreferencesState, value: string) => {
      dispatch(updateEquipmentField({ field, value }));
  };

  const handlePrimeMoverChange = (e: SelectChangeEvent) => {
    handleUpdateField('primeMover', e.target.value);
  };

  const availableBrands = brandMapping[primeMover as keyof typeof brandMapping] ? [...brandMapping[primeMover as keyof typeof brandMapping]].sort() : [];

  const menuProps = {
    PaperProps: {
      sx: {
        maxHeight: 48 * 4.5,
        '&::-webkit-scrollbar': { display: 'none' },
        'scrollbarWidth': 'none',
        'msOverflowStyle': 'none',
      },
    },
  };

  const sections = [
    { label: 'Preferred Prime Mover Brand:', state: primeMoverBrand, field: 'primeMoverBrand', options: availableBrands, disabled: availableBrands.length === 0, otherField: null },
    { label: 'Preferred Controls Brand:', state: controlsBrand, field: 'controlsBrand', options: [...controlsBrands].sort(), otherField: 'controlsBrandOther', otherValue: controlsBrandOther },
    { label: 'Preferred Switchgear Brand:', state: switchgearBrand, field: 'switchgearBrand', options: [...switchgearBrands].sort(), otherField: 'switchgearBrandOther', otherValue: switchgearBrandOther },
    { label: 'Preferred Standard:', state: standard, field: 'standard', options: [...standardsOptions].sort(), otherField: 'standardOther', otherValue: standardOther },
  ];

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.75rem', p: 1, pr: 4, pl: 1, pt: 1 }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@200..1000&display=swap');`}</style>
      <Typography variant="h6" sx={{ mb: 1, fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.85rem', fontWeight: 'bold', textAlign: 'center' }}>
        <h2>Equipment Preferences (Optional)</h2>
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: '10px', pb: '10px', px: '160px' }}>
        <Typography sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.8rem', textAlign: 'justify', mb: 1 }}>
          <b>IF</b> you do not have a preference do not worry, I will calculate which prime mover, controls, and switchgear are ideal for your prioritization and goal needs.<br />
          <b>IF</b> you do choose options, I will build the DER recommendation as you instruct, however I reserve the right to provide, along side the choices you have made, the DER system that ideally meets your prioritization and goals if different.
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Typography sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.75rem', minWidth: '200px', flex: 0.3 }}><b>Preferred Prime Mover Type:</b></Typography>
          <Select size="small" value={primeMover} onChange={handlePrimeMoverChange} MenuProps={menuProps} sx={{ flex: primeMover === 'Other' ? 0.35 : 0.7, fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem', height: '40px' }}>
            <MenuItem value="default" disabled sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem' }}>Select</MenuItem>
            {primeMoverOptions.map((option) => (
              <MenuItem key={option.name} value={option.name} sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem' }}>
                {option.name} {option.sizeRange ? `(${option.sizeRange})` : ''}
              </MenuItem>
            ))}
          </Select>
          {primeMover === 'Other' && (
            <TextField variant="outlined" size="small" placeholder="If other, please specify" value={primeMoverOther} onChange={(e) => handleUpdateField('primeMoverOther', e.target.value)} sx={{ flex: 0.35, '& .MuiInputBase-root': { height: '40px' }, '& .MuiInputBase-input::placeholder': { fontSize: '0.7rem' } }} />
          )}
        </Box>
        {sections.map(({ label, state, field, options, disabled, otherField, otherValue }, index) => (
          <Box key={index} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.75rem', minWidth: '200px', flex: 0.3 }}><b>{label}</b></Typography>
            <Select
              size="small"
              value={state}
              onChange={(e: SelectChangeEvent) => handleUpdateField(field as keyof EquipmentPreferencesState, e.target.value)}
              disabled={disabled}
              MenuProps={menuProps}
              sx={{ flex: state === 'Other' ? 0.35 : 0.7, fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem', height: '40px' }}
            >
              {field !== 'standard' && (
                <MenuItem value="default" disabled sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem' }}>Select</MenuItem>
              )}
              {options.map((option) => (
                <MenuItem key={option} value={option} sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem' }}>
                  {option}
                </MenuItem>
              ))}
              {label !== 'Preferred Prime Mover Brand:' && <MenuItem value="Other" sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem' }}>Other</MenuItem>}
            </Select>
            {state === 'Other' && otherField && (
              <TextField variant="outlined" size="small" placeholder="If other, please specify" value={otherValue} onChange={(e) => handleUpdateField(otherField as keyof EquipmentPreferencesState, e.target.value)} sx={{ flex: 0.35, '& .MuiInputBase-root': { height: '40px' }, '& .MuiInputBase-input::placeholder': { fontSize: '0.7rem' } }} />
            )}
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default SubStep3;