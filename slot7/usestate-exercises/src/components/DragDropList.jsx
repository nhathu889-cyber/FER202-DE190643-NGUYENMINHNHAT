import { useState } from 'react';
import { Card, ListGroup } from 'react-bootstrap';

function DragDropList() {
  const [items, setItems] = useState([
    'Item 1',
    'Item 2',
    'Item 3',
    'Item 4',
    'Item 5',
  ]);

  const [draggingItem, setDraggingItem] = useState(null);

  const handleDragStart = (index) => {
    setDraggingItem(index);
  };

  const handleDragOver = (event, index) => {
    event.preventDefault();

    if (draggingItem === null || draggingItem === index) {
      return;
    }

    const newItems = [...items];
    const draggedItem = newItems[draggingItem];

    newItems.splice(draggingItem, 1);
    newItems.splice(index, 0, draggedItem);

    setItems(newItems);
    setDraggingItem(index);
  };

  const handleDragEnd = () => {
    setDraggingItem(null);
  };

  return (
    <Card
      className="p-3 shadow-sm mx-auto"
      style={{ width: '350px' }}
    >
      <h4 className="text-center mb-3">
        Exercise 7: Drag and Drop List
      </h4>

      <ListGroup>
        {items.map((item, index) => (
          <ListGroup.Item
            key={item}
            draggable
            onDragStart={() => handleDragStart(index)}
            onDragOver={(event) => handleDragOver(event, index)}
            onDragEnd={handleDragEnd}
            style={{
              cursor: 'grab',
              opacity: draggingItem === index ? 0.5 : 1,
            }}
          >
            {item}
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Card>
  );
}

export default DragDropList;