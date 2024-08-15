import EventCarousel from '@/app/lib/components/EventCarousel';
import EventActions from '@/app/lib/components/EventActions';
import {Box, Container, Grid} from '@mui/material';

interface HomePageParams{
  params: {
    id: number;
  };
}

const HomePage = ({params}: HomePageParams) => {

  const {id:eventId} = params;

  return (
    <>
    
    <Container component="main" sx={{ flexGrow: 1, mt:'10px', display: 'flex', flexDirection: 'column' }}>

      <EventCarousel eventId={eventId}></EventCarousel>

      <Box sx={{ flexGrow: 1}}></Box>

      <EventActions eventId={eventId}/>

    </Container>

    </>
  )
}


export default HomePage;
