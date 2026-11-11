import type { Metadata } from 'next';
import NotesBoard from './NotesBoard';

export const metadata: Metadata = { title: 'Ghi chú' };

export default function NotesPage() {
  return <NotesBoard />;
}
