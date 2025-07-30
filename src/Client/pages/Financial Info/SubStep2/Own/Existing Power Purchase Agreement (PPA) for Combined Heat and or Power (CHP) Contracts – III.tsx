import React, { useRef } from 'react';
import { Box, TextField, Typography, FormControlLabel, Switch, Tooltip, InputAdornment, List, ListItem, ListItemText, IconButton } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DeleteIcon from '@mui/icons-material/Delete';
import { useExistingPPAContractsIII } from '../../../../../Context/Financial Info/SubStep2/Own/Existing Power Purchase Agreement (PPA) for Combined Heat and or Power (CHP) Contracts – III Context';

const SubStep2: React.FC = () => {
  const { ppaContractsIIIState, updateField, addFiles, removeFile } = useExistingPPAContractsIII();
  const { hasCHP_PPA, ratekWh, rateMMBTu, escalatorkWh, escalatorMMBTu, termkWh, termMMBTu, files } = ppaContractsIIIState;
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleRatekWhChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (/^(0(\.\d{0,2})?)?$/.test(value) || value === '0' || value === '') {
      updateField('ratekWh', value);
    }
  };

  const handleRateMMBTuChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (/^(0(\.\d{0,2})?)?$/.test(value) || value === '0' || value === '') {
      updateField('rateMMBTu', value);
    }
  };

  const handleEscalatorkWhChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.replace('%', '');
    if (/^([1-9](\.\d{0,2})?)?$/.test(value) || value === '') {
      updateField('escalatorkWh', value);
    }
  };

  const handleEscalatorMMBTuChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.replace('%', '');
    if (/^([1-9](\.\d{0,2})?)?$/.test(value) || value === '') {
      updateField('escalatorMMBTu', value);
    }
  };

  const handleTermkWhChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (/^(?:[1-9]|[12]\d|30)?$/.test(value) || value === '') {
      updateField('termkWh', value);
    }
  };

  const handleTermMMBTuChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (/^(?:[1-9]|[12]\d|30)?$/.test(value) || value === '') {
      updateField('termMMBTu', value);
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => { if (event.target.files) addFiles(Array.from(event.target.files)); };
  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => event.preventDefault();
  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => { event.preventDefault(); if (event.dataTransfer.files) addFiles(Array.from(event.dataTransfer.files)); };
  const handleUploadBoxClick = () => { fileInputRef.current?.click(); };
  const formatFileSize = (bytes: number) => { if (bytes === 0) return '0 Bytes'; const k = 1024; const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']; const i = Math.floor(Math.log(bytes) / Math.log(k)); return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]; };
  const textFieldStylesHalf = { flex: 0.25, fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem', '& .MuiInputBase-root': { height: '40px', padding: '0 6px' }, '& input': { padding: 0, fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem' }, '& .MuiInputBase-input::placeholder': { fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem' } };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.75rem', p: 1, pr: 4, pl: 1, pt: 1 }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Nunito+Sans:ital,opsz,wght@0,6..12,200..1000;1,6..12,200..1000&display=swap');`}</style>
      <Typography variant="h6" sx={{ mb: 1, fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.85rem', fontWeight: 'bold', textAlign: 'center' }}>
        <h2>Existing Power Purchase Agreement (PPA) for Combined Heat and/or Power (CHP) Contracts – III</h2>
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 0 }}>
        <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 2, pt: '10px', pb: '10px', pl: '160px', pr: '160px' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <FormControlLabel control={<Switch checked={hasCHP_PPA} onChange={(e) => updateField('hasCHP_PPA', e.target.checked)} size="small" />} label="Do you have any existing PPAs for thermal energy or Combined Heat and Power (CHP)?" sx={{ '& .MuiFormControlLabel-label': { fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.9rem' } }} />
          </Box>
          {hasCHP_PPA && (
            <Box sx={{ mb: 0, pl: 0 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 0 }}>
                <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 2, pt: '10px' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Typography sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.75rem', minWidth: '150px', flex: 0.5 }}><b>Rate: </b>(In $/kWh and $/MMBTu)</Typography>
                    <Tooltip title="Enter rate in $/kWh" placement='left' arrow><TextField variant="outlined" size="small" type="text" placeholder='0.01 - 0.99 ($/kWh)' value={ratekWh} onChange={handleRatekWhChange} sx={textFieldStylesHalf} InputProps={{ startAdornment: <InputAdornment position="start">$</InputAdornment> }} /></Tooltip>
                    <Tooltip title="Enter rate in $/MMBTu" placement='right' arrow><TextField variant="outlined" size="small" type="text" placeholder='0.01 - 0.99 ($/MMBTu)' value={rateMMBTu} onChange={handleRateMMBTuChange} sx={textFieldStylesHalf} InputProps={{ startAdornment: <InputAdornment position="start">$</InputAdornment> }} /></Tooltip>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Typography sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.75rem', minWidth: '150px', flex: 0.5 }}><b>Escalator: </b>(in %)</Typography>
                    <Tooltip title="Escalator for kWh" placement='left' arrow><TextField variant="outlined" size="small" type="text" placeholder='1 - 9% (for kWh)' value={escalatorkWh} onChange={handleEscalatorkWhChange} inputProps={{ onBlur: () => { if (escalatorkWh && !escalatorkWh.includes('%')) updateField('escalatorkWh', escalatorkWh + '%'); } }} sx={textFieldStylesHalf} /></Tooltip>
                    <Tooltip title="Escalator for MMBTu" placement='right' arrow><TextField variant="outlined" size="small" type="text" placeholder='1 - 9% (for MMBTu)' value={escalatorMMBTu} onChange={handleEscalatorMMBTuChange} inputProps={{ onBlur: () => { if (escalatorMMBTu && !escalatorMMBTu.includes('%')) updateField('escalatorMMBTu', escalatorMMBTu + '%'); } }} sx={textFieldStylesHalf} /></Tooltip>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Typography sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.75rem', minWidth: '150px', flex: 0.5 }}><b>Term: </b>(In Years)</Typography>
                    <Tooltip title="Term for kWh PPA" placement='left' arrow><TextField variant="outlined" size="small" type="number" placeholder='0 - 30y (kWh PPA)' value={termkWh} onChange={handleTermkWhChange} sx={textFieldStylesHalf} /></Tooltip>
                    <Tooltip title="Term for MMBTu PPA" placement='right' arrow><TextField variant="outlined" size="small" type="number" placeholder='0 - 30y (MMBTu PPA)' value={termMMBTu} onChange={handleTermMMBTuChange} sx={textFieldStylesHalf} /></Tooltip>
                  </Box>
                  <input type="file" multiple accept=".pdf,.xls,.xlsx,.csv" onChange={handleFileChange} ref={fileInputRef} style={{ display: 'none' }} />
                  <Tooltip title="Click to upload files here." placement="bottom-start" arrow>
                    <Box onClick={handleUploadBoxClick} onDragOver={handleDragOver} onDrop={handleDrop} sx={{ display: 'flex', alignItems: 'center', border: '1px dashed grey', borderRadius: 2, p: 2, mb: 0, mt: 1.5, justifyContent: 'center', cursor: 'pointer', '&:hover': { borderColor: 'primary.main' } }}>
                      <CloudUploadIcon fontSize="medium" />
                      <Typography sx={{ fontSize: '0.8rem', fontFamily: 'Nunito Sans, sans-serif', ml: 1 }}>Drag and drop files here or click to upload your existing PPA contracts (PDF, Excel, CSV)</Typography>
                    </Box>
                  </Tooltip>
                  <Typography sx={{ fontSize: '0.75rem', fontFamily: 'Nunito Sans, sans-serif', mb: 0, textAlign: 'right' }}><b>*</b>Accepted File Formats: .xls, .xlsx, .csv, .pdf</Typography>
                  {files.length > 0 && (
                    <Box sx={{ mt: 2 }}>
                      <Typography sx={{ fontSize: '0.8rem', fontFamily: 'Nunito Sans, sans-serif', mb: 1, fontWeight: 'bold' }}>Uploaded Files:</Typography>
                      <List dense>{files.map((file, index) => (<ListItem key={index} secondaryAction={<IconButton edge="end" aria-label="delete" onClick={() => removeFile(file.name)}><DeleteIcon /></IconButton>}><ListItemText primary={file.name} secondary={formatFileSize(file.size)} primaryTypographyProps={{ fontSize: '0.75rem', fontFamily: 'Nunito Sans, sans-serif' }} secondaryTypographyProps={{ fontSize: '0.65rem', fontFamily: 'Nunito Sans, sans-serif' }} /></ListItem>))}</List>
                    </Box>
                  )}
                </Box>
              </Box>
            </Box>
          )}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography sx={{ mt: 1, fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.75rem', minWidth: '200px', flex: 1 }}>
              <i><b>* </b>If <b>Yes</b>, please provide details in the fields or upload the agreement and Bradley will autopopulate the fields for you.</i><br />
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default SubStep2;