
import { useState, useEffect } from 'react';
import axios from 'axios';

function UpdatePost() {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [userId, setUserId] = useState(1);

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get('https://jsonplaceholder.typicode.com/posts/1')
      .then((response) => {
        setTitle(response.data.title);
        setBody(response.data.body);
        setUserId(response.data.userId);
      })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setSubmitting(true);
    setError(null);
    setResult(null);

    try {
      const response = await axios.put(
        'https://jsonplaceholder.typicode.com/posts/1',
        {
          id: 1,
          userId: userId,
          title: title,
          body: body,
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

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h2>PUT – Cập nhật toàn bộ bài viết</h2>

      <p>Đang chỉnh sửa bài viết có ID = 1</p>

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="update-title" className="form-label">
            Title
          </label>

          <input
            id="update-title"
            type="text"
            className="form-control"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Nhập tiêu đề mới"
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="update-body" className="form-label">
            Body
          </label>

          <textarea
            id="update-body"
            className="form-control"
            rows="4"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder="Nhập nội dung mới"
            required
          />
        </div>

        <button
          type="submit"
          className="btn btn-warning"
          disabled={submitting}
        >
          {submitting ? 'Đang cập nhật...' : 'Cập nhật bài viết'}
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
            Cập nhật bài viết thành công!
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

export default UpdatePost;
