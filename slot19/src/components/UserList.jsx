import { useEffect } from 'react';
import { Alert, Button, ListGroup, Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchPostsByUser,
  fetchUsers,
} from '../redux/users/userActions.js';

export default function UserList() {
  const { items, loading, error, selectedId } = useSelector((state) => state.users);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="users-loading" role="status">
        <Spinner animation="border" size="sm" />
        <span>Đang tải danh sách người dùng...</span>
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="danger" className="mb-0">
        <p className="mb-2">Không thể tải người dùng: {error}</p>
        <Button size="sm" variant="outline-danger" onClick={() => dispatch(fetchUsers())}>
          Thử lại
        </Button>
      </Alert>
    );
  }

  if (items.length === 0) {
    return <p className="users-empty">API chưa trả về người dùng nào.</p>;
  }

  return (
    <ListGroup className="user-list">
      {items.map((user) => (
        <ListGroup.Item
          key={user.id}
          action
          active={user.id === selectedId}
          onClick={() => dispatch(fetchPostsByUser(user.id))}
        >
          <span className="user-avatar" aria-hidden="true">
            {user.name.charAt(0)}
          </span>
          <span className="user-information">
            <span className="user-name">{user.name}</span>
            <span className="user-meta">
              {user.email} · {user.company.name}
            </span>
          </span>
          <span className="user-chevron" aria-hidden="true">›</span>
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
}
