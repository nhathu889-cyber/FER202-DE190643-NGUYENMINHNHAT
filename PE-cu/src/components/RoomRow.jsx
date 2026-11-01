import { useState } from 'react';
import { Button, Badge } from 'react-bootstrap';
import ModalConfirm from './ModalConfirm';
import { formatPriceRange } from '../utils/format';

function RoomRow({ room, onDelete }) {
  const [showModal, setShowModal] = useState(false);

  const handleDeleteConfirm = () => {
    onDelete(room.id);
    setShowModal(false);
  };

  return (
    <>
      <tr>
        <td>{room.name}</td>
        <td>
          <Badge bg="primary">{room.roomTypeId}</Badge>
        </td>
        <td>{room.floor}</td>
        <td>{room.view}</td>
        <td>{formatPriceRange(room.priceWeekday, room.priceWeekend)}</td>
        <td>{room.lastRenovated}</td>
        <td>
          <Button variant="outline-danger" size="sm" onClick={() => setShowModal(true)}>
            Delete
          </Button>
        </td>
      </tr>
      <ModalConfirm
        show={showModal}
        onHide={() => setShowModal(false)}
        onConfirm={handleDeleteConfirm}
        title="Confirm Delete"
        message="Are you sure you want to delete this room?"
        confirmText="Delete"
      />
    </>
  );
}

export default RoomRow;
