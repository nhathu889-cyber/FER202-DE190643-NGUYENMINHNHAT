import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge';
import { formatVND, getFinalPrice } from '../../utils/format';

const ProductCard = ({ product, onAddToCart }) => {
  const {
    name,
    price,
    discount = 0,
    category,
    rating,
    inStock,
  } = product;

  const finalPrice = getFinalPrice(product);

  return (
    <Card className="h-100">
      <Card.Body className="d-flex flex-column">
        <Card.Title>{name}</Card.Title>

        <Card.Subtitle className="mb-2 text-muted">
          {category?.name ?? 'Khác'}
        </Card.Subtitle>

        <div className="mb-2">
          <strong>{formatVND(finalPrice)}</strong>

          {discount > 0 && (
            <small className="text-muted ms-2">
              <del>{formatVND(price)}</del>
            </small>
          )}
        </div>

        <div className="mb-3">
          <span>⭐ {rating?.rate ?? 0}</span>{' '}

          <Badge bg={inStock ? 'success' : 'secondary'}>
            {inStock ? 'Còn hàng' : 'Hết hàng'}
          </Badge>
        </div>

        <Button
          variant="primary"
          className="mt-auto"
          disabled={!inStock}
          onClick={() => onAddToCart?.(product)}
        >
          Thêm vào giỏ
        </Button>
      </Card.Body>
    </Card>
  );
};

ProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    discount: PropTypes.number,
    category: PropTypes.shape({
      name: PropTypes.string,
    }),
    rating: PropTypes.shape({
      rate: PropTypes.number,
    }),
    inStock: PropTypes.bool.isRequired,
  }).isRequired,
  onAddToCart: PropTypes.func,
};

export default ProductCard;