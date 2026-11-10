import { combineReducers } from 'redux';
import filterReducer from './filterReducer.js';
import todosReducer from './todosReducer.js';

export const todoReducers = {
  todos: todosReducer,
  filter: filterReducer,
};

export default combineReducers(todoReducers);
