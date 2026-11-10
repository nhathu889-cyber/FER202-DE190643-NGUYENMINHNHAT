import { useMemo } from 'react';
import { Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { clearCompleted } from '../redux/actions.js';
import {
  selectFilter,
  selectRemaining,
  selectTodos,
} from '../redux/selectors.js';
import TodoItem from './TodoItem.jsx';

export default function TodoList() {
  const todos = useSelector(selectTodos);
  const filter = useSelector(selectFilter);
  const remaining = useSelector(selectRemaining);
  const dispatch = useDispatch();

  const visibleTodos = useMemo(() => {
    if (filter === 'active') return todos.filter((todo) => !todo.done);
    if (filter === 'done') return todos.filter((todo) => todo.done);
    return todos;
  }, [todos, filter]);
  const completedCount = todos.length - remaining;

  return (
    <>
      <ul className="todo-list">
        {visibleTodos.length === 0 ? (
          <li className="todo-empty">Không có công việc trong mục này.</li>
        ) : (
          visibleTodos.map((todo) => <TodoItem key={todo.id} todo={todo} />)
        )}
      </ul>
      <footer className="todo-footer">
        <span>
          Còn <strong>{remaining}</strong> việc chưa xong
        </span>
        <Button
          size="sm"
          variant="link"
          disabled={completedCount === 0}
          onClick={() => dispatch(clearCompleted())}
        >
          Xóa việc đã xong
        </Button>
      </footer>
    </>
  );
}
