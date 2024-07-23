import {
  Box,
  Button,
  Grid,
  Typography,
} from '@mui/material';
import LandingBar from '../lib/components/LandingBar';
import EventCard from '../lib/components/EventCard';

export default function LandingPage({
  children,
}: {
  children: React.ReactNode;
}) {
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
        <Box sx={{ width: '100%', mb: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography variant="h6" component="div">
            Todos los eventos
          </Typography>
          <Button color="primary">
            Filtrar
          </Button>
        </Box>

        <EventCard />

        {children}
      </Grid>
    </>
  );
}
