import React from 'react';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';

const TopBar = () => {
  return (
    <AppBar position="absolute" style={{ zIndex: 10 }}>
      <Toolbar>
        <Typography variant="title" color="inherit" style={{ flex: 1 }} />
      </Toolbar>
    </AppBar>
  );
};

export default TopBar;
