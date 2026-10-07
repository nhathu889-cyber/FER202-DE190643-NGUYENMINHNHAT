import { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ListGroup from 'react-bootstrap/ListGroup';

const initialTodos = [
  { id: 1, title: 'Ôn lại ES6', done: true },
  { id: 2, title: 'Làm bài tập useState', done: false },
];

const FILTERS = {
  all: 'Tất cả',
  active: 'Chưa xong',
  done: 'Đã xong',
};

const TodoList = () => {
  const [todos, setTodos] = useState(initialTodos);
  const [title, setTitle] = useState('');
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('all');
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState('');
  const [editError, setEditError] = useState('');

  const validateTitle = (text, ignoreId = null) => {
    const trimmed = text.trim();

    if (!trimmed) {
      return 'Nội dung không được để trống';
    }

    if (trimmed.length > 60) {
      return 'Nội dung không được quá 60 ký tự';
    }

    const duplicated = todos.some(
      (todo) =>
        todo.id !== ignoreId &&
        todo.title.toLowerCase() === trimmed.toLowerCase()
    );

    if (duplicated) {
      return 'Công việc đã tồn tại';
    }

    return '';
  };

  const handleAdd = (event) => {
    event.preventDefault();

    const message = validateTitle(title);

    if (message) {
      setError(message);
      return;
    }

    setTodos((prev) => [
      ...prev,
      {
        id: Date.now(),
        title: title.trim(),
        done: false,
      },
    ]);

    setTitle('');
    setError('');
  };

  const toggleTodo = (id) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id
          ? { ...todo, done: !todo.done }
          : todo
      )
    );
  };

  const deleteTodo = (id) => {
    setTodos((prev) =>
      prev.filter((todo) => todo.id !== id)
    );
  };

  const startEdit = (todo) => {
    setEditingId(todo.id);
    setEditText(todo.title);
    setEditError('');
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditText('');
    setEditError('');
  };

  const saveEdit = () => {
    if (editingId === null) {
      return;
    }

    const message = validateTitle(
      editText,
      editingId
    );

    if (message) {
      setEditError(message);
      return;
    }

    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === editingId
          ? {
              ...todo,
              title: editText.trim(),
            }
          : todo
      )
    );

    setEditingId(null);
    setEditText('');
    setEditError('');
  };

  const handleEditKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      saveEdit();
    }

    if (event.key === 'Escape') {
      cancelEdit();
    }
  };

  const visibleTodos = todos.filter((todo) => {
    if (filter === 'active') {
      return !todo.done;
    }

    if (filter === 'done') {
      return todo.done;
    }

    return true;
  });

  const remaining = todos.filter(
    (todo) => !todo.done
  ).length;

  const hasCompleted = todos.some(
    (todo) => todo.done
  );

  const clearCompleted = () => {
    setTodos((prev) =>
      prev.filter((todo) => !todo.done)
    );
  };

  return (
    <Card>
      <Card.Body>
        <Card.Title className="mb-3">
          Todo List
        </Card.Title>

        <Form
          noValidate
          onSubmit={handleAdd}
          className="mb-3"
        >
          <InputGroup>
            <Form.Control
              placeholder="Nhập công việc..."
              value={title}
              isInvalid={Boolean(error)}
              onChange={(event) => {
                setTitle(event.target.value);
                setError('');
              }}
            />

            <Button type="submit">
              Thêm
            </Button>

            <Form.Control.Feedback type="invalid">
              {error}
            </Form.Control.Feedback>
          </InputGroup>
        </Form>

        <ButtonGroup className="mb-3">
          {Object.entries(FILTERS).map(
            ([key, label]) => (
              <Button
                key={key}
                variant={
                  filter === key
                    ? 'primary'
                    : 'outline-primary'
                }
                onClick={() => setFilter(key)}
              >
                {label}
              </Button>
            )
          )}
        </ButtonGroup>

        <ListGroup className="mb-3">
          {visibleTodos.map((todo) => (
            <ListGroup.Item
              key={todo.id}
              className="d-flex align-items-center gap-2"
            >
              <Form.Check
                checked={todo.done}
                onChange={() =>
                  toggleTodo(todo.id)
                }
              />

              {editingId === todo.id ? (
                <Form.Control
                  autoFocus
                  value={editText}
                  isInvalid={Boolean(editError)}
                  onChange={(event) => {
                    setEditText(
                      event.target.value
                    );
                    setEditError('');
                  }}
                  onKeyDown={
                    handleEditKeyDown
                  }
                  onBlur={saveEdit}
                />
              ) : (
                <span
                  className="flex-grow-1 text-start"
                  style={{
                    textDecoration: todo.done
                      ? 'line-through'
                      : 'none',
                    cursor: 'pointer',
                  }}
                  onDoubleClick={() =>
                    startEdit(todo)
                  }
                >
                  {todo.title}
                </span>
              )}

              <Button
                variant="outline-danger"
                size="sm"
                onClick={() =>
                  deleteTodo(todo.id)
                }
              >
                Xóa
              </Button>
            </ListGroup.Item>
          ))}
        </ListGroup>

        {editingId !== null && editError && (
          <div className="text-danger mb-2">
            {editError}
          </div>
        )}

        <div className="d-flex justify-content-between align-items-center">
          <span>
            Còn {remaining} việc chưa xong
          </span>

          {hasCompleted && (
            <Button
              variant="outline-secondary"
              size="sm"
              onClick={clearCompleted}
            >
              Xóa việc đã xong
            </Button>
          )}
        </div>
      </Card.Body>
    </Card>
  );
};

export default TodoList;