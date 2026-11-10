import { useDispatch, useSelector } from 'react-redux';
import { Badge, Button, Card, Col, Form, Row } from 'react-bootstrap';
import {
  addToCart,
  selectCartItems,
} from '../features/cart/cartSlice.js';
import {
  selectFilteredProducts,
  selectKeyword,
  setKeyword,
} from '../features/products/productsSlice.js';

const formatVnd = (amount) => `${amount.toLocaleString('vi-VN')} ₫`;

export default function ProductList() {
  const products = useSelector(selectFilteredProducts);
  const keyword = useSelector(selectKeyword);
  const cartItems = useSelector(selectCartItems);
  const dispatch = useDispatch();

  const quantityOf = (id) =>
    cartItems.find((item) => item.id === id)?.quantity ?? 0;

  return (
    <section aria-labelledby="products-heading">
      <header className="shop-section-heading">
        <div>
          <span className="shop-kicker">CỬA HÀNG</span>
          <h2 id="products-heading">Sản phẩm</h2>
        </div>
        <span className="product-count">{products.length} sản phẩm</span>
      </header>
      <Form.Control
        className="product-search"
        type="search"
        aria-label="Tìm sản phẩm"
        placeholder="Tìm sản phẩm..."
        value={keyword}
        onChange={(event) => dispatch(setKeyword(event.target.value))}
      />
      {products.length === 0 ? (
        <p className="shop-empty">Không tìm thấy sản phẩm phù hợp.</p>
      ) : (
        <Row xs={1} sm={2} className="g-3">
          {products.map((product) => {
            const quantity = quantityOf(product.id);
            const soldOut = quantity >= product.stock;

            return (
              <Col key={product.id}>
                <Card className="product-card h-100">
                  <Card.Img
                    variant="top"
                    src={product.image}
                    alt={product.name}
                    loading="lazy"
                  />
                  <Card.Body className="d-flex flex-column">
                    <Card.Title>{product.name}</Card.Title>
                    <Card.Text className="product-price">
                      {formatVnd(product.price)}
                    </Card.Text>
                    <div className="product-stock">
                      <span>Còn {product.stock} sản phẩm</span>
                      {quantity > 0 && (
                        <Badge bg="primary">Trong giỏ: {quantity}</Badge>
                      )}
                    </div>
                    <Button
                      className="mt-auto"
                      disabled={soldOut}
                      onClick={() => dispatch(addToCart(product))}
                    >
                      {soldOut ? 'Đã đạt tối đa' : 'Thêm vào giỏ'}
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      )}
    </section>
  );
}
