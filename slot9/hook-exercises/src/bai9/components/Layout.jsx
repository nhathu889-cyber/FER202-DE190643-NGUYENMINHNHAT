import Container from 'react-bootstrap/Container';

import Header from './Header';
import { useTheme } from '../context/ThemeContext';

const Layout = ({ children }) => {
  const { theme } = useTheme();

  return (
    <div
      data-bs-theme={theme}
      className="bg-body text-body min-vh-100"
    >
      <Header />

      <Container className="pb-4">
        {children}
      </Container>
    </div>
  );
};

export default Layout;