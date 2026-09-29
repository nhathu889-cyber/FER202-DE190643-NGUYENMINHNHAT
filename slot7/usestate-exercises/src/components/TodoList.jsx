import { useState } from 'react';
import { Button, Card, Form, ListGroup } from 'react-bootstrap';

function TodoList() {
  const [todo, setTodo] = useState('');
  const [todos, setTodos] = useState([]);

  const addTodo = () => {
    if (todo.trim() === '') return;

    setTodos([...todos, todo]);
    setTodo('');
  };

  const deleteTodo = (index) => {
    setTodos(todos.filter((_, i) => i !== index));
  };

  return (
    <Card
      className="p-3 shadow-sm mx-auto"
      style={{ width: '350px' }}
    >
      <h4 className="text-center mb-3">
        Exercise 4: Todo List
      </h4>

      <Form.Control
        type="text"
        placeholder="Please input a task"
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
        className="mb-2"
      />

      <Button
        variant="primary"
        size="sm"
        onClick={addTodo}
        className="mb-3"
      >
        Add Todo
      </Button>

      <ListGroup>
        {todos.map((item, index) => (
          <ListGroup.Item
            key={index}
            className="d-flex justify-content-between align-items-center"
          >
            {item}

            <Button
              variant="danger"
              size="sm"
              onClick={() => deleteTodo(index)}
            >
              Delete
            </Button>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Card>
  );
}

export default TodoList;