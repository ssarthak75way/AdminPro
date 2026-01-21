import React from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Box,
  Typography,
  Stack,
  Avatar,
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import SettingsIcon from "@mui/icons-material/Settings";
import PeopleIcon from "@mui/icons-material/People";
import { useNavigate, useLocation } from "react-router-dom";

const drawerWidth = 260;

interface SidebarProps {
  mobileOpen: boolean;
  onDrawerToggle: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ mobileOpen, onDrawerToggle }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { text: "Dashboard", icon: <DashboardIcon />, path: "/dashboard" },
    { text: "Users", icon: <PeopleIcon />, path: "/users" },
    { text: "Settings", icon: <SettingsIcon />, path: "/settings" },
  ];

  const drawerContent = (
    <Box
      sx={{
        height: "100%",
        bgcolor: "background.paper",
      }}
    >
      {/* ===== Brand Header ===== */}
      <Toolbar sx={{ px: 3 }}>
        <Stack direction="row" spacing={1.5} alignItems="center">
          <Avatar
            sx={{
              bgcolor: "primary.main",
              width: 36,
              height: 36,
              fontWeight: 700,
            }}
          >
            A
          </Avatar>
          <Typography variant="h6" fontWeight={700}>
            AdminPro
          </Typography>
        </Stack>
      </Toolbar>

      {/* ===== Navigation ===== */}
      <List sx={{ px: 2, mt: 1 }}>
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;

          return (
            <ListItem key={item.text} disablePadding sx={{ mb: 0.5 }}>
              <ListItemButton
                onClick={() => navigate(item.path)}
                sx={{
                  borderRadius: 2.5,
                  px: 2,
                  py: 1.2,
                  position: "relative",
                  color: isActive ? "primary.main" : "text.primary",
                  backgroundColor: isActive
                    ? "rgba(25, 118, 210, 0.08)" // subtle primary tint
                    : "transparent",
                  transition: "all 0.25s ease",
                  "&:hover": {
                    backgroundColor: isActive
                      ? "rgba(25, 118, 210, 0.12)"
                      : "action.hover",
                  },
                  "&::before": isActive
                    ? {
                      content: '""',
                      position: "absolute",
                      left: 0,
                      top: "20%",
                      bottom: "20%",
                      width: 4,
                      borderRadius: 4,
                      bgcolor: "primary.main",
                    }
                    : {},
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 36,
                    color: isActive
                      ? "primary.main"
                      : "text.secondary",
                  }}
                >
                  {item.icon}
                </ListItemIcon>

                <ListItemText
                  primary={item.text}
                  primaryTypographyProps={{
                    fontWeight: isActive ? 600 : 500,
                  }}
                />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>

      {/* ===== Pro Plan ===== */}
      <Box sx={{ px: 2, mt: 'auto', mb: 2 }}>
        <Box sx={{
          p: 2,
          borderRadius: 3,
          background: 'linear-gradient(135deg, #2563eb, #1e3a8a)',
          color: 'white',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <Box sx={{ position: 'relative', zIndex: 1 }}>
            <Typography variant="subtitle2" fontWeight={700} gutterBottom>Pro Account</Typography>
            <Typography variant="caption" sx={{ display: 'block', mb: 1.5, opacity: 0.8 }}>Get full access to all features.</Typography>
            <Typography variant="caption" fontWeight={700} sx={{
              bgcolor: 'rgba(255,255,255,0.2)',
              px: 1, py: 0.5,
              borderRadius: 1,
              cursor: 'pointer',
              '&:hover': { bgcolor: 'rgba(255,255,255,0.3)' }
            }}>Upgrade Now</Typography>
          </Box>
          {/* Decorative circles */}
          <Box sx={{ position: 'absolute', width: 60, height: 60, borderRadius: '50%', bgcolor: 'rgba(255,255,255,0.1)', top: -10, right: -10 }} />
          <Box sx={{ position: 'absolute', width: 40, height: 40, borderRadius: '50%', bgcolor: 'rgba(255,255,255,0.1)', bottom: 10, right: -10 }} />
        </Box>
      </Box>

      {/* ===== Footer ===== */}
      <Box sx={{ p: 3, pt: 0, textAlign: 'center' }}>
        <Typography variant="caption" color="text.secondary" sx={{ opacity: 0.7 }}>
          © 2026 AdminPro v1.2
        </Typography>
      </Box>
    </Box>
  );

  return (
    <Box component="nav" sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}>
      {/* ===== Mobile Drawer ===== */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={onDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: "block", sm: "none" },
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            borderRight: "none",
            bgcolor: "background.paper",
          },
        }}
      >
        {drawerContent}
      </Drawer>

      {/* ===== Desktop Drawer ===== */}
      <Drawer
        variant="permanent"
        open
        sx={{
          display: { xs: "none", sm: "block" },
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            bgcolor: "background.paper",
            borderRight: "1px solid",
            borderColor: "divider",
          },
        }}
      >
        {drawerContent}
      </Drawer>
    </Box>
  );
};

export default Sidebar;
