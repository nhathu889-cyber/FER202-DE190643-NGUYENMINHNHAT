
import { Button, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <Container className="text-center py-5">
      <h1>404</h1>
      <h2>Không tìm thấy trang</h2>
      <p>Đường dẫn mày truy cập không tồn tại.</p>
      <Button as={Link} to="/posts">
        Quay lại danh sách bài viết
      </Button>
    </Container>
  );
}
