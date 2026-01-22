import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Box, useTheme } from '@mui/material';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import UploadWidget from '../components/UploadWidget';

const DRAWER_WIDTH = 280;
const COLLAPSED_DRAWER_WIDTH = 88;

const PrivateLayout: React.FC = () => {
  const theme = useTheme();
  // const isMobile = useMediaQuery(theme.breakpoints.down('sm')); // Not currently used but good for future ref

  const [mobileOpen, setMobileOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleCollapseToggle = () => {
    setIsCollapsed(!isCollapsed);
  };

  const currentDrawerWidth = isCollapsed ? COLLAPSED_DRAWER_WIDTH : DRAWER_WIDTH;

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: 'background.default' }}>
      <Navbar
        onDrawerToggle={handleDrawerToggle}
        isSidebarCollapsed={isCollapsed}
        drawerWidth={currentDrawerWidth}
      />

      <Sidebar
        mobileOpen={mobileOpen}
        onDrawerToggle={handleDrawerToggle}
        isCollapsed={isCollapsed}
        onCollapseToggle={handleCollapseToggle}
        drawerWidth={DRAWER_WIDTH}
        collapsedWidth={COLLAPSED_DRAWER_WIDTH}
      />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: { xs: 2, sm: 3 },
          width: { sm: `calc(100% - ${currentDrawerWidth}px)` },
          transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
          mt: 8, // Toolbar height approx
        }}
      >
        <Outlet />
      </Box>
      <UploadWidget />
    </Box>
  );
};

export default PrivateLayout;
