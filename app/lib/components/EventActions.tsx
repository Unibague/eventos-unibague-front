import DateRangeRoundedIcon from '@mui/icons-material/DateRangeRounded';
import MailOutlineRoundedIcon from '@mui/icons-material/MailOutlineRounded';
import InsertCommentRoundedIcon from '@mui/icons-material/InsertCommentRounded';
import { Box, Paper, Typography } from '@mui/material';
import EventActionCard from './EventActionCard';
import Link from 'next/link';


interface EventActionsProps{
  eventId: number
}


export const EventActions = ({eventId}: EventActionsProps) => {

  return (
    <>
    
    <Box sx={
        {display:'flex', 
        justifyContent: 'space-around', 
        alignItems: 'flex-end',
        mb:'40px'
        }
    }>

    <EventActionCard icon={<DateRangeRoundedIcon color='primary' sx={{ fontSize: '60px' }} />} title='Agenda'/>
    
    <Link href={`mailto:jest.gmor@gmail.com?subject=Event%20Contact&body=Hello,%20I%20have%20a%20question%20about%20the%20event`}  style={{textDecoration:'none', color: 'inherit'}}>
    <EventActionCard icon={<MailOutlineRoundedIcon color='primary' sx={{ fontSize: '60px'}} />} title='Contact'/>
    </Link>
    
    <Link href={`/event/${eventId}/messages/add`} style={{textDecoration:'none', color: 'inherit'}}>
    <EventActionCard icon={<InsertCommentRoundedIcon color='primary' sx={{ fontSize: '60px' }} />} title='Message' />
    </Link>

    </Box>

    </>
  )
}


export default EventActions