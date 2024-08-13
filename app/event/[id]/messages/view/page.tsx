import Message from '@/app/lib/components/Messages/Message';
import MessagesList from '@/app/lib/components/Messages/MessagesList';
import { HttpClient } from '@/app/lib/Http/HttpClient';
import { EventMessage } from '@/app/lib/types';
import { convertSnakeToCamel } from '@/app/lib/utils';


interface viewMessagesProps{
  params: {
    id: number
  }
}

async function getEventMessages(eventId: number): Promise <EventMessage[]> {

  try {
    const http = HttpClient.getInstance();
    let response = await http.get(`/api/event/${eventId}/messages`);
    let {data} = response
    const eventMessages = data.map(element => {
      return convertSnakeToCamel(element)
    })
    return eventMessages as EventMessage[];
  } catch (error) {
    console.error('Failed to fetch event messages:', error);
    return null;
  }

}

const ViewMessagesPage = async ({params}: viewMessagesProps) => {

 const {id} = params
 const messages = await getEventMessages(id);
  
  return (
    <>

      {messages.length > 0 ? 
      <MessagesList messages={messages}/> 
      : 
      <h2 style={{textAlign:'center', margin:'auto'}}> This event has no messages yet! </h2>}

    </>
  );
};

export default ViewMessagesPage;
