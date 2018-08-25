import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import SvgIcon from '@material-ui/core/SvgIcon';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';

const styles = {
  root: {
    flexGrow: 1,
  },
};

function HomeIcon(props) {
  return (
    <SvgIcon {...props}>
      <path d="M11 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
    </SvgIcon>
  );
}

const TopBar = props => {
  const { classes } = props;
  return (
    <AppBar position="absolute" style={{ zIndex: 10 }}>
      <Toolbar>
        <Typography variant="title" color="inherit" style={{ flex: 1 }}>
          Crypto Currency Tracker
        </Typography>

        <Button>
          <Link to="/home" style={{ textDecoration: 'none', color: 'white' }}>
            <HomeIcon className={classes.icon} />
          </Link>
        </Button>
      </Toolbar>
    </AppBar>
  );
};

TopBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TopBar);
