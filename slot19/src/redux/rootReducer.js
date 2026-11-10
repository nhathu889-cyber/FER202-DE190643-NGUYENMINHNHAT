import { combineReducers } from 'redux';
import counterReducer from './counterReducer.js';
import { todoReducers } from './reducers/index.js';
import userReducer from './users/userReducer.js';

export default combineReducers({
  counter: counterReducer,
  ...todoReducers,
  users: userReducer,
});
