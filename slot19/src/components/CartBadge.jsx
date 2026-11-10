import { Badge } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { selectCartCount } from '../features/cart/cartSlice.js';

export default function CartBadge() {
  const count = useSelector(selectCartCount);

  return (
    <span className="cart-badge" aria-label={`${count} sản phẩm trong giỏ`}>
      Giỏ hàng <Badge bg="light" text="dark" pill>{count}</Badge>
    </span>
  );
}
