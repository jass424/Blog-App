// src/pages/LoginSignUp.jsx
import React, { useState } from 'react';
import './Css/Login.css';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../pages/UserContext';

function LoginSignUp() {
  const [state, setState] = useState('Login');
  const [form, setForm] = useState({ name: '', email: '', password: '' });

  const navigate = useNavigate();
  const { setUser } = useUser();

  const handleSubmit = (e) => {
    e.preventDefault();
    state === 'Login' ? login() : signUp();
  };

  const signUp = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/v1/user/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      const data = await res.json();

      if (data.success) {
        alert('Registration successful! Please login.');
        setState('Login');
      } else {
        alert(data.message || 'Registration failed');
      }
    } catch (err) {
      console.error(err);
      alert('Something went wrong.');
    }
  };

  const login = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/v1/user/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      const data = await res.json();

      if (data.success) {
        localStorage.setItem('token', data.token); //  Save token
        setUser(data.user); //  Update user context

        if(data.user.role === 'admin'){
          navigate('/admin-dashboard');
        } else{
          navigate('/');
        }
        
      } else {
        alert(data.message || 'Login failed');
      }
    } catch (err) {
      console.error(err);
      alert('Something went wrong.');
    }
  };

  return (
    <div className="loginsignup">
      <div className="loginsignup-container">
        <h1>{state}</h1>
        <form onSubmit={handleSubmit} className="loginsignup-fields">
          {state === 'Sign Up' && (
            <input
              type="text"
              placeholder="Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          )}
          <input
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          <input
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
          <button type="submit">{state}</button>
        </form>
        <p className="loginsignup-login">
          {state === 'Sign Up' ? (
            <>Already have an account? <span onClick={() => setState('Login')}>Login</span></>
          ) : (
            <>Don't have an account? <span onClick={() => setState('Sign Up')}>Create an Account</span></>
          )}
        </p>
      </div>
    </div>
  );
}

export default LoginSignUp;
