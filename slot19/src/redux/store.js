import { combineReducers, legacy_createStore as createStore } from 'redux';
import counterReducer from './counterReducer.js';

const rootReducer = combineReducers({
  counter: counterReducer,
});

const devToolsEnhancer =
  typeof window !== 'undefined' &&
  window.__REDUX_DEVTOOLS_EXTENSION__?.();

export const store = createStore(rootReducer, devToolsEnhancer || undefined);
