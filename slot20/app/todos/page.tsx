import type { Metadata } from 'next';
import TodoApp from './TodoApp';

export const metadata: Metadata = { title: 'Todo' };

export default function TodosPage() {
  return (
    <div className="mx-auto max-w-xl">
      <h1 className="mb-6 text-center text-3xl font-bold">📝 Việc cần làm</h1>
      <TodoApp />
    </div>
  );
}
