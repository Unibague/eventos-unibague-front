import React from 'react';
import { Box } from '@mui/material';
import { HttpClient } from '../Http/HttpClient';
import { EventFile } from '@/app/lib/types';
import { convertSnakeToCamel } from '../utils';
import EventCarouselList from './EventCarouselList';

interface EventCarouselProps {
  eventId: number;
}

async function getEventFiles(eventId: number): Promise<EventFile[]> {
  try {
    const http = HttpClient.getInstance();
    let response = await http.get(`/api/event/${eventId}/files`);
    let { data } = response;
    const eventFiles = data.map((element) => {
      return convertSnakeToCamel(element);
    });
    return eventFiles as EventFile[];
  } catch (error) {
    console.error('Failed to fetch event files:', error);
    return null;
  }
}

async function EventCarousel({ eventId }: EventCarouselProps) {
  const items = await getEventFiles(eventId);
  console.log(items);

  return (
    <EventCarouselList eventFiles = {items}/>
  );
}

export default EventCarousel;
