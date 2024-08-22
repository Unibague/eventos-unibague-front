import Snackbar from '@mui/material/Snackbar';

interface NotificationProps {
  message: string;
  open: boolean;
  onClose: () => void;
  snackbarColor: string;
}

const Notification = ({ message, open, onClose, snackbarColor }: NotificationProps) => {
  return (
    <Snackbar
      open={open}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      autoHideDuration={6000}
      message={message}
      onClose={onClose}
      ContentProps={{
        sx: {
          border: "1px solid black",
          borderRadius: "30px",
          backgroundColor: snackbarColor, // Set the background color directly
          fontWeight: "bold",
          textAlign: "center",
          width: "100%",
          "& .MuiSnackbarContent-message": {
            width: "inherit",
            textAlign: "center",
          },
        },
      }}
    />
  );
};

export default Notification;
