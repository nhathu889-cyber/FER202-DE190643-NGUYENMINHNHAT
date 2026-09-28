import { useState } from 'react';
import { Button, Card } from 'react-bootstrap';

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <Card
      className="p-3 shadow-sm mx-auto text-center"
      style={{ width: '350px' }}
    >
      <h4>Exercise 1: Counter</h4>

      <p className="mb-3">
        Current count: <strong>{count}</strong>
      </p>

      <div className="d-flex justify-content-center gap-2">
        <Button
          variant="success"
          size="sm"
          onClick={() => setCount(count + 1)}
        >
          Increment
        </Button>

        <Button
          variant="danger"
          size="sm"
          onClick={() => setCount(count - 1)}
        >
          Decrement
        </Button>

        <Button
          variant="secondary"
          size="sm"
          onClick={() => setCount(0)}
        >
          Reset
        </Button>
      </div>
    </Card>
  );
}

export default Counter;