import { redirect } from 'react-router-dom';
import { removeAuthToken, removeExpirationToken } from '../util/auth';

export function action() {
  removeAuthToken();
  removeExpirationToken();
  return redirect('/auth?mode=login');
}
