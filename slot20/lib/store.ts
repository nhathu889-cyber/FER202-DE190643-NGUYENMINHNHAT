import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './features/counter/counterSlice';
import uiReducer from './features/ui/uiSlice';
import todosReducer from './features/todos/todosSlice';
import productsReducer from './features/products/productsSlice';
import cartReducer from './features/cart/cartSlice';
import { notesApi } from './features/notes/notesApi';

export const makeStore = () =>
  configureStore({
    reducer: {
      counter: counterReducer,
      ui: uiReducer,
      todos: todosReducer,
      products: productsReducer,
      cart: cartReducer,
      [notesApi.reducerPath]: notesApi.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(notesApi.middleware),
  });

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
