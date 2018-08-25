import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import compose from 'recompose/compose';
import { Link } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import { getTopCurrencies, getAllCurrencies } from '../actions/currencies';

import './Home.css';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  root: {
    width: '100%',
    maxWidth: 500,
  },
  card: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },

  input: {
    display: 'none',
  },
});

class Home extends PureComponent {
  UNSAFE_componentWillMount() {
    this.props.getAllCurrencies();
    this.props.getTopCurrencies();
  }

  render() {
    const { classes } = this.props;
    return (
      <div className="allBody">
        <div>
          <div className="titleContainer">
            <Typography variant="display2" align="center" gutterBottom>
              Welcome to the best Cryptocurrency Tracking Tool
            </Typography>
          </div>
          <div />
          <video id="background-video" loop autoPlay>
            <source
              src="https://media.istockphoto.com/videos/data-and-charts-video-id612477424"
              type="video/mp4"
            />
            <source
              src="https://media.istockphoto.com/videos/data-and-charts-video-id612477424"
              type="video/ogg"
            />
            Your browser does not support the video tag.
          </video>

          <br />
        </div>
        <div className="pictureContainer" />

        <div>
          <br />
          <div className="buttonContainer">
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
            >
              <Link
                to="/Top10"
                style={{
                  textDecoration: 'none',
                  color: 'white',
                  width: '80px',
                }}
              >
                <p className="playing">TOP 10</p>
              </Link>
            </Button>

            <Button
              variant="contained"
              color="primary"
              className={classes.button}
            >
              <Link
                to="/watchlist"
                style={{
                  textDecoration: 'none',
                  color: 'white',
                  width: '80px',
                }}
              >
                <p className="playing">Watchlist</p>
              </Link>
            </Button>
          </div>
          <br />
          <div className="paragraph">
            <h2>Our Services</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
          </div>
          <div className="paragraph">
            <h2>Benefits</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
          </div>

          <div className="footer" />
          <span style={{ opacity: 0.5 }}>Powered by ETHLend</span>
        </div>
      </div>
    );
  }
}

Home.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = function(state) {
  return {
    topCurrencies: state.topCurrencies,
    allCurrencies: state.allCurrencies,
  };
};

export default compose(
  withStyles(styles),
  connect(
    mapStateToProps,
    { getTopCurrencies, getAllCurrencies },
  ),
)(Home);
