'use client';

import Link from 'next/link';
import { selectCartCount } from '@/lib/features/cart/cartSlice';
import { useAppSelector } from '@/lib/hooks';

export default function CartBadge() {
  const count = useAppSelector(selectCartCount);

  return (
    <Link
      href="/cart"
      className="relative rounded-lg p-2 text-lg transition hover:bg-gray-100 dark:hover:bg-gray-800"
      aria-label={`Giỏ hàng${count > 0 ? `, ${count} sản phẩm` : ''}`}
    >
      🛒
      {count > 0 && (
        <span className="absolute -right-1 -top-1 flex size-5 items-center justify-center rounded-full bg-red-600 text-[10px] font-bold text-white">
          {count > 99 ? '99+' : count}
        </span>
      )}
    </Link>
  );
}
