import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:8000/api/auth',
  withCredentials: true, // send the refresh cookie
});

// register
export const register = (email, password) => API.post('/register', { email, password });

// login: returns { accessToken, user }
export const login = (email, password) => API.post('/login', { email, password });

// refresh: returns { accessToken }
export const refresh = () => API.post('/refresh');

// logout (clears cookie server-side)
export const logout = () => API.post('/logout');

export default API;
