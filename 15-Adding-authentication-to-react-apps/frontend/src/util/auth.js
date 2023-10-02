import { redirect } from 'react-router-dom';

export const setAuthToken = (token) => {
  localStorage.setItem('token', token);
};

export const setExpirationToken = () => {
  const expirationDate = new Date();
  expirationDate.setHours(expirationDate.getHours() + 1);
  localStorage.setItem('expiration', expirationDate.toISOString());
};

export const getTokenDuration = () => {
  const storageExpiration = localStorage.getItem('expiration');

  const expirationDate = new Date(storageExpiration);
  const now = new Date();

  return expirationDate.getTime() - now.getTime();
};

export const getAuthToken = () => {
  const token = localStorage.getItem('token');

  if(!token) {
    return null;
  }
  const tokenDuration = getTokenDuration();
  if (tokenDuration < 0) {
    return 'EXPIRED';
  }

  return token;
};

export const removeAuthToken = () => {
  localStorage.removeItem('token');
};

export const removeExpirationToken = () => {
  localStorage.removeItem('expiration');
};

export const tokenLoader = () => {
  return getAuthToken();
};

export const checkAuthLoader = () => {
  const token = getAuthToken();
  if (!token) {
    return redirect('/auth?mode=login');
  }

  return null;
};
