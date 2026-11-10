import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './rootReducer.js';
import { PRODUCTS } from '../data/products.js';

const logger = () => (next) => (action) => {
  if (typeof action !== 'function') console.log('[action]', action.type);
  return next(action);
};

const productsById = new Map(PRODUCTS.map((product) => [product.id, product]));

function loadCart() {
  if (typeof window === 'undefined') return { items: [] };

  try {
    const saved = window.localStorage.getItem('cart');
    if (saved === null) return { items: [] };

    const parsed = JSON.parse(saved);
    if (!Array.isArray(parsed)) {
      throw new TypeError('Dữ liệu giỏ hàng trong localStorage không hợp lệ.');
    }

    const items = parsed.flatMap((item) => {
      const product = productsById.get(item?.id);
      if (
        !product ||
        !Number.isInteger(item.quantity) ||
        item.quantity < 1 ||
        item.quantity > product.stock
      ) {
        return [];
      }

      return [{ ...product, quantity: item.quantity }];
    });

    if (items.length !== parsed.length) {
      console.warn('Một số sản phẩm không hợp lệ trong giỏ hàng đã được bỏ qua.');
    }

    return { items };
  } catch (error) {
    console.error('Không thể khôi phục giỏ hàng đã lưu:', error);
    return { items: [] };
  }
}

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
  preloadedState: {
    cart: loadCart(),
  },
});

store.subscribe(() => {
  if (typeof window === 'undefined') return;

  try {
    window.localStorage.setItem(
      'cart',
      JSON.stringify(store.getState().cart.items),
    );
  } catch (error) {
    console.error('Không thể lưu giỏ hàng vào localStorage:', error);
  }
});
