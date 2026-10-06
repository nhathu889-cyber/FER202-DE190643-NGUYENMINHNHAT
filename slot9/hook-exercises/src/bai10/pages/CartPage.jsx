import Button from 'react-bootstrap/Button';

import CartSummary from '../../bai7/components/CartSummary';
import { useCart } from '../context/CartContext';

const CartPage = ({ onNavigate }) => {
  const {
    cart,
    dispatch,
    totalQuantity,
  } = useCart();

  return (
    <>
      <h2 className="mb-4">
        Giỏ hàng
      </h2>

      <CartSummary
        cart={cart}
        dispatch={dispatch}
      />

      {totalQuantity > 0 && (
        <div className="text-end mt-3">
          <Button
            onClick={() =>
              onNavigate('checkout')
            }
          >
            Tiến hành thanh toán
          </Button>
        </div>
      )}
    </>
  );
};

export default CartPage;