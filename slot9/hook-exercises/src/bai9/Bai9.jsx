import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Alert from 'react-bootstrap/Alert';

import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import { useAuth } from './context/useAuth';

import Layout from './components/Layout';

import LoginForm from '../bai8/components/LoginForm';

const HomeContent = () => {
  const {
    user,
    isLoggedIn,
    login,
  } = useAuth();

  if (isLoggedIn) {
    return (
      <Alert variant="success">
        Bạn đã đăng nhập với tài khoản{' '}
        <strong>{user.email}</strong>.
      </Alert>
    );
  }

  return (
    <Row className="justify-content-center">
      <Col md={6}>
        <LoginForm
          onLoginSuccess={login}
        />
      </Col>
    </Row>
  );
};

const Bai9 = () => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Layout>
          <h2 className="mb-4">
            Bài 9 - useContext
          </h2>

          <HomeContent />
        </Layout>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default Bai9;