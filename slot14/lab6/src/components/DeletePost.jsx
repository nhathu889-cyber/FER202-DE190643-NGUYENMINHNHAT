
import { useState, useEffect } from 'react';
import axios from 'axios';

const API = 'https://jsonplaceholder.typicode.com/posts';

function DeletePost() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);
  const [message, setMessage] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(API, {
          params: { _limit: 5 },
        });
        setPosts(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm(`Xóa bài viết #${id}?`)) return;

    setDeletingId(id);
    setError(null);
    setMessage('');

    try {
      const response = await axios.delete(`${API}/${id}`);

      setPosts((prev) =>
        prev.filter((post) => post.id !== id)
      );

      setMessage(`Đã xóa bài #${id} – Status: ${response.status}`);
    } catch (err) {
      setError(err.message);
    } finally {
      setDeletingId(null);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h2>DELETE – Xóa bài viết</h2>

      {error && <p className="text-danger">Error: {error}</p>}
      {message && <p className="text-success">{message}</p>}

      <ul className="list-group">
        {posts.map((post) => (
          <li
            key={post.id}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            <span>#{post.id} – {post.title}</span>

            <button
              type="button"
              className="btn btn-danger btn-sm"
              disabled={deletingId !== null}
              onClick={() => handleDelete(post.id)}
            >
              {deletingId === post.id ? 'Đang xóa...' : 'Delete'}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default DeletePost;
