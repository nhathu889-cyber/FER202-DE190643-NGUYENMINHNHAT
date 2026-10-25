
import Alert from 'react-bootstrap/Alert';

export default function ErrorAlert({ message, onRetry }) {
  if (!message) return null;

  return (
    <Alert variant="danger" className="my-3">
      <Alert.Heading>Có lỗi xảy ra</Alert.Heading>
      <p className="mb-0">{message}</p>
      {onRetry && (
        <button className="btn btn-outline-danger btn-sm mt-2" onClick={onRetry}>
          Thử lại
        </button>
      )}
    </Alert>
  );
}
