import React from 'react';

import Typography from "@material-ui/core/Typography";

import './Header.scss';

const Header = () => {
  return (
    <div className="header">
      <Typography variant="h1" component="h1" gutterBottom>
        Cake Me
      </Typography>
      <div className="mask"></div>
    </div>
  );
};

export default Header;
