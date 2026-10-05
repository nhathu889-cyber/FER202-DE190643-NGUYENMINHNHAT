import { CartProvider } from './contexts/CartContext';
import CartBadge from './components/CartBadge';
import ProductList from './components/ProductList';
import Cart from './components/Cart';

export default function CartExample() {
  return (
    <CartProvider>
      <div className="cart-example">
        <header className="header"><h1>Cart Context Demo</h1><CartBadge /></header>
        <ProductList /><hr /><Cart />
      </div>
    </CartProvider>
  );
}
