  import React, { useState } from 'react';
  import { useForm } from 'react-hook-form';
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

  interface LoginFormInputs {
    email: string;
    password: string;
  }

  const Login: React.FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { isLoading } = useAppSelector((state) => state.auth);
    const { showToast } = useToast();

    const [showPassword, setShowPassword] = useState(false);

    const {
      register,
      handleSubmit,
      setValue,
      formState: { errors },
    } = useForm<LoginFormInputs>({
      mode: 'onTouched',
      defaultValues: {
        email: '',
        password: '',
      },
    });

    const onSubmit = async (data: LoginFormInputs) => {
      dispatch(loginStart());
      try {
        const response = await authService.login(
          data.email,
          data.password
        );
        dispatch(loginSuccess(response));
        showToast('Login successful!', 'success');
        navigate('/dashboard');
      } catch (err: unknown) {
        const message = (err as Error)?.message || 'Login failed';
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
          Welcome Back
        </Typography>

        <Typography
          variant="body2"
          color="text.secondary"
          align="center"
          mb={2}
        >
          Enter your credentials to continue
        </Typography>

        {/* Email */}

        <TextField
          fullWidth
          label="Email Address"
          margin="normal"
          autoFocus
          autoComplete="email"
          error={!!errors.email}
          helperText={errors.email?.message}
          disabled={isLoading}
          {...register('email', {
            required: 'Email is required',
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: 'Invalid email address',
            },
          })}
        />


        {/* Password */}

        <TextField

          fullWidth
          label="Password"
          margin="normal"
          type={showPassword ? 'text' : 'password'}
          autoComplete="current-password"
          error={!!errors.password}
          helperText={errors.password?.message}
          disabled={isLoading}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  type='button'
                  edge="end"
                  onClick={() => setShowPassword((p) => !p)}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
          {...register('password', {
            required: 'Password is required',
            minLength: { value: 6, message: 'Minimum 6 characters' },
          })}
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
          {isLoading ? 'Signing in...' : 'Sign In'}
        </Button>

        {/* Social Login */}
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

        {/* Links */}
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mt={3}
        >
          <Link component={RouterLink} to="/register" variant="body2">
            Don&apos;t have an account? Sign Up
          </Link>

          <Link
            href="#"
            variant="body2"
            onClick={(e) => e.preventDefault()}
          >
            Forgot password?
          </Link>
        </Box>

        {/* Quick Fill Demo */}
        <Box mt={4} textAlign="center">
          <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 1 }}>
            For testing purposes:
          </Typography>
          <Typography
            variant="caption"
            component="span"
            fontWeight={600}
            sx={{
              cursor: 'pointer',
              color: 'primary.main',
              bgcolor: 'primary.light',
              background: 'rgba(37, 99, 235, 0.1)',
              px: 1.5,
              py: 0.5,
              borderRadius: 1,
              transition: 'all 0.2s',
              '&:hover': {
                background: 'rgba(37, 99, 235, 0.2)',
              }
            }}
            onClick={() => {
              setValue('email', 'admin@example.com', {
                shouldDirty: true,
                shouldTouch: true,
                shouldValidate: true,
              });

              setValue('password', 'password', {
                shouldDirty: true,
                shouldTouch: true,
                shouldValidate: true,
              });

              showToast('Credentials filled!', 'info');
            }}
          >
            Quick Fill: admin@example.com
          </Typography>
        </Box>
      </Box>
    );
  };

  export default Login;
