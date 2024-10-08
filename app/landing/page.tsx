'use client'
import { Box, Button, Grid, Typography, CircularProgress, Snackbar } from '@mui/material';
import LandingBar from '../lib/components/LandingBar';
import { HttpClient } from '../lib/Http/HttpClient';
import EventList from '../lib/components/EventList';
import { Event } from '../lib/types';
import { convertSnakeToCamel } from '../lib/utils';
import { useSession } from "next-auth/react";
import { useEffect, useState } from 'react';
import '@khmyznikov/pwa-install';
import PWAInstallWrapper from '../lib/components/PWAInstallWrapper';
import Footer from '../lib/components/Footer';


const EventsLandingPage = () => {
  const { data: session, status } = useSession();
  const [events, setEvents] = useState<Event[] | null>(null);
  const [error, setError] = useState<any>(null);
  

  console.log(session, 'La sessión');

  useEffect(() => {
    async function getEvents() {
      try {
        const http = HttpClient.getInstance();
        let response = await http.get('/api/events');
        const events = response.data.map((element: any) => {
          return convertSnakeToCamel(element);
        });
        setEvents(events as Event[]);
      } catch (error) {
        console.error('Failed to fetch events:', error);
        setError(error);
      }
    }

    getEvents();
  }, []);

  if (error) {
    return <div>Error loading events, please try again later</div>;
  }

  if (!events) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <>
      <LandingBar />

      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="stretch"
        justifyContent="flex-start"
        sx={{
          minHeight: '100vh',
          backgroundColor: 'primary.alternative',
          padding: 2,
        }}
      >
        <Box
          sx={{
            width: '100%',
            mb: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Typography variant="h6" component="div">
            All Events
          </Typography>
        </Box>


        {events.length > 0 ? (
          <EventList events={events} />
        ) : (
          <h2> There are no available events at the moment</h2>
        )}
      </Grid>
      
      <PWAInstallWrapper />

      <Footer/>





    </>
  );
};

export default EventsLandingPage;
