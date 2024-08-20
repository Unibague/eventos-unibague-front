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
} from '@mui/material';

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
    const res = await signIn('google' , { callbackUrl: 'http://localhost:3000/landing' });
    if (res?.error) {
      setError(res.error);
    } else {

        router.push(`/landing`);
        return;

      // router.push(`/event/${eventId}/home`);
      // router.refresh();
    }
  };

  return (
    <Container
      sx={{
        height: 'calc(100vh - 7rem)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Box
        component="form"
        onSubmit={onSubmit}
        sx={{
          width: '100%',
          maxWidth: 400,
          backgroundColor: 'background.paper',
          padding: 4,
          borderRadius: 2,
          boxShadow: 1,
        }}
      >
        {/* {
          eventId && <Alert color="warning">
          This is a restricted event, please sign in to continue.
        </Alert>
        } */}

        {error && (
          <Alert severity="error" sx={{ marginY: 2, }}>
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
          helperText={typeof errors.email?.message === 'string' ? errors.email.message : ''}
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
          helperText={typeof errors.password?.message === 'string' ? errors.password.message : ''}
        />

        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          sx={{ marginTop: 2 }}
        >
          Login
        </Button>


        {/* <Button
          onClick={handleGoogleSignIn}
          fullWidth
          variant="outlined"
          color="primary"
          sx={{ marginTop: 2 }}
        >
          Unibagué Login
        </Button> */}

      </Box>
    </Container>
  );
}

export default LoginPage;
