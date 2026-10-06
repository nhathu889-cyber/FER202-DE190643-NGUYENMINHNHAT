import { useState } from 'react';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { ThemeProvider } from './context/ThemeContext';
import {
  AuthProvider,
  useAuth,
} from './context/AuthContext';
import { CartProvider } from './context/CartContext';

import Layout from './components/Layout';

import ShopPage from './pages/ShopPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';

import LoginForm from '../bai8/components/LoginForm';

const AppContent = () => {
  const [page, setPage] =
    useState('shop');

  const {
    login,
    isLoggedIn,
    user,
  } = useAuth();

  const handleLoginSuccess = (
    loginUser
  ) => {
    login(loginUser);
    setPage('shop');
  };

  return (
    <Layout
      currentPage={page}
      onNavigate={setPage}
    >
      {page === 'shop' && (
        <ShopPage />
      )}

      {page === 'cart' && (
        <CartPage
          onNavigate={setPage}
        />
      )}

      {page === 'checkout' && (
        <CheckoutPage
          onNavigate={setPage}
        />
      )}

      {page === 'login' && (
        <>
          <h2 className="mb-4">
            Đăng nhập
          </h2>

          {isLoggedIn ? (
            <div>
              <p>
                Bạn đang đăng nhập với{' '}
                <strong>
                  {user.email}
                </strong>
              </p>
            </div>
          ) : (
            <Row className="justify-content-center">
              <Col md={6}>
                <LoginForm
                  onLoginSuccess={
                    handleLoginSuccess
                  }
                />
              </Col>
            </Row>
          )}
        </>
      )}
    </Layout>
  );
};

const Bai10 = () => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <CartProvider>
          <AppContent />
        </CartProvider>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default Bai10;