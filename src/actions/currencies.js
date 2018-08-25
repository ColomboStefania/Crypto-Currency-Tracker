import request from 'superagent';
import { baseUrl } from '../constants';

export const GET_TOPCURRENCY = 'GET_TOPCURRENCY';
export const GET_CURRENCY = 'GET_CURRENCY';


export const getTopCurrencies = () => dispatch => {
  request.get(`${baseUrl}/?limit=10`).then(response => {
    dispatch({
      type: GET_TOPCURRENCY,
      payload: response.body.data
    });
  });
};


export const getAllCurrencies = () => dispatch => {
  request
  .get(`${baseUrl}/?limit=200&sort=market_cap`)
  .then(response => {
    dispatch({
      type: GET_CURRENCY,
      payload: Object.keys(response.body.data).map(i =>response.body.data[i])
    });
  });
};
