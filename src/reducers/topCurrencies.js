import { GET_TOPCURRENCY } from '../actions/currencies'

export default (state = {}, { type, payload }) => {
  switch (type) {
    case GET_TOPCURRENCY:
      return payload
    default:
      return state
  }
}
