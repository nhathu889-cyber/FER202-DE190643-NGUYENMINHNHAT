import { createAsyncThunk, createSelector, createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '@/lib/store';
import type { Product, ProductsResponse } from '@/types';

type Status = 'idle' | 'loading' | 'succeeded' | 'failed';
export type SortKey = 'default' | 'price-asc' | 'price-desc' | 'rating';

type ProductsState = {
  items: Product[];
  status: Status;
  error: string | null;
  query: string;
  sort: SortKey;
  currentRequestId: string | null;
};

const initialState: ProductsState = {
  items: [],
  status: 'idle',
  error: null,
  query: '',
  sort: 'default',
  currentRequestId: null,
};

const BASE = 'https://dummyjson.com/products';

export const fetchProducts = createAsyncThunk<Product[], string, { rejectValue: string }>(
  'products/fetch',
  async (query, { rejectWithValue, signal }) => {
    const url = query
      ? `${BASE}/search?q=${encodeURIComponent(query)}&limit=24`
      : `${BASE}?limit=24`;

    try {
      const response = await fetch(url, { signal });
      if (!response.ok) return rejectWithValue(`Máy chủ trả về lỗi ${response.status}`);
      const data = (await response.json()) as ProductsResponse;
      return data.products;
    } catch (error) {
      if (error instanceof Error && error.name === 'AbortError') throw error;
      return rejectWithValue('Không kết nối được máy chủ');
    }
  }
);

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    sortChanged(state, action: PayloadAction<SortKey>) {
      state.sort = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state, action) => {
        state.status = 'loading';
        state.error = null;
        state.query = action.meta.arg;
        state.currentRequestId = action.meta.requestId;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        if (state.currentRequestId !== action.meta.requestId) return;
        state.status = 'succeeded';
        state.items = action.payload;
        state.currentRequestId = null;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        if (state.currentRequestId !== action.meta.requestId) return;
        state.status = 'failed';
        state.error = action.payload ?? action.error.message ?? 'Lỗi không xác định';
        state.currentRequestId = null;
      });
  },
});

export const { sortChanged } = productsSlice.actions;
export default productsSlice.reducer;

export const selectProductsStatus = (state: RootState) => state.products.status;
export const selectProductsError = (state: RootState) => state.products.error;
export const selectProductsQuery = (state: RootState) => state.products.query;
export const selectSort = (state: RootState) => state.products.sort;
const selectProductItems = (state: RootState) => state.products.items;

export const selectSortedProducts = createSelector(
  [selectProductItems, selectSort],
  (items, sort) => {
    if (sort === 'default') return items;
    const copy = [...items];
    if (sort === 'price-asc') copy.sort((a, b) => a.price - b.price);
    if (sort === 'price-desc') copy.sort((a, b) => b.price - a.price);
    if (sort === 'rating') copy.sort((a, b) => b.rating - a.rating);
    return copy;
  }
);
