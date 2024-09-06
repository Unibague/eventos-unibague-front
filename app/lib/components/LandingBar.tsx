'use client';

import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import { useRouter } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';
import { Tooltip } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Role } from '../types';

export default function LandingBar() {
  const router = useRouter();
  const session = useSession();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleNavigation = (url: string) => {
    router.push(url);
    handleMenuClose();
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
            <Typography variant="h6" fontSize={18} sx={{ color: 'white', marginRight:2 }}>
              Events
            </Typography>
          </Box>

          <Box sx={{ flexGrow: 1 }} />

          {session.data?.user?.id ? (
            <>
              <Typography
                variant="h6"
                fontSize={15}
                sx={{
                  maxWidth: '150px', // Set a max width to prevent overflow
                  overflow: 'hidden', // Hide overflow
                  whiteSpace: 'nowrap', // Prevent text from wrapping to next line
                  textOverflow: 'ellipsis', // Show "..." if the text is too long
                  color: 'white',
                }}
              >
                {session.data?.user?.name}
              </Typography>

              {session.data?.user?.roles.some(
                (role: Role) => role.name === 'admin',
              ) && (
                <>
                  <Tooltip title="Actions">
                    <IconButton
                      size="large"
                      onClick={handleMenuOpen}
                      sx={{ color: 'white' }}
                    >
                      <MoreVertIcon />
                    </IconButton>
                  </Tooltip>
                  <Menu
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleMenuClose}
                    PaperProps={{
                      style: {
                        width: 200,
                      },
                    }}
                  >
                    <MenuItem
                      onClick={() => handleNavigation('/admin/users/add')}
                    >
                      Add Users
                    </MenuItem>
                    <MenuItem
                      onClick={() => handleNavigation('/admin/users/view')}
                    >
                      Manage Users
                    </MenuItem>
                    <MenuItem
                      onClick={() => handleNavigation('/admin/users/events')}
                    >
                      Manage Events
                    </MenuItem>
                  </Menu>
                </>
              )}

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
