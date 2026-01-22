import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  Divider,
  Tooltip,
  InputBase,
  Badge,
  useTheme,
  Stack,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import LogoutIcon from "@mui/icons-material/Logout";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsIcon from "@mui/icons-material/Notifications";
import SettingsIcon from "@mui/icons-material/Settings";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { logout } from "../store/authSlice";
import { useThemeContext } from "../context/ThemeContext";
import { authService } from "../services/auth.service";
import { useNavigate } from "react-router-dom";

interface NavbarProps {
  onDrawerToggle: () => void;
  isSidebarCollapsed: boolean;
  drawerWidth: number;
}

const Navbar: React.FC<NavbarProps> = ({ onDrawerToggle, drawerWidth }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.auth.user);
  const theme = useTheme();
  const { mode, toggleTheme } = useThemeContext();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    handleMenuClose();
    await authService.logout();
    dispatch(logout());
    navigate("/login");
  };

  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        width: { sm: `calc(100% - ${drawerWidth}px)` },
        ml: { sm: `${drawerWidth}px` },
        zIndex: { xs: 1100, sm: 1000 },
        backdropFilter: "blur(12px)",
        backgroundColor: "rgba(255,255,255,0.7)",
        borderBottom: "1px solid",
        borderColor: "divider",
        color: "text.primary",
        transition: theme.transitions.create(['width', 'margin'], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
      }}
    >
      <Toolbar sx={{ px: { xs: 2, sm: 3 } }}>
        {/* ===== Mobile Menu Button ===== */}
        <IconButton
          onClick={onDrawerToggle}
          sx={{ mr: 2, display: { sm: "none" }, color: 'primary.main' }}
        >
          <MenuIcon />
        </IconButton>

        {/* ===== Search Bar (Optional Enhancement) ===== */}
        <Box sx={{
          display: { xs: 'none', md: 'flex' },
          alignItems: 'center',
          bgcolor: 'rgba(243, 244, 246, 0.6)',
          borderRadius: 3,
          px: 2, py: 0.5,
          width: 300
        }}>
          <SearchIcon sx={{ color: 'text.secondary', mr: 1, fontSize: 20 }} />
          <InputBase
            placeholder="Search..."
            sx={{ flex: 1, fontSize: '0.875rem' }}
          />
        </Box>

        <Box sx={{ flexGrow: 1 }} />

        {/* ===== Actions ===== */}
        <Stack direction="row" spacing={1} alignItems="center" sx={{ mr: 2 }}>
          <IconButton size="small" onClick={toggleTheme} sx={{ color: 'text.secondary' }}>
            {mode === 'dark' ? <LightModeIcon fontSize="small" /> : <DarkModeIcon fontSize="small" />}
          </IconButton>
          <IconButton size="small" sx={{ color: 'text.secondary' }}>
            <Badge badgeContent={4} color="error" variant="dot">
              <NotificationsIcon fontSize="small" />
            </Badge>
          </IconButton>
          <IconButton size="small" sx={{ color: 'text.secondary' }}>
            <SettingsIcon fontSize="small" />
          </IconButton>
        </Stack>

        {/* ===== User Section ===== */}
        <Tooltip title="Account settings">
          <Box
            onClick={handleMenuOpen}
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1.5,
              cursor: "pointer",
              px: 1,
              py: 0.5,
              borderRadius: 30, // Pill shape
              transition: 'all 0.2s',
              border: '1px solid transparent',
              "&:hover": {
                bgcolor: "background.paper",
                boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                borderColor: 'divider'
              },
            }}
          >
            <Avatar
              sx={{
                width: 34,
                height: 34,
                bgcolor: "primary.main",
                fontSize: 14,
                fontWeight: 600,
                boxShadow: '0 2px 5px rgba(37, 99, 235, 0.3)'
              }}
            >
              {user?.name?.charAt(0) || "U"}
            </Avatar>

            <Box sx={{ display: { xs: "none", sm: "block" }, pr: 1 }}>
              <Typography variant="body2" fontWeight={600} color="text.primary">
                {user?.name || "User"}
              </Typography>
              <Typography variant="caption" color="text.secondary" sx={{ display: 'block', lineHeight: 1 }}>
                Admin
              </Typography>
            </Box>
          </Box>
        </Tooltip>

        {/* ===== User Menu ===== */}
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleMenuClose}
          PaperProps={{
            elevation: 2,
            sx: {
              mt: 1.5,
              borderRadius: 3,
              minWidth: 180,
              overflow: 'visible',
              '&:before': {
                content: '""',
                display: 'block',
                position: 'absolute',
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: 'background.paper',
                transform: 'translateY(-50%) rotate(45deg)',
                zIndex: 0,
              },
            },
          }}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        >
          <MenuItem onClick={handleMenuClose} sx={{ py: 1.5 }}>
            <AccountCircleIcon fontSize="small" sx={{ mr: 1.5, color: 'text.secondary' }} />
            Profile
          </MenuItem>
          <Divider sx={{ my: 0.5 }} />
          <MenuItem onClick={handleLogout} sx={{ py: 1.5, color: 'error.main' }}>
            <LogoutIcon fontSize="small" sx={{ mr: 1.5 }} />
            Logout
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar >
  );
};

export default Navbar;
