import { Card, Typography, TextField, Box, Button } from '@mui/material';
import React from 'react';

const AddMessageCard = () => {
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          padding: '15px',
          m: '20px',
          alignItems: 'center',
        }}
      >
        <Card sx={{ padding: '15px' }}>
          <Typography variant="h6">Add a Message</Typography>
          <Typography variant="p">
            Please write the message you want to add, everyone who is in the app
            will be able to see it.
          </Typography>
          <TextField
            multiline
            rows={4}
            placeholder="Let's meet on the hallway..."
            sx={{ my: '15px' }}
          />

          <Box textAlign={'end'}>
          <Button variant='contained' sx={{justifyContent:'flex-end'}}> Confirm </Button>  
          </Box>

        </Card>
      </Box>
    </>
  );
};

export default AddMessageCard;
