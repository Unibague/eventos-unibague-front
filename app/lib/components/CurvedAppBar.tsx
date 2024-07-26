'use client';

import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Badge,
  IconButton,
} from '@mui/material';
import { styled } from '@mui/system';
import NotificationsIcon from '@mui/icons-material/Notifications';
import DialogPage from './DialogPage';

const StyledAppBar = styled(AppBar)`
  background-color: #003d7c; // Your app's primary color
  position: relative;
  z-index: 1;
  padding-bottom: 25px;
`;

const WaveBox = styled(Box)`
  position: absolute;
  bottom: -1px;
  left: 0;
  width: 100%;
  overflow: hidden;
  line-height: 0;
  transform: rotate(180deg);

  svg {
    position: relative;
    display: block;
    width: calc(100% + 1.3px);
    height: 30px;
  }

  .shape-fill {
    fill: #ffffff;
  }
`;

const AppBarContent = () => (
  <Toolbar>
    <Typography variant="h6" component="div">
      Wosc Congress
    </Typography>

    <Box sx={{ flexGrow: 1 }} />

    <IconButton color="secondary" sx={{ display: 'flex'}} >

      {/* TODO funcionalidad para renderizar la bolita roja si hay notificacion nueva*/}

      {/* Al hacer click en el ícono, renderiza el dialog*/}


      <Badge color="error" variant="dot" invisible={false}>
        <NotificationsIcon sx={{ fontSize: '37px' }}/>
      </Badge>
    </IconButton>
  </Toolbar>
);

const WaveEffect = () => (
  <WaveBox>
    <svg
      data-name="Layer 1"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1200 120"
      preserveAspectRatio="none"
    >
      <path
        d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
        className="shape-fill"
      ></path>
    </svg>
  </WaveBox>
);

export default function CustomAppBar() {
  return (
    <StyledAppBar position="static" elevation={0}>
      <AppBarContent />
      <WaveEffect />
    </StyledAppBar>
  );
}
