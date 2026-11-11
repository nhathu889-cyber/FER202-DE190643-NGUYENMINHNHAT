import Link from 'next/link';

type Feature = { icon: string; title: string; description: string; href: string };

const features: Feature[] = [
  { icon: '🔢', title: 'Counter', description: 'createSlice, PayloadAction, typed hooks', href: '/counter' },
  { icon: '📝', title: 'Todo', description: 'prepare, nanoid, createSelector', href: '/todos' },
  { icon: '🛒', title: 'Shop', description: 'createAsyncThunk, giỏ hàng', href: '/products' },
  { icon: '🗒️', title: 'Notes', description: 'Route Handlers + RTK Query', href: '/notes' },
];

export default function Home() {
  return (
    <>
      <section className="py-12 text-center">
        <h1 className="text-4xl font-extrabold tracking-tight md:text-6xl">
          Next.js +{' '}
          <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Redux Toolkit
          </span>
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-600 dark:text-gray-400">
          Quản lý state toàn cục đúng chuẩn App Router, giao diện bằng Tailwind CSS.
        </p>
      </section>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {features.map((feature) => (
          <Link
            key={feature.href}
            href={feature.href}
            className="group rounded-xl border border-gray-200 bg-white p-6 transition hover:-translate-y-1 hover:border-blue-500 hover:shadow-lg dark:border-gray-800 dark:bg-gray-900"
          >
            <div className="text-4xl">{feature.icon}</div>
            <h2 className="mt-4 text-lg font-semibold group-hover:text-blue-600">{feature.title}</h2>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">{feature.description}</p>
          </Link>
        ))}
      </div>
    </>
  );
}
