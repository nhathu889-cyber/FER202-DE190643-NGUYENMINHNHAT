
import { useState, useEffect } from 'react';
import axios from 'axios';

function RequestConfig() {
  const [info, setInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWithConfig = async () => {
      try {
        const response = await axios({
          method: 'get',
          url: 'https://jsonplaceholder.typicode.com/posts',
          params: { _page: 1, _limit: 3 },
          headers: {
            Accept: 'application/json',
            Authorization: 'Bearer demo-token-123',
          },
          timeout: 5000,
        });

        setInfo({
          status: response.status,
          contentType: response.headers['content-type'],
          total: response.headers['x-total-count'],
          data: response.data,
        });
      } catch (err) {
        if (err.code === 'ECONNABORTED') {
          setError('Request quá thời gian (timeout)');
        } else if (err.response) {
          setError(`Server trả lỗi ${err.response.status}`);
        } else {
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchWithConfig();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h2>RequestConfig – Cấu hình Axios</h2>

      <p>Status: {info?.status}</p>
      <p>Content-Type: {info?.contentType}</p>
      <p>X-Total-Count: {info?.total ?? 'Không có'}</p>

      
<ul className="list-group mt-3">
  {info?.data.map((post) => (
    <li key={post.id} className="list-group-item text-start">
      #{post.id} – {post.title}
    </li>
  ))}
</ul>

    </div>
  );
}

export default RequestConfig;
