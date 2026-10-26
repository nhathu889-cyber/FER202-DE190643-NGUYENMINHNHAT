
import { useCallback, useEffect, useState } from 'react';
import { Container, Toast, ToastContainer } from 'react-bootstrap';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import Navbar from './Navbar';

export default function MainLayout() {
  const location = useLocation();
  const navigate = useNavigate();

  const [toast, setToast] = useState({
    show: false,
    message: '',
    variant: 'success',
  });

  const notify = useCallback((variant, message) => {
    setToast({
      show: true,
      message,
      variant,
    });
  }, []);

  useEffect(() => {
    const flash = location.state?.flash;

    if (flash?.message) {
      notify(flash.bg || flash.variant || 'success', flash.message);
      navigate(`${location.pathname}${location.search}`, { replace: true, state: null });
    }
  }, [location, navigate, notify]);

  return (
    <>
      <Navbar />

      <Container className="py-4">
        <Outlet context={{ notify }} />
      </Container>

      <ToastContainer position="bottom-end" className="p-3">
        <Toast
          bg={toast.variant}
          show={toast.show}
          onClose={() =>
            setToast((current) => ({ ...current, show: false }))
          }
          delay={3500}
          autohide
        >
          <Toast.Header>
            <strong className="me-auto">Thông báo</strong>
          </Toast.Header>

          <Toast.Body
            className={
              ['success', 'danger', 'dark'].includes(toast.variant)
                ? 'text-white'
                : ''
            }
          >
            {toast.message}
          </Toast.Body>
        </Toast>
      </ToastContainer>
    </>
  );
}

