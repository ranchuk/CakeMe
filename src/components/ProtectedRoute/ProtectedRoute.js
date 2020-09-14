import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';

import { UserContext } from '../../context/user/userContext';

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const { token } = useContext(UserContext);

  return (
    <Route
      {...rest}
      render={(props) => {
        if (token) {
          return <Component {...rest} {...props} />;
        } else {
          return (
            <Redirect
              to={{
                pathname: '/',
                state: {
                  from: props.location,
                },
              }}
            />
          );
        }
      }}
    />
  );
};

export default ProtectedRoute;
