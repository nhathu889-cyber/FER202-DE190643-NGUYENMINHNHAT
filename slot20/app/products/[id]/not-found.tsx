import Link from 'next/link';

export default function ProductNotFound() {
  return (
    <div className="py-20 text-center">
      <h2 className="text-2xl font-bold">Sản phẩm không tồn tại</h2>
      <Link href="/products" className="mt-4 inline-block text-blue-600 underline">
        Xem sản phẩm khác
      </Link>
    </div>
  );
}
