import React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';

const Footer: React.FC = () => {
  return (
    <AppBar
      position="fixed"
      sx={{
        bgcolor: '#f5f5f5',
        color: '#333333',
        top: 'auto',
        height: '35px',
        boxShadow: 0,
        bottom: 0,
        width: 'calc(100% - 173px)',
        left: '195.5px',
      }}
    >
      <Toolbar sx={{ justifyContent: 'center' }}>
        <Typography
          variant="body2"
          sx={{ fontFamily: 'Nunito Sans, sans-serif', pb: '27px' }}
        >
          <p>Powered by <strong>Netra Labs</strong></p>
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Footer;