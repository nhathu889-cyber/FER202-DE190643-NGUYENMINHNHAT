
import Spinner from 'react-bootstrap/Spinner';

export default function LoadingSpinner({ text = 'Đang tải dữ liệu...' }) {
  return (
    <div className="d-flex justify-content-center align-items-center gap-2 my-3">
      <Spinner animation="border" role="status" size="sm">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
      <span>{text}</span>
    </div>
  );
}
