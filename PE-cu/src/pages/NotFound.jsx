import { Button, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <Container className="text-center py-5 not-found-box">
      <div>
        <h1 style={{ fontSize: '6rem', fontWeight: 'bold', color: '#dc3545' }}>404</h1>
        <h2 className="mb-3">Page Not Found</h2>
        <p className="text-muted mb-4">
          The page you are looking for does not exist or has been moved.
        </p>
        <Button as={Link} to="/" variant="primary">
          Back to Home
        </Button>
      </div>
    </Container>
  );
}

export default NotFound;
