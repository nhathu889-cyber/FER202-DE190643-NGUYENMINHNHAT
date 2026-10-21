
import { useState } from 'react';
import axios from 'axios';

function PatchPost() {
  const [title, setTitle] = useState('');
  const [saving, setSaving] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handlePatch = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    setResult(null);

    try {
      const response = await axios.patch(
        'https://jsonplaceholder.typicode.com/posts/1',
        { title }
      );

      setResult({
        status: response.status,
        data: response.data,
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <h2>PATCH – Cập nhật tiêu đề bài viết #1</h2>

      <form onSubmit={handlePatch}>
        <div className="mb-3">
          <label className="form-label">Title mới</label>
          <input
            className="form-control"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <button
          className="btn btn-primary"
          disabled={saving || !title.trim()}
        >
          {saving ? 'Đang lưu...' : 'Cập nhật (PATCH)'}
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

export default PatchPost;
