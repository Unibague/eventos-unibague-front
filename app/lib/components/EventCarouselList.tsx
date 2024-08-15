'use client';
import Carousel from 'react-material-ui-carousel'
import { EventFile } from '../types';
import EventCarouselItem from './EventCarouselItem';

interface CarouselListProps {
    eventFiles: EventFile[];
}

const EventCarouselList = ({ eventFiles }: CarouselListProps) => {
  
  return (
    <>
      <Carousel navButtonsAlwaysInvisible={true}>
        {eventFiles.map((item, i) => (
          <EventCarouselItem eventFile={item} key={i}/>
        ))}
      </Carousel>
    </>
  );
};

export default EventCarouselList;
