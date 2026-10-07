import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';

import { useTheme } from '../context/useTheme';
import { useAuth } from '../context/useAuth';
import { useCart } from '../context/useCart';

const Header = ({
  currentPage,
  onNavigate,
}) => {
  const {
    theme,
    toggleTheme,
  } = useTheme();

  const {
    user,
    isLoggedIn,
    logout,
  } = useAuth();

  const { totalQuantity } = useCart();

  const menuItems = [
    {
      key: 'shop',
      label: 'Cửa hàng',
    },
    {
      key: 'cart',
      label: 'Giỏ hàng',
    },
    {
      key: 'checkout',
      label: 'Thanh toán',
    },
  ];

  const handleNavigate = (event, page) => {
    event.preventDefault();
    onNavigate(page);
  };

  return (
    <Navbar
      bg={theme === 'dark' ? 'dark' : 'light'}
      data-bs-theme={theme}
      expand="lg"
      className="mb-4"
    >
      <Container>
        <Navbar.Brand
          href="#"
          onClick={(event) =>
            handleNavigate(event, 'shop')
          }
        >
          FPT Shop Mini
        </Navbar.Brand>

        <Navbar.Toggle />

        <Navbar.Collapse>
          <Nav className="me-auto">
            {menuItems.map((item) => (
              <Nav.Link
                key={item.key}
                href="#"
                active={
                  currentPage === item.key
                }
                onClick={(event) =>
                  handleNavigate(
                    event,
                    item.key
                  )
                }
              >
                {item.label}

                {item.key === 'cart' &&
                  totalQuantity > 0 && (
                    <Badge
                      bg="primary"
                      className="ms-1"
                    >
                      {totalQuantity}
                    </Badge>
                  )}
              </Nav.Link>
            ))}
          </Nav>

          <div className="d-flex align-items-center gap-2">
            <Button
              size="sm"
              variant={
                theme === 'dark'
                  ? 'outline-light'
                  : 'outline-dark'
              }
              onClick={toggleTheme}
            >
              {theme === 'light'
                ? '🌙 Tối'
                : '☀️ Sáng'}
            </Button>

            {isLoggedIn ? (
              <>
                <span>
                  Xin chào, {user.name}
                </span>

                <Button
                  size="sm"
                  variant="outline-danger"
                  onClick={logout}
                >
                  Đăng xuất
                </Button>
              </>
            ) : (
              <Button
                size="sm"
                variant="primary"
                onClick={() =>
                  onNavigate('login')
                }
              >
                Đăng nhập
              </Button>
            )}
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;