import { Button, Modal } from 'react-bootstrap';

function ModalConfirm({
  show,
  onHide,
  onConfirm,
  title = 'Confirm',
  message = 'Are you sure?',
  confirmText = 'Delete',
  variant = 'danger',
}) {
  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{message}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Cancel
        </Button>
        <Button variant={variant} onClick={onConfirm}>
          {confirmText}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalConfirm;
