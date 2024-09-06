import React from 'react';
import {
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Divider,
} from '@mui/material';

const EventDetailsDialog = ({ event, open, onClose }: any) => {
  if (!event) return null;

  const timeFormatter = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'utc',
    hour: '2-digit',
    minute: '2-digit',
  });

  const titleStyles = {
    fontWeight: 'bold',
    textAlign: 'center' as const,
    cursor: event.description ? 'pointer' : 'default',
    color: 'inherit',
    textDecoration: event.description !== '' ? 'underline' : 'none',
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>
        {event.description !== '' ? (
          <a
            href={event.description}
            target="_blank"
            rel="noopener noreferrer"
            style={titleStyles}
          >
            {event.name}
          </a>
        ) : (
          <Typography variant="h6" component="span" sx={titleStyles}>
            {event.name}
          </Typography>
        )}
      </DialogTitle>
      <DialogContent dividers>
        <Typography variant="body1" gutterBottom>
          <strong>Start:</strong>{' '}
          {timeFormatter.format(new Date(event.startDate))}
        </Typography>
        <Typography variant="body1" gutterBottom>
          <strong>End:</strong> {timeFormatter.format(new Date(event.endDate))}
        </Typography>
        <Typography variant="body1" gutterBottom>
          <strong>Speaker(s):</strong>{' '}
          {event.speaker || 'No speakers provided.'}
        </Typography>
        <Divider sx={{ my: 2 }} />
        <Typography variant="body1">
          <strong>Link: </strong>
          {event.onlineLink && (
            <a
              href={event.onlineLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              {event.onlineLink}
            </a>
          )}
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant="contained" color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EventDetailsDialog;
