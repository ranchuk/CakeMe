import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post('/login', {
        email,
        password
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>
      <label htmlFor="email">Email</label>
      <input onChange={(e) => setEmail(e.target.value)} value={email} type="email" name="email" id="email" required />

      <label htmlFor="password">Password</label>
      <input onChange={(e) => setPassword(e.target.value)} value={password} type="password" name="password" id="password" required />

      <button type="submit">Lgin</button>
    </form>
  );
};

export default Login;
