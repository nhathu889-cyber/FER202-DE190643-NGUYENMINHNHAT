import { useDispatch, useSelector } from 'react-redux';
import { Button, ButtonGroup, Table } from 'react-bootstrap';
import {
  clearCart,
  decreaseQty,
  increaseQty,
  removeFromCart,
  selectCartItems,
  selectCartTotal,
} from '../features/cart/cartSlice.js';

const formatVnd = (amount) => `${amount.toLocaleString('vi-VN')} ₫`;

export default function Cart() {
  const items = useSelector(selectCartItems);
  const total = useSelector(selectCartTotal);
  const dispatch = useDispatch();

  if (items.length === 0) {
    return (
      <div className="cart-empty">
        <span aria-hidden="true">🛒</span>
        <p>Giỏ hàng đang trống.</p>
        <small>Chọn sản phẩm để bắt đầu thêm vào giỏ.</small>
      </div>
    );
  }

  return (
    <div className="cart-content">
      <div className="cart-items">
        {items.map((item) => (
          <article className="cart-item" key={item.id}>
            <img className="cart-item-image" src={item.image} alt="" />
            <div className="cart-item-information">
              <h3>{item.name}</h3>
              <span>{formatVnd(item.price)}</span>
              <Button
                size="sm"
                variant="link"
                className="cart-remove"
                onClick={() => dispatch(removeFromCart(item.id))}
                aria-label={`Xóa ${item.name} khỏi giỏ`}
              >
                Xóa
              </Button>
            </div>
            <ButtonGroup size="sm" aria-label={`Số lượng ${item.name}`}>
              <Button
                variant="outline-secondary"
                aria-label={`Giảm số lượng ${item.name}`}
                onClick={() => dispatch(decreaseQty(item.id))}
              >
                −
              </Button>
              <Button variant="light" disabled aria-label={`Số lượng ${item.quantity}`}>
                {item.quantity}
              </Button>
              <Button
                variant="outline-secondary"
                aria-label={`Tăng số lượng ${item.name}`}
                disabled={item.quantity >= item.stock}
                onClick={() => dispatch(increaseQty(item.id))}
              >
                +
              </Button>
            </ButtonGroup>
          </article>
        ))}
      </div>

      <div className="cart-summary">
        <span>Tổng cộng</span>
        <strong>{formatVnd(total)}</strong>
      </div>
      <Button
        className="clear-cart-button"
        variant="outline-danger"
        onClick={() => dispatch(clearCart())}
      >
        Xóa giỏ hàng
      </Button>
    </div>
  );
}
