// const baseURL = process.env.REACT_APP_API_URL || "http://localhost:8000";

import axios from 'axios';

// axios instance for todos (we'll add Authorization header manually)
const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL + '/api/todos' || "http://localhost:8000/api/todos",
  withCredentials: true,
});

export const getTodos = (accessToken) =>
  API.get('/', { headers: { Authorization: `Bearer ${accessToken}` } });

export const createTodo = (accessToken, title) =>
  API.post('/', { title }, { headers: { Authorization: `Bearer ${accessToken}` } });

export const patchTodo = (accessToken, id, updates) =>
  API.patch(`/${id}`, updates, { headers: { Authorization: `Bearer ${accessToken}` } });

export const deleteTodo = (accessToken, id) =>
  API.delete(`/${id}`, { headers: { Authorization: `Bearer ${accessToken}` } });

export const clearAllTodos = (accessToken) =>
  API.delete('/', { headers: { Authorization: `Bearer ${accessToken}` } });
