import EventCarousel from '@/app/lib/components/EventCarousel';
import EventActions from '@/app/lib/components/EventActions';
import { Box, Container } from '@mui/material';

interface HomePageParams {
  params: {
    id: number;
  };
}

const HomePage = ({ params }: HomePageParams) => {
  const { id: eventId } = params;

  return (
    <>
      <Container
        component="main"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          minHeight: '60vh', // Ensure full height to manage spacing
          paddingTop: '10px', // Margin top as needed
        }}
      >
        {/* Carousel Section */}
        <Box
          sx={{
            flexGrow: 1, // Allows the carousel to take up available space
          }}
        >
          <EventCarousel eventId={eventId} />
        </Box>

        {/* Spacer Section */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-around', // Center EventActions horizontally
            paddingY: 1, // Add padding if needed
          }}
        >
          <EventActions eventId={eventId} />
        </Box>
      </Container>
    </>
  );
};

export default HomePage;
