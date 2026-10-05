import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (login(form.username, form.password)) {
      navigate("/dashboard");
    } else {
      setError("Sai tài khoản hoặc mật khẩu");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <p>Tài khoản demo: admin / 123456</p>
      <input
        placeholder="Username"
        value={form.username}
        onChange={(e) =>
          setForm({
            ...form,
            username: e.target.value,
          })
        }
      />

      <input
        type="password"
        placeholder="Password"
        value={form.password}
        onChange={(e) =>
          setForm({
            ...form,
            password: e.target.value,
          })
        }
      />

      <button type="submit">
        Đăng nhập
      </button>

      {error && (
        <p style={{ color: "red" }}>
          {error}
        </p>
      )}
    </form>
  );
}
