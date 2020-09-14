import React, { createContext, useReducer, useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import UserReducer from './UserReducer';
import { IS_VALID, SET_USER_DATA } from '../types';

const initialState = {
  token: localStorage.getItem('token'),
  user: null,
  error: null,
  loading: true,
};

export const UserContext = createContext(initialState);

export const UserProvider = withRouter(({ children, history }) => {
  const [state, dispatch] = useReducer(UserReducer, initialState);

  useEffect(() => {
    const checkLoggedIn = async () => {
      let token = localStorage.getItem('token');

      try {
        const tokenRes = await axios.post('/users/tokenIsValid', null, {
          headers: {
            'x-auth-token': token,
          },
        });
        console.log(tokenRes);

        if (tokenRes.data) {
          const userRes = await axios.get('/users', {
            headers: { 'x-auth-token': token },
          });

          dispatch({
            type: IS_VALID,
            payload: { user: userRes.data, token },
          });
          history.push('/');
        }
      } catch (e) {
        history.push('/login');
      }
    };

    checkLoggedIn();
  }, []);

  const setUserData = (user, token) => {
    dispatch({
      type: SET_USER_DATA,
      payload: { user, token },
    });
  };

  return (
    <UserContext.Provider
      value={{
        user: state.user,
        token: state.token,
        loading: state.loading,
        setUserData,
      }}
    >
      {children}
    </UserContext.Provider>
  );
});
