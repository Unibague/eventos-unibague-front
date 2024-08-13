'use client'

import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import {Event} from '../types'
import { useRouter, usePathname,} from 'next/navigation';
import { useSession } from "next-auth/react";


interface EventCardProps {
  event: Event;
}

const EventCard = ({event}: EventCardProps) => {
  const { data: session } = useSession();
  const router = useRouter();
  // const pathname = usePathname();

  // const handleSelectedEvent = () =>{

  //   const params = new URLSearchParams({
  //     eventId: event.id.toString(),
  //     restrictedAccess: event.restrictedAccess.toString(),
  //   });

  //   const newUrl = `/event/${event.id}/home?${params.toString()}`;

  //   router.push(newUrl);
  // }

  const handleSelectedEvent = () =>{

    if(session){
      router.push( `/event/${event.id}/home`);
    } else {
      router.push( `/auth/login?eventId=${event.id}`);
    }

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