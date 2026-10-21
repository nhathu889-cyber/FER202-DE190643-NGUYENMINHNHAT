
import { useState, useEffect } from 'react';
import axios from 'axios';

const URL = 'https://jsonplaceholder.typicode.com/posts/1';

function UpdatePost() {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(URL);
        setPost(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    setResult(null);

    try {
      const response = await axios.put(URL, {
        id: post.id,
        userId: post.userId,
        title: post.title,
        body: post.body,
      });

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

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h2>PUT – Cập nhật bài viết #1</h2>

      {error && <p className="text-danger">Error: {error}</p>}

      {post && (
        <form onSubmit={handleUpdate}>
          <div className="mb-3">
            <label className="form-label">Title</label>
            <input
              className="form-control"
              value={post.title}
              onChange={(e) =>
                setPost({ ...post, title: e.target.value })
              }
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Body</label>
            <textarea
              className="form-control"
              value={post.body}
              onChange={(e) =>
                setPost({ ...post, body: e.target.value })
              }
              required
            />
          </div>

          <button className="btn btn-warning" disabled={saving}>
            {saving ? 'Đang lưu...' : 'Cập nhật (PUT)'}
          </button>
        </form>
      )}

      {result && (
        <div className="mt-3">
          <p>Status: {result.status}</p>
          <pre>{JSON.stringify(result.data, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default UpdatePost;

