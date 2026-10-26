
import {
  Container,
  Nav,
  Navbar as BootstrapNavbar,
} from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

export default function Navbar() {
  return (
    <BootstrapNavbar bg="dark" variant="dark" expand="lg">
      <Container>
        <BootstrapNavbar.Brand as={NavLink} to="/">
          Lab 6 - Axios Advanced
        </BootstrapNavbar.Brand>

        <BootstrapNavbar.Toggle aria-controls="main-navbar" />

        <BootstrapNavbar.Collapse id="main-navbar">
          <Nav className="me-auto">
            <Nav.Link as={NavLink} to="/" end>
              Axios Demo
            </Nav.Link>

            <Nav.Link as={NavLink} to="/http">
              HTTP Requests
            </Nav.Link>

            <Nav.Link as={NavLink} to="/posts" end>
              Danh sách bài viết
            </Nav.Link>

            <Nav.Link as={NavLink} to="/posts/new">
              Tạo bài viết
            </Nav.Link>
          </Nav>
        </BootstrapNavbar.Collapse>
      </Container>
    </BootstrapNavbar>
  );
}

