import { addDays, setHours, setMinutes } from 'date-fns';

const today = new Date();
const tomorrow = addDays(today, 1);
const dayAfterTomorrow = addDays(today, 2);

const createEvent = ( title, location) => ({
  title,
  start: "2024-08-11T21:00:00+01:00",
  end: "2024-08-11T23:00:00+01:00",
  description: `This is the ${title} event`,
  zoomLink: 'https://zoom.us/j/1234567890',
  location: location
});

export const events = [
  // Today's events
  createEvent('A.Reyes words', 'Lady Margaret Hall'),
  // createEvent(today, 14, 16, 'Raúl Espejo monologue', 'Mutis Auditory'),
  // createEvent(today, 17, 18, 'Julian padel game', 'Terekay'),
  // createEvent(today, 19, 21, 'Late Night Call'),

  // // Tomorrow's events (start times 1 hour later)
  // createEvent(tomorrow, 10, 12, 'Project Kickoff'),
  // createEvent(tomorrow, 15, 16, 'Team Sync'),
  // createEvent(tomorrow, 18, 20, 'Client Presentation'),

  // // Day after tomorrow's events (start times 2 hours earlier)
  // createEvent(dayAfterTomorrow, 7, 9, 'Early Strategy Session'),
  // createEvent(dayAfterTomorrow, 12, 13, 'Lunch and Learn'),
  // createEvent(dayAfterTomorrow, 15, 17, 'Product Demo')
];