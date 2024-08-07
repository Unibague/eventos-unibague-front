'use client';

import React, { useState, useMemo } from 'react';
import { Grid, Paper, Typography, Box, Dialog, DialogTitle, DialogContent, DialogActions, Button, IconButton } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { format, addDays, isSameDay, startOfDay } from 'date-fns';
import { events } from '@/app/lib/utils/events';

const EventDetailsDialog = ({ event, open, onClose }) => {
  if (!event) return null;

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{event.title}</DialogTitle>
      <DialogContent>
        <Typography variant="body1">Start: {format(event.start, 'HH:mm')}</Typography>
        <Typography variant="body1">End: {format(event.end, 'HH:mm')}</Typography>
        <Typography variant="body1">Description: {event.description || 'No description provided.'}</Typography>
        {event.zoomLink && (
          <Typography variant="body1">
            Zoom Link: <a href={event.zoomLink} target="_blank" rel="noopener noreferrer">{event.zoomLink}</a>
          </Typography>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

const Calendar = () => {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [currentDate, setCurrentDate] = useState(startOfDay(new Date()));

  const currentTime = new Date();

  const handleEventClick = (event) => {
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
    return events.filter((event) => isSameDay(event.start, currentDate));
  }, [events, currentDate]);

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
          const isCurrentEvent = currentTime >= event.start && currentTime <= event.end;
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
                backgroundColor: isCurrentEvent ? '#90EE90' : 'white',
                '&:hover': {
                  backgroundColor: isCurrentEvent ? 'darkgreen' : 'rgba(0, 0, 0, 0.04)',
                },
              }}
              onClick={() => handleEventClick(event)}
            >
              <Typography variant="body2" color="textSecondary">
                {format(event.start, 'HH:mm')} - {format(event.end, 'HH:mm')}
              </Typography>
              <Typography variant="h6">{event.title}</Typography>
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

      <EventDetailsDialog event={selectedEvent} open={dialogOpen} onClose={handleCloseDialog} />
    </Paper>
  );
};

export default Calendar;
