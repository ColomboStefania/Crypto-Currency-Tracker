import { combineReducers } from 'redux';
import topCurrencies from './topCurrencies'
import allCurrencies from './allCurrencies'
import selectedCurrencies from './selections'

export default combineReducers({
topCurrencies,
allCurrencies,
selectedCurrencies,

});
