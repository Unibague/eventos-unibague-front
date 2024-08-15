  'use client'
  import { Card, Typography, TextField, Box, Button, Snackbar } from '@mui/material';
  import React, { useState } from 'react';
  import { HttpClient } from '../../Http/HttpClient';
  import { useEffect } from 'react'
  import { useParams } from 'next/navigation'
  import {prepareErrorText} from '../../utils/index'

  const AddMessageCard = () => {

    const params = useParams()
    const {id: eventId} = params;
    const [message, setMessage] = useState('');
    const [openSnackbar, setOpenSnackbar] = useState(false)
    const [snackbarMessage, setSnackbarMessage] = useState("")
    const [snackbarColor, setSnackbarColor] = useState('secondary.main')

    async function handleMessageSubmitted () {

      const http = HttpClient.getInstance();
      const data = {message};

      try {
        const resp = await http.post(`api/event/${eventId}/messages`, data)
        console.log(resp.data);
        setSnackbarMessage('Mensaje añadido correctamente')
        setSnackbarColor("secondary.main")
        setOpenSnackbar(true);
      } catch (e) {
        console.log('here')
        {/* Here I would need to generate another snackbar, but with a different message. The open and onClose properties remain the same*/}
        setSnackbarMessage(prepareErrorText(e))
        setSnackbarColor("error.main")
        setOpenSnackbar(true);
      }

    }

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
            <Typography >
              Please write the message you want to send, everyone who is in the app
              will be able to see it.
            </Typography>
            <TextField
              multiline
              rows={4}
              placeholder="Let's meet on the hallway..."
              sx={{ my: '15px' }}
              onChange = {(e: React.ChangeEvent<HTMLInputElement>) => {
                  setMessage(e.target.value)
              }}
            />

            <Box textAlign={'end'}>
            <Button variant='contained' sx={{justifyContent:'flex-end'}} onClick={() => handleMessageSubmitted()}> Send </Button>  
            </Box>
          </Card>

          <Snackbar
          open={openSnackbar}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          autoHideDuration={3000}
          onClose={() => setOpenSnackbar(false)}
          message={snackbarMessage}
          ContentProps={{
            sx:{
              border: "1px solid black",
              borderRadius: "30px",
              color: 'white',
              bgcolor: snackbarColor,
              fontWeight: "bold",
              textAlign: "center",
              // centering our message
              width:"100%",
              "& .MuiSnackbarContent-message":{
                width:"inherit",
                textAlign: "center"
              }
            }
        }}
        />

        </Box>
      </>
    );
  };

  export default AddMessageCard;
