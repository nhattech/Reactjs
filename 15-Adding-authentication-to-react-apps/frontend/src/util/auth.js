import { redirect } from 'react-router-dom';

export const setAuthToken = (token) => {
  localStorage.setItem('token', token);
};

export const getAuthToken = () => {
  const token = localStorage.getItem('token');

  return token;
};

export const removeAuthToken = () => {
  localStorage.removeItem('token');
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
