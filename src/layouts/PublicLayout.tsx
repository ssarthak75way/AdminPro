import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { Box, Container, Paper, Typography } from '@mui/material';
import { useAuth } from '../context/AuthContext';
import Loader from '../components/Loader';
import { useAppSelector } from '../app/hooks';

const PublicLayout: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const isLoading = useAppSelector((state) => state.auth.isLoading);

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <Box
      sx={{
        backgroundColor: 'background.default',
        backgroundImage:
          'radial-gradient(at 47% 33%, hsla(216,62%,70%,1) 0px, transparent 50%), radial-gradient(at 82% 65%, hsla(262,81%,67%,1) 0px, transparent 50%)',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        p: 2, // Ensure padding on small screens
      }}
    >
      <Loader open={isLoading} />
      <Container maxWidth="xs">
        <Paper
          elevation={3}
          sx={{
            p: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            borderRadius: 2,
          }}
        >
          <Typography variant="h4" component="h1" gutterBottom fontWeight="bold" color="primary">
            AdminPro
          </Typography>
          <Outlet />
        </Paper>
      </Container>
    </Box>
  );
};

export default PublicLayout;
