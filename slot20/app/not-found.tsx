import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center py-20 text-center">
      <p className="text-8xl font-black text-blue-600">404</p>
      <h1 className="mt-4 text-2xl font-bold">Không tìm thấy trang</h1>
      <Link href="/" className="mt-6 text-blue-600 underline">
        ← Về trang chủ
      </Link>
    </div>
  );
}
