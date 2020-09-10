import React, { useState, useContext } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Cakes from './components/Cakes/Cakes';
import Signup from './components/Signup/Signup';
import Login from './components/Login/Login';
import Home from './components/Home/Home';
import ProtectedRoutes from './components/ProtectedRoutes/ProtectedRoutes';
import ProtectedLogin from './components/ProtectedRoutes/ProtectedLogin';
import AuthApi from './AuthApi';

const App = () => {
  const [auth, setAuth] = useState(false);
  const Auth = useContext(AuthApi);
  console.log(Auth);


  return (
    <AuthApi.Provider value={{ auth, setAuth }}>
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <ProtectedRoutes exact path="/cakes" auth={Auth.auth} component={Cakes} />
          <Route exact path="/signup" component={Signup} />
          <ProtectedLogin exact path="/login" auth={Auth.auth} component={Login} />
        </Switch>
      </Router>
    </AuthApi.Provider>
  );
};

export default App;
