import { useState } from 'react';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';

import { products } from '../../bai7/data/products';
import { useCart } from '../context/CartContext';

import {
  formatVND,
  getFinalPrice,
} from '../../utils/format';

const ShopPage = () => {
  const { addToCart } = useCart();

  const [keyword, setKeyword] = useState('');
  const [sort, setSort] = useState('default');
  const [toastMessage, setToastMessage] =
    useState('');

  let visibleProducts = products.filter(
    (product) =>
      product.name
        .toLowerCase()
        .includes(keyword.toLowerCase())
  );

  if (sort === 'price-asc') {
    visibleProducts = [
      ...visibleProducts,
    ].sort(
      (a, b) =>
        getFinalPrice(a) -
        getFinalPrice(b)
    );
  }

  if (sort === 'price-desc') {
    visibleProducts = [
      ...visibleProducts,
    ].sort(
      (a, b) =>
        getFinalPrice(b) -
        getFinalPrice(a)
    );
  }

  const handleAddToCart = (product) => {
    addToCart(product);

    setToastMessage(
      `Đã thêm ${product.name} vào giỏ`
    );
  };

  return (
    <>
      <h2 className="mb-4">
        Cửa hàng
      </h2>

      <Row className="mb-4 g-2">
        <Col md={8}>
          <Form.Control
            type="text"
            placeholder="Tìm kiếm sản phẩm..."
            value={keyword}
            onChange={(event) =>
              setKeyword(event.target.value)
            }
          />
        </Col>

        <Col md={4}>
          <Form.Select
            value={sort}
            onChange={(event) =>
              setSort(event.target.value)
            }
          >
            <option value="default">
              Mặc định
            </option>

            <option value="price-asc">
              Giá tăng dần
            </option>

            <option value="price-desc">
              Giá giảm dần
            </option>
          </Form.Select>
        </Col>
      </Row>

      <Row className="g-3">
        {visibleProducts.map((product) => (
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

      <ToastContainer
        position="bottom-end"
        className="p-3"
      >
        <Toast
          show={Boolean(toastMessage)}
          onClose={() =>
            setToastMessage('')
          }
          autohide
          delay={2000}
        >
          <Toast.Header>
            <strong className="me-auto">
              Giỏ hàng
            </strong>
          </Toast.Header>

          <Toast.Body>
            {toastMessage}
          </Toast.Body>
        </Toast>
      </ToastContainer>
    </>
  );
};

export default ShopPage;