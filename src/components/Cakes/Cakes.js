import React, { useContext, useEffect } from 'react';

import { CakesContext } from '../../context/cakes/cakesContext';
import userContext from '../../context/user/userContext';

const Cakes = (props) => {
  const { userData } = useContext(userContext);
  const { cakes, getCakes } = useContext(CakesContext);

  useEffect(() => {
    getCakes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      Cakes
    </div>
  );
};

export default Cakes;
