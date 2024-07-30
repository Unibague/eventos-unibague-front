import { EventMessage } from '@/app/lib/types';


interface messageProps {
  message: EventMessage
}

const Message = ({ message }: messageProps) => {


  console.log(message);

  return (
    <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '10px' }}>
      <div style={{
        position: 'relative',
        marginRight: '10px',
        marginBottom: '10px',
        padding: '15px',
        paddingBottom:'25px',
        backgroundColor: '#d1e7dd',
        color: '#0f5132',
        maxWidth: '60%',
        textAlign: 'left',
        font: "400 .9em 'Open Sans', sans-serif",
        border: '1px solid #badbcc',
        borderRadius: '10px',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.2)',
      }}>
        <p style={{ margin: 0 }}> {message.content}</p>
        <div style={{
          position: 'absolute',
          fontSize: '.75em',
          fontWeight: '300',
          marginTop: '10px',
          bottom: '5px',
          right: '10px',
          color: '#6c757d',
        }}>
          {message.createdAt}
        </div>
        <div style={{
          content: '""',
          position: 'absolute',
          width: '0',
          height: '0',
          borderTop: '10px solid #d1e7dd',
          borderLeft: '10px solid transparent',
          borderRight: '10px solid transparent',
          top: '0',
          right: '-10px',
        }}></div>
        <div style={{
          content: '""',
          position: 'absolute',
          width: '0',
          height: '0',
          borderTop: '11px solid #badbcc',
          borderLeft: '11px solid transparent',
          borderRight: '11px solid transparent',
          top: '-1px',
          right: '-11px',
        }}></div>
      </div>
    </div>
  );
};

export default Message;