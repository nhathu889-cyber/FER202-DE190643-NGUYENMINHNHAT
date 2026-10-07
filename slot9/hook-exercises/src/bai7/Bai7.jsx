import { useReducer } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ProductList from '../bai3/components/ProductList';
import { products } from '../bai3/data/products';
import CartSummary from './components/CartSummary';
import { cartReducer, initialCart, CART_ACTIONS } from './reducers/cartReducer';

const Bai7 = () => {
  const [cart, dispatch] = useReducer(cartReducer, initialCart);
  const handleAddToCart = (product) => {
    dispatch({ type: CART_ACTIONS.ADD, payload: product });
  };

  return (
    <>
      <h2 className="mb-4">Bài 7 - Giỏ hàng với useReducer</h2>
      <Row className="g-4">
        <Col md={7}>
          <h4 className="mb-3">Sản phẩm</h4>
          <ProductList products={products} onAddToCart={handleAddToCart} />
        </Col>
        <Col md={5}>
          <CartSummary cart={cart} dispatch={dispatch} />
        </Col>
      </Row>
    </>
  );
};

export default Bai7;
