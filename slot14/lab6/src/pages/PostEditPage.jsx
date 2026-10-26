
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Alert, Button, Card, Form, Spinner } from 'react-bootstrap';
import postApi from '../api/postApi';

export default function PostEditPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [userId, setUserId] = useState('1');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const controller = new AbortController();
    let active = true;

    async function loadPost() {
      try {
        const response = await postApi.getById(id, controller.signal);

        if (active) {
          setTitle(response.data.title || '');
          setBody(response.data.body || '');
          setUserId(String(response.data.userId || 1));
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

  async function handleSubmit(event) {
    event.preventDefault();
    setError('');

    if (title.trim().length < 3 || body.trim().length < 5) {
      setError('Tiêu đề cần ít nhất 3 ký tự, nội dung ít nhất 5 ký tự.');
      return;
    }

    setSubmitting(true);

    try {
      const response = await postApi.update(id, {
        id: Number(id),
        title: title.trim(),
        body: body.trim(),
        userId: Number(userId),
      });

      navigate(`/posts/${id}`, {
        state: {
          flash: {
            bg: 'success',
            message: `PUT /posts/${id} → ${response.status}. Đã cập nhật toàn bộ bài viết.`,
          },
        },
      });
    } catch (err) {
      setError(err.userMessage || err.message || 'Cập nhật thất bại.');
    } finally {
      setSubmitting(false);
    }
  }

  if (loading) return <div className="text-center py-5"><Spinner /> Đang tải...</div>;

  return (
    <Card>
      <Card.Header as="h2">Sửa bài viết #{id} (PUT)</Card.Header>
      <Card.Body>
        {error && <Alert variant="danger">{error}</Alert>}

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Tiêu đề</Form.Label>
            <Form.Control
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              minLength={3}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Nội dung</Form.Label>
            <Form.Control
              as="textarea"
              rows={5}
              value={body}
              onChange={(event) => setBody(event.target.value)}
              minLength={5}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>User ID</Form.Label>
            <Form.Control
              type="number"
              min={1}
              value={userId}
              onChange={(event) => setUserId(event.target.value)}
              required
            />
          </Form.Group>

          <Button type="submit" disabled={submitting}>
            {submitting ? 'Đang lưu...' : 'Lưu thay đổi'}
          </Button>

          <Button
            variant="secondary"
            className="ms-2"
            onClick={() => navigate(`/posts/${id}`)}
          >
            Hủy
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
}
