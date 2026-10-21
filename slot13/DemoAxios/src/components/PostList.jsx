
import { useState, useEffect } from 'react';
import axios from 'axios';

function PostList() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get('https://jsonplaceholder.typicode.com/posts', {
        params: {
          userId: 1,
          _limit: 5,
        },
      })
      .then((response) => setPosts(response.data))
      .catch((error) => setError(error.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h2>GET – Danh sách 5 bài viết</h2>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            #{post.id} – {post.title}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PostList;
