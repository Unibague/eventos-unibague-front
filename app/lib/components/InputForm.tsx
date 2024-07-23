'use client';
import { useState } from 'react';
import { HttpClient } from '../Http/HttpClient';
import { useRouter } from 'next/navigation';
import { MuiOtpInput } from 'mui-one-time-password-input';
import { Button, Typography } from '@mui/material';

interface Params {
  userLoginToken: string;
}

const csrfCookieRequest = async () => {
  const http = HttpClient.getInstance();
  await http.get('/sanctum/csrf-cookie');
};

const InputForm = ({ userLoginToken }: Params) => {
  const router = useRouter();
  const [otp, setOtp] = useState('');

  const handleSubmit = async () => {
   
    await csrfCookieRequest();
    
    const data = {
      otp: otp,
      userLoginToken: userLoginToken,
    };

    let http = HttpClient.getInstance();
    const response = await http.post('api/auth/otp/validate', data);

    {/* Manage wrong OTP response from the backend */}


    const accessToken = response.headers['auth-token'];
    http.setAuthToken(accessToken);
    //Save token to axiosInstance
    router.push('/user/home');
  };

  const handleOtpChange = (newOtpValue: string) => {
    setOtp(newOtpValue);
  };

  return (
    <>
      <MuiOtpInput
        value={otp}
        length={6}
        onChange={handleOtpChange}
        sx={{ my: '20px' }}
        gap={0.5}
      />
      <Button onClick={handleSubmit} variant="contained" fullWidth color='secondary'>
        <Typography sx={{ ml: 1 }}>Validar</Typography>
      </Button>{' '}
      </>
  );
};

export default InputForm;
