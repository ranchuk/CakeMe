import React, { useState } from 'react';
import axios from 'axios';

const Signup = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [EmailError, setEmailError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post('/signup', {
        email,
        password
      });

      if (res.data && res.data.errors) {
        setEmailError(res.data.errors.email);
        console.log('error');
      }

      if (res.data && res.data.data) props.history.push('/cakes');

    } catch (err) {
      console.log(err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Signup</h2>
      <label htmlFor="email">Email</label>
      <input onChange={(e) => setEmail(e.target.value)} value={email} type="email" name="email" id="email" required />
      <div className="emailError">{EmailError}</div>

      <label htmlFor="password">Password</label>
      <input onChange={(e) => setPassword(e.target.value)} value={password} type="password" name="password" id="password" required />

      <button type="submit">Signup</button>
    </form>
  );
};

export default Signup;
