
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';

export default function ToastMessage({
  show,
  message,
  variant = 'success',
  onClose,
}) {
  if (!show) {
    return null;
  }

  const bg = variant === 'danger' ? 'danger' : 'success';

  return (
    <ToastContainer
      position="top-end"
      className="p-3"
      style={{
        position: 'fixed',
        zIndex: 2000,
        top: 0,
        right: 0,
      }}
    >
      <Toast
        bg={bg}
        show={show}
        onClose={onClose}
        delay={3500}
        autohide
      >
        <Toast.Header>
          <strong className="me-auto">
            {variant === 'danger' ? 'Thất bại' : 'Thành công'}
          </strong>
        </Toast.Header>

        <Toast.Body className="text-white">
          {message}
        </Toast.Body>
      </Toast>
    </ToastContainer>
  );
}
