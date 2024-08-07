'use client';
import { Box } from '@mui/material';
import { EventFile } from '../types';

interface CarouselItemProps {
  eventFile: EventFile;
}

const EventCarouselItem = ({ eventFile }: CarouselItemProps) => {

  const handleClick = () => {
    window.open(eventFile.payload.redirectUrl, '_blank');
  };

  return (
    <Box
      component="img"
      src={eventFile.payload.source}
      sx={{
        width: '100%',
        height: {
          xs: '28vh',
          sm: '40vh',
          md: '50vh',
          lg: '60vh',
        },
        borderRadius: '5px',
        cursor: 'pointer',
      }}
      onClick={handleClick} // Pass the function reference, not the result of calling the function
    />
  );
};

export default EventCarouselItem;
