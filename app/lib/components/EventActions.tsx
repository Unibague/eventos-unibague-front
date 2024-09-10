'use client'
import DateRangeRoundedIcon from '@mui/icons-material/DateRangeRounded';
import MailOutlineRoundedIcon from '@mui/icons-material/MailOutlineRounded';
import InsertCommentRoundedIcon from '@mui/icons-material/InsertCommentRounded';
import GroupsIcon from '@mui/icons-material/Groups';
import InfoIcon from '@mui/icons-material/Info';
import EventActionCard from './EventActionCard';
import Link from 'next/link';
import { useSession } from "next-auth/react";
import { Event } from '../types';
import { Box } from '@mui/material';

interface EventActionsProps {
  eventId: string
}

export const EventActions = ({ eventId }: EventActionsProps) => {
  const { data: session, status } = useSession();
  const user = session?.user;
  const userEventsAdmin = user?.eventsAdmin;

  return (
    <Box
      display="flex"
      flexWrap="wrap"
      justifyContent="center"
      gap={1.7}
      width="100%"
      px={2}
    >
      <Link href={`/event/${eventId}/agenda`} style={{textDecoration:'none', color: 'inherit'}}>
        <EventActionCard icon={<DateRangeRoundedIcon color='primary' sx={{ fontSize: '38px' }} />} title='Programme'/>
      </Link>
      <Link href={`mailto:wosc.org@gmail.com?subject=Event%20Contact&body=Hello,%20I%20have%20a%20question%20about%20the%20event`}  style={{textDecoration:'none', color: 'inherit'}}>
        <EventActionCard icon={<MailOutlineRoundedIcon color='primary' sx={{ fontSize: '38px'}} />} title='Contact'/>
      </Link>
      <Link href={`https://wosc.world/index.php/wosc-congress-2024`} style={{textDecoration:'none', color: 'inherit'}}>
        <EventActionCard icon={<InfoIcon color='primary' sx={{ fontSize: '38px' }} />} title='Basic Info'/>
      </Link>
      <Link href={`https://view.genially.com/6658855d6f75b200141b7c8e`} style={{textDecoration:'none', color: 'inherit'}}>
        <EventActionCard icon={<GroupsIcon color='primary' sx={{ fontSize: '38px' }} />} title='Keynotes'/>
      </Link>
      <Link href={`https://wosc.world/index.php/wosc-congress-2024/about-the-congress/collaboration`} style={{textDecoration:'none', color: 'inherit'}}>
        <EventActionCard icon={<DateRangeRoundedIcon color='primary' sx={{ fontSize: '38px' }} />} title='In collaboration with'/>
      </Link>
      {userEventsAdmin && userEventsAdmin.some((event: Event) => event.id == eventId) && (
        <Link href={`/event/${eventId}/messages/add`} style={{textDecoration:'none', color: 'inherit'}}>
          <EventActionCard icon={<InsertCommentRoundedIcon color='primary' sx={{ fontSize: '38px' }} />} title='Message' />
        </Link>
      )}
    </Box>
  )
}

export default EventActions