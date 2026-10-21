
import { useState } from 'react';
import axios from 'axios';

function PatchPost() {
  const [title, setTitle] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setSubmitting(true);
    setResult(null);
    setError(null);

    try {
      const response = await axios.patch(
        'https://jsonplaceholder.typicode.com/posts/1',
        {
          title: title,
        }
      );

      setResult({
        status: response.status,
        data: response.data,
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <h2>PATCH – Cập nhật một phần bài viết</h2>

      <p>Chỉ cập nhật Title của bài viết có ID = 1</p>

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="patch-title" className="form-label">
            Title mới
          </label>

          <input
            id="patch-title"
            type="text"
            className="form-control"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Nhập tiêu đề mới"
            required
          />
        </div>

        <button
          type="submit"
          className="btn btn-primary"
          disabled={submitting}
        >
          {submitting ? 'Đang cập nhật...' : 'PATCH bài viết'}
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
            PATCH thành công!
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

export default PatchPost;
