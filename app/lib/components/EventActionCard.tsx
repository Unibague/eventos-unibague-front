import React from 'react'
import IconButton from '@mui/material/IconButton';
import { Box, Paper, Typography } from '@mui/material';

interface EventActionCardProps {
  icon: React.ReactNode;
  title: string;
}

export const EventActionCard = ({ icon, title }: EventActionCardProps) => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      width="80px"  // Adjust this value as needed
    >
      <Paper 
        elevation={2}
        sx={{ 
          borderRadius: '10px',
          width: '60px',  // Adjust this value as needed
          height: '60px',  // Adjust this value as needed
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: 1
        }}
      >
        <IconButton>
          {icon}
        </IconButton>
      </Paper>
      <Typography 
        fontSize="12px"
        textAlign="center"
        sx={{
          wordWrap: 'break-word',
maxWidth: '100%'
        }}
      >
        {title}
      </Typography>
    </Box>
  )
}

export default EventActionCard;