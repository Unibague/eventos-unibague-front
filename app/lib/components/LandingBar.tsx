'use client';
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import { useRouter } from 'next/navigation';
import { signIn, signOut, useSession } from 'next-auth/react';
import { Tooltip } from '@mui/material';

export default function LandingBar() {
  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const router = useRouter();
  const session = useSession();
  console.log(session);

  //TODO: Pendiente implementar el session para saber si hay usuario

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAuth(event.target.checked);
  };

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

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
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Eventos Unibagué
          </Typography>

          {session.data ? (
            <>
            <h6> {session.data?.user.name} </h6>


            <Tooltip title="Logout">
            <IconButton size="large" onClick={onClickSignout}>
              <LogoutIcon sx={{ color: 'white' }} />
            </IconButton>
                </Tooltip>


            </>
          ) : 

          <Tooltip title="Login">
            <IconButton size="large" onClick={onClickSignIn}>
              <LoginIcon sx={{ color: 'white' }} />
            </IconButton>
        </Tooltip>


          }

          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenu}
            color="inherit"
          >
            <MenuIcon />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleClose}>Acerca de</MenuItem>
            <MenuItem onClick={handleClose}>Contactar</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
