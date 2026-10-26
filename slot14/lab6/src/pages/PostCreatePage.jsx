
import { useState } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { Alert, Button, Card, Form } from 'react-bootstrap';
import postApi from '../api/postApi';

export default function PostCreatePage() {
  const navigate = useNavigate();
  const { notify } = useOutletContext();

  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [userId, setUserId] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [attempted, setAttempted] = useState(false);

  const titleInvalid = title.trim().length < 3;
  const bodyInvalid = body.trim().length < 5;
  const userIdInvalid = !Number.isInteger(Number(userId)) || Number(userId) < 1;

  async function handleSubmit(event) {
    event.preventDefault();
    setAttempted(true);
    setError('');

    if (titleInvalid || bodyInvalid || userIdInvalid) {
      setError('Vui lòng kiểm tra các trường được đánh dấu đỏ.');
      return;
    }

    setSubmitting(true);

    try {
      const response = await postApi.create({
        title: title.trim(),
        body: body.trim(),
        userId: Number(userId),
      });

      navigate('/posts', {
        state: {
          flash: {
            bg: 'success',
            message: `POST /posts → ${response.status}. Đã tạo bài viết #${response.data.id}.`,
          },
        },
      });
    } catch (err) {
      const message = err.userMessage || err.message || 'Tạo bài viết thất bại.';
      setError(message);
      notify?.('danger', message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Card>
      <Card.Header as="h2">Tạo bài viết mới (POST)</Card.Header>
      <Card.Body>
        {error && <Alert variant="danger">{error}</Alert>}

        <Form onSubmit={handleSubmit} noValidate>
          <Form.Group className="mb-3">
            <Form.Label>Tiêu đề</Form.Label>
            <Form.Control
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              minLength={3}
              maxLength={200}
              required
              isInvalid={attempted && titleInvalid}
            />
            <Form.Control.Feedback type="invalid">Tiêu đề cần ít nhất 3 ký tự.</Form.Control.Feedback>
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
              isInvalid={attempted && bodyInvalid}
            />
            <Form.Control.Feedback type="invalid">Nội dung cần ít nhất 5 ký tự.</Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>User ID</Form.Label>
            <Form.Control
              type="number"
              min={1}
              value={userId}
              onChange={(event) => setUserId(event.target.value)}
              required
              isInvalid={attempted && userIdInvalid}
            />
            <Form.Control.Feedback type="invalid">User ID phải là số nguyên lớn hơn hoặc bằng 1.</Form.Control.Feedback>
          </Form.Group>

          <Button type="submit" disabled={submitting}>
            {submitting ? 'Đang tạo...' : 'Tạo bài viết'}
          </Button>

          <Button
            variant="secondary"
            className="ms-2"
            onClick={() => navigate('/posts')}
          >
            Hủy
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
}
