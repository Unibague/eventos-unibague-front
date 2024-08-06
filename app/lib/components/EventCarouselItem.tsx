'use client';
import { Box } from '@mui/material';
import { EventFile } from '../types';

interface CarouselItemProps {
  eventFile: EventFile;
}

const EventCarouselItem = ({ eventFile }: CarouselItemProps) => {
  const handleClick = (item: EventFile) => {
    window.open(item.payload.redirectUrl, '_blank');
  };

  return (
    <>
      <Box
        component={'img'}
        src={eventFile.payload.url}
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
        onClick={handleClick(eventFile)}
      />
    </>
  );
};

export default EventCarouselItem;
