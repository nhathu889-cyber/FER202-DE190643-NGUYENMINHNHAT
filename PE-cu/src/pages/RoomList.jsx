import { useEffect, useMemo, useState } from 'react';
import { Button, Spinner, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import RoomRow from '../components/RoomRow';
import FilterBar from '../components/FilterBar';
import { fetchRooms } from '../api/roomApi';

function RoomList() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState('');

  useEffect(() => {
    fetchRooms()
      .then((data) => {
        setRooms(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, []);

  const filteredRooms = useMemo(() => {
    const text = query.trim().toLowerCase();
    if (!text) return rooms;
    return rooms.filter((room) => room.name.toLowerCase().includes(text));
  }, [rooms, query]);

  const handleDelete = (id) => {
    setRooms((prev) => prev.filter((room) => room.id !== id));
  };

  if (loading) {
    return <Spinner animation="border" className="d-block mx-auto mt-5" />;
  }

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3>Rooms</h3>
        <Button as={Link} to="/rooms/new" variant="primary">
          Add Room
        </Button>
      </div>
      <FilterBar value={query} onChange={setQuery} placeholder="Search room name..." />
      <Table striped bordered hover className="room-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Type</th>
            <th>Floor</th>
            <th>View</th>
            <th>Price Range</th>
            <th>Last Renovated</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredRooms.map((room) => (
            <RoomRow key={room.id} room={room} onDelete={handleDelete} />
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default RoomList;
