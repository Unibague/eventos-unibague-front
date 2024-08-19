import { Typography, Dialog, DialogTitle, DialogContent, DialogActions, Button, Divider } from '@mui/material';
import { format } from 'date-fns';

const EventDetailsDialog = ({ event, open, onClose }: any) => {
  if (!event) return null;

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle sx={{ fontWeight: 'bold', textAlign: 'center' }}>{event.name}</DialogTitle>
      <DialogContent dividers>
        <Typography variant="body1" gutterBottom>
          <strong>Start:</strong> {format(new Date(event.startDate), 'HH:mm')}
        </Typography>
        <Typography variant="body1" gutterBottom>
          <strong>End:</strong> {format(new Date(event.endDate), 'HH:mm')}
        </Typography>
        <Typography variant="body1" gutterBottom>
          <strong>Speaker(s):</strong> {event.speaker || 'No description provided.'}
        </Typography>
        <Typography variant="body1" paragraph>
          <strong>Description:</strong> {event.description || 'No description provided.'}
        </Typography>
        {event.onlineLink && (
          <>
            <Divider sx={{ my: 2 }} />
            <Typography variant="body1">
              <strong>Zoom Link:</strong> <a href={event.onlineLink} target="_blank" rel="noopener noreferrer">{event.onlineLink}</a>
            </Typography>
          </>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant="contained" color="primary">Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default EventDetailsDialog;
