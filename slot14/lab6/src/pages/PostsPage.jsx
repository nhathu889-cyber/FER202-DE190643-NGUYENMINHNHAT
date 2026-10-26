import { useEffect, useState } from 'react';
import {
  Alert, Button, Card, Col, Form, Pagination, Row, Spinner,
} from 'react-bootstrap';
import { Link, useSearchParams } from 'react-router-dom';
import postApi, { userApi } from '../api/postApi';

const PAGE_SIZE = 5;

export default function PostsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const rawPage = Number(searchParams.get('page') || 1);
  const page = Number.isInteger(rawPage) && rawPage > 0 ? rawPage : 1;
  const userId = searchParams.get('userId') || '';
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [retry, setRetry] = useState(0);

  const changeQuery = (changes) => {
    const next = new URLSearchParams(searchParams);
    Object.entries(changes).forEach(([key, value]) => {
      if (value === '' || value == null) next.delete(key);
      else next.set(key, String(value));
    });
    setSearchParams(next);
  };

  useEffect(() => {
    const controller = new AbortController();

    async function loadUsers() {
      try {
        const response = await userApi.getAll(controller.signal);
        if (!controller.signal.aborted) setUsers(response.data);
      } catch {
        // Keep the author filter usable with its "all authors" option.
      }
    }

    loadUsers();
    return () => controller.abort();
  }, []);

  useEffect(() => {
    const controller = new AbortController();

    async function loadPosts() {
      setLoading(true);
      setError('');
      try {
        const params = { _page: page, _limit: PAGE_SIZE };
        if (userId) params.userId = userId;
        const response = await postApi.getAll(params, controller.signal);
        if (controller.signal.aborted) return;

        setPosts(response.data);
        const totalCount = Number(response.headers['x-total-count']);
        setTotalPages(Number.isFinite(totalCount) && totalCount >= 0
          ? Math.max(1, Math.ceil(totalCount / PAGE_SIZE))
          : 1);
      } catch (err) {
        if (!controller.signal.aborted) {
          setError(err.userMessage || err.message || 'Không tải được danh sách bài viết.');
        }
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }

    loadPosts();
    return () => controller.abort();
  }, [page, userId, retry]);

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Danh sách bài viết</h2>
        <Button as={Link} to="/posts/new" variant="primary">Tạo bài viết</Button>
      </div>

      <Form.Group className="mb-3" controlId="author-filter">
        <Form.Label>Lọc theo tác giả</Form.Label>
        <Form.Select
          value={userId}
          onChange={(event) => changeQuery({ userId: event.target.value, page: 1 })}
        >
          <option value="">Tất cả tác giả</option>
          {users.map((user) => <option key={user.id} value={user.id}>{user.name}</option>)}
        </Form.Select>
      </Form.Group>

      {loading && <div className="text-center py-4"><Spinner animation="border" role="status" /><p className="mt-2">Đang tải bài viết...</p></div>}
      {error && <Alert variant="danger">{error}<div><Button className="mt-2" variant="outline-danger" onClick={() => setRetry((value) => value + 1)}>Thử lại</Button></div></Alert>}
      {!loading && !error && posts.length === 0 && <Alert variant="info">Không có bài viết trong trang này.</Alert>}

      {!loading && !error && posts.length > 0 && (
        <>
          <Row xs={1} md={2} lg={3} className="g-3">
            {posts.map((post) => (
              <Col key={post.id}>
                <Card className="h-100">
                  <Card.Body>
                    <Card.Title>#{post.id} – {post.title}</Card.Title>
                    <Card.Text>{post.body?.length > 140 ? `${post.body.slice(0, 140)}...` : post.body}</Card.Text>
                    <Button as={Link} to={`/posts/${post.id}`} variant="outline-primary">Xem chi tiết</Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>

          <Pagination className="justify-content-center mt-4" aria-label="Phân trang bài viết">
            <Pagination.Prev disabled={page <= 1} onClick={() => changeQuery({ page: page - 1 })} />
            {Array.from({ length: totalPages }, (_, index) => index + 1).map((number) => (
              <Pagination.Item key={number} active={number === page} onClick={() => changeQuery({ page: number })}>
                {number}
              </Pagination.Item>
            ))}
            <Pagination.Next disabled={page >= totalPages} onClick={() => changeQuery({ page: page + 1 })} />
          </Pagination>
        </>
      )}
    </div>
  );
}
