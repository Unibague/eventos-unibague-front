'use client';
import { Card, Typography, TextField, Box, Button, Snackbar } from '@mui/material';
import React, { useState } from 'react';
import { HttpClient } from '../../Http/HttpClient';
import { useParams } from 'next/navigation';
import { prepareErrorText } from '../../utils/index';
import { signIn, signOut, useSession } from 'next-auth/react';


const AddMessageCard = () => {
  const params = useParams();
  const { id: eventId } = params;
  const [message, setMessage] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarColor, setSnackbarColor] = useState('success.main');
  const [loading, setLoading] = useState(false); // Track loading state
  const { data: session } = useSession();


  async function handleMessageSubmitted() {

    if (message.trim() === '') {
      setSnackbarMessage('Message cannot be empty.');
      setSnackbarColor('error.main');
      setOpenSnackbar(true);
      return;
    }

    setLoading(true); // Start loading


    const http = HttpClient.getInstance();
    const data = { message, userId: session?.user?.id};

    try {
      const resp = await http.post(`api/event/${eventId}/messages`, data);
      console.log(resp.data);
      setSnackbarMessage('Message added successfully!');
      setSnackbarColor('success.main');
      setOpenSnackbar(true);
      setMessage(''); // Clear the message input after successful submission
    } catch (e) {
      console.log('Error:', e);
      setSnackbarMessage(prepareErrorText(e));
      setSnackbarColor('error.main');
      setOpenSnackbar(true);
    } finally {
      setLoading(false); // End loading
    }

  }

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center', // Center horizontally
          padding: '20px',
          m: '20px',
        }}
      >
        <Card sx={{ width: '100%', maxWidth: '800px', padding: '20px', boxShadow: 3 }}>
          <Typography variant="h6" gutterBottom>
            Add a message
          </Typography>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            Share your message with everyone in the event.
          </Typography>
          <TextField
            multiline
            rows={4}
            placeholder="Write your message here..."
            sx={{
              width: '100%',
              mb: 2,
              '& .MuiOutlinedInput-root': {
                borderRadius: '10px',
                bgcolor: 'background.paper',
              },
              '& .MuiInputBase-input': {
                padding: '10px',
              },
            }}
            value={message}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setMessage(e.target.value);
            }}
          />
          <Box textAlign="end">
            <Button
              variant="contained"
              color="primary"
              sx={{ borderRadius: '20px', padding: '10px 20px' }}
              onClick={() => handleMessageSubmitted()}
              disabled={loading} // Disable button while loading
            >
              {loading ? 'Sending...' : 'Send'}
            </Button>
          </Box>
        </Card>

        <Snackbar
          open={openSnackbar}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          autoHideDuration={3000}
          onClose={() => setOpenSnackbar(false)}
          message={snackbarMessage}
          ContentProps={{
            sx: {
              borderRadius: '10px',
              color: 'white',
              bgcolor: snackbarColor,
              fontWeight: 'bold',
              textAlign: 'center',
              '& .MuiSnackbarContent-message': {
                width: '100%',
                textAlign: 'center',
              },
            },
          }}
        />
      </Box>
    </>
  );
};

export default AddMessageCard;
