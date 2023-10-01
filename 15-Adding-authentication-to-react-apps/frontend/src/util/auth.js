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

export const loader = () => {
  return getAuthToken();
};
