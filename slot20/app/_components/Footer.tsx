export default function Footer() {
  return (
    <footer className="mt-auto border-t border-gray-200 py-6 text-center text-sm text-gray-500 dark:border-gray-800">
      © {new Date().getFullYear()} FER202 — Next.js · Tailwind CSS · Redux Toolkit
    </footer>
  );
}
