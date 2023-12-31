import { useRouteError } from 'react-router-dom';
import PageContent from '../components/PageContent';
import MainNavigation from '../components/MainNavigation';

function ErrorPage() {
  const error = useRouteError();
  let title = 'An error occurred';
  let message = error.message || 'Something went wrong...';

  if (error.status === 500) {
    title += ': ' + error.status;
    message = error.data.message;
  }

  if (error.status === 404) {
    title = 'Not Found';
    message = 'Could not find resource or page.';
  }
  return (
    <>
      <MainNavigation />
      <hr />
      <PageContent title={title}>
        <p>{message}</p>
      </PageContent>
    </>
  );
}

export default ErrorPage;
