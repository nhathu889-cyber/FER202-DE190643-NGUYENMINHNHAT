
import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';

export default function PostCard({ post, meta }) {
  if (!post) {
    return null;
  }

  return (
    <Card className="my-3 shadow-sm">
      <Card.Header className="d-flex justify-content-between align-items-center">
        <span>Bài viết #{post.id}</span>
        <Badge bg="primary">Post</Badge>
      </Card.Header>

      <Card.Body>
        <Card.Title>{post.title}</Card.Title>
        <Card.Text>{post.body}</Card.Text>
      </Card.Body>

      {meta && (
        <Card.Footer className="text-muted small">
          HTTP Status: {meta.status}
          {meta.duration != null && (
            <span> · Thời gian: {meta.duration} ms</span>
          )}
        </Card.Footer>
      )}
    </Card>
  );
}
