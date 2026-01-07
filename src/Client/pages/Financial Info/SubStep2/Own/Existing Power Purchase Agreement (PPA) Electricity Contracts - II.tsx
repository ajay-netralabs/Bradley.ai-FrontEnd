import React, { useRef } from 'react';
import { Box, TextField, Typography, FormControlLabel, Switch, Tooltip, InputAdornment, List, ListItem, ListItemText, IconButton } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DeleteIcon from '@mui/icons-material/Delete';
import { useExistingPPAContractsII } from '../../../../Context/Financial Info/SubStep2/Own/Existing Power Purchase Agreement (PPA) Electricity Contracts - II Context';

const SubStep2: React.FC = () => {
  const { ppaContractsIIState, updateField, addFiles, removeFile } = useExistingPPAContractsII();
  const { hasPPA, providerName, ppaStartDate, ppaEndDate, ppaRate, ppaEscalation, files } = ppaContractsIIState;
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handlePpaRateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (/^(0(\.\d{0,2})?)?$/.test(value) || value === '0' || value === '') {
      updateField('ppaRate', value);
    }
  };

  const handlePpaEscalationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.replace('%', '');
    if (/^([1-9](\.\d{0,2})?)?$/.test(value) || value === '') {
      updateField('ppaEscalation', value);
    }
  };
  
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) addFiles(Array.from(event.target.files));
  };
  
  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => event.preventDefault();
  
  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    if (event.dataTransfer.files) addFiles(Array.from(event.dataTransfer.files));
  };

  const handleUploadBoxClick = () => {
    fileInputRef.current?.click();
  };
  
  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024; const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const textFieldStyles = { flex: 0.5, fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem', '& .MuiInputBase-root': { height: '40px', padding: '0 6px' }, '& input': { padding: 0, fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem' }, '& .MuiInputBase-input::placeholder': { fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem' } };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.75rem', p: 1, pr: 4, pl: 1, pt: 1 }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Nunito+Sans:ital,wght@0,200..1000;1,200..1000&display=swap');`}</style>
      <Typography variant="h6" sx={{ mb: 1, fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.85rem', fontWeight: 'bold', textAlign: 'center' }}>
        <h2>Existing Power Purchase Agreement (PPA) Electricity Contracts - II</h2>
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 0 }}>
        <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 2, pt: '10px', pb: '10px', pl: '160px', pr: '160px' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Tooltip title="PPAs are a third-party agreements whereby you are buying a specific minimum of kWh at a defined initial rate and escalation rate for electricity or therms. These commitments are critical to properly evaluate the financial performance of the DER recommendation and will help me propose the most optimized DER recommendation to match to your priorities." placement='right' arrow>
              <FormControlLabel control={<Switch checked={hasPPA} onChange={(e) => updateField('hasPPA', e.target.checked)} size="small" />} label="Do you have any existing Power Purchase Agreements (PPAs)?" sx={{ '& .MuiFormControlLabel-label': { fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.9rem' } }} />
            </Tooltip>
          </Box>
          {hasPPA && (
            <Box sx={{ mb: 0, pl: 0 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 0 }}>
                <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 2, pt: '10px' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Typography sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.75rem', minWidth: '150px', flex: 0.5 }}><b>PPA Provider:</b></Typography>
                    <TextField variant="outlined" size="small" type="text" placeholder='Enter Provider Name' value={providerName} onChange={(e) => updateField('providerName', e.target.value)} sx={textFieldStyles} />
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Typography sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.75rem', minWidth: '150px', flex: 0.5 }}><b>PPA Term Start Date:</b></Typography>
                    <TextField variant="outlined" size="small" type="date" value={ppaStartDate} onChange={(e) => updateField('ppaStartDate', e.target.value)} sx={textFieldStyles} />
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Typography sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.75rem', minWidth: '150px', flex: 0.5 }}><b>PPA End Date:</b></Typography>
                    <TextField variant="outlined" size="small" type="date" value={ppaEndDate} onChange={(e) => updateField('ppaEndDate', e.target.value)} sx={textFieldStyles} />
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Typography sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.75rem', minWidth: '150px', flex: 0.5 }}><b>PPA Rate (Initial Year): </b>(Per kWh)</Typography>
                    <TextField variant="outlined" size="small" type="text" placeholder='0.01 - 0.99' value={ppaRate} onChange={handlePpaRateChange} sx={textFieldStyles} InputProps={{ startAdornment: <InputAdornment position="start">$</InputAdornment> }} />
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Typography sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.75rem', minWidth: '150px', flex: 0.5 }}><b>PPA Escalation Rate: </b>(In %)</Typography>
                    <TextField variant="outlined" size="small" type="text" placeholder="1 - 9.99%" value={ppaEscalation} onChange={handlePpaEscalationChange} sx={textFieldStyles} inputProps={{ onBlur: () => { if (ppaEscalation && !ppaEscalation.includes('%')) updateField('ppaEscalation', ppaEscalation + '%'); } }} />
                  </Box>
                  <input type="file" multiple accept=".pdf" onChange={handleFileChange} ref={fileInputRef} style={{ display: 'none' }} />
                  <Tooltip title="Click to upload files here." placement="bottom-start" arrow>
                    <Box onClick={handleUploadBoxClick} onDragOver={handleDragOver} onDrop={handleDrop} sx={{ display: 'flex', alignItems: 'center', border: '1px dashed grey', borderRadius: 2, p: 2, mb: 0, mt: 1.5, justifyContent: 'center', cursor: 'pointer', '&:hover': { borderColor: 'primary.main' } }}>
                      <CloudUploadIcon fontSize='medium' />
                      <Typography sx={{ fontSize: '0.8rem', fontFamily: 'Nunito Sans, sans-serif', ml: 1 }}>Upload a PDF of your PPA and I will review the document and extract the data and auto populate the fields above.</Typography>
                    </Box>
                  </Tooltip>
                  <Typography sx={{ fontSize: '0.75rem', fontFamily: 'Nunito Sans, sans-serif', mt: -1, mb: 0, textAlign: 'right' }}><b>*</b>Accepted File Formats: .pdf</Typography>
                  {files.length > 0 && (
                    <Box sx={{ mt: 2 }}>
                      <Typography sx={{ fontSize: '0.8rem', fontFamily: 'Nunito Sans, sans-serif', mb: 1, fontWeight: 'bold' }}>Uploaded Files:</Typography>
                      <List dense>
                        {files.map((file, index) => (<ListItem key={index} secondaryAction={<IconButton edge="end" aria-label="delete" onClick={() => removeFile(file.name)}><DeleteIcon /></IconButton>}><ListItemText primary={file.name} secondary={formatFileSize(file.size)} primaryTypographyProps={{ fontSize: '0.75rem', fontFamily: 'Nunito Sans, sans-serif' }} secondaryTypographyProps={{ fontSize: '0.65rem', fontFamily: 'Nunito Sans, sans-serif' }} /></ListItem>))}
                      </List>
                    </Box>
                  )}
                </Box>
              </Box>
            </Box>
          )}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography sx={{ mt: 1, fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.75rem', minWidth: '200px', flex: 1 }}><i><b>* </b>If <b>Yes</b>, please provide details in the fields or upload the agreement and EmissionCheckIQ+ will autopopulate the fields for you.</i></Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default SubStep2;