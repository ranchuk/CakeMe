import React, { useContext, useEffect } from 'react';

import NavBar from '../NavBar/NavBar';

import { CakesContext } from '../../context/cakes/cakesContext';
import { UserContext } from '../../context/user/userContext';

const Cakes = () => {
  const { user } = useContext(UserContext);
  const { cakes, getCakes } = useContext(CakesContext);

  useEffect(() => {
    getCakes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <NavBar>
      Cakes
    </NavBar>
  );
};

export default Cakes;
