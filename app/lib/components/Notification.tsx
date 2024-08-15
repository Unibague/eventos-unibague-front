import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

interface NotificationProps {
  message: string;
  open: boolean;
  onClose: () => void;
  snackbarColor: string,
}

const Notification = ({ message, open, onClose, snackbarColor }: NotificationProps) => {
  return (
    <Snackbar open={open}
    anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
    autoHideDuration={6000}
    message={message}
    onClose={onClose}
    ContentProps={{
      sx:{
        border: "1px solid black",
        borderRadius: "30px",
        color: 'white',
        bgcolor: 'snackbarColor',
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
    >
      <Alert onClose={onClose} severity="warning" sx={{ width: '100%' }}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default Notification;
