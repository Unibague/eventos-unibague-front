'use client'

import { IconButton, InputAdornment, Snackbar, TextField } from '@mui/material';
import React, { useState } from 'react';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

export const CopyToClipboard = ({ text }) => {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(true);
    navigator.clipboard.writeText(text);
  };

  return (
    <>
      <TextField
        variant="outlined"
        value={text}
        sx={{ border: 'none', "& fieldset": { border: 'none' }, m: 1, textAlign: 'center' }}
        InputProps={{
          endAdornment: <IconButton onClick={handleClick} color="primary">
          <ContentCopyIcon />
        </IconButton>,
        }}
      />

      <Snackbar
        message="Copiado al portapapeles"
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        autoHideDuration={3000}
        onClose={() => setOpen(false)}
        open={open}
        ContentProps={{
            sx:{
              border: "1px solid black",
              borderRadius: "40px",
              color: "white",
              bgcolor: "green",
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
    </>
  );
};
