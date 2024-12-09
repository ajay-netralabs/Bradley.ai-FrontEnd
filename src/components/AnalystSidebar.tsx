import React from 'react';
import {
  List,
  ListItemButton,
  ListItemText,
  Paper,
  Typography,
} from '@mui/material';
import { MdDashboard } from 'react-icons/md';
import { GrProjects } from 'react-icons/gr';
import { IoMdSettings } from 'react-icons/io';
import { GrResources } from 'react-icons/gr';

type MenuOption = 'Dashboard' | 'Projects' | 'Settings' | 'Resources';

interface AnalystSidebarProps {
  onMenuChange: (menu: MenuOption) => void;
  activeMenu: MenuOption; // Add activeMenu prop
}

const menuOptions: { label: MenuOption; icon: React.ElementType }[] = [
  { label: 'Dashboard', icon: MdDashboard },
  { label: 'Projects', icon: GrProjects },
  { label: 'Settings', icon: IoMdSettings },
  { label: 'Resources', icon: GrResources },
];

const AnalystSidebar: React.FC<AnalystSidebarProps> = ({
  onMenuChange,
  activeMenu,
}) => {
  return (
    <Paper
      sx={{
        width: '173px',
        position: 'fixed',
        height: '100vh',
        top: 0,
        mt: '50px',
        padding: '10px',
        paddingTop: '40px',
        boxShadow: 1,
      }}
    >
      <List sx={{ padding: 0 }}>
        {menuOptions.map((menuItem, index) => {
          const IconComponent = menuItem.icon;
          const isActive = activeMenu === menuItem.label; // Check if this item is active
          return (
            <ListItemButton
              key={index}
              sx={{
                display: 'flex',
                alignItems: 'center',
                padding: '3px 4px',
                fontFamily: 'Nunito Sans, sans-serif',
                color: isActive ? '#036ca1' : 'gray',
                '&:hover': {
                  backgroundColor: '#e6f7ff',
                  borderRadius: '8px',
                },
                marginBottom: '15px',
              }}
              onClick={() => onMenuChange(menuItem.label)}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 24,
                  height: 24,
                  borderRadius: '50%',
                  backgroundColor: isActive ? '#036ca1' : '#808080',
                  color: '#fff',
                  marginRight: '10px',
                }}
              >
                <IconComponent fontSize="small" />
              </div>
              <ListItemText
                primary={
                  <Typography
                    sx={{
                      fontSize: '0.700rem',
                      fontFamily: 'Nunito Sans, sans-serif',
                      lineHeight: '24px',
                    }}
                  >
                    {menuItem.label}
                  </Typography>
                }
              />
            </ListItemButton>
          );
        })}
      </List>
    </Paper>
  );
};

export default AnalystSidebar;
