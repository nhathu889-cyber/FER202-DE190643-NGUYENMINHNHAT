import { useEffect, useState } from 'react';
import { Alert, Button, Card, Spinner, Table } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchRoomTypes, fetchRooms } from '../api/roomApi';
import { formatDateDisplay, formatPriceRange } from '../utils/format';

function RoomTypeDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [roomType, setRoomType] = useState(null);
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const load = async () => {
      try {
        const [roomTypes, allRooms] = await Promise.all([fetchRoomTypes(), fetchRooms()]);
        const found = roomTypes.find((type) => String(type.id) === String(id));

        if (!found) {
          navigate('/not-found', { replace: true });
          return;
        }

        setRoomType(found);
        setRooms(allRooms.filter((room) => String(room.roomTypeId) === String(id)));
        setLoading(false);
      } catch (err) {
        setError(err.message || 'Failed to load room type.');
        setLoading(false);
      }
    };

    load();
  }, [id, navigate]);

  if (loading) {
    return <Spinner animation="border" className="d-block mx-auto mt-5" />;
  }

  if (error) {
    return <Alert variant="danger">{error}</Alert>;
  }

  return (
    <Card>
      <Card.Body>
        <Button variant="outline-secondary" onClick={() => navigate('/room-types')} className="mb-3">
          ← Back to Room Types
        </Button>
        <h3>{roomType?.name}</h3>
        <p>Total rooms: {rooms.length}</p>
        <Table bordered striped>
          <thead>
            <tr>
              <th>Name</th>
              <th>Floor</th>
              <th>View</th>
              <th>Price Range</th>
              <th>Last Renovated</th>
            </tr>
          </thead>
          <tbody>
            {rooms.map((room) => (
              <tr key={room.id}>
                <td>{room.name}</td>
                <td>{room.floor}</td>
                <td>{room.view}</td>
                <td>{formatPriceRange(room.priceWeekday, room.priceWeekend)}</td>
                <td>{formatDateDisplay(room.lastRenovated)}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );
}

export default RoomTypeDetail;
