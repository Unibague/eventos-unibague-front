'use client'
import DateRangeRoundedIcon from '@mui/icons-material/DateRangeRounded';
import MailOutlineRoundedIcon from '@mui/icons-material/MailOutlineRounded';
import InsertCommentRoundedIcon from '@mui/icons-material/InsertCommentRounded';
import EventActionCard from './EventActionCard';
import Link from 'next/link';
import { useSession } from "next-auth/react";
import { Event } from '../types';


interface EventActionsProps{
  eventId: string
}

export const EventActions = ({eventId}: EventActionsProps) => {

  const { data: session, status } = useSession();
  const user = session?.user;
  const userEventsAdmin = user?.eventsAdmin;

  return (
    <>
    
    <Link href={`/event/${eventId}/agenda`} style={{textDecoration:'none', color: 'inherit'}}>
    <EventActionCard icon={<DateRangeRoundedIcon color='primary' sx={{ fontSize: '60px' }} />} title='Programme'/>
    </Link>

    <Link href={`mailto:wosc.org@gmail.com?subject=Event%20Contact&body=Hello,%20I%20have%20a%20question%20about%20the%20event`}  style={{textDecoration:'none', color: 'inherit'}}>
    <EventActionCard icon={<MailOutlineRoundedIcon color='primary' sx={{ fontSize: '60px'}} />} title='Contact'/>
    </Link>

     {
      userEventsAdmin && userEventsAdmin.some((event: Event)  => event.id == eventId) && 
      <Link href={`/event/${eventId}/messages/add`} style={{textDecoration:'none', color: 'inherit'}}>
      <EventActionCard icon={<InsertCommentRoundedIcon color='primary' sx={{ fontSize: '60px' }} />} title='Message' />
      </Link>
    } 


    </>
  )
}


export default EventActions