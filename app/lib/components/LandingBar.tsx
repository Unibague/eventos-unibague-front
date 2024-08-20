'use client';

import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import { useRouter } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';
import { Tooltip } from '@mui/material';

export default function LandingBar() {
  const router = useRouter();
  const session = useSession();

  console.log(session);


  const onClickSignIn = () => {
    router.push(`/auth/login`);
  };

  const onClickSignout = () => {
    signOut({ callbackUrl: '/landing' });
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Box sx={{ display: 'flex', alignItems: 'center', py: 0.8 }}>
            <Box
              component="img"
              src="/images/pwa-icons/icon-384x384.png"
              alt="Eventos Logo"
              sx={{
                width: 52,
                height: 52,
                borderRadius: '30%',
                marginRight: 1,
              }}
            />
            <Typography variant="h6" fontSize={18} sx={{ color: 'white' }}>
              Eventos
            </Typography>
          </Box>

          <Box sx={{ flexGrow: 1 }} />

          {session.data?.user ? (
            <>
            <Typography variant="h6" fontSize={15} sx={{ color: 'white' }}>
            {session.data.user.name}
            </Typography>

            <Tooltip title="Logout">
              <IconButton size="large" onClick={onClickSignout}>
                <LogoutIcon sx={{ color: 'white' }} />
              </IconButton>
            </Tooltip>
            </>
          ) : (
            <Tooltip title="Login">
              <IconButton size="large" onClick={onClickSignIn}>
                <LoginIcon sx={{ color: 'white' }} />
              </IconButton>
            </Tooltip>
            
          )}
        </Toolbar>
        
      </AppBar>
    </Box>
  );
}
