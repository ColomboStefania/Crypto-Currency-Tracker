import { GET_CURRENCY } from '../actions/currencies';

export default (state = [], { type, payload }) => {
  switch (type) {
    case GET_CURRENCY:
      return payload;
    default:
      return state;
  }
};
