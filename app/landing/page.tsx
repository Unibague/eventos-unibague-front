import { Box, Button, Grid, Typography } from '@mui/material';
import LandingBar from '../lib/components/LandingBar';
import { HttpClient } from '../lib/Http/HttpClient';
import EventList from '../lib/components/EventList';
import { Event } from '../lib/types';
import { convertSnakeToCamel } from '../lib/utils';

async function getEvents(): Promise<Event[]> {
  try {
    const http = HttpClient.getInstance();
    let response = await http.get('/api/events');
    const events = response.data.map( (element: any) => {
      return convertSnakeToCamel(element);
    });
    {/* If it got to this point is because the mapping was done correctly*/}
    return events as Event[];
  } catch (error) {
    console.error('Failed to fetch events:', error);
    return [];
  }
}

const EventsLandingPage = async () => {
  const events = await getEvents();
  return (
    <>
      <LandingBar />

      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="stretch" // Adjust to ensure children fill available space
        justifyContent="flex-start" // Align items to start
        sx={{
          minHeight: '100vh',
          backgroundColor: 'primary.alternative',
          padding: 2,
        }}
      >
        <Box
          sx={{
            width: '100%',
            mb: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Typography variant="h6" component="div">
            Todos los eventos
          </Typography>
          <Button color="primary">Filtrar</Button>
        </Box>

        {events.length > 0 ? (
          <EventList events={events} />
        ) : (
          <h2> There are no available events at the moment</h2>
        )}
      </Grid>
    </>
  );
};

export default EventsLandingPage;
