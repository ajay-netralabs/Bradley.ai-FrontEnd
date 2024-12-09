import React from 'react';
import { Box, TextField, Typography } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const SubStep2: React.FC = () => { 
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.75rem', p: 1, pr: 4, pl: 1, pt: 1 }}>
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Nunito+Sans:ital,opsz,wght@0,6..12,200..1000;1,6..12,200..1000&display=swap');
      </style>
      <Typography variant="h6" sx={{ mb: 1, fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.85rem', fontWeight: 'bold', textAlign: 'center' }}>
        <h2>Energy Load Profile</h2>
      </Typography>
      
      <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 0 }}>
      <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 2, pt: '10px', pb: '10px', pl: '160px', pr: '160px' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Typography sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.75rem', minWidth: '150px', flex: 0.25 }}><b>Data Range (Optional):</b></Typography>
          <TextField
            variant="outlined" 
            size="small" 
            type="date" 
            sx={{
              flex: 0.75, fontFamily: 'Nunito Sans, sans-serif',
              fontSize: '0.7rem',
              '& .MuiInputBase-root': { height: '40px', padding: '0 6px' },
              '& input': { padding: 0, fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.8rem' }
            }}
          />
          to 
          <TextField
            variant="outlined" 
            size="small" 
            type="date" 
            sx={{
              flex: 0.75, fontFamily: 'Nunito Sans, sans-serif',
              fontSize: '0.7rem',
              '& .MuiInputBase-root': { height: '40px', padding: '0 6px' },
              '& input': { padding: 0, fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.8rem' }
            }}
          />
        </Box>
        <Typography sx={{ fontSize: '0.75rem', fontFamily: 'Nunito Sans, sans-serif', mb: 0, textAlign: 'right' }}><b>*</b>Minimum of 12 months of data/24+ months for optimal results. <br /><b>**</b>Minimum 15-minute intervals.</Typography>

      <Box sx={{ display: 'flex', alignItems: 'center', border: '1px dashed grey', borderRadius: 2, p: 2, mb: 0, mt: 1.5, justifyContent: 'center' }}>
        <CloudUploadIcon fontSize='medium'/>
        <Typography sx={{ fontSize: '0.8rem', fontFamily: 'Nunito Sans, sans-serif', ml: 1 }}>Drag and drop files here or click to upload (PDF, Excel, CSV)</Typography>
      </Box>
      <Typography sx={{ fontSize: '0.75rem', fontFamily: 'Nunito Sans, sans-serif', mb: 0, textAlign: 'right' }}><b>*</b>Accepted File Formats: .xls, .xlsx, .csv</Typography>
    </Box></Box></Box>
  );
};

export default SubStep2;


// import React, { useState } from 'react';
// import { Box, TextField, Button, Typography, Radio, RadioGroup, FormControlLabel, MenuItem, Switch, Checkbox, IconButton } from '@mui/material';
// import CloudUploadIcon from '@mui/icons-material/CloudUpload';
// import AddCircleIcon from '@mui/icons-material/AddCircle';
// import DeleteIcon from '@mui/icons-material/Delete';

// const SubStep2 = () => {
//   const [showSteam, setShowSteam] = useState(false);
//   const [showHotWater, setShowHotWater] = useState(false);
//   const [showChilledWater, setShowChilledWater] = useState(false);
//   const [showWasteHeat, setShowWasteHeat] = useState(false);
//   const [showBoiler, setShowBoiler] = useState(false);
//   const [wasteHeatSources, setWasteHeatSources] = useState([]);
//   const [boilerSystems, setBoilerSystems] = useState([]);

//   const handleAddWasteHeatSource = () => {
//     setWasteHeatSources([...wasteHeatSources, { type: '', temperature: '', flowRate: '', utilization: '' }]);
//   };

//   const handleRemoveWasteHeatSource = (index) => {
//     setWasteHeatSources(wasteHeatSources.filter((_, i) => i !== index));
//   };

//   const handleAddBoilerSystem = () => {
//     setBoilerSystems([...boilerSystems, { type: '', capacity: '', fuelSource: '', efficiency: '', age: '', operatingPressure: '', maintenanceHistory: '', wasteHeatUtilization: '', wasteHeatVolume: '' }]);
//   };

//   const handleRemoveBoilerSystem = (index) => {
//     setBoilerSystems(boilerSystems.filter((_, i) => i !== index));
//   };

//   return (
//     <Box sx={{ display: 'flex', flexDirection: 'column', fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.75rem', p: 1 }}>
//       <Typography variant="h6" sx={{ mb: 1, fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.85rem', fontWeight: 'bold' }}>
//         Energy Load Profile
//       </Typography>
      
//       <Typography sx={{ mb: 1 }}>Data Range (Optional): <br /> *Minimum of 12 months of data/24+ months for optimal results <br /> **Minimum 15-minute intervals</Typography>
//       <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
//         <TextField size="small" label="Start Date" type="date" fullWidth />
//         <TextField size="small" label="End Date" type="date" fullWidth />
//       </Box>

//       <Box sx={{ display: 'flex', alignItems: 'center', border: '1px dashed grey', p: 2, mb: 2 }}>
//         <CloudUploadIcon />
//         <Typography sx={{ ml: 1 }}>Drag and drop files here or click to upload (PDF, Excel, CSV)</Typography>
//       </Box>
//       <Typography sx={{ fontSize: '0.75rem', mb: 1 }}>Accepted File Formats: .xls, .xlsx, .csv</Typography>

//       <Typography sx={{ mb: 1, fontWeight: 'bold' }}>Thermal Energy Needs</Typography>
//       <FormControlLabel
//         control={<Switch checked={showSteam} onChange={() => setShowSteam(!showSteam)} />}
//         label="Does your facility require steam?"
//       />

//       {showSteam && (
//         <Box sx={{ mb: 2, pl: 2 }}>
//           <TextField size="small" label="Annual Steam Usage" type="number" fullWidth sx={{ mb: 1 }} placeholder="Enter value" />
//           <TextField
//             size="small"
//             label="Steam Pressure (PSIG)"
//             select
//             fullWidth
//             sx={{ mb: 1 }}
//             placeholder="Select pressure level"
//           >
//             <MenuItem value="Low">Low</MenuItem>
//             <MenuItem value="Medium">Medium</MenuItem>
//             <MenuItem value="High">High</MenuItem>
//           </TextField>
//           <RadioGroup row>
//             <FormControlLabel value="Constant" control={<Radio size="small" />} label="Constant" />
//             <FormControlLabel value="Variable" control={<Radio size="small" />} label="Variable" />
//           </RadioGroup>
//           <TextField size="small" label="Condensate Return (Optional)" type="number" fullWidth placeholder="Enter value" />
//         </Box>
//       )}

//       <FormControlLabel
//         control={<Switch checked={showHotWater} onChange={() => setShowHotWater(!showHotWater)} />}
//         label="Does your facility require hot water for HVAC, or processes, excluding domestic requirements?"
//       />

//       {showHotWater && (
//         <Box sx={{ mb: 2, pl: 2 }}>
//           <TextField size="small" label="Hot Water Usage" type="number" fullWidth sx={{ mb: 1 }} placeholder="Enter value" />
//           <TextField size="small" label="Hot Water Temperature (°F)" type="number" fullWidth sx={{ mb: 1 }} placeholder="Enter temperature" />
//           <Typography>Hot Water Usage Type:</Typography>
//           <Box sx={{ display: 'flex', flexDirection: 'column', mb: 1 }}>
//             {["Domestic Hot Water", "Preheat for Steam", "Food Preparation/Washdowns", "Other"].map((label) => (
//               <FormControlLabel
//                 key={label}
//                 control={<Checkbox size="small" />}
//                 label={
//                   <Box sx={{ display: 'flex', alignItems: 'center' }}>
//                     <Typography sx={{ mr: 1 }}>{label}:</Typography>
//                     <TextField size="small" placeholder="Annual Usage (Gallons/BTUs)" type="number" />
//                   </Box>
//                 }
//               />
//             ))}
//           </Box>
//         </Box>
//       )}

//       <FormControlLabel
//         control={<Switch checked={showChilledWater} onChange={() => setShowChilledWater(!showChilledWater)} />}
//         label="Does your facility require chilled water?"
//       />

//       {showChilledWater && (
//         <Box sx={{ mb: 2, pl: 2 }}>
//           <TextField size="small" label="Chilled Water Usage" fullWidth sx={{ mb: 1 }} placeholder="Enter annual usage" />
//           <TextField size="small" label="Chilled Water Temperature (°F)" type="number" fullWidth sx={{ mb: 1 }} placeholder="Enter temperature" />
//           <TextField size="small" label="Additional Chilled Water Demand (Optional, in Tons)" type="number" fullWidth placeholder="Optional, in Tons" />
//         </Box>
//       )}

//       <FormControlLabel
//         control={<Switch checked={showWasteHeat} onChange={() => setShowWasteHeat(!showWasteHeat)} />}
//         label="Do any of your processes or equipment generate waste heat?"
//       />

//       {showWasteHeat && (
//         <Box sx={{ mb: 2, pl: 2 }}>
//           {wasteHeatSources.map((source, index) => (
//             <Box key={index} sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
//               <TextField size="small" label="Type" select fullWidth placeholder="Select type">
//                 <MenuItem value="Industrial Processes">Industrial Processes</MenuItem>
//                 <MenuItem value="Furnaces">Furnaces</MenuItem>
//                 <MenuItem value="Engines">Engines</MenuItem>
//                 <MenuItem value="Boilers">Boilers</MenuItem>
//                 <MenuItem value="Others">Others</MenuItem>
//               </TextField>
//               <TextField size="small" label="Temperature (°F)" type="number" fullWidth placeholder="Enter temperature" />
//               <TextField size="small" label="Flow Rate (Optional)" placeholder="BTU/hr, lbs/hr" fullWidth />
//               <TextField size="small" label="Utilization (Optional)" select fullWidth>
//                 <MenuItem value="Not Utilized">Not Utilized</MenuItem>
//                 <MenuItem value="Space Heating">Space Heating</MenuItem>
//                 <MenuItem value="Process Heat">Process Heat</MenuItem>
//                 <MenuItem value="Other">Other</MenuItem>
//               </TextField>
//               <IconButton onClick={() => handleRemoveWasteHeatSource(index)}><DeleteIcon fontSize="small" /></IconButton>
//             </Box>
//           ))}
//           <Button startIcon={<AddCircleIcon />} onClick={handleAddWasteHeatSource} size="small">Add Another Entry</Button>
//         </Box>
//       )}

//       <FormControlLabel
//         control={<Switch checked={showBoiler} onChange={() => setShowBoiler(!showBoiler)} />}
//         label="Existing Boiler/Cogeneration"
//       />

//       {showBoiler && (
//         <Box sx={{ mb: 2, pl: 2 }}>
//           {boilerSystems.map((system, index) => (
//             <Box key={index} sx={{ display: 'flex', flexDirection: 'column', gap: 1, mb: 2 }}>
//               <TextField
//                 size="small"
//                 label="System Type"
//                 select
//                 fullWidth
//                 placeholder="Select system type"
//               >
//                 <MenuItem value="Boiler">Boiler</MenuItem>
//                 <MenuItem value="Cogeneration">Cogeneration</MenuItem>
//               </TextField>
//               <TextField size="small" label="Capacity (BHP)" type="number" fullWidth placeholder="Enter capacity" />
//               <TextField size="small" label="Fuel Source" type="text" fullWidth placeholder="Enter fuel source" />
//               <TextField size="small" label="Efficiency (%)" type="number" fullWidth placeholder="Enter efficiency" />
//               <TextField size="small" label="Age" type="number" fullWidth placeholder="Enter age in years" />
//               <TextField size="small" label="Operating Pressure (PSIG)" type="number" fullWidth placeholder="Enter operating pressure" />
//               <TextField size="small" label="Maintenance History (Last 3 years)" type="text" fullWidth placeholder="Describe maintenance history" />
//               <TextField size="small" label="Waste Heat Utilization" select fullWidth placeholder="Select utilization type">
//                 <MenuItem value="Not Utilized">Not Utilized</MenuItem>
//                 <MenuItem value="Space Heating">Space Heating</MenuItem>
//                 <MenuItem value="Process Heat">Process Heat</MenuItem>
//                 <MenuItem value="Other">Other</MenuItem>
//               </TextField>
//               <TextField size="small" label="Waste Heat Volume (BTU/hr)" type="number" fullWidth placeholder="Enter waste heat volume" />
//               <IconButton onClick={() => handleRemoveBoilerSystem(index)}><DeleteIcon fontSize="small" /></IconButton>
//             </Box>
//           ))}
//           <Button startIcon={<AddCircleIcon />} onClick={handleAddBoilerSystem} size="small">Add Another Entry</Button>
//         </Box>
//       )}
//     </Box>
//   );
// };

// export default SubStep2;
