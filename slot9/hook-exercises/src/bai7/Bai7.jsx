import { useReducer } from 'react';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

import CartSummary from './components/CartSummary';
import { products } from './data/products';

import {
  cartReducer,
  initialCart,
  CART_ACTIONS,
} from './reducers/cartReducer';

import {
  formatVND,
  getFinalPrice,
} from '../utils/format';

const Bai7 = () => {
  const [cart, dispatch] = useReducer(
    cartReducer,
    initialCart
  );

  const handleAddToCart = (product) => {
    dispatch({
      type: CART_ACTIONS.ADD,
      payload: product,
    });
  };

  return (
    <>
      <h2 className="mb-4">
        Bài 7 - Giỏ hàng với useReducer
      </h2>

      <Row>
        <Col md={6}>
          <h4 className="mb-3">
            Sản phẩm
          </h4>

          <Row className="g-3">
            {products.map((product) => (
              <Col md={6} key={product.id}>
                <Card className="h-100">
                  <Card.Body className="d-flex flex-column">
                    <Card.Title>
                      {product.name}
                    </Card.Title>

                    <Card.Text>
                      Giá:{' '}
                      <strong>
                        {formatVND(
                          getFinalPrice(product)
                        )}
                      </strong>
                    </Card.Text>

                    <Button
                      className="mt-auto"
                      onClick={() =>
                        handleAddToCart(product)
                      }
                    >
                      Thêm vào giỏ
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Col>

        <Col md={6}>
          <CartSummary
            cart={cart}
            dispatch={dispatch}
          />
        </Col>
      </Row>
    </>
  );
};

export default Bai7;