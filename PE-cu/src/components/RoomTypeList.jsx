import { Button, Card, ListGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function RoomTypeList({ roomTypes = [] }) {
  return (
    <Card>
      <ListGroup variant="flush">
        {roomTypes.map((roomType) => (
          <ListGroup.Item key={roomType.id} className="d-flex justify-content-between align-items-center">
            <span>{roomType.name}</span>
            <Button as={Link} to={`/room-types/${roomType.id}`} variant="outline-primary" size="sm">
              View Details
            </Button>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Card>
  );
}

export default RoomTypeList;
