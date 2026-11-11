import { createSelector, createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { hydrate } from '@/lib/actions';
import type { RootState } from '@/lib/store';
import type { CartItem, CartProduct } from '@/types';

export type CartState = { items: CartItem[] };

const initialState: CartState = { items: [] };

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addedToCart(state, action: PayloadAction<CartProduct>) {
      const existing = state.items.find((item) => item.id === action.payload.id);
      if (existing) existing.quantity = Math.min(existing.quantity + 1, 99);
      else state.items.push({ ...action.payload, quantity: 1 });
    },
    quantityChanged(state, action: PayloadAction<{ id: number; quantity: number }>) {
      const { id, quantity } = action.payload;
      if (quantity <= 0) {
        state.items = state.items.filter((item) => item.id !== id);
        return;
      }
      const item = state.items.find((entry) => entry.id === id);
      if (item) item.quantity = Math.min(quantity, 99);
    },
    removedFromCart(state, action: PayloadAction<number>) {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    cartCleared(state) {
      state.items = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(hydrate, (state, action) => {
      if (action.payload.cart) state.items = action.payload.cart.items;
    });
  },
});

export const { addedToCart, quantityChanged, removedFromCart, cartCleared } = cartSlice.actions;
export default cartSlice.reducer;

export const selectCartItems = (state: RootState) => state.cart.items;

export const selectCartCount = createSelector([selectCartItems], (items) =>
  items.reduce((sum, item) => sum + item.quantity, 0)
);

export const selectCartTotal = createSelector([selectCartItems], (items) =>
  items.reduce((sum, item) => sum + item.price * item.quantity, 0)
);

export const selectQuantityInCart = (state: RootState, id: number): number =>
  state.cart.items.find((item) => item.id === id)?.quantity ?? 0;
