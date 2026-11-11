import type { Metadata } from 'next';
import CartView from './CartView';

export const metadata: Metadata = { title: 'Giỏ hàng' };

export default function CartPage() {
  return (
    <>
      <h1 className="mb-6 text-3xl font-bold">🛒 Giỏ hàng</h1>
      <CartView />
    </>
  );
}
