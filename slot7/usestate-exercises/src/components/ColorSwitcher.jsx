import { useState } from 'react';
import { Card, Form } from 'react-bootstrap';

function ColorSwitcher() {
  const [color, setColor] = useState('');

  return (
    <Card
      className="p-3 shadow-sm mx-auto"
      style={{ width: '350px' }}
    >
      <h4 className="text-center mb-3">
        Exercise 5: Color Switcher
      </h4>

      <Form.Select
        value={color}
        onChange={(e) => setColor(e.target.value)}
        className="mb-3"
      >
        <option value="">Select a color</option>
        <option value="red">Red</option>
        <option value="blue">Blue</option>
        <option value="green">Green</option>
        <option value="yellow">Yellow</option>
      </Form.Select>

      <div
        style={{
          width: '150px',
          height: '150px',
          backgroundColor: color,
          border: '1px solid #ccc',
          margin: '0 auto',
        }}
      />
    </Card>
  );
}

export default ColorSwitcher;