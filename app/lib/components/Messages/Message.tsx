import { EventMessage } from '@/app/lib/types';
import { Typography } from '@mui/material';

interface MessageProps {
  message: EventMessage;
}

const Message = async ({ message }: MessageProps) => {


  // Function to format the date as "day/month - hour:minutes"
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
      day: '2-digit',
      month: '2-digit',
      year:'2-digit',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    };
    return new Intl.DateTimeFormat('en-GB', options).format(date);
  };

  const formattedDate = formatDate(message.createdAt);

  return (
    <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '10px' }}>
      <div
        style={{
          position: 'relative',
          marginRight: '10px',
          marginBottom: '10px',
          padding: '15px 15px 25px 15px',
          backgroundColor: '#ffffff',
          color: '#000000',
          maxWidth: '60%',
          textAlign: 'left',
          border: '1px solid #d1e7dd',
          borderRadius: '10px',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.2)',
        }}
      >
        <div
          style={{
            fontSize: '.75em',
            fontWeight: 'bolder',
            marginBottom: '10px',
            color: '#000000',
            whiteSpace: 'nowrap', // Prevents the timestamp from wrapping to a new line
          }}
        >
          {formattedDate}
        </div>
        <Typography fontSize={14} fontWeight={'light'}> {message.content} </Typography>
        <div
          style={{
            content: '""',
            position: 'absolute',
            width: '0',
            height: '0',
            borderTop: '10px solid #d1e7dd',
            borderLeft: '10px solid transparent',
            borderRight: '10px solid transparent',
            top: '0',
            right: '-10px',
          }}
        ></div>
        <div
          style={{
            content: '""',
            position: 'absolute',
            width: '0',
            height: '0',
            borderTop: '11px solid #eff4f2',
            borderLeft: '11px solid transparent',
            borderRight: '11px solid transparent',
            top: '-1px',
            right: '-11px',
          }}
        ></div>
      </div>
    </div>
  );
};

export default Message;
