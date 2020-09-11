import React, { useState, useContext } from 'react';
import axios from 'axios';
import UserContext from '../../context/user/userContext';

const Signup = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { setUserData } = useContext(UserContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post('/users/signup', {
        email,
        password
      });

      const loginRes = await axios.post('/users/login', { email, password });

      setUserData({
        token: loginRes.data.token,
        user: loginRes.data.user
      });

      localStorage.setItem('token', loginRes.data.token);

      props.history.push('/cakes');

    } catch (err) {
      console.log(err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Signup</h2>
      <label htmlFor="email">Email</label>
      <input onChange={(e) => setEmail(e.target.value)} value={email} type="email" name="email" id="email" required />

      <label htmlFor="password">Password</label>
      <input onChange={(e) => setPassword(e.target.value)} value={password} type="password" name="password" id="password" required />

      <button type="submit">Signup</button>
    </form>
  );
};

export default Signup;
