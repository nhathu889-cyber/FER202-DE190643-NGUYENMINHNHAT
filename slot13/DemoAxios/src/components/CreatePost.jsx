
import { useState } from 'react';
import axios from 'axios';

function CreatePost() {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setSubmitting(true);
    setResult(null);
    setError(null);

    try {
      const response = await axios.post(
        'https://jsonplaceholder.typicode.com/posts',
        {
          title,
          body,
          userId: 1,
        }
      );

      setResult({
        status: response.status,
        data: response.data,
      });

      setTitle('');
      setBody('');
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <h2>POST – Tạo bài viết mới</h2>

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="post-title" className="form-label">
            Title
          </label>
          <input
            id="post-title"
            type="text"
            className="form-control"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Nhập tiêu đề"
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="post-body" className="form-label">
            Body
          </label>
          <textarea
            id="post-body"
            className="form-control"
            rows="4"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder="Nhập nội dung bài viết"
            required
          />
        </div>

        <button
          type="submit"
          className="btn btn-primary"
          disabled={submitting}
        >
          {submitting ? 'Đang gửi...' : 'Tạo bài viết'}
        </button>
      </form>

      {error && (
        <div className="alert alert-danger mt-3">
          Error: {error}
        </div>
      )}

      {result && (
        <div className="mt-3">
          <div className="alert alert-success">
            Tạo bài viết thành công!
          </div>

          <p>Status: {result.status}</p>

          <pre className="bg-light p-3 border rounded">
            {JSON.stringify(result.data, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}

export default CreatePost;
