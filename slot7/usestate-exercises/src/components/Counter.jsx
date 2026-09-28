import { useState } from 'react';
import { Button, Card } from 'react-bootstrap';

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <Card
      className="p-3 shadow-sm mx-auto"
      style={{ width: '350px' }}
    >
      <h4 className="text-center">Exercise 1: Counter</h4>

      <p className="text-center mb-3">
        Current count: <strong>{count}</strong>
      </p>

      <Button
        variant="primary"
        size="sm"
        onClick={() => setCount((prev) => prev + 1)}
      >
        Increment
      </Button>
    </Card>
  );
}

export default Counter;