import {Box} from '@mui/material';
import React from 'react';
import CustomAppBar from '../lib/components/CurvedAppBar';
import Footer from '../lib/components/Footer';
import { HttpClient } from '../lib/Http/HttpClient';

interface EventLayoutProps {
  children: React.ReactNode,
  params:{
    id: string
  }
}

export default async function EventLayout({ children, params }: EventLayoutProps) {

  console.log(params);


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
