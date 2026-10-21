
import { useState, useEffect } from 'react';
import axios from 'axios';

function DeletePost() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    axios
      .get('https://jsonplaceholder.typicode.com/posts', {
        params: {
          _limit: 5,
        },
      })
      .then((response) => {
        setPosts(response.data);
      })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      `Bạn có chắc muốn xóa bài viết #${id}?`
    );

    if (!confirmed) {
      return;
    }

    setDeletingId(id);
    setError(null);
    setMessage('');

    try {
      const response = await axios.delete(
        `https://jsonplaceholder.typicode.com/posts/${id}`
      );

      if (response.status === 200) {
        setPosts((prevPosts) =>
          prevPosts.filter((post) => post.id !== id)
        );

        setMessage(`Đã xóa bài viết #${id}. Status: ${response.status}`);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setDeletingId(null);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h2>DELETE – Xóa bài viết</h2>

      <p>Danh sách 5 bài viết đầu tiên:</p>

      {error && (
        <div className="alert alert-danger">
          Error: {error}
        </div>
      )}

      {message && (
        <div className="alert alert-success">
          {message}
        </div>
      )}

      {posts.length === 0 ? (
        <p>Không còn bài viết nào.</p>
      ) : (
        <ul className="list-group">
          {posts.map((post) => (
            <li
              key={post.id}
              className="list-group-item d-flex justify-content-between align-items-center gap-3"
            >
              <span>
                #{post.id} – {post.title}
              </span>

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
      )}
    </div>
  );
}

export default DeletePost;
