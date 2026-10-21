
import { useState } from 'react';
import postApi from '../api/postApi';

function CreatePost() {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    setResult(null);

    try {
      const response = await postApi.create({
        title,
        body,
        userId: 1,
      });

      setResult({
        status: response.status,
        data: response.data,
      });

      setTitle('');
      setBody('');
    } catch (err) {
      setError(err.userMessage || err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <h2>POST – Tạo bài viết</h2>

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <input
            className="form-control"
            placeholder="Tiêu đề bài viết"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <textarea
            className="form-control"
            placeholder="Nội dung bài viết"
            value={body}
            onChange={(e) => setBody(e.target.value)}
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

      {error && <p className="text-danger mt-3">Error: {error}</p>}

      {result && (
        <div className="mt-3">
          <p>Status: {result.status}</p>
          <pre className="text-start">
            {JSON.stringify(result.data, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}

export default CreatePost;
