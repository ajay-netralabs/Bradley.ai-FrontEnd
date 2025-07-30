import React, { useState } from 'react';
import { AppBar, IconButton, Toolbar, /* Typography, */ Menu, MenuItem, Tooltip, Box } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
// import NotificationsIcon from '@mui/icons-material/Notifications';
import DarkModeIcon from '@mui/icons-material/DarkMode';
// import LightModeIcon from '@mui/icons-material/LightMode';
import { useAppContext } from '../Context/AppContext';

const Navbar: React.FC = () => {
  const { logout } = useAppContext();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    handleMenuClose();
  };

  return (
    <AppBar position="fixed" sx={{ bgcolor: 'white', color: 'black', zIndex: 1000, boxShadow: '0px 1px 3px rgba(0, 0, 0, 0.2)' }}>
      <Toolbar>
        {/* <Typography variant="h4" component="div" sx={{ flexGrow: 1, fontFamily: 'Roboto Condensed, sans-serif', display: 'inline-flex', alignItems: 'center' }}>
          Bradley.ai
          <Typography variant="h6" component="span" sx={{ ml: 0.5, position: 'relative', top: '-3px' }}>
            <sup>®</sup>
          </Typography>
        </Typography> */}
        <Box sx={{ flexGrow: 1, display: 'inline-flex', alignItems: 'center' }}>
          <img src="/bradley_dynamic_horizontal.svg" alt="Logo" style={{ height: '64px', marginRight: '4px', marginLeft: '-6px' }} />
        </Box>

        
        <IconButton color="inherit" sx={{'&:focus': {
                                  outline: 'none',
                                },}}>
          <Tooltip title="Switch to dark mode" placement='bottom' arrow>
          <DarkModeIcon fontSize='medium'  /></Tooltip>
        </IconButton>

        <IconButton color="inherit" sx={{'&:focus': {
                                  outline: 'none',
                                },}}>
          <Tooltip title="Notifications" placement='bottom' arrow>
          <NotificationsNoneIcon fontSize='medium'  /></Tooltip>
        </IconButton>
        
        <IconButton
          onClick={handleMenuOpen}
          color="inherit"
          sx={{ fontFamily: 'Nunito Sans, sans-serif', '&:focus': {
                                  outline: 'none',
                                }, }}
        ><Tooltip title="Profile" placement='bottom' arrow>
          <PersonIcon fontSize='medium' /></Tooltip>
        </IconButton>

        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          sx={{ '.MuiPaper-root': { fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.700rem', width: '150px', marginTop: '6.5px', marginLeft: '22.5px', borderRadius: '1', boxShadow: '1', '&:focus': {
                                  outline: 'none',
                                },}, }}
        >
            <MenuItem
            onClick={() => {
              try {
              const user = JSON.parse(localStorage.getItem('user') || '{}');
              console.log('Logging out user:', user);
              handleLogout();
              console.log('Logout function called and executed successfully.');
              } catch (error) {
              console.error('Error during logout:', error);
              }
            }}
            sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.700rem' }}
            >
            Logout
            </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
