'use client'

import {Box, Container, Grid} from '@mui/material';
import React from 'react';
import CustomAppBar from '../lib/components/CurvedAppBar';
import Footer from '../lib/components/Footer';
import EventBannersCarousel from '../lib/components/EventBannersCarousel';
import EventActions from '../lib/components/EventActions';
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
      <Container component="main" sx={{ flexGrow: 1, mt:'60px', display: 'flex', flexDirection: 'column' }}>

      <EventBannersCarousel></EventBannersCarousel>

      <Box sx={{ flexGrow: 1}}>{children}</Box>

      <EventActions />
      </Container>
      <Footer />
    </Box>
  );
}
