import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import LoginForm from './components/LoginForm';

const Bai8 = () => {
  return (
    <>
      <h2 className="mb-4">
        Bài 8 - Form đăng nhập với useReducer
      </h2>

      <Row className="justify-content-center">
        <Col md={6}>
          <LoginForm />
        </Col>
      </Row>
    </>
  );
};

export default Bai8;