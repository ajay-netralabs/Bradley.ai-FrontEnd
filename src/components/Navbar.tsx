import React from 'react';
import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material';

const Navbar: React.FC = () => {
  return (
    <AppBar position="fixed" sx={{ bgcolor: 'white', color: 'black', zIndex: 1000 }}> 
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Bradley.ai
          </Typography>
          <Button color="inherit">Logout</Button>
        </Toolbar>
      </AppBar>
  );
};

export default Navbar;