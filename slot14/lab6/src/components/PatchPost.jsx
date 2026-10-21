
import { useState } from 'react';
import postApi from '../api/postApi';

function PatchPost() {
  const [title, setTitle] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [saving, setSaving] = useState(false);

  const handlePatch = async () => {
    setSaving(true);
    setError(null);
    setResult(null);

    try {
      const response = await postApi.patch(1, { title });

      setResult({
        status: response.status,
        data: response.data,
      });
    } catch (err) {
      setError(err.userMessage || err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <h2>PATCH – Sửa tiêu đề bài viết #1</h2>

      <input
        className="form-control mb-3"
        placeholder="Tiêu đề mới"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <button
        className="btn btn-primary"
        onClick={handlePatch}
        disabled={!title.trim() || saving}
      >
        {saving ? 'Đang lưu...' : 'Cập nhật (PATCH)'}
      </button>

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

export default PatchPost;
