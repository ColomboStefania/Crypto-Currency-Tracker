import React from 'react';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';
import DeleteIconOutlined from '@material-ui/icons/DeleteForeverOutlined';
import { deleteCurrency, deleteOneCurrency } from '../actions/selections';
import { getAllCurrencies } from '../actions/currencies';

function createData(id, name, MarketCap, Price, Volume) {
  return { id, name, MarketCap, Price, Volume };
}

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
  return order === 'desc'
    ? (a, b) => desc(a, b, orderBy)
    : (a, b) => -desc(a, b, orderBy);
}

const rows = [
  { id: 'name', numeric: false, disablePadding: true, label: 'Currency Name' },
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
          <TableCell padding="checkbox" />
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

let EnhancedTableToolbar = props => {
  const { numSelected, classes } = props;

  return (
    <Toolbar
      className={classNames(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      <div className={classes.title}>
        {numSelected > 0 ? (
          <Typography color="inherit" variant="subheading">
            {numSelected} selected
          </Typography>
        ) : (
          <Typography variant="title" id="tableTitle">
            Your favorite Currencies
          </Typography>
        )}
      </div>
      <div className={classes.spacer} />
      <div className={classes.actions} />
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
};
const styles = theme => ({
  root: {
    width: '80%',
    marginLeft: '10%',

    marginTop: theme.spacing.unit * 3,
    textAlign: 'left',
    whiteSpace: 'nowrap',
    paddingLeft: '2%',
  },
  table: {
    minWidth: 1020,
  },
  tableWrapper: {
    overflowX: 'auto',
  },
  icon: {
    margin: theme.spacing.unit,
    fontSize: 90,
  },
});

EnhancedTableToolbar = compose(
  withStyles(styles),
  connect(
    null,
    // { deleteCurrency },
  ),
)(EnhancedTableToolbar);

class EnhancedTable extends React.Component {
  state = {
    order: 'asc',
    orderBy: 'MarketCap',

    page: 0,
    rowsPerPage: 5,
  };

  UNSAFE_componentWillMount() {
    this.props.getAllCurrencies();
  }

  validator = 0;

  handleRequestSort = (event, property) => {
    const orderBy = property;
    let order = 'desc';

    if (this.state.orderBy === property && this.state.order === 'desc') {
      order = 'asc';
    }

    this.setState({ order, orderBy });
  };

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  deleteSingleCurrency = name => {
    this.setState({
      data: this.props.selectedCurrencies.filter(obj => obj.name !== name),
    });
  };

  render() {
    const { order, orderBy, rowsPerPage, page } = this.state;
    const { classes, deleteCurrency, selectedCurrencies } = this.props;

    const formattedData = selectedCurrencies.map(obj =>
      createData(
        obj.id,
        obj.name,
        parseInt(obj.quotes.USD.market_cap, 10),
        obj.quotes.USD.price,

        parseInt(obj.quotes.USD.volume_24h, 10),
      ),
    )

    const emptyRows =
      rowsPerPage -
      Math.min(rowsPerPage, selectedCurrencies.length - page * rowsPerPage);

    if (this.props.selectedCurrencies.length < 1 && this.validator === 1)
      return (
        <Paper className={classes.root}>
          <Typography variant="headline" component="h2" align="center">
            YOUR LIST HAS BEEN CANCELLED
          </Typography>
        </Paper>
      );
    return (
      <Paper className={classes.root}>
        <Tooltip title="Delete all list ">
          <IconButton aria-label="Delete">
           
            <DeleteIconOutlined
              color="primary"
              onClick={() => {
                deleteCurrency(), (this.validator = 1);
              }}
            />
            <Typography>Delete all list</Typography>
          </IconButton>
        </Tooltip>

        <div className={classes.tableWrapper}>
          <Table className={classes.table} aria-labelledby="tableTitle">
            <EnhancedTableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={this.handleRequestSort}
              rowCount={this.props.selectedCurrencies.length}
            />
            <TableBody>
              {formattedData
                .sort(getSorting(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map(n => {
                  if ((this.validator = 0)) return null;
                  return (
                    <TableRow hover tabIndex={-1} key={n.id}>
                      <TableCell>
                        <IconButton aria-label="Delete">
                          <DeleteIcon
                            color="primary"
                            onClick={() => {
                              this.props.deleteOneCurrency(
                                selectedCurrencies.filter(
                                  obj => obj.name !== n.name,
                                ),
                              );
                            }}
                          />
                        </IconButton>
                      </TableCell>

                      <TableCell component="th" scope="row" padding="none">
                        {n.name}
                      </TableCell>
                      <TableCell numeric>{n.MarketCap.toFixed(2).replace(
                          /\d(?=(\d{3})+\.)/g,
                          '$&,',
                        )}</TableCell>
                      <TableCell numeric>{n.Price.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</TableCell>
                      <TableCell numeric>{n.Volume.toFixed(2).replace(
                          /\d(?=(\d{3})+\.)/g,
                          '$&,',
                        )}</TableCell>
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
        <TablePagination
          component="div"
          count={formattedData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          backIconButtonProps={{
            'aria-label': 'Previous Page',
          }}
          nextIconButtonProps={{
            'aria-label': 'Next Page',
          }}
          onChangePage={this.handleChangePage}
          onChangeRowsPerPage={this.handleChangeRowsPerPage}
        />
      </Paper>
    );
  }
}

const mapStateToProps = function(state) {
  return {
    topCurrencies: state.topCurrencies,
    allCurrencies: state.allCurrencies,
    selectedCurrencies: state.selectedCurrencies,
  };
};

EnhancedTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default compose(
  withStyles(styles),
  connect(
    mapStateToProps,
    { getAllCurrencies, deleteCurrency, deleteOneCurrency },
  ),
)(EnhancedTable);
