import {
  createContext,
  useContext,
  useReducer,
} from 'react';

import {
  cartReducer,
  initialCart,
  CART_ACTIONS,
  getCartTotals,
} from '../../bai7/reducers/cartReducer';

const CartContext = createContext(null);

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

export const useCart = () => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error(
      'useCart phải được sử dụng bên trong CartProvider'
    );
  }

  return context;
};