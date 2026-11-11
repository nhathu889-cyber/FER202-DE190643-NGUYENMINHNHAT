import type { Metadata } from 'next';
import Footer from './_components/Footer';
import Navbar from './_components/Navbar';
import ThemeSync from './_components/ThemeSync';
import StoreProvider from './StoreProvider';
import './globals.css';

export const metadata: Metadata = {
  title: { default: 'Slot 20 – Next.js + RTK', template: '%s | Slot 20' },
  description: 'Next.js + Tailwind CSS + Redux Toolkit',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <body className="flex min-h-screen flex-col bg-gray-50 text-gray-900 antialiased dark:bg-gray-950 dark:text-gray-100">
        <StoreProvider>
          <ThemeSync />
          <Navbar />
          <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-10">{children}</main>
          <Footer />
        </StoreProvider>
      </body>
    </html>
  );
}
