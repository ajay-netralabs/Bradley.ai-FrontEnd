import React, { useRef } from 'react';
import { Box, Typography, Tooltip, List, ListItem, ListItemText, IconButton } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DeleteIcon from '@mui/icons-material/Delete';
import { useMEPDrawings } from '../../../Context/Site Assessment/SubStep2/Upload Existing Drawings Context';

const SubStep2: React.FC = () => {
  const { mepDrawingsState, addFiles, removeFile } = useMEPDrawings();
  const { files } = mepDrawingsState;
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newFiles = event.target.files;
    if (newFiles) {
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
      addFiles(Array.from(newFiles));
    }
  };

  const handleUploadBoxClick = () => {
    fileInputRef.current?.click();
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
        <h2>Upload MEP Drawings, Short Circuit Study, Single Line Diagram</h2>
      </Typography>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 0 }}>
        <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 2, pt: '10px', pb: '10px', pl: '160px', pr: '160px' }}>
          <Typography sx={{ fontSize: '0.75rem', fontFamily: 'Nunito Sans, sans-serif', mb: 0, textAlign: 'center' }}>
            I generate one-line diagrams and balance of plant layouts. Knowing your available floor space, equipment layout and having access to your existing one-line diagram and short circuit study will increase the accuracy of the method to connect the recommended DER solution to your existing infrastructure.<br /><br /><b>IF</b> – you do not have these documents uploaded, do not worry: I will still provide a fully capable 30% conceptual DER design but will engineer a method of interconnect, control, protection and synchronization as needed by the DER recommendation.
          </Typography>

          <input
            type="file"
            multiple
            accept=".pdf,.cad,.jpeg,.bmp,.tif"
            onChange={handleFileChange}
            ref={fileInputRef}
            style={{ display: 'none' }}
          />

          <Tooltip title="Click to upload files here." placement="bottom-start" arrow>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                border: '1px dashed grey',
                borderRadius: 2,
                p: 5,
                mb: 0,
                mt: 1.5,
                justifyContent: 'center',
                cursor: 'pointer',
                '&:hover': {
                  borderColor: 'primary.main',
                }
              }}
              onClick={handleUploadBoxClick}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
            >
              <CloudUploadIcon fontSize='medium' />
              <Typography sx={{ fontSize: '0.8rem', fontFamily: 'Nunito Sans, sans-serif', ml: 1 }}>Drag and drop files here or click to upload (PDF, CAD, JPEG, BMP, TIF)</Typography>
            </Box>
          </Tooltip>
          <Typography sx={{ fontSize: '0.75rem', fontFamily: 'Nunito Sans, sans-serif', mb: 0, textAlign: 'right' }}>
            <b>*</b>Accepted File Formats: .pdf, .cad, .jpeg, .bmp, .tif
          </Typography>

          {files.length > 0 && (
            <Box sx={{ mt: 2 }}>
              <Typography sx={{ fontSize: '0.8rem', fontFamily: 'Nunito Sans, sans-serif', mb: 1, fontWeight: 'bold' }}>Uploaded Files:</Typography>
              <List dense>
                {files.map((file, index) => (
                  <ListItem
                    key={index}
                    secondaryAction={
                      <IconButton edge="end" aria-label="delete" onClick={() => removeFile(file.name)}>
                        <DeleteIcon />
                      </IconButton>
                    }
                  >
                    <ListItemText
                      primary={file.name}
                      secondary={formatFileSize(file.size)}
                      primaryTypographyProps={{ fontSize: '0.75rem', fontFamily: 'Nunito Sans, sans-serif' }}
                      secondaryTypographyProps={{ fontSize: '0.65rem', fontFamily: 'Nunito Sans, sans-serif' }}
                    />
                  </ListItem>
                ))}
              </List>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default SubStep2;