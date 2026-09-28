import { useState } from 'react';
import { Button, Card } from 'react-bootstrap';

function ToggleVisibility() {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <Card
      className="p-3 shadow-sm mx-auto text-center"
      style={{
        width: '350px',
        backgroundColor: '#282c34',
        color: 'white'
      }}
    >
      <h4 className="mb-3">Exercise 3: Toggle Visibility</h4>

      <div>
        <Button
          variant="light"
          size="sm"
          onClick={() => setIsVisible(!isVisible)}
        >
          {isVisible ? 'Hide' : 'Show'}
        </Button>
      </div>

      {isVisible && (
        <h3 className="mt-4 mb-2">
          Toggle me!
        </h3>
      )}
    </Card>
  );
}

export default ToggleVisibility;