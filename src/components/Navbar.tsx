import React, { useState, useEffect, Suspense } from 'react';
import { AppBar, IconButton, Toolbar, Menu, MenuItem, Tooltip, Box } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { useAppContext } from '../Context/AppContext';
import UserProfileModal from './UserProfileModal';

interface NavbarProps {
  OrganizationDetailsComponent?: React.ComponentType;
  FacilityAddressComponent?: React.ComponentType;
}

const Navbar: React.FC<NavbarProps> = ({ OrganizationDetailsComponent, FacilityAddressComponent }) => {
  const { logoutForProduct } = useAppContext();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const [modalOpen, setModalOpen] = useState(false);
  const [modalTab, setModalTab] = useState<'profile' | 'facilities'>('profile');

  useEffect(() => {
    const handleCustomOpen = () => {
      setModalTab('facilities');
      setModalOpen(true);
    };

    window.addEventListener('open-facility-modal', handleCustomOpen);

    return () => {
      window.removeEventListener('open-facility-modal', handleCustomOpen);
    };
  }, []);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleOpenModal = (tab: 'profile' | 'facilities') => {
    setModalTab(tab);
    setModalOpen(true);
    handleMenuClose();
  };

  const handleLogout = () => {
    const isEmissionCheckIQ = window.location.pathname.startsWith('/emissioncheckiq');
    logoutForProduct(isEmissionCheckIQ ? "emissioncheckiq" : "bradley");
    handleMenuClose();
  };

  return (
    <>
      <AppBar position="fixed" sx={{ bgcolor: 'white', color: 'black', zIndex: 1000, boxShadow: '0px 1px 3px rgba(0, 0, 0, 0.2)' }}>
        <Toolbar>
          <Box sx={{ flexGrow: 1, display: 'inline-flex', alignItems: 'center' }}>
            <img 
              src={window.location.pathname === '/emissioncheckiq' ? '/EmissionCheckIQ+_navbar_logo.png' : '/Bradley.AI_navbar_logo.png'} 
              alt="Logo" 
              style={{ height: '50px', marginRight: '4px', marginLeft: '-11.5px' }} 
            />
          </Box>

          <IconButton color="inherit" sx={{'&:focus': { outline: 'none' }}}>
            <Tooltip title="Switch to dark mode" placement='bottom' arrow>
              <DarkModeIcon fontSize='medium' />
            </Tooltip>
          </IconButton>

          <IconButton color="inherit" sx={{'&:focus': { outline: 'none' }}}>
            <Tooltip title="Notifications" placement='bottom' arrow>
              <NotificationsNoneIcon fontSize='medium' />
            </Tooltip>
          </IconButton>
          
          <IconButton
            onClick={handleMenuOpen}
            color="inherit"
            sx={{ fontFamily: 'Nunito Sans, sans-serif', '&:focus': { outline: 'none' } }}
          >
            <Tooltip title="Profile" placement='bottom' arrow>
              <PersonIcon fontSize='medium' />
            </Tooltip>
          </IconButton>

          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            sx={{ '.MuiPaper-root': { fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.700rem', width: '150px', marginTop: '6.5px', marginLeft: '22.5px', borderRadius: '1', boxShadow: '1', '&:focus': { outline: 'none' } } }}
          >
              <MenuItem 
                onClick={() => handleOpenModal('profile')}
                sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.700rem' }}
              >
              Profile
              </MenuItem>

              <MenuItem 
                onClick={() => handleOpenModal('facilities')}
                sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.700rem' }}
              >
              Facilities
              </MenuItem>

              <MenuItem
                onClick={() => {
                  try {
                    handleLogout();
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

      {OrganizationDetailsComponent && FacilityAddressComponent && (
        <Suspense fallback={null}>
          <UserProfileModal
            open={modalOpen}
            onClose={() => setModalOpen(false)}
            initialTab={modalTab}
            OrganizationDetailsComponent={OrganizationDetailsComponent}
            FacilityAddressComponent={FacilityAddressComponent}
          />
        </Suspense>
      )}
    </>
  );
};

export default Navbar;