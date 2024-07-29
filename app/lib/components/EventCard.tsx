'use client'

import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import {Event} from '../types'
import { useRouter } from 'next/navigation';

interface EventCardProps {
  event: Event;
}

const EventCard = ({event}: EventCardProps) => {

  const router = useRouter();
  const handleSelectedEvent = () =>{
    {/* If the event has restricted access... redirect to authentication logic*/}
    if (event.restrictedAccess === true){
      router.push('/auth');
    }
    {/* If not... simply render the EventLandingPage*/}
      router.push(`/event/${event.id}`);
  }

  return (
    <>
    <Card sx={{ maxWidth: 345, mb:'15px' }}>
      <CardActionArea onClick={handleSelectedEvent}>
        <CardMedia
          component="img"
          height="140"
          image={event.cardImageUrl}
          alt={event.name}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {event.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {event.location} <br/>
            {event.startDate} - {event.endDate}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
    </>
  );
}

export default EventCard;