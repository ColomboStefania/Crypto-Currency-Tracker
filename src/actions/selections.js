export const SELECT_CURRENCY = 'SELECT_CURRENCY';
export const DELETE_ALLCURRENCY = 'DELETE_ALLCURRENCY';
export const DELETE_CURRENCY = 'DELETE_CURRENCY';

export function selectCurrency(currencies) {
  return {
    type: SELECT_CURRENCY,
    payload: currencies,
    
  };
}

export function deleteCurrency() {
  return {
    type: DELETE_ALLCURRENCY
    
  };
}

export function deleteOneCurrency(currency) {
  return {
    type: DELETE_CURRENCY,
    payload: currency,
  };
}

