
import { useState, useEffect } from 'react';
import axios from 'axios';
import postApi from '../api/postApi';

function AxiosDemo() {
  const [postId, setPostId] = useState(1);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [meta, setMeta] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    const fetchPost = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await postApi.getById(
          postId,
          controller.signal
        );

        setData(response.data);
        setMeta({
          status: response.status,
          duration: response.duration,
        });
      } catch (err) {
        if (axios.isCancel(err)) {
          return;
        }

        setData(null);
        setMeta(null);
        setError(
          err.userMessage ||
          err.message ||
          'Không thể tải bài viết.'
        );
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    fetchPost();

    return () => {
      controller.abort();
    };
  }, [postId]);

  const handleIdChange = (event) => {
    const value = Number(event.target.value);

    if (event.target.value === '') {
      setPostId('');
      return;
    }

    if (Number.isInteger(value) && value >= 1 && value <= 100) {
      setPostId(value);
    }
  };

  return (
    <section className="my-4">
      <h2>TODO 4 - Chọn ID và hủy request</h2>

      <div className="mb-3">
        <label htmlFor="postId" className="form-label">
          Post ID (1–100)
        </label>

        <input
          id="postId"
          type="number"
          min="1"
          max="100"
          className="form-control"
          value={postId}
          onChange={handleIdChange}
        />
      </div>

      {loading && (
        <p className="text-primary">Đang tải bài viết...</p>
      )}

      {error && (
        <div className="alert alert-danger">
          {error}
        </div>
      )}

      {!loading && data && (
        <div className="card">
          <div className="card-header">
            Bài viết #{data.id}
          </div>

          <div className="card-body">
            <h3 className="card-title">{data.title}</h3>
            <p className="card-text">{data.body}</p>

            {meta && (
              <p className="text-muted mb-0">
                HTTP {meta.status}
                {meta.duration != null
                  ? ` · ${meta.duration} ms`
                  : ''}
              </p>
            )}
          </div>
        </div>
      )}
    </section>
  );
}

export default AxiosDemo;
