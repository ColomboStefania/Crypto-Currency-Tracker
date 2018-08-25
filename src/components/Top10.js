import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Paper from '@material-ui/core/Paper';
import Tooltip from '@material-ui/core/Tooltip';
import compose from 'recompose/compose';
import { getTopCurrencies } from '../actions/currencies';



function desc(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getSorting(order, orderBy) {
  return order === 'asc'
    ? (a, b) => desc(a, b, orderBy)
    : (a, b) => -desc(a, b, orderBy);
}

const rows = [
  { id: 'name', numeric: false, disablePadding: false, label: 'Currency Name' },
  {
    id: 'MarketCap',
    numeric: true,
    disablePadding: false,
    label: 'Market Cap $',
  },
  { id: 'Price', numeric: true, disablePadding: false, label: 'Price $' },
  { id: 'Volume', numeric: true, disablePadding: false, label: 'Volume (24h)' },
];

class EnhancedTableHead extends React.Component {
  createSortHandler = property => event => {
    this.props.onRequestSort(event, property);
  };

  render() {
    const { order, orderBy } = this.props;

    return (
      <TableHead>
        <TableRow>
          {rows.map(row => {
            return (
              <TableCell
                key={row.id}
                numeric={row.numeric}
                padding={row.disablePadding ? 'none' : 'default'}
                sortDirection={orderBy === row.id ? order : false}
              >
                <Tooltip
                  title="Sort"
                  placement={row.numeric ? 'bottom-end' : 'bottom-start'}
                  enterDelay={300}
                >
                  <TableSortLabel
                    active={orderBy === row.id}
                    direction={order}
                    onClick={this.createSortHandler(row.id)}
                  >
                    {row.label}
                  </TableSortLabel>
                </Tooltip>
              </TableCell>
            );
          }, this)}
        </TableRow>
      </TableHead>
    );
  }
}

EnhancedTableHead.propTypes = {
  onRequestSort: PropTypes.func.isRequired,

  order: PropTypes.string.isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const styles = theme => ({
  root: {
    width: '80%',
    marginLeft: '10%',
    marginTop: theme.spacing.unit * 3,
  },
  table: {
    minWidth: 1020,
  },
  tableWrapper: {
    overflowX: 'auto',
  },
});

class Top10 extends React.Component {
  state = {
    order: 'asc',
    orderBy: 'MarketCap',
    selected: [],

    topCurrencies: null,
    page: 0,
    rowsPerPage: 10,
  };

  UNSAFE_componentWillMount() {
    this.interval = setInterval(() => {
    this.props.getTopCurrencies();
  }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  componentWillReceiveProps(newProps) {
   
    this.setState({ topCurrencies: newProps.topCurrencies });
  }

  getFormattedData(data) {
    return Object.keys(data).map(currency => {
      return {
        id: data[currency].id,
        name: data[currency].name, 
        MarketCap: data[currency].quotes.USD.market_cap,
        Price: data[currency].quotes.USD.price,
        Volume: data[currency].quotes.USD.volume_24h
      }
    })

  }

  handleRequestSort = (event, property) => {
    const orderBy = property;
    let order = 'desc';
    if (this.state.orderBy === property && this.state.order === 'desc') {
      order = 'asc';
    }
    this.setState({ order, orderBy });
  };

  render() {
    const { classes } = this.props;
    const {
      topCurrencies,
      order,
      orderBy,
      rowsPerPage,
      page,
    } = this.state;

    if (!topCurrencies) return <h1>   Loading...</h1>;

    const formattedData = this.getFormattedData(topCurrencies)

    const emptyRows =
      rowsPerPage -
      Math.min(
        rowsPerPage,
        Object.keys(topCurrencies).length - page * rowsPerPage,
      );

    return (
      <Paper className={classes.root}>
        <div className={classes.tableWrapper}>
          <Table className={classes.table} aria-labelledby="tableTitle">
            <EnhancedTableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={this.handleRequestSort}
              rowCount={Object.keys(topCurrencies).length}
            />
            <TableBody>
              {formattedData
                .sort(getSorting(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map(currency => {
                  return (
                    <TableRow hover tabIndex={-1} key={currency.id}>
                      <TableCell component="th" scope="row" padding="dense">
                        {currency.name}
                      </TableCell>
                      <TableCell numeric>
                        {currency.MarketCap.toFixed(2).replace(
                          /\d(?=(\d{3})+\.)/g,
                          '$&,',
                        )}
                      </TableCell>
                      <TableCell numeric>
                        {currency.Price.toFixed(2)}
                      </TableCell>
                      <TableCell numeric>
                        {currency.Volume
                          .toFixed(2)
                          .replace(/\d(?=(\d{3})+\.)/g, '$&,')}
                      </TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: 49 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </Paper>
    );
  }
}
const mapStateToProps = function(state) {
  return {
    topCurrencies: state.topCurrencies,
    allCurrencies: state.allCurrencies,
  };
};

Top10.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default compose(
  withStyles(styles),
  connect(
    mapStateToProps,
    { getTopCurrencies },
  ),
)(Top10);
