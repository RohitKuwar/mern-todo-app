import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import * as todosApi from '../api/todos';
import { useNavigate } from 'react-router-dom';

export default function TodosPage() {
  const { accessToken, doLogout } = useContext(AuthContext);
  const [todos, setTodos] = useState([]);
  const [task, setTask] = useState('');
  const [msg, setMsg] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (!accessToken) return;
    fetchTodos();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accessToken]);

  const fetchTodos = async () => {
    try {
      const res = await todosApi.getTodos(accessToken);
      setTodos(res.data);
    } catch (err) {
      if (err.response?.status === 401) {
        setMsg('Session expired. Please login again.');
        doLogout();
        navigate('/login');
      } else {
        setMsg('Failed to load todos');
      }
    }
  };

  const addTodo = async () => {
    if (!task.trim()) return;
    try {
      await todosApi.createTodo(accessToken, task);
      setTask('');
      fetchTodos();
    } catch (err) {
      setMsg('Failed to add');
    }
  };

  const toggle = async (id, current) => {
    try {
      await todosApi.patchTodo(accessToken, id, { completed: !current });
      fetchTodos();
    } catch {
      setMsg('Failed to update');
    }
  };

  const remove = async (id) => {
    try {
      await todosApi.deleteTodo(accessToken, id);
      fetchTodos();
    } catch {
      setMsg('Failed to delete');
    }
  };

  const clearAll = async () => {
    try {
      await todosApi.clearAllTodos(accessToken);
      fetchTodos();
    } catch {
      setMsg('Failed to clear');
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: '2rem auto', fontFamily: 'sans-serif' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems:'center' }}>
        <h2>Your Todos</h2>
        <div>
          <button onClick={() => { doLogout(); navigate('/login'); }}>Logout</button>
        </div>
      </div>

      <div style={{ display:'flex', gap:8, marginBottom:12 }}>
        <input value={task} onChange={e=>setTask(e.target.value)} placeholder="New task" style={{flex:1}} />
        <button onClick={addTodo}>Add</button>
      </div>

      {todos.length > 0 && <button onClick={clearAll} style={{ marginBottom: 12 }}>Clear All</button>}

      <ul style={{ listStyle:'none', padding:0 }}>
        {todos.map(t => (
          <li key={t._id} style={{ display:'flex', justifyContent:'space-between', padding:8, border:'1px solid #eee', marginBottom:8 }}>
            <div>
              <input type="checkbox" checked={t.completed} onChange={() => toggle(t._id, t.completed)} />
              <span style={{ marginLeft:8, textDecoration: t.completed ? 'line-through' : 'none' }}>{t.title}</span>
            </div>
            <div>
              <button onClick={() => remove(t._id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>

      {msg && <p style={{ color:'red' }}>{msg}</p>}
    </div>
  );
}