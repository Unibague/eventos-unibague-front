import { HttpClient } from '@/app/lib/Http/HttpClient';
import { convertSnakeToCamel } from '@/app/lib/utils';
import { EventMeeting } from '@/app/lib/types';
import AgendaContainer from '@/app/lib/components/Agenda/AgendaContainer'


async function getEventMeetings (eventId: string): Promise<EventMeeting[]> {

  try {
    const http = HttpClient.getInstance();
    let response = await http.get(`/api/event/${eventId}/meetings`);
    let {data} = response
    const eventMeetings = data.map(element => {
      return convertSnakeToCamel(element)
    })
    return eventMeetings as EventMeeting[];
  } catch (error) {
    console.error('Failed to fetch event messages:', error);
    return null;
  }
}

const AgendaPage = async ({params}) => {
  const {id:eventId} = params;
  const eventMeetings = await getEventMeetings(eventId)
  return (
    <AgendaContainer eventMeetings= {eventMeetings} eventId={eventId}/>
  )

}

export default AgendaPage;
