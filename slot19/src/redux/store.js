import { applyMiddleware, legacy_createStore as createStore } from 'redux';
import { thunk } from 'redux-thunk';
import rootReducer from './rootReducer.js';

const logger = () => (next) => (action) => {
  if (typeof action !== 'function') console.log('[action]', action.type);
  return next(action);
};

const composeEnhancers =
  typeof window !== 'undefined' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : (enhancer) => enhancer;

export const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk, logger)),
);
