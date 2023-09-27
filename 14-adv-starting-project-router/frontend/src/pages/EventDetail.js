import { json, useLoaderData } from 'react-router-dom';
import EventItem from '../components/EventItem';

function EventDetailPage() {
  const loader = useLoaderData();
  return <EventItem event={loader.event} />;
}

export default EventDetailPage;

export const loader = async ({ request, params }) => {
  const id = params.eventId;

  const response = await fetch('http://localhost:8080/events/' + id);
  if (!response.ok) {
    throw json({ message: 'Could not fetch detail event.' }, { status: 500 });
  } else {
    return response;
  }
};
