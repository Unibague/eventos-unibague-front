'use client'

import {Box, Container, Grid} from '@mui/material';
import React from 'react';
import CustomAppBar from '../lib/components/CurvedAppBar';
import Footer from '../lib/components/Footer';

export default function EventLayout({
  children}: { children: React.ReactNode}) {

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
      }}
    >
      <CustomAppBar />
      
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {children}
      </Box>

      <Footer />
    </Box>
  );
}
