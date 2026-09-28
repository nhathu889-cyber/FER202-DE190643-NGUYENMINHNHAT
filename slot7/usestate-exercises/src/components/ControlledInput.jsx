import { useState } from 'react';
import { Card, Form } from 'react-bootstrap';

function ControlledInput() {
  const [text, setText] = useState('');

  return (
    <Card
      className="p-3 shadow-sm mx-auto"
      style={{ width: '350px' }}
    >
      <h4 className="text-center">Exercise 2: Controlled Input</h4>

      <Form.Control
        type="text"
        placeholder="Enter something..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="mb-3"
      />

      <p className="text-center mb-0">
        You typed: <strong>{text}</strong>
      </p>
    </Card>
  );
}

export default ControlledInput;