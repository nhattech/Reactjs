import { json, redirect } from 'react-router-dom';
import AuthForm from '../components/AuthForm';
import { setAuthToken, setExpirationToken } from '../util/auth';

function AuthenticationPage() {
  return <AuthForm />;
}

export default AuthenticationPage;

export const action = async ({ request, params }) => {
  const data = await request.formData();
  const authData = {
    email: data.get('email'),
    password: data.get('password'),
  };

  const searchParams = new URL(request.url).searchParams;
  const mode = searchParams.get('mode') || 'login';

  if (mode !== 'login' && mode !== 'signup') {
    throw json({ message: 'Not supported mode.', status: 422 });
  }
  const response = await fetch('http://localhost:8080/' + mode, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(authData),
  });

  if (response.status === 422 || response.status === 401) {
    return response;
  }

  if (!response.ok) {
    throw json({ message: 'Could not fetch' });
  }

  const resData = await response.json();

  const token = resData.token;
  setAuthToken(token);
  setExpirationToken();
  return redirect('/');
};
