import { createSelector, createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: { items: [] },
  reducers: {
    addToCart: {
      reducer(state, action) {
        const product = action.payload;
        const existing = state.items.find((item) => item.id === product.id);

        if (existing) {
          if (existing.quantity < existing.stock) existing.quantity += 1;
          return;
        }

        if (product.stock > 0) state.items.push({ ...product, quantity: 1 });
      },
      prepare(product) {
        return { payload: { ...product } };
      },
    },
    increaseQty(state, action) {
      const item = state.items.find((cartItem) => cartItem.id === action.payload);
      if (item && item.quantity < item.stock) item.quantity += 1;
    },
    decreaseQty(state, action) {
      const index = state.items.findIndex((item) => item.id === action.payload);
      if (index === -1) return;

      if (state.items[index].quantity > 1) {
        state.items[index].quantity -= 1;
      } else {
        state.items.splice(index, 1);
      }
    },
    removeFromCart(state, action) {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    clearCart() {
      return { items: [] };
    },
  },
});

export const {
  addToCart,
  increaseQty,
  decreaseQty,
  removeFromCart,
  clearCart,
} = cartSlice.actions;
export default cartSlice.reducer;

export const selectCartItems = (state) => state.cart.items;

export const selectCartCount = (state) =>
  state.cart.items.reduce((sum, item) => sum + item.quantity, 0);

export const selectCartTotal = createSelector(
  [selectCartItems],
  (items) =>
    items.reduce((sum, item) => sum + item.price * item.quantity, 0),
);

export const selectQtyInCart = (id) => (state) =>
  state.cart.items.find((item) => item.id === id)?.quantity ?? 0;
