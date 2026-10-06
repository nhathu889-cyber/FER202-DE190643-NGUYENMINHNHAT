import { useReducer } from 'react';

import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import Spinner from 'react-bootstrap/Spinner';

import {
  initialLoginState,
  loginReducer,
  validateLogin,
} from '../reducers/loginReducer';

const fakeLoginApi = (values) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (
        values.email === 'admin@fpt.edu.vn' &&
        values.password === '12345678'
      ) {
        resolve({
          email: values.email,
        });
      } else {
        reject(
          new Error(
            'Email hoặc mật khẩu không đúng'
          )
        );
      }
    }, 1000);
  });
};

const LoginForm = ({ onLoginSuccess }) => {
  const [state, dispatch] = useReducer(
    loginReducer,
    initialLoginState
  );

  const {
    values,
    errors,
    touched,
    status,
    message,
  } = state;

  const isSubmitting = status === 'submitting';

  const handleChange = (event) => {
    const {
      name,
      value,
      type,
      checked,
    } = event.target;

    dispatch({
      type: 'CHANGE_FIELD',
      payload: {
        name,
        value:
          type === 'checkbox'
            ? checked
            : value,
      },
    });
  };

  const handleBlur = (event) => {
    dispatch({
      type: 'BLUR_FIELD',
      payload: event.target.name,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    dispatch({
      type: 'SUBMIT',
    });

    const currentErrors =
      validateLogin(values);

    if (
      Object.keys(currentErrors).length > 0
    ) {
      return;
    }

    try {
      const user = await fakeLoginApi(values);

      dispatch({
        type: 'LOGIN_SUCCESS',
      });

      onLoginSuccess?.(user);
    } catch {
      dispatch({
        type: 'LOGIN_FAILURE',
      });
    }
  };

  if (status === 'success') {
    return (
      <Card>
        <Card.Body>
          <Alert
            variant="success"
            className="mb-3"
          >
            {message}
          </Alert>

          <Button
            onClick={() =>
              dispatch({
                type: 'RESET',
              })
            }
          >
            Đăng nhập lại
          </Button>
        </Card.Body>
      </Card>
    );
  }

  return (
    <Card>
      <Card.Body>
        <Card.Title className="mb-3">
          Đăng nhập
        </Card.Title>

        {status === 'error' && (
          <Alert variant="danger">
            {message}
          </Alert>
        )}

        <Form
          noValidate
          onSubmit={handleSubmit}
        >
          <Form.Group
            className="mb-3"
            controlId="login-email"
          >
            <Form.Label>
              Email
            </Form.Label>

            <Form.Control
              type="email"
              name="email"
              placeholder="admin@fpt.edu.vn"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              disabled={isSubmitting}
              isInvalid={
                touched.email &&
                Boolean(errors.email)
              }
              isValid={
                touched.email &&
                !errors.email
              }
            />

            <Form.Control.Feedback type="invalid">
              {errors.email}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group
            className="mb-3"
            controlId="login-password"
          >
            <Form.Label>
              Mật khẩu
            </Form.Label>

            <Form.Control
              type="password"
              name="password"
              placeholder="Nhập mật khẩu"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              disabled={isSubmitting}
              isInvalid={
                touched.password &&
                Boolean(errors.password)
              }
              isValid={
                touched.password &&
                !errors.password
              }
            />

            <Form.Control.Feedback type="invalid">
              {errors.password}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Check
            className="mb-3"
            type="checkbox"
            id="login-remember"
            name="remember"
            label="Ghi nhớ đăng nhập"
            checked={values.remember}
            onChange={handleChange}
            disabled={isSubmitting}
          />

          <Button
            type="submit"
            className="w-100"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Spinner
                  size="sm"
                  className="me-2"
                />
                Đang đăng nhập...
              </>
            ) : (
              'Đăng nhập'
            )}
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default LoginForm;