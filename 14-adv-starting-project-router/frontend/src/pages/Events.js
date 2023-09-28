import { Await, defer, json, useLoaderData } from 'react-router-dom';
import { Suspense } from 'react';

import EventsList from '../components/EventsList';

function EventsPage() {
  const response = useLoaderData();
  const events = response.events;

  return (
    <Suspense fallback={<p style={{ textAlign: 'center' }}>Loading...</p>}>
      <Await resolve={events}>
        {(loadedEvents) => <EventsList events={loadedEvents} />}
      </Await>
    </Suspense>
  );
}

export default EventsPage;

const fetchEvents = async () => {
  const response = await fetch('http://localhost:8080/events');

  if (!response.ok) {
    throw json({ message: 'Could not fetch event!' }, { status: 500 });
  } else {
    const resData = await response.json();
    return resData.events;
  }
};

export const eventLoader = () => {
  return defer({
    events: fetchEvents(),
  });
};
