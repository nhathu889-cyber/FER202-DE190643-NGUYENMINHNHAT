import { useEffect, useState } from 'react';
import { Button, Card, Form } from 'react-bootstrap';
import { fetchRoomTypes, addRoom } from '../api/roomApi';

function AddRoom() {
  const [roomTypes, setRoomTypes] = useState([]);
  const [form, setForm] = useState({
    name: '',
    roomTypeId: '',
    floor: '',
    view: '',
    priceWeekday: '',
    priceWeekend: '',
    lastRenovated: '',
  });

  useEffect(() => {
    fetchRoomTypes().then(setRoomTypes).catch(console.error);
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await addRoom({
      ...form,
      floor: Number(form.floor),
      priceWeekday: Number(form.priceWeekday),
      priceWeekend: Number(form.priceWeekend),
      roomTypeId: Number(form.roomTypeId),
    });
    window.alert('Room added successfully');
    setForm({
      name: '',
      roomTypeId: '',
      floor: '',
      view: '',
      priceWeekday: '',
      priceWeekend: '',
      lastRenovated: '',
    });
  };

  return (
    <Card className="shadow-sm">
      <Card.Body>
        <h3>Add Room</h3>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control name="name" value={form.name} onChange={handleChange} required />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Room Type</Form.Label>
            <Form.Select name="roomTypeId" value={form.roomTypeId} onChange={handleChange} required>
              <option value="">-- Select room type --</option>
              {roomTypes.map((roomType) => (
                <option key={roomType.id} value={roomType.id}>
                  {roomType.name}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Floor</Form.Label>
            <Form.Control type="number" name="floor" value={form.floor} onChange={handleChange} required />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>View</Form.Label>
            <Form.Control name="view" value={form.view} onChange={handleChange} required />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Price Weekday</Form.Label>
            <Form.Control type="number" name="priceWeekday" value={form.priceWeekday} onChange={handleChange} required />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Price Weekend</Form.Label>
            <Form.Control type="number" name="priceWeekend" value={form.priceWeekend} onChange={handleChange} required />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Last Renovated</Form.Label>
            <Form.Control type="date" name="lastRenovated" value={form.lastRenovated} onChange={handleChange} required />
          </Form.Group>
          <Button type="submit" variant="primary">Save Room</Button>
        </Form>
      </Card.Body>
    </Card>
  );
}

export default AddRoom;
