import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

export default function Login() {
  const { doLogin } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    setMsg('');
    try {
      await doLogin(email, password);
      navigate('/todos');
    } catch (err) {
      setMsg(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div style={{ maxWidth: 480, margin: '2rem auto' }}>
      <h2>Login</h2>
      <form onSubmit={onSubmit}>
        <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" style={{width:'100%',padding:8,marginBottom:8}} />
        <input value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" type="password" style={{width:'100%',padding:8,marginBottom:8}} />
        <button type="submit" style={{width:'100%'}}>Login</button>
      </form>
      <p style={{marginTop:8}}>Don't have an account? <Link to="/register">Register</Link></p>
      {msg && <p style={{color:'red'}}>{msg}</p>}
    </div>
  );
}