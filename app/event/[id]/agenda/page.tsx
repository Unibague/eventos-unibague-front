'use client'; // This will ensure the component is treated as a client component

import React, { useEffect, useState } from 'react';
import { HttpClient } from '@/app/lib/Http/HttpClient';
import { convertSnakeToCamel } from '@/app/lib/utils';
import { EventMeeting } from '@/app/lib/types';
import AgendaContainer from '@/app/lib/components/Agenda/AgendaContainer';
import { useSession } from "next-auth/react";

const AgendaPage = ({ params }) => {
  const { id: eventId } = params;
  const [eventMeetings, setEventMeetings] = useState<EventMeeting[] | null>(null);
  const [error, setError] = useState(null);
  
  const { data: session, status } = useSession();
  const accessToken = session?.accessToken ?? "";
  console.log(accessToken);


  useEffect(() => {

    const fetchEventMeetings = async () => {

      try {
        const http = HttpClient.getInstance(accessToken);
        const response = await http.get(`/api/event/${eventId}/meetings`);
        const { data } = response;
        const meetings = data.map(element => convertSnakeToCamel(element));
        setEventMeetings(meetings as EventMeeting[]);
      } catch (error) {
        console.error('Failed to fetch event messages:', error);
        setError(error);
      }
    };

    // const testingRequest = async () => {
    //   const http = HttpClient.getInstance(accessToken);
    //   const response = await http.get(`/api/userData/test`);
    //   console.log(response.data);
    // }

    fetchEventMeetings();
  }, [eventId]);

  if (error) {
    return <div>Error loading event meetings.</div>;
  }

  if (!eventMeetings) {
    return <div>Loading...</div>;
  }

  return <AgendaContainer eventMeetings={eventMeetings} eventId={eventId} />;
};

export default AgendaPage;
