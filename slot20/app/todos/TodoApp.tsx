'use client';

import { selectVisibleTodos } from '@/lib/features/todos/todosSlice';
import { useAppSelector } from '@/lib/hooks';
import TodoFilters from './TodoFilters';
import TodoForm from './TodoForm';
import TodoItem from './TodoItem';
import TodoStats from './TodoStats';

export default function TodoApp() {
  const todos = useAppSelector(selectVisibleTodos);

  return (
    <div className="rounded-2xl bg-white p-6 shadow-lg dark:bg-gray-900">
      <TodoForm />
      <div className="mt-5">
        <TodoFilters />
      </div>
      <ul className="mt-5 divide-y divide-gray-100 dark:divide-gray-800">
        {todos.length === 0 ? (
          <li className="py-10 text-center text-gray-400">Không có công việc nào 🎉</li>
        ) : (
          todos.map((todo) => <TodoItem key={todo.id} todo={todo} />)
        )}
      </ul>
      <TodoStats />
    </div>
  );
}
