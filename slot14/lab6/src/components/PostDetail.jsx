
import { useState, useEffect } from 'react';
import postApi, { userApi } from '../api/postApi';

function PostDetail({ postId = 1 }) {
  const [detail, setDetail] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [commentsError, setCommentsError] = useState(null);
  const [timing, setTiming] = useState(null);
  const [method, setMethod] = useState('parallel');

  const loadDetail = async (type = 'parallel') => {
    setLoading(true);
    setError(null);
    setCommentsError(null);
    setTiming(null);
    setDetail(null);
    setMethod(type);

    const start = performance.now();

    try {
      // Bước 1: Luôn lấy bài viết trước để biết userId.
      const postResponse = await postApi.getById(postId);
      const post = postResponse.data;

      let author;
      let comments = [];

      if (type === 'sequential') {
        // Cách 1: Gọi tuần tự.
        const userResponse = await userApi.getById(post.userId);
        author = userResponse.data;

        const commentsResponse = await postApi.getComments(postId);
        comments = commentsResponse.data;
      } else if (type === 'parallel') {
        // Cách 2: Gọi song song bằng Promise.all.
        const [userResponse, commentsResponse] = await Promise.all([
          userApi.getById(post.userId),
          postApi.getComments(postId),
        ]);

        author = userResponse.data;
        comments = commentsResponse.data;
      } else {
        // Cách 3: Promise.allSettled.
        const results = await Promise.allSettled([
          userApi.getById(post.userId),
          postApi.getComments(postId),
        ]);

        if (results[0].status === 'fulfilled') {
          author = results[0].value.data;
        } else {
          throw results[0].reason;
        }

        if (results[1].status === 'fulfilled') {
          comments = results[1].value.data;
        } else {
          setCommentsError(
            results[1].reason.userMessage ||
            results[1].reason.message ||
            'Không tải được bình luận.'
          );
        }
      }

      setDetail({ post, author, comments });
    } catch (err) {
      setError(err.userMessage || err.message || 'Có lỗi xảy ra.');
    } finally {
      setTiming(Math.round(performance.now() - start));
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDetail('parallel');
  }, [postId]);

  return (
    <div>
      <h2>TODO 3 - Nhiều request cùng lúc</h2>

      <div className="d-flex flex-wrap gap-2 mb-3">
        <button
          className="btn btn-secondary"
          disabled={loading}
          onClick={() => loadDetail('sequential')}
        >
          Gọi tuần tự
        </button>

        <button
          className="btn btn-primary"
          disabled={loading}
          onClick={() => loadDetail('parallel')}
        >
          Promise.all
        </button>

        <button
          className="btn btn-success"
          disabled={loading}
          onClick={() => loadDetail('settled')}
        >
          Promise.allSettled
        </button>
      </div>

      {loading && <p>Đang tải dữ liệu...</p>}

      {error && (
        <div className="alert alert-danger">
          Lỗi: {error}
        </div>
      )}

      {timing !== null && !loading && (
        <p>
          <strong>Phương thức:</strong> {method}
          {' — '}
          <strong>Thời gian:</strong> {timing} ms
        </p>
      )}

      {detail && (
        <>
          <hr />

          <h3>{detail.post.title}</h3>
          <p>{detail.post.body}</p>

          <h4>Thông tin tác giả</h4>
          <p><strong>Tên:</strong> {detail.author.name}</p>
          <p><strong>Email:</strong> {detail.author.email}</p>

          <h4>Bình luận ({detail.comments.length})</h4>

          {commentsError && (
            <div className="alert alert-warning">
              Không tải được bình luận: {commentsError}
              <br />
              Bài viết và tác giả vẫn được hiển thị.
            </div>
          )}

          {!commentsError && detail.comments.length === 0 && (
            <p>Không có bình luận.</p>
          )}

          <ul className="list-group">
            {detail.comments.map((comment) => (
              <li
                key={comment.id}
                className="list-group-item text-start"
              >
                <strong>{comment.name}</strong>
                <p className="mb-1">{comment.body}</p>
                <small>{comment.email}</small>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

export default PostDetail;
