import React, { useEffect } from 'react';
import axios from 'axios';

const Cakes = () => {
  useEffect(() => {
    async function fetchCakes() {
      const res = await axios.get('/cakes');
      console.log(res.data);
    }
    fetchCakes();
  }, []);

  return (
    <div>
      Cakes
    </div>
  );
};

export default Cakes;
