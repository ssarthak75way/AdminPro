import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import {
  TextField,
  Button,
  Box,
  Typography,
  Link,
  Divider,
  Paper,
  IconButton,
  InputAdornment,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { SocialIcon } from 'react-social-icons';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../app/hooks';
import { loginStart, loginSuccess, loginFailure } from '../store/authSlice';
import { authService } from '../services/auth.service';
import { useToast } from '../context/ToastContext';

interface RegisterFormInputs {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const Register: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isLoading } = useAppSelector((state) => state.auth);
  const { showToast } = useToast();

  const [showPassword, setShowPassword] = useState(false);

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterFormInputs>({
    mode: 'onTouched',
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  // eslint-disable-next-line react-hooks/incompatible-library
  const password = watch('password');

  const onSubmit = async (data: RegisterFormInputs) => {
    dispatch(loginStart());
    try {
      const response = await authService.register(
        data.email,
        data.password,
        data.name
      );
      dispatch(loginSuccess(response));
      showToast('Registration successful! Welcome.', 'success');
      navigate('/dashboard');
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      const message = err?.message || 'Registration failed';
      dispatch(loginFailure(message));
      showToast(message, 'error');
    }
  };

  const handleSocialLogin = (provider: 'google' | 'github' | 'facebook') => {
    console.log(`Social login with ${provider}`);
    showToast(`${provider} login coming soon!`, 'info');
    // future: authService.socialLogin(provider)
  };

  const socialButtonStyle = {
    p: 1,
    borderRadius: '50%',
    cursor: 'pointer',
    border: '1px solid',
    borderColor: 'divider',
    transition: 'all 0.2s ease',
    '&:hover': {
      boxShadow: 3,
      transform: 'translateY(-2px)',
    },
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 1 }}>
      <Typography variant="h5" fontWeight={600} align="center" gutterBottom>
        Create Account
      </Typography>

      <Typography variant="body2" color="text.secondary" align="center" mb={2}>
        Sign up to get started
      </Typography>

      {/* Full Name */}
      <Controller
        name="name"
        control={control}
        rules={{
          required: 'Full name is required',
          minLength: { value: 3, message: 'Minimum 3 characters' },
        }}
        render={({ field }) => (
          <TextField
            {...field}
            fullWidth
            label="Full Name"
            margin="normal"
            autoFocus
            error={!!errors.name}
            helperText={errors.name?.message}
            disabled={isLoading}
            autoComplete="name"
          />
        )}
      />

      {/* Email */}
      <Controller
        name="email"
        control={control}
        rules={{
          required: 'Email is required',
          pattern: {
            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: 'Invalid email address',
          },
        }}
        render={({ field }) => (
          <TextField
            {...field}
            fullWidth
            label="Email Address"
            margin="normal"
            error={!!errors.email}
            helperText={errors.email?.message}
            disabled={isLoading}
            autoComplete="email"
          />
        )}
      />

      {/* Password */}
      <Controller
        name="password"
        control={control}
        rules={{
          required: 'Password is required',
          minLength: { value: 6, message: 'Minimum 6 characters' },
        }}
        render={({ field }) => (
          <TextField
            {...field}
            fullWidth
            label="Password"
            margin="normal"
            type={showPassword ? 'text' : 'password'}
            error={!!errors.password}
            helperText={errors.password?.message}
            disabled={isLoading}
            autoComplete="new-password"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    edge="end"
                    onClick={() => setShowPassword((p) => !p)}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        )}
      />

      {/* Confirm Password */}
      <Controller
        name="confirmPassword"
        control={control}
        rules={{
          required: 'Please confirm your password',
          validate: (value) =>
            value === password || 'Passwords do not match',
        }}
        render={({ field }) => (
          <TextField
            {...field}
            fullWidth
            label="Confirm Password"
            margin="normal"
            type="password"
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword?.message}
            disabled={isLoading}
            autoComplete="new-password"
          />
        )}
      />

      {/* Submit */}
      <Button
        type="submit"
        fullWidth
        variant="contained"
        size="large"
        sx={{ mt: 3, height: 48 }}
        disabled={isLoading}
      >
        {isLoading ? 'Creating Account...' : 'Sign Up'}
      </Button>

      {/* Social Auth */}
      <Divider sx={{ my: 3 }}>or continue with</Divider>

      <Box display="flex" justifyContent="center" gap={2}>
        <Paper sx={socialButtonStyle} onClick={() => handleSocialLogin('google')}>
          <SocialIcon
            network="google"
            style={{ height: 40, width: 40 }}
            bgColor="transparent"
            fgColor="#DB4437"
          />
        </Paper>

        <Paper sx={socialButtonStyle} onClick={() => handleSocialLogin('github')}>
          <SocialIcon
            network="github"
            style={{ height: 40, width: 40 }}
            bgColor="transparent"
            fgColor="#000"
          />
        </Paper>

        <Paper
          sx={socialButtonStyle}
          onClick={() => handleSocialLogin('facebook')}
        >
          <SocialIcon
            network="facebook"
            style={{ height: 40, width: 40 }}
            bgColor="transparent"
            fgColor="#1877F2"
          />
        </Paper>
      </Box>

      {/* Redirect */}
      <Box textAlign="center" mt={3}>
        <Link component={RouterLink} to="/login" variant="body2">
          Already have an account? Sign In
        </Link>
      </Box>
    </Box>
  );
};

export default Register;
