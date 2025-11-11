import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

export default function Register() {
  const { doRegister } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    setMsg('');
    try {
      await doRegister(email, password);
      // after register, go to login screen
      navigate('/login');
    } catch (err) {
      setMsg(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div style={{ maxWidth: 480, margin: '2rem auto' }}>
      <h2>Register</h2>
      <form onSubmit={onSubmit}>
        <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" style={{width:'100%',padding:8,marginBottom:8}} />
        <input value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" type="password" style={{width:'100%',padding:8,marginBottom:8}} />
        <button type="submit" style={{width:'100%'}}>Register</button>
      </form>
      <p style={{marginTop:8}}>Already have an account? <Link to="/login">Login</Link></p>
      {msg && <p style={{color:'red'}}>{msg}</p>}
    </div>
  );
}