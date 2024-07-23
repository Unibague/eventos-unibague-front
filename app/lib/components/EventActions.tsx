import React from 'react'
import DateRangeRoundedIcon from '@mui/icons-material/DateRangeRounded';
import MailOutlineRoundedIcon from '@mui/icons-material/MailOutlineRounded';
import InsertCommentRoundedIcon from '@mui/icons-material/InsertCommentRounded';
import { Box, Paper, Typography } from '@mui/material';
import EventActionCard from './EventActionCard';


export const EventActions = () => {
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
    <EventActionCard icon={<MailOutlineRoundedIcon color='primary' sx={{ fontSize: '60px' }} />} title='Contact Wosc'/>
    <EventActionCard icon={<InsertCommentRoundedIcon color='primary' sx={{ fontSize: '60px' }} />} title='Message'/>


    </Box>

    </>
  )
}


export default EventActions