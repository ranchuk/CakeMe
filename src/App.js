import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { CakesProvider } from './context/cakes/cakesContext';
import { UserProvider } from './context/user/userContext';

import Cakes from './components/Cakes/Cakes';
import Signup from './components/Signup/Signup';
import Login from './components/Login/Login';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';

const App = () => {
  return (
    <Router>
      <UserProvider>
        <CakesProvider>
          <Switch>
            <Route exact path='/' component={Cakes} />
            <Route exact path='/signup' component={Signup} />
            <ProtectedRoute exact path='/login' component={Login} />
          </Switch>
        </CakesProvider>
      </UserProvider>
    </Router>
  );
};

export default App;
