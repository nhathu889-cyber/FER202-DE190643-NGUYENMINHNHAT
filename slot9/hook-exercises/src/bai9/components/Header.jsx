import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';

import { useTheme } from '../context/useTheme';
import { useAuth } from '../context/useAuth';

const Header = () => {
  const {
    theme,
    toggleTheme,
  } = useTheme();

  const {
    user,
    isLoggedIn,
    logout,
  } = useAuth();

  return (
    <Navbar
      bg={theme === 'dark' ? 'dark' : 'light'}
      data-bs-theme={theme}
      className="mb-4"
    >
      <Container>
        <Navbar.Brand>
          Hook Context Demo
        </Navbar.Brand>

        <div className="d-flex align-items-center gap-2">
          {isLoggedIn ? (
            <>
              <span>
                Xin chào, {user.name}
              </span>

              <Button
                variant={
                  theme === 'dark'
                    ? 'outline-light'
                    : 'outline-dark'
                }
                size="sm"
                onClick={logout}
              >
                Đăng xuất
              </Button>
            </>
          ) : (
            <span>Chưa đăng nhập</span>
          )}

          <Button
            variant={
              theme === 'dark'
                ? 'outline-light'
                : 'outline-dark'
            }
            size="sm"
            onClick={toggleTheme}
          >
            {theme === 'light'
              ? '🌙 Tối'
              : '☀️ Sáng'}
          </Button>
        </div>
      </Container>
    </Navbar>
  );
};

export default Header;