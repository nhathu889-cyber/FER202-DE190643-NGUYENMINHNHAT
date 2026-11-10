import { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { deleteTodo, editTodo, toggleTodo } from '../redux/actions.js';

export default function TodoItem({ todo }) {
  const [editing, setEditing] = useState(false);
  const [text, setText] = useState(todo.text);
  const dispatch = useDispatch();

  const save = (event) => {
    event.preventDefault();
    const trimmedText = text.trim();
    if (!trimmedText) return;

    dispatch(editTodo(todo.id, trimmedText));
    setEditing(false);
  };

  const cancel = () => {
    setText(todo.text);
    setEditing(false);
  };

  return (
    <li className={`todo-item${todo.done ? ' completed' : ''}`}>
      <Form.Check
        type="checkbox"
        id={`todo-${todo.id}`}
        checked={todo.done}
        onChange={() => dispatch(toggleTodo(todo.id))}
        aria-label={`${todo.done ? 'Đánh dấu chưa xong' : 'Đánh dấu đã xong'}: ${todo.text}`}
      />
      {editing ? (
        <Form onSubmit={save} className="todo-edit-form">
          <Form.Control
            size="sm"
            value={text}
            autoFocus
            aria-label="Sửa nội dung công việc"
            onChange={(event) => setText(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === 'Escape') cancel();
            }}
          />
          <Button size="sm" type="submit" disabled={!text.trim()}>
            Lưu
          </Button>
          <Button size="sm" type="button" variant="light" onClick={cancel}>
            Hủy
          </Button>
        </Form>
      ) : (
        <span className="todo-text">{todo.text}</span>
      )}
      {!editing && (
        <div className="todo-item-actions">
          <Button
            size="sm"
            variant="outline-secondary"
            onClick={() => {
              setText(todo.text);
              setEditing(true);
            }}
            aria-label={`Sửa: ${todo.text}`}
          >
            Sửa
          </Button>
          <Button
            size="sm"
            variant="outline-danger"
            onClick={() => dispatch(deleteTodo(todo.id))}
            aria-label={`Xóa: ${todo.text}`}
          >
            Xóa
          </Button>
        </div>
      )}
    </li>
  );
}
