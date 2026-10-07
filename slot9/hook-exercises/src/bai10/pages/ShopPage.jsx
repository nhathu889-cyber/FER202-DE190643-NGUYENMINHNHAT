import { useState } from 'react';
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';
import ProductFilter from '../../bai3/components/ProductFilter';
import { products } from '../../bai3/data/products';
import { useCart } from '../context/useCart';

const ShopPage = () => {
  const { addToCart } = useCart();
  const [toastMessage, setToastMessage] = useState('');

  const handleAddToCart = (product) => {
    addToCart(product);
    setToastMessage(`Đã thêm ${product.name} vào giỏ`);
  };

  return (
    <>
      <h2 className="mb-4">Cửa hàng</h2>
      <ProductFilter products={products} onAddToCart={handleAddToCart} />
      <ToastContainer position="bottom-end" className="p-3">
        <Toast show={Boolean(toastMessage)} onClose={() => setToastMessage('')}
          autohide delay={2000}>
          <Toast.Header>
            <strong className="me-auto">Giỏ hàng</strong>
          </Toast.Header>
          <Toast.Body>{toastMessage}</Toast.Body>
        </Toast>
      </ToastContainer>
    </>
  );
};

export default ShopPage;
