import React from 'react';
import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';

function ProductInfo({ name, price, description, tags, avatar }) {
  return (
    <Card style={{ width: '18rem', margin: '1rem', position: 'relative' }}>
      {avatar && <Card.Img variant="top" src={avatar} style={{ height: '180px', objectFit: 'contain', padding: '10px', backgroundColor: '#f8f9fa' }} />}
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <Card.Text style={{ color: 'red', fontWeight: 'bold' }}>
          {price}
        </Card.Text>
        <Card.Text style={{ fontSize: '14px', color: '#666' }}>
          {description}
        </Card.Text>
        <Button variant="primary">Buy Now</Button>
        {tags && (
          <Badge bg="primary" pill 
            style={{ position: 'absolute', top: '10px', right: '10px', zIndex: 1 }}>
            {tags}
          </Badge>
        )}
      </Card.Body>
    </Card>
  );
}

export default ProductInfo;