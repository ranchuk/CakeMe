import React, { useContext, useEffect } from 'react';

import { CakesContext } from '../../context/cakes/cakesContext';
import userContext from '../../context/user/userContext';

const Cakes = (props) => {
  const { userData } = useContext(userContext);
  const { cakes, getCakes } = useContext(CakesContext);
  console.log(userData);

  useEffect(() => {
    if ((userData && userData.token === null) || (userData && userData.user === null)) {
      props.history.push('/');
    } else {
      props.history.push('/cakes');
      getCakes();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userData]);


  return (
    <div>
      Cakes
    </div>
  );
};

export default Cakes;
