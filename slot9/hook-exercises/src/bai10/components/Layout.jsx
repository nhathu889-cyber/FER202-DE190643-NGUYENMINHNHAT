import Container from 'react-bootstrap/Container';

import Header from './Header';
import { useTheme } from '../context/ThemeContext';

const Layout = ({
  children,
  currentPage,
  onNavigate,
}) => {
  const { theme } = useTheme();

  return (
    <div
      data-bs-theme={theme}
      className="bg-body text-body min-vh-100"
    >
      <Header
        currentPage={currentPage}
        onNavigate={onNavigate}
      />

      <Container className="pb-5">
        {children}
      </Container>
    </div>
  );
};

export default Layout;