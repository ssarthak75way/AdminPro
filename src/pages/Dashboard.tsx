import React from "react";
import {
  Grid,
  Paper,
  Typography,
  Box,
  Stack,
  Avatar,
} from "@mui/material";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import GroupIcon from "@mui/icons-material/Group";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import TrafficIcon from "@mui/icons-material/Traffic";
import ActivityIcon from "@mui/icons-material/Timeline";
import { useAppSelector } from "../app/hooks";

const stats = [
  {
    title: "Total Sales",
    value: "$24,000",
    subtitle: "Today",
    icon: <TrendingUpIcon />,
    gradient: "linear-gradient(135deg, #667eea, #764ba2)",
  },
  {
    title: "New Users",
    value: "1,200",
    subtitle: "+14% this month",
    icon: <GroupIcon />,
    gradient: "linear-gradient(135deg, #43cea2, #185a9d)",
  },
  {
    title: "Orders",
    value: "340",
    subtitle: "Pending shipment",
    icon: <ShoppingCartIcon />,
    gradient: "linear-gradient(135deg, #f7971e, #ffd200)",
  },
  {
    title: "Traffic",
    value: "45k",
    subtitle: "Visitors today",
    icon: <TrafficIcon />,
    gradient: "linear-gradient(135deg, #ff758c, #ff7eb3)",
  },
];

import { keyframes } from "@emotion/react";

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;
const statCardSx = {
  p: 3,
  height: 160,
  borderRadius: 4,
  color: "common.white",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  transition: "all 0.3s ease",
  "&:hover": {
    transform: "translateY(-6px)",
    boxShadow: "0px 12px 30px rgba(0,0,0,0.25)",
  },
};
const avatarSx = {
  bgcolor: "rgba(255,255,255,0.2)",
  backdropFilter: "blur(4px)",
  width: 40,
  height: 40,
  color: "inherit"
}

const recentSx = {
  flex: 1,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  color: "text.secondary",
  gap: 2,
  py: 4,
  bgcolor: 'background.default',
  borderRadius: 3,
  border: '1px dashed',
  borderColor: 'divider',
}
const Dashboard: React.FC = () => {
  const user = useAppSelector((state) => state.auth.user);

  return (
    <Box sx={{ animation: `${fadeIn} 0.6s ease-out` }}>
      {/* ===== Header ===== */}
      <Stack spacing={1} mb={4}>
        <Typography variant="h4" fontWeight={700}>
          Welcome back, {user?.name || "User"}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Here’s an overview of your system performance today.
        </Typography>
      </Stack>

      <Grid container spacing={3}>
        {/* ===== Stat Cards ===== */}
        {stats.map((stat, index) => (
          <Grid key={stat.title} size={{ xs: 12, sm: 6, md: 3 }}>
            <Paper
              sx={{
                ...statCardSx,
                background: stat.gradient,
                animation: `${fadeIn} 0.6s ease-out ${index * 0.1}s backwards`,
              }}
            >

              <Stack direction="row" justifyContent="space-between">
                <Typography variant="subtitle2" sx={{ opacity: 0.9, fontWeight: 600 }}>
                  {stat.title}
                </Typography>
                <Avatar
                  sx={{
                    ...avatarSx
                  }}
                >
                  {stat.icon}
                </Avatar>
              </Stack>

              <Box>
                <Typography variant="h3" fontWeight={700}>
                  {stat.value}
                </Typography>
                <Typography variant="caption" sx={{ opacity: 0.9 }}>
                  {stat.subtitle}
                </Typography>
              </Box>
            </Paper>
          </Grid>
        ))}

        {/* ===== Recent Activity ===== */}
        <Grid size={{ xs: 12 }}>
          <Paper
            sx={{
              p: 4,
              borderRadius: 4,
              minHeight: 300,
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Stack direction="row" spacing={1} alignItems="center" mb={4}>
              <ActivityIcon color="primary" />
              <Typography variant="h6" fontWeight={700}>
                Recent Activity
              </Typography>
            </Stack>

            <Box
              sx={{
                ...recentSx,
              }}
            >
              <ActivityIcon sx={{ fontSize: 48, opacity: 0.2 }} />
              <Box textAlign="center">
                <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                  No recent activity
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Activity will appear here once users start interacting with the system.
                </Typography>
              </Box>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
