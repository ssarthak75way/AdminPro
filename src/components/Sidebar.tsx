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
  IconButton,
  Tooltip,
  useTheme,
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import SettingsIcon from "@mui/icons-material/Settings";
import PeopleIcon from "@mui/icons-material/People";
import FolderIcon from "@mui/icons-material/Folder";
import ViewListIcon from "@mui/icons-material/ViewList";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { useNavigate, useLocation } from "react-router-dom";

interface SidebarProps {
  mobileOpen: boolean;
  onDrawerToggle: () => void;
  isCollapsed: boolean;
  onCollapseToggle: () => void;
  drawerWidth: number;
  collapsedWidth: number;
}

const Sidebar: React.FC<SidebarProps> = ({
  mobileOpen,
  onDrawerToggle,
  isCollapsed,
  onCollapseToggle,
  drawerWidth,
  collapsedWidth
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();

  const menuItems = [
    { text: "Dashboard", icon: <DashboardIcon />, path: "/dashboard" },
    { text: "Files", icon: <FolderIcon />, path: "/files" },
    { text: "Selectors", icon: <ViewListIcon />, path: "/selectors" },
    { text: "Users", icon: <PeopleIcon />, path: "/users" },
    { text: "Settings", icon: <SettingsIcon />, path: "/settings" },
  ];

  const avatarSx = {
    bgcolor: "primary.main",
    width: 36,
    height: 36,
    fontWeight: 800,
    flexShrink: 0,
    boxShadow: '0 4px 8px rgba(37, 99, 235, 0.2)',
  }
  
  const proPlanSx = {
    px: 2,
    mb: 2,
    opacity: isCollapsed ? 0 : 1,
    transition: "opacity 0.2s ease, max-height 0.3s ease",
    maxHeight: isCollapsed ? 0 : 200,
    overflow: 'hidden'
  }
  const proThemeSx = {
    p: 2.5,
    borderRadius: 4,
    background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
    color: 'white',
    position: 'relative',
    overflow: 'hidden',
    boxShadow: '0 10px 20px -5px rgba(37, 99, 235, 0.4)'
  }
  const proCaptionSx = {
    bgcolor: 'rgba(255,255,255,0.2)',
    border: '1px solid rgba(255,255,255,0.3)',
    px: 1.5, py: 0.75,
    borderRadius: 2,
    cursor: 'pointer',
    transition: 'all 0.2s',
    '&:hover': { bgcolor: 'rgba(255,255,255,0.3)' }
  }
  const drawerContent = (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        overflowX: "hidden",
      }}
    >
      {/* ===== Brand Header ===== */}
      <Toolbar
        sx={{
          px: isCollapsed ? 1.5 : 3, // slightly less padding when collapsed to center items
          minHeight: 70,
          transition: "padding 0.3s ease",
          justifyContent: isCollapsed ? "center" : "flex-start",
        }}
      >
        <Stack direction="row" spacing={1.5} alignItems="center" sx={{ width: '100%', overflow: 'hidden' }}>
          <Avatar
            sx={{
            ...avatarSx,
            }}
          >
            A
          </Avatar>

          <Box sx={{
            opacity: isCollapsed ? 0 : 1,
            transition: "opacity 0.2s",
            whiteSpace: "nowrap",
            width: isCollapsed ? 0 : 'auto',
          }}>
            <Typography variant="h6" fontWeight={800} sx={{ lineHeight: 1, letterSpacing: '-0.02em', color: 'text.primary' }}>
              AdminPro
            </Typography>
          </Box>
        </Stack>
      </Toolbar>

      {/* ===== Navigation ===== */}
      <List sx={{ px: isCollapsed ? 1 : 2, mt: 1, flexGrow: 1 }}>
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          const listItemBtnSx = {
            justifyContent: isCollapsed ? "center" : "initial",
            borderRadius: 2.5,
            px: isCollapsed ? 1 : 2,
            py: 1.2,
            minHeight: 48,
            position: "relative",
            color: isActive ? "primary.main" : "text.secondary",
            backgroundColor: isActive
              ? "action.selected"
              : "transparent",
            transition: "all 0.2s ease",
            "&:hover": {
              backgroundColor: isActive
                ? "action.selected"
                : "action.hover",
              transform: isActive ? 'none' : 'translateX(4px)',
            },
            "&::before": isActive && !isCollapsed
              ? {
                content: '""',
                position: "absolute",
                left: 0,
                top: "20%",
                bottom: "20%",
                width: 4,
                borderRadius: "0 4px 4px 0",
                bgcolor: "primary.main",
              }
              : {},
          }

          const listItemIconSx = {
            minWidth: 0,
            mr: isCollapsed ? 0 : 2,
            justifyContent: "center",
            color: isActive ? "primary.main" : "inherit",
            transition: "all 0.2s",
          }
          const listItemTextSx = {
            opacity: isCollapsed ? 0 : 1,
            display: isCollapsed ? 'none' : 'block',
            transition: "opacity 0.2s"
          }

          
          return (
            <ListItem key={item.text} disablePadding sx={{ mb: 0.5, display: 'block' }}>
              <Tooltip title={isCollapsed ? item.text : ""} placement="right" arrow>
                <ListItemButton
                  onClick={() => navigate(item.path)}
                  sx={{
                   ...listItemBtnSx,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      ...listItemIconSx,
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>

                  <ListItemText
                    primary={item.text}
                    sx={{
                      ...listItemTextSx,
                    }}
                    primaryTypographyProps={{
                      fontWeight: isActive ? 600 : 500,
                      fontSize: '0.95rem'
                    }}
                  />
                </ListItemButton>
              </Tooltip>
            </ListItem>
          );
        })}
      </List>

      {/* ===== Pro Plan ===== */}
      <Box sx={{
        ...proPlanSx,
      }}>
        <Box sx={{
         ...proThemeSx,
        }}>
          <Box sx={{ position: 'relative', zIndex: 1 }}>
            <Typography variant="subtitle2" fontWeight={700} gutterBottom>Pro Account</Typography>
            <Typography variant="caption" sx={{ display: 'block', mb: 2, opacity: 0.9, lineHeight: 1.4 }}>
              Unlock full access to all features properly.
            </Typography>
            <Typography
              variant="caption"
              fontWeight={700}
              sx={{
               ...proCaptionSx,
              }}
            >
              Upgrade Now
            </Typography>
          </Box>
          {/* Decorative circles */}
          <Box sx={{ position: 'absolute', width: 80, height: 80, borderRadius: '50%', bgcolor: 'rgba(255,255,255,0.1)', top: -20, right: -20 }} />
          <Box sx={{ position: 'absolute', width: 50, height: 50, borderRadius: '50%', bgcolor: 'rgba(255,255,255,0.1)', bottom: 10, right: -10 }} />
        </Box>
      </Box>

      {/* ===== Collapse Toggle (Desktop Only) ===== */}
      <Box sx={{
        display: { xs: 'none', sm: 'flex' },
        justifyContent: isCollapsed ? 'center' : 'flex-end',
        p: 1.5,
        borderTop: '1px solid',
        borderColor: 'divider'
      }}>
        <IconButton onClick={onCollapseToggle} size="small" sx={{ color: 'text.secondary' }}>
          {isCollapsed ? <ChevronRightIcon /> : <ChevronLeftIcon />}
        </IconButton>
      </Box>

      {/* ===== Footer for Mobile ===== */}
      <Box sx={{
        p: 2,
        textAlign: 'center',
        display: { xs: 'block', sm: 'none' }
      }}>
        <Typography variant="caption" color="text.secondary" sx={{ opacity: 0.7 }}>
          © 2026 AdminPro
        </Typography>
      </Box>
    </Box>
  );
  const drawerDeskSx = {
    display: { xs: "none", sm: "block" },
    "& .MuiDrawer-paper": {
      width: isCollapsed ? collapsedWidth : drawerWidth,
      bgcolor: "background.paper",
      borderRight: "1px solid",
      borderColor: "divider",
      transition: "width 0.3s ease",
      overflowX: 'hidden',
    }
  };
  const drowerMobSx = {
    display: { xs: "block", sm: "none" },
    "& .MuiDrawer-paper": {
      width: drawerWidth,
      borderRight: "none",
      bgcolor: "background.paper",
      backgroundImage: "none",
    },
  }
  return (
    <Box component="nav" sx={{ width: { sm: isCollapsed ? collapsedWidth : drawerWidth }, flexShrink: { sm: 0 }, transition: 'width 0.3s ease' }}>
      {/* ===== Mobile Drawer ===== */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={onDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{
         ...drowerMobSx,
        }}
      >
        {drawerContent}
      </Drawer>

      {/* ===== Desktop Drawer ===== */}
      <Drawer
        variant="permanent"
        open
        sx={{
         ...drawerDeskSx,
        }}
      >
        {drawerContent}
      </Drawer>
    </Box>
  );
};

export default Sidebar;
