import Image from 'next/image';
import Link from 'next/link';
import { formatUSD } from '@/lib/format';
import type { Product } from '@/types';
import AddToCartButton from './AddToCartButton';

export default function ProductCard({ product }: { product: Product }) {
  const { id, title, price, thumbnail, rating, category } = product;

  return (
    <article className="group flex flex-col overflow-hidden rounded-xl border border-gray-200 bg-white transition hover:shadow-xl dark:border-gray-800 dark:bg-gray-900">
      <Link href={`/products/${id}`} className="relative block aspect-square bg-gray-100 dark:bg-gray-800">
        <Image
          src={thumbnail}
          alt={title}
          fill
          sizes="(max-width: 768px) 50vw, 25vw"
          className="object-contain p-4 transition duration-300 group-hover:scale-110"
        />
        <span className="absolute left-2 top-2 rounded bg-black/70 px-2 py-0.5 text-xs capitalize text-white">
          {category}
        </span>
      </Link>
      <div className="flex flex-1 flex-col p-4">
        <Link href={`/products/${id}`} className="line-clamp-2 font-semibold hover:text-blue-600">
          {title}
        </Link>
        <div className="mt-2 flex items-center justify-between">
          <span className="text-lg font-bold text-red-600">{formatUSD(price)}</span>
          <span className="text-sm text-amber-500">★ {rating.toFixed(1)}</span>
        </div>
        <AddToCartButton product={{ id, title, price, thumbnail }} className="mt-auto w-full" />
      </div>
    </article>
  );
}
