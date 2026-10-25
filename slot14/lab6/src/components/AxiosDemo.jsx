
import { useState, useEffect } from 'react';
import axios from 'axios';
import postApi from '../api/postApi';

import PostCard from './common/PostCard';
import LoadingSpinner from './common/LoadingSpinner';
import ErrorAlert from './common/ErrorAlert';

export default function AxiosDemo() {
  const [postId, setPostId] = useState(1);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [meta, setMeta] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    async function fetchPost() {
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
        if (
          axios.isCancel(err) ||
          err.code === 'ERR_CANCELED' ||
          controller.signal.aborted
        ) {
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
    }

    fetchPost();

    return () => controller.abort();
  }, [postId]);

  const handleIdChange = (event) => {
    const value = event.target.value;

    if (value === '') {
      setPostId('');
      return;
    }

    const number = Number(value);

    if (
      Number.isInteger(number) &&
      number >= 1 &&
      number <= 100
    ) {
      setPostId(number);
    }
  };

  return (
    <section className="container my-4">
      <h2 className="mb-3">
        TODO 4–5: Axios và React-Bootstrap
      </h2>

      <div className="mb-3">
        <label htmlFor="postId" className="form-label">
          Chọn Post ID (1–100)
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

        <div className="form-text">
          Chọn ID để tải bài viết tương ứng.
        </div>
      </div>

      {loading && (
        <LoadingSpinner text="Đang tải bài viết..." />
      )}

      {!loading && (
        <ErrorAlert
          message={error}
          onRetry={() => {
            setPostId((current) => current);
            setError(null);
            setLoading(true);
          }}
        />
      )}

      {!loading && !error && data && (
        <PostCard post={data} meta={meta} />
      )}
    </section>
  );
}
