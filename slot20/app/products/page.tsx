import type { Metadata } from 'next';
import ProductList from './ProductList';

export const metadata: Metadata = { title: 'Sản phẩm' };

export default function ProductsPage() {
  return (
    <>
      <h1 className="mb-6 text-3xl font-bold">🛍️ Sản phẩm</h1>
      <ProductList />
    </>
  );
}
