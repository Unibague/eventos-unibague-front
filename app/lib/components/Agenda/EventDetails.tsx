import { Typography, Dialog, DialogTitle, DialogContent, DialogActions, Button, Divider } from '@mui/material';
import { format } from 'date-fns';

const EventDetailsDialog = ({ event, open, onClose }: any) => {
  if (!event) return null;

  const timeFormatter = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'utc',
    hour: '2-digit',
    minute: '2-digit',
});

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle sx={{ fontWeight: 'bold', textAlign: 'center' }}>{event.name}</DialogTitle>
      <DialogContent dividers>
        <Typography variant="body1" gutterBottom>
          <strong>Start:</strong> {timeFormatter.format(new Date(event.startDate))}
        </Typography>
        <Typography variant="body1" gutterBottom>
          <strong>End:</strong> {timeFormatter.format(new Date(event.endDate))}
        </Typography>
        <Typography variant="body1" gutterBottom>
          <strong>Speaker(s):</strong> {event.speaker || 'No speakers provided.'}
        </Typography>

        <Divider sx={{ my: 2 }} />
            <Typography variant="body1">
              <strong>Link: </strong> 
              {event.onlineLink && (
              <a href={event.onlineLink} target="_blank" rel="noopener noreferrer">
                {event.onlineLink}
                </a>
              )
            }
        </Typography>

      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant="contained" color="primary">Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default EventDetailsDialog;
