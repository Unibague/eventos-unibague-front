'use client';
import React, { useState, useEffect, useMemo } from 'react';
import { Paper, Typography, Box, IconButton } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { addDays, isSameDay, isWithinInterval } from 'date-fns';
import EventDetails from '@/app/lib/components/Agenda/EventDetails';
import { HttpClient } from '@/app/lib/Http/HttpClient';
import { EventMeeting } from '@/app/lib/types';
import { convertSnakeToCamel } from '../../utils';

interface AgendaContainerProps {
    eventMeetings: EventMeeting[];
    eventId: string;
    startDate: string;
    endDate: string;
}

const AgendaContainer = ({ eventMeetings: initialEventMeetings, eventId, startDate, endDate }: AgendaContainerProps) => {
    const [error, setError] = useState<any>(null);
    const [eventMeetings, setEventMeetings] = useState(initialEventMeetings);
    const [selectedEvent, setSelectedEvent] = useState<EventMeeting | null>(null);
    const [dialogOpen, setDialogOpen] = useState(false);

    // Convert startDate and endDate strings to Date objects
    const startDateObj = new Date(startDate);
    const endDateObj = new Date(endDate);

    const [currentDate, setCurrentDate] = useState(startDateObj);
    const currentTime = new Date();

    const timeFormatter = new Intl.DateTimeFormat('en-GB', {
        timeZone: 'utc',
        hour: '2-digit',
        minute: '2-digit',
    });

    const dateFormatter = new Intl.DateTimeFormat('en-GB', {
        timeZone: 'utc',
        day: '2-digit',
        month: 'long',
        year: 'numeric',
    });

    const handleEventClick = (event: EventMeeting) => {
        setSelectedEvent(event);
        setDialogOpen(true);
    };

    const handleCloseDialog = () => {
        setDialogOpen(false);
    };

    const handlePrevDay = () => {
        setCurrentDate((prevDate) => {
            const newDate = addDays(prevDate, -1);
            return isWithinInterval(newDate, { start: startDateObj, end: endDateObj }) ? newDate : prevDate;
        });
    };

    const handleNextDay = () => {
        setCurrentDate((prevDate) => {
            const newDate = addDays(prevDate, 1);
            return isWithinInterval(newDate, { start: startDateObj, end: endDateObj }) ? newDate : prevDate;
        });
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
            } catch (error) {
                console.error('Failed to fetch event meetings:', error);
                setError(error);
            }
        };

        const interval = setInterval(fetchEventMeetings, 15000);

        return () => clearInterval(interval);
    }, [eventId]);

    if (error) {
        return <div>Error loading event info.</div>;
    }

    return (
        <Paper sx={{ p: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <IconButton onClick={handlePrevDay} disabled={isSameDay(currentDate, startDateObj)}>
                    <ArrowBackIosIcon />
                </IconButton>
                <Typography variant="h5">{dateFormatter.format(currentDate)}</Typography>
                <IconButton onClick={handleNextDay} disabled={isSameDay(currentDate, endDateObj)}>
                    <ArrowForwardIosIcon />
                </IconButton>
            </Box>
            {eventsForDay.length > 0 ? (
                eventsForDay.map((event, index) => {
                    const eventStart = new Date(event.startDate);
                    const eventEnd = new Date(event.endDate);
                    const isCurrentEvent = currentTime >= eventStart && currentTime <= eventEnd;
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
                            <Typography variant="h6" fontSize={21}>{event.name}</Typography>
                            <Typography variant="subtitle1">{event.speaker}</Typography>
                            <Typography variant="subtitle2" color="textSecondary">
                                {timeFormatter.format(eventStart)} - {timeFormatter.format(eventEnd)}
                            </Typography>
                            <Typography variant="subtitle2" color="textSecondary">
                                {event.location || 'N/A'}
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
