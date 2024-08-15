'use client';
import React, { useState, useEffect, useMemo } from 'react';
import { Paper, Typography, Box, Dialog, Button, IconButton } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { format, addDays, isSameDay, startOfDay } from 'date-fns';
import EventDetails from '@/app/lib/components/Agenda/EventDetails';
import { HttpClient } from '@/app/lib/Http/HttpClient';
import { EventMeeting } from '@/app/lib/types';
import { convertSnakeToCamel } from '../../utils';
import { useSession } from "next-auth/react";

interface AgendaContainerProps {
    eventMeetings: EventMeeting[];
    eventId: string;
}

const AgendaContainer = ({ eventMeetings: initialEventMeetings, eventId }: AgendaContainerProps) => {


    const { data: session, status } = useSession();
    // console.log(session);

    const [eventMeetings, setEventMeetings] = useState(initialEventMeetings);
    const [selectedEvent, setSelectedEvent] = useState<EventMeeting | null>(null);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [currentDate, setCurrentDate] = useState(startOfDay(new Date()));
    const currentTime = new Date();

    const handleEventClick = (event: EventMeeting) => {
        setSelectedEvent(event);
        setDialogOpen(true);
    };

    const handleCloseDialog = () => {
        setDialogOpen(false);
    };

    const handlePrevDay = () => {
        setCurrentDate((prevDate) => addDays(prevDate, -1));
    };

    const handleNextDay = () => {
        setCurrentDate((prevDate) => addDays(prevDate, 1));
    };

    const handleTodayClick = () => {
        setCurrentDate(startOfDay(new Date()));
    };

    const eventsForDay = useMemo(() => {
        return eventMeetings.filter((event) => isSameDay(new Date(event.startDate), currentDate));
    }, [eventMeetings, currentDate]);

    useEffect(() => {
        const fetchEventMeetings = async () => {
            try {
                const http = HttpClient.getInstance();
                const response = await http.get(`/api/event/${eventId}/meetings`);
                const updatedEventMeetings = response.data.map((element: any) => convertSnakeToCamel(element));
                setEventMeetings(updatedEventMeetings);
                console.log(updatedEventMeetings)
            } catch (error) {
                console.error('Failed to fetch event meetings:', error);
            }
        };

        // Fetch data every 15 seconds
        const interval = setInterval(fetchEventMeetings, 15000); // 15000 ms = 15 seconds

        return () => clearInterval(interval);
    }, [eventId]);

    return (
        <Paper sx={{ p: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <IconButton onClick={handlePrevDay}>
                    <ArrowBackIosIcon />
                </IconButton>
                <Typography variant="h5">{format(currentDate, 'MMMM d, yyyy')}</Typography>
                <IconButton onClick={handleNextDay}>
                    <ArrowForwardIosIcon />
                </IconButton>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                <Button variant="outlined" onClick={handleTodayClick}>
                    Today
                </Button>
            </Box>
            {eventsForDay.length > 0 ? (
                eventsForDay.map((event, index) => {
                    const isCurrentEvent = currentTime >= new Date(event.startDate) && currentTime <= new Date(event.endDate);
                    return (
                        <Box
                            key={index}
                            sx={{
                                border: '1px solid lightgray',
                                borderRadius: 2,
                                p: 2,
                                mb: 2,
                                boxShadow: 2,
                                cursor: 'pointer',
                                backgroundColor: isCurrentEvent ? '#90EE23' : 'white',
                                '&:hover': {
                                    backgroundColor: isCurrentEvent ? '#90EE50' : 'rgba(0, 0, 0, 0.04)',
                                },
                            }}
                            onClick={() => handleEventClick(event)}
                        >
                            <Typography variant="body2" color="textSecondary">
                                {format(event.startDate, 'HH:mm')} - {format(event.endDate, 'HH:mm')}
                            </Typography>
                            <Typography variant="h6">{event.name}</Typography>
                            <Typography variant="body1" color="textSecondary">
                                Location: {event.location || 'N/A'}
                            </Typography>
                        </Box>
                    );
                })
            ) : (
                <Typography variant="body1" sx={{ textAlign: 'center', mt: 2 }}>
                    No events for this day.
                </Typography>
            )}

            <EventDetails event={selectedEvent} open={dialogOpen} onClose={handleCloseDialog} />
        </Paper>
    );
};

export default AgendaContainer;
