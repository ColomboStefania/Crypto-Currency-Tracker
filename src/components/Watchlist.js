import { connect } from 'react-redux';
import compose from 'recompose/compose';
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { selectCurrency } from '../actions/selections';
import Select from 'react-select';
import Details from './Details';
import { getAllCurrencies } from '../actions/currencies';

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 350,
    marginLeft: '40%',
    marginTop: '2%',
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2,
  },
});

class Watchlist extends React.Component {
  state = {
    allCurrencies: null,
  };

  UNSAFE_componentWillMount() {
    this.interval = setInterval(() => {
    this.props.getAllCurrencies();
  }, 3000);
  }
  
  
  componentWillUnmount() {
    clearInterval(this.interval);
  }

  componentWillReceiveProps(newProps) {
    
    this.setState({ allCurrencies: newProps.allCurrencies });
  }

  handleChange = event => {
    this.props.selectCurrency(
      this.props.allCurrencies.find(curr => curr.name === event.value),
    );
  };

  render() {
    const { classes } = this.props;
    const { allCurrencies } = this.state;

    if (!allCurrencies || allCurrencies.length === 0) return <h1>   Loading...</h1>;

    const currencyOptions = allCurrencies.map(cur => ({
      value: cur.name,
      label: cur.name,
    }));



    return (
      <div>
        <div className={classes.root}>
          <div className={classes.formControl}>
            <Fragment>
              <Select
                placeholder="Pick a currency..."
                isDisabled={false}
                isLoading={false}
                isSearchable={true}
                name="currencies"
                options={currencyOptions}
                onChange={this.handleChange}
              />
            </Fragment>
          </div>
        </div>

        <br />
        <hr />
        <Details />
      </div>
    );
  }
}

const mapStateToProps = function(state) {
  return {
    selectedCurrencies: state.selectCurrencies,
    allCurrencies: state.allCurrencies,
  };
};

Watchlist.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default compose(
  withStyles(styles),
  connect(
    mapStateToProps,
    { getAllCurrencies, selectCurrency },
  ),
)(Watchlist);
