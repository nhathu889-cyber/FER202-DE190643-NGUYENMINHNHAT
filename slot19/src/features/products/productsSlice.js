import { createSelector, createSlice } from '@reduxjs/toolkit';
import { PRODUCTS } from '../../data/products.js';

const productsSlice = createSlice({
  name: 'products',
  initialState: { items: PRODUCTS, keyword: '' },
  reducers: {
    setKeyword(state, action) {
      state.keyword = action.payload;
    },
  },
});

export const { setKeyword } = productsSlice.actions;
export default productsSlice.reducer;

const selectItems = (state) => state.products.items;
export const selectKeyword = (state) => state.products.keyword;

export const selectFilteredProducts = createSelector(
  [selectItems, selectKeyword],
  (items, keyword) => {
    const normalizedKeyword = keyword.trim().toLocaleLowerCase('vi');
    return items.filter((product) =>
      product.name.toLocaleLowerCase('vi').includes(normalizedKeyword),
    );
  },
);
