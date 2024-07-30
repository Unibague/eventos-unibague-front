import { Grid } from '@mui/material';
import EventCard from '../../lib/components/EventCard';
import {Event} from '../types'

interface EventListProps {
  events: Event[];
}

const EventList = ({ events }: EventListProps) =>  {

  return (
    <>
    {events.map((event) => (
        <Grid item xs={12} sm={6} md={4} key={event.id}>
          <EventCard event= {event}/>
        </Grid>
      ))}

    </>
  );
}

export default EventList

