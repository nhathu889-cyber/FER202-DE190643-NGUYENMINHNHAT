import { useAuth } from "../contexts/AuthContext";

export default function Dashboard() {
  const { user, logout } = useAuth();

  return (
    <div>
      <h2>Xin chào, {user.username}</h2>
      <button onClick={logout}>Đăng xuất</button>
    </div>
  );
}