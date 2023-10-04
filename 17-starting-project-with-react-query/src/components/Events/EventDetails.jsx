import { Link, Outlet, useParams, useNavigate } from 'react-router-dom';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useState } from 'react';

import Header from '../Header.jsx';
import { deleteEvent, fetchEvent, queryClient } from '../../util/http.js';
import ErrorBlock from '../UI/ErrorBlock.jsx';
import Modal from '../UI/Modal.jsx';

export default function EventDetails() {
  const params = useParams();
  const navigate = useNavigate();
  const [isDeleting, setIsDeleting] = useState(false);

  //get event detail
  const { data, isPending, isError, error } = useQuery({
    queryKey: ['events', params.id],
    queryFn: ({ signal }) => fetchEvent({ signal, id: params.id }),
  });

  //delete event
  const {
    mutate,
    isPending: isDeletePending,
    isError: isDeleteError,
    error: deleteError,
  } = useMutation({
    mutationFn: deleteEvent,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['events'],
        refetchType: 'none',
      });
      navigate('/events');
    },
  });

  const startDeleteHandler = () => {
    setIsDeleting(true);
  };

  const stopDeteleHandler = () => {
    setIsDeleting(false);
  };

  const deleteEventHandler = () => {
    mutate({ id: params.id });
  };

  let content;

  if (isPending) {
    content = (
      <div id="event-details-content" className="center">
        <p>Fetching event data...</p>
      </div>
    );
  }
  if (isError) {
    content = (
      <div id="event-details-data" className="center">
        <ErrorBlock
          title={'Failed to load event'}
          message={
            error.info?.message ||
            'Failed to load event data, please try again later.'
          }
        />
      </div>
    );
  }

  if (data) {
    const formatedDate = new Date(data.date).toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
    content = (
      <>
        <header>
          <h1>{data.title}</h1>
          <nav>
            <button onClick={startDeleteHandler}>Delete</button>
            <Link to="edit">Edit</Link>
          </nav>
        </header>
        <div id="event-details-content">
          <img src={`http://localhost:3000/${data.image}`} alt="" />
          <div id="event-details-info">
            <div>
              <p id="event-details-location">{data.local}</p>
              <time dateTime={`Todo-DateT$Todo-Time`}>
                {formatedDate} @ {data.time}
              </time>
            </div>
            <p id="event-details-description">{data.description}</p>
          </div>
        </div>
      </>
    );
  }
  
  const formDelete = isDeleting && (
    <Modal onClose={stopDeteleHandler}>
      <h2>Are you sure?</h2>
      <p>
        Do you really want to delete this event? This action cannot be undone.
      </p>
      <div className="form-actions">
        {isDeletePending && <p>Deleting, please wait...</p>}
        {!isDeletePending && (
          <>
            <button onClick={stopDeteleHandler} className="button-text">
              Cancel
            </button>
            <button onClick={deleteEventHandler} className="button">
              Delete
            </button>
          </>
        )}
      </div>
      {isDeleteError && (
        <ErrorBlock
          title={'Failed to delete event'}
          message={
            deleteError.info?.message ||
            'Failed to delete event. Please try again later.'
          }
        />
      )}
    </Modal>
  );
  return (
    <>
      {formDelete}
      <Outlet />
      <Header>
        <Link to="/events" className="nav-item">
          View all Events
        </Link>
      </Header>

      <article id="event-details">{content}</article>
    </>
  );
}
