import React, { useState, Suspense, lazy } from 'react';
import { Box/* , CircularProgress */ } from '@mui/material';
import Navbar from '../components/Navbar';
import AnalystSidebar from '../components/AnalystSidebar';
import Footer from '../components/Footer';

type MenuOption = 'Dashboard' | 'Projects' | 'Settings' | 'Resources';

const Dashboard = lazy(() => import('../Analyst/pages/Dashboard'));
const Projects = lazy(() => import('../Analyst/pages/Projects'));
const Settings = lazy(() => import('../Analyst/pages/Settings'));
const Resources = lazy(() => import('../Analyst/pages/Resources'));

import { AppProvider } from '../Context/AppContext';

const AnalystApp: React.FC = () => {
  const [activeMenu, setActiveMenu] = useState<MenuOption>('Dashboard');

  const renderPage = () => {
    switch (activeMenu) {
      case 'Dashboard':
        return <Dashboard />;
      case 'Projects':
        return <Projects />;
      case 'Settings':
        return <Settings />;
      case 'Resources':
        return <Resources />;
      default:
        return <h1>Page Not Found</h1>;
    }
  };

  return (
    <AppProvider steps={[]} appPrefix="analyst">
      <Box sx={{ display: 'flex', flexDirection: 'row', height: '100vh', zIndex: 500 }}>
        <Navbar />
        <Box sx={{ display: 'flex', flexGrow: 1, mt: '64px', width: '100vw' }}>
          <Box sx={{ width: '173px', flexShrink: 0 }}>
            <AnalystSidebar activeMenu={activeMenu} onMenuChange={setActiveMenu} />
          </Box>

          <Box
            component="main"
            sx={{
              flexGrow: 1,
              p: 4,
              bgcolor: '#f5f5f5',
              overflowX: 'auto',
              scrollbarWidth: 'none',
            }}
          >
            <Box
              sx={{
                mt: 1,
                pl: 2,
                pb: 1,
                pt: 3,
                mb: 7,
                ml: 3,
                borderRadius: '8px',
                bgcolor: 'white',
                boxShadow: 1,
                color: 'black',
                display: 'flex',
              }}
            >
              <Box sx={{ flexGrow: 1 }}>
                <Suspense /* fallback={<CircularProgress />} */>
                  {renderPage()}
                </Suspense>
              </Box>
            </Box>
          </Box>
        </Box>
        <Footer />
      </Box>
    </AppProvider>
  );
};

export default AnalystApp;
