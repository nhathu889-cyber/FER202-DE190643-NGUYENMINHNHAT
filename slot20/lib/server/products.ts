import type { Product } from '@/types';

export async function getProduct(id: string): Promise<Product | null> {
  const response = await fetch(`https://dummyjson.com/products/${encodeURIComponent(id)}`, {
    next: { revalidate: 60 },
  });
  if (response.status === 404) return null;
  if (!response.ok) throw new Error(`Không tải được sản phẩm (HTTP ${response.status})`);
  return (await response.json()) as Product;
}
