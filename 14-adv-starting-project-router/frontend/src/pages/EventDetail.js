import {
  Await,
  defer,
  json,
  redirect,
  useRouteLoaderData,
} from 'react-router-dom';
import EventItem from '../components/EventItem';
import EventsList from '../components/EventsList';
import { Suspense } from 'react';

function EventDetailPage() {
  const data = useRouteLoaderData('event-detail');
  const { event, events } = data;
  return (
    <>
      <Suspense
        fallback={<p style={{ textAlign: 'center' }}>Loading event ...</p>}
      >
        <Await resolve={event}>
          {(loadedEvent) => <EventItem event={loadedEvent} />}
        </Await>
      </Suspense>

      <Suspense
        fallback={<p style={{ textAlign: 'center' }}>Loading events ...</p>}
      >
        <Await resolve={events}>
          {(loadedEvents) => <EventsList events={loadedEvents} />}
        </Await>
      </Suspense>
    </>
  );
}

export default EventDetailPage;

const fetchEvent = async (id) => {
  const response = await fetch('http://localhost:8080/events/' + id);
  if (!response.ok) {
    throw json({ message: 'Could not fetch detail event.' }, { status: 500 });
  } else {
    const resData = await response.json();
    return resData.event;
  }
};

const fetchEvents = async () => {
  const response = await fetch('http://localhost:8080/events');

  if (!response.ok) {
    throw json({ message: 'Could not fetch event!' }, { status: 500 });
  } else {
    const resData = await response.json();
    return resData.events;
  }
};

export const loader = async ({ request, params }) => {
  const id = params.eventId;

  return defer({
    event: await fetchEvent(id),
    events: fetchEvents(),
  });
};

export const action = async ({ request, params }) => {
  const id = params.eventId;

  const response = await fetch('http://localhost:8080/events/' + id, {
    method: request.method,
  });

  if (!response.ok) {
    throw json('Coutd not delete event.', { status: 500 });
  }

  return redirect('/events');
};
