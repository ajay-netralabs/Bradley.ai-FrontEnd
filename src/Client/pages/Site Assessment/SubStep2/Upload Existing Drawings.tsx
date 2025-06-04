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
        <h2>Upload MEP Drawings, Short Circuit Study, Single Line Diagram</h2>
      </Typography>
      
      <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 0 }}>
      <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 2, pt: '10px', pb: '10px', pl: '160px', pr: '160px' }}>
        <Typography sx={{ fontSize: '0.75rem', fontFamily: 'Nunito Sans, sans-serif', mb: 0, textAlign: 'center' }}>I generate one-line diagrams and balance of plant layouts. Knowing your available floor space, equipment layout and having access to your existing one-line diagram and short circuit study will increase the accuracy of the method to connect the recommended DER solution to your existing infrastructure.<br /><br /><b>IF</b> – you do not have these documents uploaded, do not worry: I will still provide a fully capable 30% conceptual DER design but will engineer a method of interconnect, control, protection and synchronization as needed by the DER recommendation.</Typography>

      <Box sx={{ display: 'flex', alignItems: 'center', border: '1px dashed grey', borderRadius: 2, p: 5, mb: 0, mt: 1.5, justifyContent: 'center' }}>
        <CloudUploadIcon fontSize='medium'/>
        <Typography sx={{ fontSize: '0.8rem', fontFamily: 'Nunito Sans, sans-serif', ml: 1 }}>Drag and drop files here or click to upload (PDF, Excel, CSV)</Typography>
      </Box>
      <Typography sx={{ fontSize: '0.75rem', fontFamily: 'Nunito Sans, sans-serif', mb: 0, textAlign: 'right' }}><b>*</b>Accepted File Formats: .pdf, .cad, .jpeg, .bmp, .tif</Typography>
    </Box></Box></Box>
  );
};

export default SubStep2;
