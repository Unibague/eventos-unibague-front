'use client'; // This will ensure the component is treated as a client component

import React, { useEffect, useState } from 'react';
import { HttpClient } from '@/app/lib/Http/HttpClient';
import { convertSnakeToCamel } from '@/app/lib/utils';
import { EventMeeting, Event} from '@/app/lib/types';
import AgendaContainer from '@/app/lib/components/Agenda/AgendaContainer';
import { useSession } from "next-auth/react";
import { Box, CircularProgress } from '@mui/material';


interface AgendaPageProps {
  params: {
    id: string;
  };
}

const AgendaPage = ({ params }: AgendaPageProps) => {
  const { id: eventId } = params;
  const [eventMeetings, setEventMeetings] = useState<EventMeeting[] | null>(null);
  const [eventInfo, setEventInfo] = useState<Event | null>(null)

  const [error, setError] = useState<any>(null);
  
  const { data: session, status } = useSession();

  useEffect(() => {

    const fetchEventMeetings = async () => {
      try {
        const http = HttpClient.getInstance();
        const response = await http.get(`/api/event/${eventId}/meetings`);
        const { data } = response;
        const meetings = data.map((element: any)=> convertSnakeToCamel(element));
        setEventMeetings(meetings as EventMeeting[]);
      } catch (error) {
        console.error('Failed to fetch event messages:', error);
        setError(error);
      }
    };

    const getEventInfo = async () => {
      try {
          const http = HttpClient.getInstance();
          const response = await http.get(`/api/events/${eventId}`);
          const { data } = response;
          const eventInfo = convertSnakeToCamel(data);
          setEventInfo(eventInfo as Event);
          console.log(eventInfo);
      } catch (error) {
          console.error('Failed to fetch event info:', error);
          setError(error);
      }
  };

    getEventInfo();
    fetchEventMeetings();
  }, [eventId]);

  if (error) {
    return <div>Error loading event meetings.</div>;
  }

  if (!eventMeetings) {
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
    eventInfo ? (
      <AgendaContainer 
        eventMeetings={eventMeetings} 
        eventId={eventId} 
        startDate={eventInfo.startDate} 
        endDate={eventInfo.endDate} 
      />
    ) : (
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
    ))
};

export default AgendaPage;
