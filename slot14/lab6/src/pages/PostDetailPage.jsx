
import { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import {
  Alert, Button, Card, Form, Modal, Spinner, ListGroup,
} from 'react-bootstrap';
import postApi, { userApi } from '../api/postApi';

export default function PostDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [author, setAuthor] = useState(null);
  const [title, setTitle] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    let active = true;

    async function loadPost() {
      setLoading(true);
      setError('');

      try {
        const response = await postApi.getById(id, controller.signal);
        if (!active) return;

        setPost(response.data);
        setTitle(response.data.title);

        const [commentResult, authorResult] = await Promise.allSettled([
          postApi.getComments(id, controller.signal),
          userApi.getById(response.data.userId, controller.signal),
        ]);
        if (active) {
          setComments(commentResult.status === 'fulfilled' ? commentResult.value.data : []);
          setAuthor(authorResult.status === 'fulfilled' ? authorResult.value.data : null);
        }
      } catch (err) {
        if (active && !controller.signal.aborted) {
          setError(err.userMessage || err.message || 'Không tải được bài viết.');
        }
      } finally {
        if (active) setLoading(false);
      }
    }

    loadPost();

    return () => {
      active = false;
      controller.abort();
    };
  }, [id]);

  async function handleUpdateTitle(event) {
    event.preventDefault();
    if (!title.trim()) {
      setError('Tiêu đề không được để trống.');
      return;
    }

    setSaving(true);
    setError('');

    try {
      const response = await postApi.patch(id, { title: title.trim() });
      setPost(response.data);
      setTitle(response.data.title);
    } catch (err) {
      setError(err.userMessage || err.message || 'Không cập nhật được tiêu đề.');
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete() {
    setSaving(true);
    setError('');

    try {
      const response = await postApi.remove(id);
      setShowDelete(false);
      navigate('/posts', {
        state: {
          flash: {
            bg: 'success',
            message: `DELETE /posts/${id} → ${response.status}. Đã xóa bài viết.`,
          },
        },
      });
    } catch (err) {
      setError(err.userMessage || err.message || 'Không xóa được bài viết.');
      setShowDelete(false);
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return <div className="text-center py-5"><Spinner /> Đang tải bài viết...</div>;
  }

  if (error && !post) return <Alert variant="danger">{error}</Alert>;
  if (!post) return <Alert variant="warning">Không tìm thấy bài viết.</Alert>;

  return (
    <>
      <Button as={Link} to="/posts" variant="outline-secondary" className="mb-3">
        ← Danh sách bài viết
      </Button>

      {error && <Alert variant="danger">{error}</Alert>}

      <Card className="mb-4">
        <Card.Header className="d-flex justify-content-between align-items-center">
          <span>Bài viết #{post.id}</span>
          <span>{author ? `${author.name} · ${author.email}` : `User ID: ${post.userId}`}</span>
        </Card.Header>

        <Card.Body>
          <Card.Title as="h1" className="h3 mb-4">{post.title}</Card.Title>
          <Form onSubmit={handleUpdateTitle}>
            <Form.Group className="mb-3">
              <Form.Label>Sửa nhanh tiêu đề (PATCH)</Form.Label>
              <Form.Control
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                required
                minLength={3}
                maxLength={200}
              />
            </Form.Group>

            <Button type="submit" disabled={saving}>
              {saving ? 'Đang lưu...' : 'Lưu tiêu đề'}
            </Button>

            <Button
              as={Link}
              to={`/posts/${id}/edit`}
              variant="outline-primary"
              className="ms-2"
            >
              Sửa toàn bộ (PUT)
            </Button>

            <Button
              variant="danger"
              className="ms-2"
              onClick={() => setShowDelete(true)}
              disabled={saving}
            >
              Xóa bài viết
            </Button>
          </Form>

          <hr />
          <p>{post.body}</p>
        </Card.Body>
      </Card>

      <h3>Bình luận</h3>
      {comments.length === 0 ? (
        <Alert variant="info">Không có bình luận hoặc không tải được bình luận.</Alert>
      ) : (
        <ListGroup>
          {comments.map((comment) => (
            <ListGroup.Item key={comment.id}>
              <strong>{comment.name}</strong>
              <div className="text-muted small">{comment.email}</div>
              <p className="mb-0 mt-2">{comment.body}</p>
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}

      <Modal show={showDelete} onHide={() => setShowDelete(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Xác nhận xóa</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Mày có chắc muốn xóa bài viết #{post.id} không?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDelete(false)}>
            Hủy
          </Button>
          <Button variant="danger" onClick={handleDelete} disabled={saving}>
            {saving ? 'Đang xóa...' : 'Xác nhận xóa'}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
