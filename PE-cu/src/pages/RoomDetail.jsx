import { useEffect, useState } from 'react';
import { Alert, Badge, Button, Card, Spinner } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchRoomById } from '../api/roomApi';
import { formatDateDisplay, formatVND } from '../utils/format';

function RoomDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchRoomById(id)
      .then((data) => {
        setRoom(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message || 'Failed to load room.');
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <Spinner animation="border" className="d-block mx-auto mt-5" />;
  }

  if (error) {
    return <Alert variant="danger" role="alert">{error}</Alert>;
  }

  return (
    <Card className="shadow-sm">
      <Card.Body>
        <Button onClick={() => navigate(-1)} className="mb-3">← Back</Button>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h3>{room.name}</h3>
          <Badge bg="primary">{room.roomTypeId}</Badge>
        </div>
        <div className="row g-3">
          <div className="col-md-6">
            <p><strong>Floor:</strong> {room.floor}</p>
            <p><strong>View:</strong> {room.view}</p>
          </div>
          <div className="col-md-6">
            <p><strong>Price Weekday:</strong> {formatVND(room.priceWeekday)}</p>
            <p><strong>Price Weekend:</strong> {formatVND(room.priceWeekend)}</p>
            <p><strong>Last Renovated:</strong> {formatDateDisplay(room.lastRenovated)}</p>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
}

export default RoomDetail;
