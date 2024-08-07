import {Box} from '@mui/material';
import React from 'react';
import AppBarContainer from '../../lib/components/AppBar/AppBarContainer';
import Footer from '../../lib/components/Footer';
import { HttpClient } from '../../lib/Http/HttpClient';
import { Event } from '@/app/lib/types';
import { convertSnakeToCamel } from '@/app/lib/utils';


interface EventLayoutProps {
  children: React.ReactNode,
  params:{
    id: number
  }
}

async function getEvent(eventId: number): Promise<Event>  {
  try {
    const http = HttpClient.getInstance();
    let response = await http.get(`/api/events/${eventId}`);
    const event: Event = convertSnakeToCamel(response.data);
    return event
  } catch (error) {
    console.error('Failed to fetch events:', error);
    return null;
  }
}

async function getEventLogo(eventId: number)   {
  try {
    const http = HttpClient.getInstance();
    let response = await http.get(`/api/event/${eventId}/eventFiles/logo`);
    const eventLogo = convertSnakeToCamel(response.data);
    return eventLogo
  } catch (error) {
    console.error('Failed to fetch eventLogo:', error);
    return null;
  }
}


export default async function EventLayout({ children, params }: EventLayoutProps) {

  const eventId = params.id 
  const event = await getEvent(eventId);
  const eventLogo = await getEventLogo(eventId);
  console.log(eventLogo);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
      }}
    >
      <AppBarContainer event= {event} eventLogo = {eventLogo}/>
      
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

      <Footer event={event}/>
    </Box>
  );
}
