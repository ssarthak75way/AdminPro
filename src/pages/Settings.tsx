/* eslint-disable react-hooks/static-components */
import React from "react";
import {
  Box,
  Typography,
  Paper,
  Switch,
  List,
  ListItem,
  ListItemText,
  Divider,
  Stack,
  Avatar,
} from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import SecurityIcon from "@mui/icons-material/Security";
import VisibilityIcon from "@mui/icons-material/Visibility";

const Settings: React.FC = () => {
  const [checked, setChecked] = React.useState<string[]>([
    "notifications",
    "security",
  ]);

  const handleToggle = (value: string) => () => {
    setChecked((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    );
  };

  const SettingItem = ({
    icon,
    title,
    description,
    value,
  }: {
    icon: React.ReactNode;
    title: string;
    description: string;
    value: string;
  }) => (
    <ListItem
      sx={{
        py: 2,
        transition: "all 0.2s ease",
        "&:hover": {
          bgcolor: "action.hover",
        },
      }}
      secondaryAction={
        <Switch
          edge="end"
          onChange={handleToggle(value)}
          checked={checked.includes(value)}
        />
      }
    >
      <Stack direction="row" spacing={2} alignItems="center">
        <Avatar
          sx={{
            bgcolor: "primary.light",
            color: "primary.main",
            width: 36,
            height: 36,
          }}
        >
          {icon}
        </Avatar>
        <ListItemText
          primary={
            <Typography fontWeight={600}>{title}</Typography>
          }
          secondary={
            <Typography variant="body2" color="text.secondary">
              {description}
            </Typography>
          }
        />
      </Stack>
    </ListItem>
  );

  return (
    <Box maxWidth="md">
      {/* ===== Header ===== */}
      <Stack spacing={1} mb={4}>
        <Typography variant="h4" fontWeight={700}>
          Settings
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Manage your account preferences and security settings
        </Typography>
      </Stack>

      {/* ===== General Settings ===== */}
      <Paper
        sx={{
          mb: 4,
          borderRadius: 4,
          border: "1px solid",
          borderColor: "divider",
        }}
      >
        <Box p={3}>
          <Stack direction="row" spacing={1} alignItems="center" mb={2}>
            <NotificationsIcon color="primary" />
            <Typography variant="h6" fontWeight={600}>
              General
            </Typography>
          </Stack>

          <List disablePadding>
            <SettingItem
              icon={<NotificationsIcon fontSize="small" />}
              title="Notifications"
              description="Receive important updates via email"
              value="notifications"
            />
            <Divider />
            <SettingItem
              icon={<DarkModeIcon fontSize="small" />}
              title="Dark Mode"
              description="Enable dark theme for the dashboard"
              value="darkmode"
            />
          </List>
        </Box>
      </Paper>

      {/* ===== Privacy & Security ===== */}
      <Paper
        sx={{
          borderRadius: 4,
          border: "1px solid",
          borderColor: "divider",
        }}
      >
        <Box p={3}>
          <Stack direction="row" spacing={1} alignItems="center" mb={2}>
            <SecurityIcon color="primary" />
            <Typography variant="h6" fontWeight={600}>
              Privacy & Security
            </Typography>
          </Stack>

          <List disablePadding>
            <SettingItem
              icon={<VisibilityIcon fontSize="small" />}
              title="Profile Visibility"
              description="Allow others to view your profile"
              value="profile"
            />
            <Divider />
            <SettingItem
              icon={<SecurityIcon fontSize="small" />}
              title="Two-Factor Authentication"
              description="Add an extra layer of security to your account"
              value="security"
            />
          </List>
        </Box>
      </Paper>
    </Box>
  );
};

export default Settings;
