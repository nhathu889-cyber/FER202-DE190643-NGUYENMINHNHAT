
import { useState } from 'react';
import axiosClient from '../api/axiosClient';

function RequestConfig() {
  const [posts, setPosts] = useState([]);
  const [status, setStatus] = useState(null);
  const [contentType, setContentType] = useState('');
  const [totalCount, setTotalCount] = useState('');
  const [duration, setDuration] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleRequest = async () => {
    setLoading(true);
    setError(null);
    setPosts([]);
    setStatus(null);
    setContentType('');
    setTotalCount('');
    setDuration(null);

    try {
      const response = await axiosClient({
        method: 'get',
        url: '/posts',
        params: {
          _page: 1,
          _limit: 3,
        },
        headers: {
          Accept: 'application/json',
          'X-Client': 'FER202',
        },
        timeout: 5000,
      });

      setPosts(response.data);
      setStatus(response.status);
      setContentType(response.headers['content-type'] || '');
      setTotalCount(response.headers['x-total-count'] || '');
      setDuration(response.duration);
    } catch (err) {
      setError(err.userMessage || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>RequestConfig – Cấu hình Axios</h2>

      <p>GET 3 bài viết với params, headers và timeout.</p>

      <button
        type="button"
        className="btn btn-primary"
        onClick={handleRequest}
        disabled={loading}
      >
        {loading ? 'Đang tải...' : 'Gửi Request'}
      </button>

      {error && (
        <div className="alert alert-danger mt-3">
          {error}
        </div>
      )}

      {status !== null && (
        <div className="mt-3">
          <div className="alert alert-success">
            Request thành công!
          </div>

          <p><strong>Status:</strong> {status}</p>
          <p><strong>Duration:</strong> {duration} ms</p>
          <p><strong>Content-Type:</strong> {contentType}</p>
          <p><strong>X-Total-Count:</strong> {totalCount || 'Không có'}</p>

          <h4>Dữ liệu trả về:</h4>

          <pre className="bg-light border rounded p-3 text-start">
            {JSON.stringify(posts, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}

export default RequestConfig;
