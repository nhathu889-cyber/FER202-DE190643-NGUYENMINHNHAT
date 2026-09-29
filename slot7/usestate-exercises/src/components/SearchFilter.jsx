import { useState } from 'react';
import { Card, Form, ListGroup } from 'react-bootstrap';

function SearchFilter() {
  const [search, setSearch] = useState('');

  const items = [
    'Apple',
    'Banana',
    'Orange',
    'Mango',
    'Grape',
  ];

  const filteredItems = items.filter((item) =>
    item.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Card
      className="p-3 shadow-sm mx-auto"
      style={{ width: '350px' }}
    >
      <h4 className="text-center mb-3">
        Exercise 6: Search Filter
      </h4>

      <Form.Control
        type="text"
        placeholder="Search..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-3"
      />

      <ListGroup>
        {filteredItems.map((item, index) => (
          <ListGroup.Item key={index}>
            {item}
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Card>
  );
}

export default SearchFilter;