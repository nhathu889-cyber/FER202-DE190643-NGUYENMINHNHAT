
import { useState, useEffect } from 'react';
import postApi from '../api/postApi';

function DeletePost() {
  const [posts, setPosts] = useState([]);
  const [message, setMessage] = useState('');
  const [error, setError] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await postApi.getAll({ _limit: 5 });
        setPosts(response.data);
      } catch (err) {
        setError(err.userMessage || err.message);
      }
    };

    fetchPosts();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm(`Xóa bài viết #${id}?`)) return;

    setDeletingId(id);
    setError(null);

    try {
      const response = await postApi.remove(id);

      setPosts((prev) => prev.filter((p) => p.id !== id));
      setMessage(`Đã xóa bài #${id} – Status: ${response.status}`);
    } catch (err) {
      setError(err.userMessage || err.message);
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div>
      <h2>DELETE – Xóa bài viết</h2>

      {message && <p className="text-success">{message}</p>}
      {error && <p className="text-danger">Error: {error}</p>}

      <ul className="list-group">
        {posts.map((post) => (
          <li
            key={post.id}
            className="list-group-item d-flex justify-content-between align-items-center text-start"
          >
            <span>#{post.id} – {post.title}</span>

            <button
              className="btn btn-danger btn-sm ms-3"
              onClick={() => handleDelete(post.id)}
              disabled={deletingId !== null}
            >
              {deletingId === post.id ? 'Đang xóa...' : 'Xóa'}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default DeletePost;
