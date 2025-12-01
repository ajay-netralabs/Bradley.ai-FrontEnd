import React, { useRef } from 'react';
import { Box, TextField, Typography, Tooltip, List, ListItem, IconButton, Select, MenuItem, FormControl, InputLabel, Paper } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNaturalGasBillUpload } from '../../../../Context/Energy Profile/SubStep2/Natural Gas Bill Upload Context';
import { useBillAddress } from '../../../../Context/Energy Profile/BillAddressContext';

const SubStep2: React.FC = () => {
  const { addFiles, removeFile } = useNaturalGasBillUpload();
  const { bills, addBill, removeBill: removeBillFromContext, addresses, assignAddressToBill, updateBillDateRange } = useBillAddress();
  const gasBills = bills.filter(b => b.type === 'gas');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const newFiles = event.target.files;
      if (newFiles) {
        Array.from(newFiles).forEach(file => {
          addBill({ name: file.name, size: formatFileSize(file.size), type: 'gas' });
        });
        addFiles(Array.from(newFiles));
      }
    };
 
    const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();
    };
 
    const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();
      const newFiles = event.dataTransfer.files;
      if (newFiles) {
        Array.from(newFiles).forEach(file => {
          addBill({ name: file.name, size: formatFileSize(file.size), type: 'gas' });
        });
        addFiles(Array.from(newFiles));
      }
    };
 
    const handleUploadBoxClick = () => {
      fileInputRef.current?.click();
    };

    const handleRemoveFile = (billId: string, fileName: string) => {
      removeFile(fileName);
      removeBillFromContext(billId);
    };

    const formatFileSize = (bytes: number) => {
      if (bytes === 0) return '0 Bytes';
      const k = 1024;
      const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
      const i = Math.floor(Math.log(bytes) / Math.log(k));
      return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.75rem', p: 1, pr: 4, pl: 1, pt: 1 }}>
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Nunito+Sans:ital,opsz,wght@0,6..12,200..1000;1,6..12,200..1000&display=swap');
      </style>
      <Typography variant="h6" sx={{ mb: 1, fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.85rem', fontWeight: 'bold', textAlign: 'center' }}>
        <h2>Natural Gas Bill Upload</h2>
      </Typography>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 0 }}>
        <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 2, pt: '10px', pb: '10px', pl: '160px', pr: '160px' }}>
          <Typography sx={{ fontSize: '0.75rem', fontFamily: 'Nunito Sans, sans-serif', mb: 0, textAlign: 'center' }}><b>{window.location.pathname === '/demo' ? 'EmissionCheckIQ+' : 'Bradley.ai'} will extract the data needed to compute the site specific GHG emissions from your utility bills and properly size alternate sources of power.</b></Typography>
          <input
            type="file"
            multiple
            accept=".pdf,.xls,.xlsx,.csv"
            onChange={handleFileChange}
            ref={fileInputRef}
            style={{ display: 'none' }}
            
          />

          <Tooltip title="Click to upload files here." placement='top-start' arrow>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                border: '1px dashed grey',
                borderRadius: 2,
                p: 2,
                mb: 0,
                mt: 1.5,
                justifyContent: 'center',
                cursor: 'pointer',
                backgroundColor: 'transparent',
                '&:hover': {
                  borderColor: /* allAddressesAssigned ? 'grey' : */ 'primary.main',
                }
              }}
              onClick={handleUploadBoxClick}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
            >
              <CloudUploadIcon fontSize='medium' />
              <Typography sx={{ fontSize: '0.8rem', fontFamily: 'Nunito Sans, sans-serif', ml: 1 }}>Drag and drop files here or click to upload (PDF, Excel, CSV)</Typography>
            </Box>
          </Tooltip>

          <Typography sx={{ fontSize: '0.75rem', fontFamily: 'Nunito Sans, sans-serif', mb: 0, textAlign: 'right' }}><b>*</b>Accepted File Formats: .xls, .xlsx, .csv</Typography>

          {gasBills.length > 0 && (
            <Paper elevation={2} sx={{ mt: 2, p: 2 }}>
              <Typography sx={{ fontSize: '0.85rem', fontFamily: 'Nunito Sans, sans-serif', mb: 1, fontWeight: 'bold' }}>Uploaded Files:</Typography>
              <List dense sx={{ p: 0 }}>
                {gasBills.map((bill) => (
                  <ListItem
                    key={bill.id}
                    sx={{  
                      display: 'flex',
                      alignItems: 'flex-start',
                      py: 2,
                      px: 1,
                      gap: 4, // Add gap between file info and controls
                      borderBottom: '1px solid #eee',
                      '&:last-child': { borderBottom: 'none' },
                    }}
                  >
                    {/* Left side: File info and Date Range Label */}
                    <Box sx={{ display: 'flex', flexDirection: 'column', minWidth: '250px', flexShrink: 0 }}>
                                      
                      {/* Top section for File Info. */}
                      <Box sx={{ 
  height: '40px', 
  display: 'flex', 
  flexDirection: 'column', 
  justifyContent: 'center', 
  mb: 1.5 
}}>
  <Tooltip title={bill.name} placement="top-start" arrow>
    <Typography sx={{ 
      fontSize: '0.8rem', 
      fontFamily: 'Nunito Sans, sans-serif', 
      fontWeight: 600,
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      maxWidth: '250px'
    }}>
      {bill.name}
    </Typography>
  </Tooltip>
  <Typography sx={{ fontSize: '0.7rem', fontFamily: 'Nunito Sans, sans-serif', color: 'text.secondary' }}>
    {bill.size}
  </Typography>
</Box>
                    
                      {/* Bottom section for the Date Range Label. */}
                      <Box sx={{ height: '40px', display: 'flex', alignItems: 'center' }}>
                          <Typography sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.8rem', fontWeight: 600 }}>
                              Data Range (Optional):
                          </Typography>
                      </Box>
                    
                    </Box>

                    {/* Right side: All controls grouped together */}
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, width: '100%' }}>
                        {/* Row 1: Dropdowns and Delete Icon */}
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 3.3 }}>
                            <FormControl sx={{ width: '180px' }} size="small">
                                <InputLabel sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.8rem' }}>Address</InputLabel>
                                <Select
  value={bill.addressId || ''}
  onChange={(e) => assignAddressToBill(bill.id, e.target.value as string)}
  label="Address"
  sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.8rem' }}
>
  <MenuItem value="" sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.8rem', fontStyle: 'italic', color: 'text.secondary' }}>
      Select
    </MenuItem>
  {addresses.map(address => (
    <MenuItem  
      key={address.id}  
      value={address.id}
      sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.8rem' }}
    >
      {address.address}
    </MenuItem>
  ))}
</Select>
                            </FormControl>
                            
                            <FormControl sx={{ width: '180px' }} size="small">
                                <InputLabel sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.8rem' }}>Sub-Region</InputLabel>
                                <Select
                                    value=""
                                    label="Sub-Region"
                                    sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.8rem' }}
                                    disabled
                                >
                                </Select>
                            </FormControl>
                            <IconButton  
                                aria-label="delete"  
                                onClick={() => handleRemoveFile(bill.id, bill.name)}
                            >
                                <DeleteIcon />
                            </IconButton>
                        </Box>

                        {/* Row 2: Date range */}
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <Tooltip title="Start date" placement='top-start' arrow>
                            <TextField
                                variant="outlined"
                                size="small"
                                type="date"
                                value={bill.dateRange.start}
                                onChange={(e) => updateBillDateRange(bill.id, { ...bill.dateRange, start: e.target.value })}
                                sx={{
                                width: '180px',
                                '& .MuiInputBase-root': { height: '40px' },
                                '& input': { padding: '8px', fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.8rem' }
                                }}
                            />
                            </Tooltip>
                            <Typography sx={{ mx: -1, fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.8rem' }}>to</Typography>
                            <Tooltip title="End date" placement='top-end' arrow>
                            <TextField
                                variant="outlined"
                                size="small"
                                type="date"
                                value={bill.dateRange.end}
                                onChange={(e) => updateBillDateRange(bill.id, { ...bill.dateRange, end: e.target.value })}
                                sx={{
                                width: '180px',
                                '& .MuiInputBase-root': { height: '40px' },
                                '& input': { padding: '8px', fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.8rem' }
                                }}
                            />
                            </Tooltip>
                        </Box>
                        
                        {/* Row 3: Helper Text */}
                        <Typography sx={{ fontSize: '0.75rem', fontFamily: 'Nunito Sans, sans-serif', textAlign: 'left', mt: 0.01 }}>
                            <b>**</b>Minimum of 12 months of data/24+ months for optimal results.
                        </Typography>
                    </Box>
                  </ListItem>
                ))}
              </List>
            </Paper>
          )}
          <Typography sx={{ mt: 0, fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.75rem', minWidth: '200px', flex: 1 }}><i><b>*</b><b>{window.location.pathname === '/demo' ? 'EmissionCheckIQ+' : 'Bradley.ai'}</b> prefers to gain direct access to the Utility profile usage of your utility meter. The <b>LOA</b> enables <b>{window.location.pathname === '/demo' ? 'EmissionCheckIQ+' : 'Bradley.ai'}</b> to pull data directly from the utility to instantly update your <b>GHG</b> emission profile.</i></Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default SubStep2;