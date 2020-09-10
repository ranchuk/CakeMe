import React, { useState, useContext } from 'react';
import axios from 'axios';
import auth from '../../auth/auth';
import Cookie from 'js-cookie';
import AuthApi from '../../AuthApi';

const Login = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [EmailError, setEmailError] = useState('');
  const Auth = useContext(AuthApi);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post('/login', {
        email,
        password
      });

      if (res.data.errors) {
        setEmailError(res.data.errors.password);
        console.log('error');
      }

      if (res.data.user) {
        Auth.setAuth(true);
        console.log(res.data.user);
        console.log(Cookie.get('jwt'));
        // props.history.push('/cakes');
      };

    } catch (err) {
      console.log(err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>
      <label htmlFor="email">Email</label>
      <input onChange={(e) => setEmail(e.target.value)} value={email} type="email" name="email" id="email" required />
      <div className="emailError">{EmailError}</div>

      <label htmlFor="password">Password</label>
      <input onChange={(e) => setPassword(e.target.value)} value={password} type="password" name="password" id="password" required />

      <button type="submit">Lgin</button>
    </form>
  );
};

export default Login;
