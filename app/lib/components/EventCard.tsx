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
import { format, parseISO, isSameYear } from "date-fns";


interface EventCardProps {
  event: Event;
}

const EventCard = ({event}: EventCardProps) => {
  
  const { data: session } = useSession();
  const router = useRouter();
  const [notificationOpen, setNotificationOpen] = React.useState(false);

  const formatDateRange = (startDateString: string, endDateString: string) => {
    const startDate = parseISO(startDateString);
    const endDate = parseISO(endDateString);

    // Format the dates as dd/MM/yyyy
    const startDateFormatted = format(startDate, 'dd/MM/yy');
    const endDateFormatted = format(endDate, 'dd/MM/yy');

    return `${startDateFormatted} - ${endDateFormatted}`;
  };

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
          router.push( `/auth/login`);
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
    <Card sx={{mb:'15px' }}>
      <CardActionArea onClick={handleSelectedEvent}>
        <CardMedia
        sx={{maxHeight:'500px'}}
          component="img"
          image={event.cardImageUrl}
          alt={event.name}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {event.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {event.location} <br/>
            {formatDateRange(event.startDate,event.endDate)}
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