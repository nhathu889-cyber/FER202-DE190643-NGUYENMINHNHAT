
import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';

export default function PostForm({ onSubmit }) {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    const newErrors = {};

    if (!title.trim()) {
      newErrors.title = 'Vui lòng nhập tiêu đề.';
    } else if (title.trim().length < 3) {
      newErrors.title = 'Tiêu đề phải có ít nhất 3 ký tự.';
    }

    if (!body.trim()) {
      newErrors.body = 'Vui lòng nhập nội dung bài viết.';
    } else if (body.trim().length < 10) {
      newErrors.body = 'Nội dung phải có ít nhất 10 ký tự.';
    }

    setErrors(newErrors);
    setMessage('');

    if (Object.keys(newErrors).length > 0) {
      return;
    }

    const post = {
      title: title.trim(),
      body: body.trim(),
      userId: 1,
    };

    if (onSubmit) {
      onSubmit(post);
    } else {
      setMessage('Dữ liệu hợp lệ! Form đã sẵn sàng gửi.');
    }
  };

  return (
    <div className="my-4">
      <h3>Tạo bài viết mới</h3>

      <Form onSubmit={handleSubmit} noValidate>
        <Form.Group className="mb-3" controlId="postTitle">
          <Form.Label>Tiêu đề</Form.Label>
          <Form.Control
            type="text"
            value={title}
            isInvalid={Boolean(errors.title)}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="Nhập tiêu đề bài viết"
          />
          <Form.Control.Feedback type="invalid">
            {errors.title}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="postBody">
          <Form.Label>Nội dung</Form.Label>
          <Form.Control
            as="textarea"
            rows={4}
            value={body}
            isInvalid={Boolean(errors.body)}
            onChange={(event) => setBody(event.target.value)}
            placeholder="Nhập nội dung bài viết"
          />
          <Form.Control.Feedback type="invalid">
            {errors.body}
          </Form.Control.Feedback>
        </Form.Group>

        {message && (
          <Alert variant="success">{message}</Alert>
        )}

        <Button type="submit" variant="primary">
          Kiểm tra dữ liệu
        </Button>
      </Form>
    </div>
  );
}
