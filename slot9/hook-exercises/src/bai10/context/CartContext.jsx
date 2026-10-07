import {
  useReducer,
} from 'react';

import {
  cartReducer,
  initialCart,
  CART_ACTIONS,
  getCartTotals,
} from '../../bai7/reducers/cartReducer';

import { CartContext } from './useCart';

export const CartProvider = ({ children }) => {
  const [cart, dispatch] = useReducer(
    cartReducer,
    initialCart
  );

  const totals = getCartTotals(cart);

  const addToCart = (product) => {
    dispatch({
      type: CART_ACTIONS.ADD,
      payload: product,
    });
  };

  const clearCart = () => {
    dispatch({
      type: CART_ACTIONS.CLEAR,
    });
  };

  const value = {
    cart,
    dispatch,
    ...totals,
    addToCart,
    clearCart,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};
