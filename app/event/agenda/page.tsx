
import Agenda from '@/app/lib/components/Agenda';
import React from 'react'


const events = [
  { title: 'Meeting', time: '09:45 - 11:00', location: 'Room 1' },
  { title: 'Go to a gym', time: '12:00 - 13:30', location: 'Gym' },
];

export const AgendaPage = () => {
  return (
   <>
   
    <Agenda events={events}/>
   
   </>
  )
}


export default AgendaPage