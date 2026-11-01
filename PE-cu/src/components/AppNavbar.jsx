import { Badge, Button, Container, Nav, Navbar } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function AppNavbar() {
  const { isAuthenticated, user, logoutUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutUser();
    navigate('/login');
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">
          Hotel Manager
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="hotel-navbar" />
        <Navbar.Collapse id="hotel-navbar" className="justify-content-end">
          <Nav className="align-items-center gap-3 me-2">
            {isAuthenticated && user && (
              <>
                <span className="text-white fw-bold">{user.email}</span>
                <Badge bg="info">{user.role}</Badge>
                <Button variant="outline-light" size="sm" onClick={handleLogout}>
                  Logout
                </Button>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default AppNavbar;
