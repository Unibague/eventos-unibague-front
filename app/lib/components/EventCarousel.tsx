import React from 'react';
import { Box } from '@mui/material';
import { HttpClient } from '../Http/HttpClient';
import { EventFile } from '@/app/lib/types';
import { convertSnakeToCamel } from '../utils';
import EventCarouselList from './EventCarouselList';

interface EventCarouselProps {
  eventId: string;
}

async function getEventFiles(eventId: string): Promise<EventFile[] | null> {
    
    try {
      const http = HttpClient.getInstance();
      let response = await http.get(`/api/event/${eventId}/files`);
      let { data } = response;
      const eventFiles = data.map((element: any) => {
        return convertSnakeToCamel(element);
      });
      return eventFiles as EventFile[];
    } catch (error) {
      console.error('Failed to fetch event files:', error);
      return null;
    }
  }


async function EventCarousel({ eventId }: EventCarouselProps) {
  const eventFiles = await getEventFiles(eventId);
  return (
    <>
        {eventFiles && <EventCarouselList eventFiles = {eventFiles}/> }  
    </>
  );
}

export default EventCarousel;
