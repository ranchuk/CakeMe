import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import axios from 'axios';
import { CakesProvider } from './context/cakes/cakesContext';
import userContext from './context/user/userContext';

import Cakes from './components/Cakes/Cakes';
import Signup from './components/Signup/Signup';
import Login from './components/Login/Login';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';

const App = () => {
  const [userData, setUserData] = useState({
    token: null,
    user: null
  });

  useEffect(() => {
    const checkLoggedIn = async () => {
      let token = localStorage.getItem('token');

      if (token === null) {
        localStorage.setItem('token', "");
        token = "";
      }

      const tokenRes = await axios.post('/users/tokenIsValid', null, {
        headers: {
          "x-auth-token": token
        }
      });

      if (tokenRes.data) {
        const userRes = await axios.get('/users', { headers: { "x-auth-token": token } });

        setUserData({
          token,
          user: userRes.data
        });
      }
    };

    checkLoggedIn();
  }, []);

  return (
    <Router>
      <userContext.Provider value={{ userData, setUserData }}>
        <CakesProvider>
          <Switch>
            <Route exact path="/" component={Login} />
            <Route exact path="/signup" component={Signup} />
            <ProtectedRoute exact path="/cakes" userData={userData} component={Cakes} />
          </Switch>
        </CakesProvider>
      </userContext.Provider>
    </Router>
  );
};

export default App;
