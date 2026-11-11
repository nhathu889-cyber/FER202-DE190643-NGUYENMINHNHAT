'use client';

import Image from 'next/image';
import Link from 'next/link';
import {
  cartCleared,
  quantityChanged,
  removedFromCart,
  selectCartCount,
  selectCartItems,
  selectCartTotal,
} from '@/lib/features/cart/cartSlice';
import { formatUSD } from '@/lib/format';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';

export default function CartView() {
  const dispatch = useAppDispatch();
  const items = useAppSelector(selectCartItems);
  const count = useAppSelector(selectCartCount);
  const total = useAppSelector(selectCartTotal);

  if (items.length === 0) {
    return (
      <div className="py-20 text-center">
        <p className="text-6xl">🛒</p>
        <p className="mt-4 text-gray-500">Giỏ hàng đang trống.</p>
        <Link
          href="/products"
          className="mt-6 inline-block rounded-lg bg-blue-600 px-6 py-2 font-semibold text-white hover:bg-blue-700"
        >
          Mua sắm ngay
        </Link>
      </div>
    );
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
      <ul className="divide-y divide-gray-200 rounded-2xl bg-white dark:divide-gray-800 dark:bg-gray-900">
        {items.map((item) => (
          <li key={item.id} className="flex flex-wrap items-center gap-4 p-4 sm:flex-nowrap">
            <div className="relative size-20 shrink-0 rounded-lg bg-gray-100 dark:bg-gray-800">
              <Image src={item.thumbnail} alt={item.title} fill sizes="80px" className="object-contain p-1" />
            </div>
            <div className="min-w-0 flex-1">
              <Link href={`/products/${item.id}`} className="line-clamp-1 font-semibold hover:text-blue-600">
                {item.title}
              </Link>
              <p className="text-sm text-gray-500">{formatUSD(item.price)}</p>
            </div>
            <div className="flex items-center rounded-lg border border-gray-300 dark:border-gray-700">
              <button
                type="button"
                onClick={() => dispatch(quantityChanged({ id: item.id, quantity: item.quantity - 1 }))}
                className="px-3 py-1 hover:bg-gray-100 dark:hover:bg-gray-800"
                aria-label={`Giảm số lượng ${item.title}`}
              >
                −
              </button>
              <span className="w-8 text-center tabular-nums">{item.quantity}</span>
              <button
                type="button"
                onClick={() => dispatch(quantityChanged({ id: item.id, quantity: item.quantity + 1 }))}
                disabled={item.quantity >= 99}
                className="px-3 py-1 hover:bg-gray-100 disabled:opacity-40 dark:hover:bg-gray-800"
                aria-label={`Tăng số lượng ${item.title}`}
              >
                +
              </button>
            </div>
            <p className="hidden w-24 text-right font-semibold sm:block">
              {formatUSD(item.price * item.quantity)}
            </p>
            <button
              type="button"
              onClick={() => dispatch(removedFromCart(item.id))}
              className="text-red-500 hover:text-red-700"
              aria-label={`Xóa ${item.title} khỏi giỏ hàng`}
            >
              ✕
            </button>
          </li>
        ))}
      </ul>

      <aside className="h-fit space-y-4 rounded-2xl bg-white p-6 lg:sticky lg:top-20 dark:bg-gray-900">
        <h2 className="text-lg font-bold">Tóm tắt đơn hàng</h2>
        <div className="flex justify-between text-sm text-gray-500">
          <span>Số lượng</span>
          <span>{count} sản phẩm</span>
        </div>
        <div className="flex justify-between border-t border-gray-200 pt-4 text-xl font-bold dark:border-gray-800">
          <span>Tổng</span>
          <span className="text-red-600">{formatUSD(total)}</span>
        </div>
        <button
          type="button"
          disabled
          className="w-full cursor-not-allowed rounded-xl bg-blue-600 py-3 font-semibold text-white opacity-70"
          title="Chức năng thanh toán chưa được triển khai"
        >
          Thanh toán
        </button>
        <button
          type="button"
          onClick={() => dispatch(cartCleared())}
          className="w-full text-sm text-gray-500 hover:text-red-600 hover:underline"
        >
          Xóa toàn bộ giỏ hàng
        </button>
      </aside>
    </div>
  );
}
