import axios from 'axios';

const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "http://localhost:8000/api/todos",
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
