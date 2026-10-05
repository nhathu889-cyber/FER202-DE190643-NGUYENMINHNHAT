import { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  function login(username, password) {
    // Tài khoản minh họa cho bài học, chỉ chạy trong trình duyệt.
    if (username === 'admin' && password === '123456') {
      setUser({ username });
      return true;
    }
    return false;
  }

  function logout() {
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: user !== null, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === null) {
    throw new Error('useAuth phải được dùng bên trong <AuthProvider>');
  }
  return context;
}
