import React, { useRef } from 'react';
import { Box, TextField, Typography, FormControlLabel, Switch, Tooltip, InputAdornment, List, ListItem, ListItemText, IconButton, Select, MenuItem, SelectChangeEvent } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DeleteIcon from '@mui/icons-material/Delete';
import { useExistingContractsIV } from '../../../../../Context/Financial Info/SubStep2/Own/Existing Energy Contracts - IV Context';

const SubStep2: React.FC = () => {
  const { existingContractsIVState, updateField, addFiles, removeFile } = useExistingContractsIV();
  const { hasSteamContract, rate, escalator, offtakeRequirement, condensateReturn, condensatePercentage, files } = existingContractsIVState;
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleRateChange = (value: string) => {
    const cleaned = value.replace(/[^0-9.]/g, '');
    updateField('rate', cleaned);
  };

  const handleRateBlur = () => {
    const parsed = parseFloat(rate);
    if (!isNaN(parsed)) {
      const formatted = parsed.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2, maximumFractionDigits: 2 });
      updateField('rate', formatted);
    } else {
      updateField('rate', '');
    }
  };
  
  const handleEscalatorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (/^([1-9](\.\d{0,2})?)?$/.test(value) || value === '') {
      updateField('escalator', value);
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => { if (event.target.files) addFiles(Array.from(event.target.files)); };
  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => event.preventDefault();
  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => { event.preventDefault(); if (event.dataTransfer.files) addFiles(Array.from(event.dataTransfer.files)); };
  const handleUploadBoxClick = () => { fileInputRef.current?.click(); };
  const formatFileSize = (bytes: number) => { if (bytes === 0) return '0 Bytes'; const k = 1024; const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']; const i = Math.floor(Math.log(bytes) / Math.log(k)); return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]; };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.75rem', p: 1, pr: 4, pl: 1, pt: 1 }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Nunito+Sans:ital,opsz,wght@0,6..12,200..1000;1,6..12,200..1000&display=swap');`}</style>
      <Typography variant="h6" sx={{ mb: 1, fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.85rem', fontWeight: 'bold', textAlign: 'center' }}>
        <h2>Existing Energy Contracts - IV</h2>
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 0 }}>
        <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 2, pt: '10px', pb: '10px', pl: '160px', pr: '160px' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Tooltip title="Steam contracts are a third-party agreement to sell therms (in MLBs of steam)..." placement="right-start" arrow>
              <FormControlLabel control={<Switch checked={hasSteamContract} onChange={(e) => updateField('hasSteamContract', e.target.checked)} size="small" />} label="Do you have any existing Steam Contracts?" sx={{ '& .MuiFormControlLabel-label': { fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.9rem' } }} />
            </Tooltip>
          </Box>
          {hasSteamContract && (
            <Box sx={{ mb: 0, pl: 0 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 0 }}>
                <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 2, pt: '10px', pb: '10px' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Typography sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.75rem', minWidth: '150px', flex: 0.5 }}><b>Rate: </b>(In MLBs of steam)</Typography>
                    <TextField variant="outlined" size="small" type="text" placeholder="Enter Rate in USD" value={rate} onChange={(e) => handleRateChange(e.target.value)} onBlur={handleRateBlur} InputProps={{ startAdornment: <InputAdornment position="start">$</InputAdornment> }} sx={{ flex: 0.5, fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem', '& .MuiInputBase-root': { height: '40px', padding: '0 6px' }, '& input': { padding: 0, fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem' }, '& .MuiInputBase-input::placeholder': { fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem' } }} />
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Typography sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.75rem', minWidth: '150px', flex: 0.5 }}><b>Escalator: </b>(in %)</Typography>
                    <TextField variant="outlined" size="small" type="number" value={escalator} onChange={handleEscalatorChange} placeholder="Enter percentage" InputProps={{ endAdornment: <InputAdornment position="end">%</InputAdornment> }} inputProps={{ step: '0.1', min: 1, max: 9.9 }} sx={{ flex: 0.5, fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem', '& .MuiInputBase-root': { height: '40px', padding: '0 6px' }, '& input': { padding: 0, fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem' }, '& .MuiInputBase-input::placeholder': { fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem' } }} />
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Typography sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.75rem', minWidth: '150px', flex: 0.5 }}><b>Offtake Requirements:</b><br />(Required amount per agreement in MLBs)</Typography>
                    <TextField variant="outlined" size="small" type="number" placeholder="Input" value={offtakeRequirement} onChange={(e) => updateField('offtakeRequirement', e.target.value)} sx={{ flex: 0.5, fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem', '& .MuiInputBase-root': { height: '40px', padding: '0 6px' }, '& input': { padding: 0, fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem' }, '& .MuiInputBase-input::placeholder': { fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem' } }} />
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Typography sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.75rem', minWidth: '150px', flex: 0.5 }}><b>Contract Requirements for Return of Condensate:</b></Typography>
                    <Select size="small" id="condensate-select" value={condensateReturn} onChange={(e: SelectChangeEvent) => updateField('condensateReturn', e.target.value)} sx={{ flex: 0.5, marginLeft: 'auto', fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem', height: '40px', '& .MuiInputBase-root': { padding: '0 6px' }, '& .MuiSelect-select': { padding: '4px 6px', fontSize: '0.7rem' } }}>
                      <MenuItem value="yes" sx={{ fontSize: '0.7rem' }}>Yes</MenuItem>
                      <MenuItem value="no" sx={{ fontSize: '0.7rem' }}>No</MenuItem>
                    </Select>
                  </Box>
                  {condensateReturn === 'yes' && (
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Typography sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.75rem', minWidth: '150px', flex: 0.5 }}><b>What Percentage of Condensate is Required to be Returned?</b> (in %)</Typography>
                      <TextField variant="outlined" size="small" type="number" placeholder="Enter percentage" value={condensatePercentage} onChange={(e) => updateField('condensatePercentage', e.target.value)} InputProps={{ endAdornment: <InputAdornment position="end">%</InputAdornment> }} sx={{ flex: 0.5, fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem', '& .MuiInputBase-root': { height: '40px', padding: '0 6px' }, '& input': { padding: 0, fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem' }, '& .MuiInputBase-input::placeholder': { fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem' } }} />
                    </Box>
                  )}
                  <input type="file" multiple accept=".pdf,.xls,.xlsx,.csv" onChange={handleFileChange} ref={fileInputRef} style={{ display: 'none' }} />
                  <Tooltip title="Click to upload files here." placement="bottom-start" arrow>
                    <Box onClick={handleUploadBoxClick} onDragOver={handleDragOver} onDrop={handleDrop} sx={{ display: 'flex', alignItems: 'center', border: '1px dashed grey', borderRadius: 2, p: 2, mb: 0, mt: 1.5, justifyContent: 'center', cursor: 'pointer', '&:hover': { borderColor: 'primary.main' } }}>
                      <CloudUploadIcon fontSize="medium" />
                      <Typography sx={{ fontSize: '0.8rem', fontFamily: 'Nunito Sans, sans-serif', ml: 1 }}>Drag and drop files here or click to upload your existing PPA contracts (PDF, Excel, CSV)</Typography>
                    </Box>
                  </Tooltip>
                  <Typography sx={{ fontSize: '0.75rem', fontFamily: 'Nunito Sans, sans-serif', mb: 0, textAlign: 'right' }}><b>*</b>Accepted File Formats: .xls, .xlsx, .csv</Typography>
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
              <i><b>* </b>If <b>Yes</b>, please provide details in the fields or upload the agreement and Bradley will autopopulate the fields for you.</i>
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default SubStep2;