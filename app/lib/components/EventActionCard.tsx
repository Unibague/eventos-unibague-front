import React from 'react'
import IconButton from '@mui/material/IconButton';

import { Box, Paper, Typography } from '@mui/material';

export const EventActionCard = ({icon, title}) => {
  return (
    <>
    
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
    >
      <Paper sx={{ borderRadius: '10px' }}>
        <IconButton>
          {icon}
        </IconButton>
      </Paper>
      <Typography fontSize={'15px'}>{title}</Typography>
    </Box>

    
    </>
  )
}


export default EventActionCard;