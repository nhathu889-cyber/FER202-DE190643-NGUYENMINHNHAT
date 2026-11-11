import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { formatUSD } from '@/lib/format';
import { getProduct } from '@/lib/server/products';
import AddToCartButton from '../AddToCartButton';

type Props = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const product = await getProduct(id);
  return { title: product?.title ?? 'Không tìm thấy' };
}

export default async function ProductDetailPage({ params }: Props) {
  const { id } = await params;
  const product = await getProduct(id);
  if (!product) notFound();

  const oldPrice = product.price / (1 - product.discountPercentage / 100);

  return (
    <div>
      <Link href="/products" className="text-sm text-blue-600 hover:underline">
        ← Quay lại danh sách
      </Link>
      <div className="mt-6 grid gap-10 md:grid-cols-2">
        <div className="relative aspect-square rounded-2xl bg-white dark:bg-gray-900">
          <Image
            src={product.thumbnail}
            alt={product.title}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-contain p-8"
          />
        </div>
        <div>
          <p className="text-sm uppercase tracking-wide text-gray-500">
            {product.brand ?? 'No brand'} · {product.category}
          </p>
          <h1 className="mt-2 text-3xl font-bold">{product.title}</h1>
          <p className="mt-2 text-amber-500">★ {product.rating} / 5</p>
          <div className="mt-6 flex flex-wrap items-end gap-3">
            <span className="text-4xl font-extrabold text-red-600">{formatUSD(product.price)}</span>
            <span className="text-lg text-gray-400 line-through">{formatUSD(oldPrice)}</span>
            <span className="rounded bg-red-100 px-2 py-0.5 text-sm font-semibold text-red-600">
              -{Math.round(product.discountPercentage)}%
            </span>
          </div>
          <p className="mt-6 leading-relaxed text-gray-700 dark:text-gray-300">{product.description}</p>
          <p className="mt-3 text-sm text-gray-500">Còn hàng: {product.stock}</p>
          <AddToCartButton
            product={{
              id: product.id,
              title: product.title,
              price: product.price,
              thumbnail: product.thumbnail,
            }}
            className="mt-8 px-10 py-3 text-base"
          />
        </div>
      </div>
    </div>
  );
}
