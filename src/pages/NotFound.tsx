import React from "react";
import {
  Box,
  Typography,
  Button,
  Stack,
  Paper,
} from "@mui/material";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import DashboardIcon from "@mui/icons-material/Dashboard";
import { useNavigate } from "react-router-dom";

const NotFound: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        px: 2,
        background: (theme) =>
          theme.palette.mode === "light"
            ? "linear-gradient(135deg, #f5f7fa, #e4ebf5)"
            : "linear-gradient(135deg, #121212, #1e1e1e)",
      }}
    >
      <Paper
        elevation={0}
        sx={{
          maxWidth: 560,
          width: "100%",
          p: { xs: 3, sm: 5 },
          borderRadius: 4,
          textAlign: "center",
          border: "1px solid",
          borderColor: "divider",
          backdropFilter: "blur(10px)",
          backgroundColor: (theme) =>
            theme.palette.mode === "light"
              ? "rgba(255,255,255,0.85)"
              : "rgba(30,30,30,0.85)",
        }}
      >
        {/* Icon */}
        <ErrorOutlineIcon
          sx={{
            fontSize: 80,
            color: "primary.main",
            mb: 2,
            opacity: 0.9,
          }}
        />

        {/* 404 */}
        <Typography
          variant="h2"
          fontWeight={800}
          sx={{ letterSpacing: 1 }}
          gutterBottom
        >
          404
        </Typography>

        {/* Title */}
        <Typography variant="h5" fontWeight={600} gutterBottom>
          Oops! Page not found
        </Typography>

        {/* Description */}
        <Typography
          color="text.secondary"
          sx={{ mb: 4, maxWidth: 420, mx: "auto" }}
        >
          The page you’re trying to reach doesn’t exist, was removed,
          or is temporarily unavailable.
        </Typography>

        {/* Actions */}
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={2}
          justifyContent="center"
        >
          <Button
            variant="outlined"
            size="large"
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate(-1)}
            sx={{
              px: 3,
              borderRadius: 3,
            }}
          >
            Go Back
          </Button>

          <Button
            variant="contained"
            size="large"
            startIcon={<DashboardIcon />}
            onClick={() => navigate("/dashboard")}
            sx={{
              px: 3,
              borderRadius: 3,
            }}
          >
            Dashboard
          </Button>
        </Stack>
      </Paper>
    </Box>
  );
};

export default NotFound;
