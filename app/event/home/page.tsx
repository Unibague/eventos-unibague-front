
import React from 'react'
import EventBannersCarousel from '@/app/lib/components/EventBannersCarousel';
import EventActions from '@/app/lib/components/EventActions';
import {Box, Container, Grid} from '@mui/material';


export const HomePage = () => {
  return (
    <>
    
    <Container component="main" sx={{ flexGrow: 1, mt:'60px', display: 'flex', flexDirection: 'column' }}>

      <EventBannersCarousel></EventBannersCarousel>

      <Box sx={{ flexGrow: 1}}></Box>

      <EventActions />

    </Container>

    </>
  )
}


export default HomePage;
