import { SELECT_CURRENCY } from '../actions/selections';
import { DELETE_ALLCURRENCY } from '../actions/selections';
import { DELETE_CURRENCY } from '../actions/selections';
import _ from 'lodash';

export default function(state = [], action) {
  switch (action.type) {
    case SELECT_CURRENCY:
      // if selected is already in there, do not added
      const isSelectedInArray = _.findIndex(state, function(value) {
        return value.id === action.payload.id;
      });
      if (isSelectedInArray !== -1) {
        alert('element already exists');
        return state;
      }
      return [...state, action.payload];
    case DELETE_CURRENCY:
      return action.payload;
    case DELETE_ALLCURRENCY:
      return [];
    default:
      return state;
  }
}
