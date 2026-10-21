
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
        { title, body, userId: 1 }
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
      <h2>POST – Tạo bài viết</h2>

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Title</label>
          <input
            className="form-control"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Body</label>
          <textarea
            className="form-control"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            required
          />
        </div>

        <button className="btn btn-primary" disabled={submitting}>
          {submitting ? 'Đang gửi...' : 'Tạo bài viết'}
        </button>
      </form>

      {error && <p className="text-danger mt-3">Error: {error}</p>}

      {result && (
        <div className="mt-3">
          <p>Status: {result.status}</p>
          <pre>{JSON.stringify(result.data, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default CreatePost;

