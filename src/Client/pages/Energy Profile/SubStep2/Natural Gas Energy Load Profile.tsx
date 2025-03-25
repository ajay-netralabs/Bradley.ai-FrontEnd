import React from 'react';
import { Box, TextField, Typography, Tooltip } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const SubStep2: React.FC = () => { 
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.75rem', p: 1, pr: 4, pl: 1, pt: 1 }}>
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Nunito+Sans:ital,opsz,wght@0,6..12,200..1000;1,6..12,200..1000&display=swap');
      </style>
      <Typography variant="h6" sx={{ mb: 1, fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.85rem', fontWeight: 'bold', textAlign: 'center' }}>
        <h2>Natural Gas Energy Load Profile</h2>
      </Typography>
      
      <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 0 }}>
      <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 2, pt: '10px', pb: '10px', pl: '160px', pr: '160px' }}>
        <Typography sx={{ fontSize: '0.75rem', fontFamily: 'Nunito Sans, sans-serif', mb: 0, textAlign: 'center' }}><b>Bradley will review your uploaded PDFs of your existing electric utility bills and extract the information needed to financially project the proforma related to the CAPEX and operational costs of the recommended DER solutions.</b></Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1.5 }}>
          <Typography sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.75rem', minWidth: '150px', flex: 0.25 }}><b>Data Range (Optional):</b></Typography>
          <Tooltip title="Start date" placement='top-start' arrow>
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
                    /></Tooltip>
                    to 
                    <Tooltip title="End date" placement='top-end' arrow>
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
                    /></Tooltip>
        </Box>
        <Typography sx={{ fontSize: '0.75rem', fontFamily: 'Nunito Sans, sans-serif', mb: 0, textAlign: 'right' }}><b>*</b>Minimum of 12 months of data/24+ months for optimal results.{/*  <br /><b>**</b>Minimum 15-minute intervals. */}</Typography>
      <Tooltip title="Click to upload files here." placement='top-start' arrow>
      <Box sx={{ display: 'flex', alignItems: 'center', border: '1px dashed grey', borderRadius: 2, p: 2, mb: 0, mt: 1.5, justifyContent: 'center' }}>
        <CloudUploadIcon fontSize='medium'/>
        <Typography sx={{ fontSize: '0.8rem', fontFamily: 'Nunito Sans, sans-serif', ml: 1 }}>Drag and drop files here or click to upload (PDF, Excel, CSV)</Typography>
      </Box></Tooltip>
      <Typography sx={{ fontSize: '0.75rem', fontFamily: 'Nunito Sans, sans-serif', mb: 0, textAlign: 'right' }}><b>*</b>Accepted File Formats: .xls, .xlsx, .csv</Typography>
      <Typography sx={{ mt: 0, fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.75rem', minWidth: '200px', flex: 1 }}><i><b>*</b>To accurately  develop the <b>DER</b>, <b>Bradley</b> will need you to approve the <b>LOA</b>. The <b>LOA</b> allows <b>Bradley</b> to directly pull the demand/usage data of your <b>Natural Gas Energy Load Profile</b>, providing critical energy use details that will increase the accuracy of the <b>DER</b> solution.</i></Typography>
    </Box></Box></Box>
  );
};

export default SubStep2;