import React from 'react';
import { Box, Typography } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const SubStep2: React.FC = () => { 
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.75rem', p: 1, pr: 4, pl: 1, pt: 1 }}>
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Nunito+Sans:ital,opsz,wght@0,6..12,200..1000;1,6..12,200..1000&display=swap');
      </style>
      <Typography variant="h6" sx={{ mb: 1, fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.85rem', fontWeight: 'bold', textAlign: 'center' }}>
        <h2>Upload Existing Drawings</h2>
      </Typography>
      
      <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 0 }}>
      <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 2, pt: '10px', pb: '10px', pl: '160px', pr: '160px' }}>
        <Typography sx={{ fontSize: '0.75rem', fontFamily: 'Nunito Sans, sans-serif', mb: 0, textAlign: 'center' }}><b>If you have existing drawings (MEP; equipment, panel schedules); or documentation (one-line diagrams; short circuit studies) related to your facility's infrastructure, you can optionally upload them here. This information will improve the accuracy of the DER system design, but is not required.</b></Typography>

      <Box sx={{ display: 'flex', alignItems: 'center', border: '1px dashed grey', borderRadius: 2, p: 5, mb: 0, mt: 1.5, justifyContent: 'center' }}>
        <CloudUploadIcon fontSize='medium'/>
        <Typography sx={{ fontSize: '0.8rem', fontFamily: 'Nunito Sans, sans-serif', ml: 1 }}>Drag and drop files here or click to upload (PDF, Excel, CSV)</Typography>
      </Box>
      <Typography sx={{ fontSize: '0.75rem', fontFamily: 'Nunito Sans, sans-serif', mb: 0, textAlign: 'right' }}><b>*</b>Accepted File Formats: .pdf, .cad, .jpeg, .bmp, .tif</Typography>
    </Box></Box></Box>
  );
};

export default SubStep2;
