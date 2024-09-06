'use client';
import { useForm } from 'react-hook-form';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import {
  Box,
  Button,
  TextField,
  Alert,
  Container,
  Typography,
  Paper,
  Avatar,
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const searchParams = useSearchParams();
  const eventId = searchParams.get('eventId');

  const onSubmit = handleSubmit(async (data) => {
    const res = await signIn('credentials', {
      email: data.email,
      password: data.password,
      redirect: false,
    });
    if (res?.error) {
      setError(res.error);
    } else {
      router.push(`/landing`);
      router.refresh();
    }
  });

  const handleGoogleSignIn = async () => {
    const res = await signIn('google', {
      callbackUrl: 'http://localhost:3000/landing',
    });
    if (res?.error) {
      setError(res.error);
    } else {
      router.push(`/landing`);
      return;
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper
        elevation={6}
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: 4,
          borderRadius: 2,
        }}
      >
        <Box
          component="img"
          src="/images/pwa-icons/icon-512x512.png"
          alt="Eventos Logo"
          sx={{
            width: 75,
            height: 75,
            borderRadius: '30%',
            marginRight: 1,
          }}
        />
        <Typography
          component="h1"
          variant="h4"
          sx={{ mb: 3, fontWeight: 'bold', color: 'primary.main' }}
        >
          Unibagué Events
        </Typography>
        <Box component="form" onSubmit={onSubmit} sx={{ mt: 1, width: '100%' }}>
          <Alert severity="warning" sx={{ mb: 2 }}>
            You must log in to continue
          </Alert>
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}
          <TextField
            label="Email"
            type="email"
            fullWidth
            variant="outlined"
            margin="normal"
            placeholder="example@domain.com"
            {...register('email', {
              required: 'Email is required',
            })}
            error={!!errors.email}
            helperText={
              typeof errors.email?.message === 'string'
                ? errors.email.message
                : ''
            }
          />
          <TextField
            label="Password"
            type="password"
            fullWidth
            variant="outlined"
            margin="normal"
            placeholder="******"
            {...register('password', {
              required: 'Password is required',
            })}
            error={!!errors.password}
            helperText={
              typeof errors.password?.message === 'string'
                ? errors.password.message
                : ''
            }
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 3, mb: 2 }}
          >
            Log In
          </Button>
          {/* <Button
            onClick={handleGoogleSignIn}
            fullWidth
            variant="outlined"
            color="primary"
            sx={{ mb: 2 }}
          >
            Unibagué Login
          </Button> */}
        </Box>
      </Paper>
    </Container>
  );
}

export default LoginPage;
