import { useState } from 'react';
import { Button, Form, InputGroup } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { addTodo } from '../redux/actions.js';

export default function TodoForm() {
  const [text, setText] = useState('');
  const dispatch = useDispatch();
  const trimmedText = text.trim();

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!trimmedText) return;

    dispatch(addTodo(trimmedText));
    setText('');
  };

  return (
    <Form onSubmit={handleSubmit}>
      <InputGroup className="todo-form">
        <Form.Control
          aria-label="Công việc mới"
          placeholder="Nhập công việc cần làm..."
          value={text}
          onChange={(event) => setText(event.target.value)}
        />
        <Button type="submit" disabled={!trimmedText}>
          Thêm việc
        </Button>
      </InputGroup>
    </Form>
  );
}
