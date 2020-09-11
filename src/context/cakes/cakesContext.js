import React, { createContext, useReducer } from 'react';
import axios from 'axios';
import CakesReducer from './CakesReducer';
import { GET_CAKES, CAKES_ERROR } from '../types';

const initialState = {
  cakes: [],
  error: null,
  loading: true
};

export const CakesContext = createContext(initialState);

export const CakesProvider = ({ children }) => {
  const [state, dispatch] = useReducer(CakesReducer, initialState);

  async function getCakes() {
    try {
      const token = localStorage.getItem('token');

      if (token !== null || token !== '') {
      }

      const cakes = await axios.get('/cakes', { headers: { "x-auth-token": token } });


      dispatch({
        type: GET_CAKES,
        payload: cakes.data.cakes
      });
    } catch (err) {
      dispatch({
        type: CAKES_ERROR,
        payload: err.response.data.msg
      });
    }
  };

  return (
    <CakesContext.Provider value={{
      cakes: state.cakes,
      error: state.error,
      loading: state.loading,
      getCakes
    }}>
      {children}
    </CakesContext.Provider>
  );
};