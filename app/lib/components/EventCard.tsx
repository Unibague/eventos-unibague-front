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
import {userCanAccessEvent} from '@/app/lib/utils/index'
import Notification from './Notification';

interface EventCardProps {
  event: Event;
}

const EventCard = ({event}: EventCardProps) => {
  
  const { data: session } = useSession();
  const router = useRouter();
  const [notificationOpen, setNotificationOpen] = React.useState(false);

  const handleSelectedEvent = () =>{

    if(event.restrictedAccess == true){
      if (session){
        //Ok then, validate if the user has access to that specific event
        const user = session.user;
        const userAccessibleEvents = user.eventsAvailable;
        const hasAccess = userCanAccessEvent(event.id, userAccessibleEvents)
        if (hasAccess){
          router.push( `/event/${event.id}/home`);
        }
        else{
          setNotificationOpen(true);
        }
      }
      else{
          router.push( `/auth/login?eventId=${event.id}`);
      }
    }
    else{
      router.push( `/event/${event.id}/home`);
    }
  }

  const handleNotificationClose = () => {
    setNotificationOpen(false);
  };

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

    <Notification
        message="You are not in the allowed list of users for this event"
        open={notificationOpen}
        onClose={handleNotificationClose}
        snackbarColor="secondary.main"
    />

    </>
  );
}

export default EventCard;