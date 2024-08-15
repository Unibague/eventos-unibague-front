import { Typography, Dialog, DialogTitle, DialogContent, DialogActions, Button} from '@mui/material';
import { format,} from 'date-fns';

const EventDetailsDialog = ({ event, open, onClose }: any) => {
    if (!event) return null;
    return (
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>{event.name}</DialogTitle>
        <DialogContent>
          <Typography variant="body1">Start: {format(event.startDate, 'HH:mm')}</Typography>
          <Typography variant="body1">End: {format(event.endDate, 'HH:mm')}</Typography>
          <Typography variant="body1">Description: {event.description || 'No description provided.'}</Typography>
          {event.onlineLink && (
            <Typography variant="body1">
              Zoom Link: <a href={event.onlineLink} target="_blank" rel="noopener noreferrer">{event.onlineLink}</a>
            </Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Close</Button>
        </DialogActions>
      </Dialog>
    );
  };


export default EventDetailsDialog;