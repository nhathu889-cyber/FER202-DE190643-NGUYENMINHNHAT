import { useEffect, useState } from 'react';
import { Button, Card, Table, Alert } from 'react-bootstrap';
import { deleteRoomType, fetchRoomTypes, fetchRooms } from '../api/roomApi';
import ModalConfirm from '../components/ModalConfirm';

function ManageRoomTypes() {
  const [roomTypes, setRoomTypes] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [targetId, setTargetId] = useState(null);
  const [targetName, setTargetName] = useState('');
  const [deleteError, setDeleteError] = useState(null);

  useEffect(() => {
    fetchRoomTypes().then(setRoomTypes).catch(console.error);
  }, []);

  const handleDeleteClick = async (id, name) => {
    setTargetId(id);
    setTargetName(name);

    const rooms = await fetchRooms();
    const inUse = rooms.some((room) => String(room.roomTypeId) === String(id));

    if (inUse) {
      setDeleteError(`Room type "${name}" is currently in use and cannot be deleted.`);
    } else {
      setDeleteError(null);
    }

    setShowModal(true);
  };

  const handleConfirm = async () => {
    if (!targetId) return;

    if (deleteError) {
      setShowModal(false);
      return;
    }

    await deleteRoomType(targetId);
    setRoomTypes((prev) => prev.filter((roomType) => Number(roomType.id) !== Number(targetId)));
    setShowModal(false);
    setTargetId(null);
    setTargetName('');
    setDeleteError(null);
  };

  return (
    <Card>
      <Card.Body>
        <h3>Manage Room Types</h3>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {roomTypes.map((roomType) => (
              <tr key={roomType.id}>
                <td>{roomType.id}</td>
                <td>{roomType.name}</td>
                <td>
                  <Button variant="outline-danger" size="sm" onClick={() => handleDeleteClick(roomType.id, roomType.name)}>
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <ModalConfirm
          show={showModal}
          onHide={() => setShowModal(false)}
          onConfirm={handleConfirm}
          title={deleteError ? 'Cannot Delete' : 'Confirm Delete'}
          message={
            deleteError ? (
              <>
                <Alert variant="danger" className="mb-0">{deleteError}</Alert>
              </>
            ) : (
              `Are you sure you want to delete room type "${targetName}"?`
            )
          }
          confirmText={deleteError ? 'OK' : 'Delete'}
          variant={deleteError ? 'secondary' : 'danger'}
        />
      </Card.Body>
    </Card>
  );
}

export default ManageRoomTypes;
