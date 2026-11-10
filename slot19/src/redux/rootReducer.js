import { combineReducers } from 'redux';
import counterReducer from './counterReducer.js';
import cartReducer from '../features/cart/cartSlice.js';
import productsReducer from '../features/products/productsSlice.js';
import studentsReducer from '../features/students/studentsSlice.js';
import { todoReducers } from './reducers/index.js';
import userReducer from './users/userReducer.js';

export default combineReducers({
  counter: counterReducer,
  ...todoReducers,
  users: userReducer,
  cart: cartReducer,
  products: productsReducer,
  students: studentsReducer,
});
