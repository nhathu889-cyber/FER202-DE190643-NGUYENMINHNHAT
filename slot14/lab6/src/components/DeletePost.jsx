
import { useState, useEffect } from 'react';
import postApi from '../api/postApi';

import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import Alert from 'react-bootstrap/Alert';
import Spinner from 'react-bootstrap/Spinner';

import ConfirmModal from './ConfirmModal';
import ToastMessage from './common/ToastMessage';

function DeletePost() {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);
  const [selectedPost, setSelectedPost] = useState(null);

  const [toast, setToast] = useState({
    show: false,
    message: '',
    variant: 'success',
  });

  useEffect(() => {
    const controller = new AbortController();

    const fetchPosts = async () => {
      try {
        const response = await postApi.getAll(
          { _limit: 5 },
          controller.signal
        );

        setPosts(response.data);
      } catch (err) {
        if (
          err.code === 'ERR_CANCELED' ||
          controller.signal.aborted
        ) {
          return;
        }

        setError(err.userMessage || err.message);
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    fetchPosts();

    return () => controller.abort();
  }, []);

  const handleDelete = async () => {
    if (!selectedPost || deletingId !== null) return;

    const id = selectedPost.id;

    setDeletingId(id);
    setError(null);

    try {
      const response = await postApi.remove(id);

      setPosts((previous) =>
        previous.filter((post) => post.id !== id)
      );

      setSelectedPost(null);

      setToast({
        show: true,
        message: `Đã xóa bài viết #${id} – HTTP ${response.status}`,
        variant: 'success',
      });
    } catch (err) {
      setToast({
        show: true,
        message: `Xóa bài viết thất bại: ${
          err.userMessage || err.message
        }`,
        variant: 'danger',
      });
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="my-4">
      <h2>DELETE – Xóa bài viết</h2>

      {loading && (
        <div className="my-3">
          <Spinner animation="border" size="sm" className="me-2" />
          Đang tải danh sách bài viết...
        </div>
      )}

      {error && (
        <Alert variant="danger">
          Lỗi: {error}
        </Alert>
      )}

      {!loading && !error && posts.length === 0 && (
        <Alert variant="info">
          Không còn bài viết nào trong danh sách.
        </Alert>
      )}

      <ListGroup>
        {posts.map((post) => (
          <ListGroup.Item
            key={post.id}
            className="d-flex justify-content-between align-items-center text-start"
          >
            <span>
              #{post.id} – {post.title}
            </span>

            <Button
              variant="danger"
              size="sm"
              className="ms-3"
              onClick={() => setSelectedPost(post)}
              disabled={deletingId !== null}
            >
              Xóa
            </Button>
          </ListGroup.Item>
        ))}
      </ListGroup>

      <ConfirmModal
        show={selectedPost !== null}
        title="Xác nhận xóa bài viết"
        message={
          selectedPost
            ? `Bạn có chắc chắn muốn xóa bài viết #${selectedPost.id}: "${selectedPost.title}"?`
            : ''
        }
        confirmText="Xóa bài viết"
        cancelText="Hủy"
        loading={deletingId !== null}
        onConfirm={handleDelete}
        onCancel={() => setSelectedPost(null)}
      />

      <ToastMessage
        show={toast.show}
        message={toast.message}
        variant={toast.variant}
        onClose={() =>
          setToast((previous) => ({
            ...previous,
            show: false,
          }))
        }
      />
    </div>
  );
}

export default DeletePost;
