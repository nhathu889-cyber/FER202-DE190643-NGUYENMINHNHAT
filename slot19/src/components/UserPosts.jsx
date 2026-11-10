import { Alert, Card, Spinner } from 'react-bootstrap';
import { useSelector } from 'react-redux';

export default function UserPosts() {
  const {
    selectedId,
    posts,
    postsLoading,
    postsError,
    items,
  } = useSelector((state) => state.users);
  const user = items.find((item) => item.id === selectedId);

  if (!selectedId) {
    return (
      <div className="posts-placeholder">
        <span aria-hidden="true">↖</span>
        <p>Chọn một người dùng để xem bài viết.</p>
      </div>
    );
  }

  return (
    <section aria-live="polite">
      <header className="posts-heading">
        <div>
          <span className="todo-kicker">BÀI VIẾT</span>
          <h3>{user ? `Bài viết của ${user.name}` : 'Bài viết người dùng'}</h3>
        </div>
        {!postsLoading && !postsError && (
          <span className="posts-count">{posts.length} bài</span>
        )}
      </header>

      {postsLoading ? (
        <div className="posts-loading" role="status">
          <Spinner animation="border" size="sm" />
          <span>Đang tải bài viết...</span>
        </div>
      ) : postsError ? (
        <Alert variant="danger" className="mb-0">
          Không thể tải bài viết: {postsError}
        </Alert>
      ) : posts.length === 0 ? (
        <p className="users-empty">Người dùng này chưa có bài viết.</p>
      ) : (
        <div className="posts-list">
          {posts.map((post) => (
            <Card key={post.id} className="post-card">
              <Card.Body>
                <Card.Title className="post-title">{post.title}</Card.Title>
                <Card.Text className="post-body">{post.body}</Card.Text>
              </Card.Body>
            </Card>
          ))}
        </div>
      )}
    </section>
  );
}
