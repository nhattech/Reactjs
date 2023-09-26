import { useLoaderData } from 'react-router-dom';

import EventsList from '../components/EventsList';

function EventsPage() {
  const response = useLoaderData();
  const events = response.events;

  return <EventsList events={events} />;
}

export default EventsPage;

export const eventLoader = async () => {
  const response = await fetch('http://localhost:8080/events');

  if (!response.ok) {
    throw new Error('Could not fetch events.');
  } else {
    return response;
  }
};
