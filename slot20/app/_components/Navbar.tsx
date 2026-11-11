'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { menuClosed, menuToggled, selectMenuOpen, selectTheme, themeToggled } from '@/lib/features/ui/uiSlice';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import CartBadge from './CartBadge';

type NavLink = { href: string; label: string };

const links: NavLink[] = [
  { href: '/', label: 'Trang chủ' },
  { href: '/counter', label: 'Counter' },
  { href: '/todos', label: 'Todo' },
  { href: '/products', label: 'Sản phẩm' },
  { href: '/notes', label: 'Ghi chú' },
];

export default function Navbar() {
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const theme = useAppSelector(selectTheme);
  const menuOpen = useAppSelector(selectMenuOpen);

  const isActive = (href: string): boolean =>
    href === '/' ? pathname === '/' : pathname.startsWith(href);

  const linkClass = (href: string): string =>
    `rounded-lg px-3 py-2 text-sm font-medium transition ${
      isActive(href)
        ? 'bg-blue-600 text-white'
        : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'
    }`;

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/80 backdrop-blur dark:border-gray-800 dark:bg-gray-950/80">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/" className="text-xl font-extrabold text-blue-600">
          Next<span className="text-gray-900 dark:text-white">RTK</span>
        </Link>

        <ul className="hidden items-center gap-1 md:flex">
          {links.map((link) => (
            <li key={link.href}>
              <Link href={link.href} className={linkClass(link.href)} aria-current={isActive(link.href) ? 'page' : undefined}>
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <CartBadge />
          <button
            type="button"
            onClick={() => dispatch(themeToggled())}
            className="rounded-lg p-2 text-lg transition hover:bg-gray-100 dark:hover:bg-gray-800"
            aria-label="Đổi giao diện sáng/tối"
          >
            {theme === 'dark' ? '☀️' : '🌙'}
          </button>
          <button
            type="button"
            onClick={() => dispatch(menuToggled())}
            className="rounded-lg p-2 hover:bg-gray-100 md:hidden dark:hover:bg-gray-800"
            aria-label={menuOpen ? 'Đóng menu' : 'Mở menu'}
            aria-expanded={menuOpen}
          >
            {menuOpen ? '✕' : '☰'}
          </button>
        </div>
      </nav>

      {menuOpen && (
        <ul className="flex flex-col gap-1 border-t border-gray-200 px-4 py-2 md:hidden dark:border-gray-800">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                onClick={() => dispatch(menuClosed())}
                className={`block ${linkClass(link.href)}`}
                aria-current={isActive(link.href) ? 'page' : undefined}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </header>
  );
}
