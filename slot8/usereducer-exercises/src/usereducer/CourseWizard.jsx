import { useReducer } from 'react';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Nav from 'react-bootstrap/Nav';
import Alert from 'react-bootstrap/Alert';
import ListGroup from 'react-bootstrap/ListGroup';

import {
  COURSES,
  SCHEDULES,
  STEPS,
  wizardReducer,
  initWizard,
} from './wizardReducer';

const formatVND = (number) =>
  number.toLocaleString('vi-VN', {
    style: 'currency',
    currency: 'VND',
  });

function CourseWizard({
  initialCourseId = 'react',
}) {
  const [state, dispatch] = useReducer(
    wizardReducer,
    initialCourseId,
    initWizard
  );

  const {
    step,
    maxVisited,
    values,
    errors,
    submitted,
  } = state;

  const course = COURSES.find(
    (item) =>
      item.id === values.courseId
  );

  const handleChange = (e) => {
    const {
      name,
      value,
      type,
      checked,
    } = e.target;

    dispatch({
      type: 'CHANGE',
      payload: {
        name,
        value:
          type === 'checkbox'
            ? checked
            : value,
      },
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch({
      type:
        step === STEPS.length - 1
          ? 'SUBMIT'
          : 'NEXT',
    });
  };

  const field = (
    name,
    label,
    type = 'text'
  ) => (
    <Form.Group className="mb-3">
      <Form.Label>{label}</Form.Label>

      <Form.Control
        type={type}
        name={name}
        value={values[name]}
        onChange={handleChange}
        isInvalid={Boolean(errors[name])}
      />

      <Form.Control.Feedback type="invalid">
        {errors[name]}
      </Form.Control.Feedback>
    </Form.Group>
  );

  if (submitted) {
    return (
      <Card
        className="shadow-sm mx-auto"
        style={{ maxWidth: '650px' }}
      >
        <Card.Body>
          <Alert
            variant="success"
            className="mb-3"
          >
            <Alert.Heading>
              Đăng ký thành công!
            </Alert.Heading>

            <p className="mb-0">
              <strong>
                {values.fullName}
              </strong>{' '}
              đã đăng ký{' '}
              <strong>
                {course?.name}
              </strong>
              .
            </p>
          </Alert>

          <ListGroup className="mb-3">
            <ListGroup.Item>
              <strong>Email:</strong>{' '}
              {values.email}
            </ListGroup.Item>

            <ListGroup.Item>
              <strong>
                Số điện thoại:
              </strong>{' '}
              {values.phone}
            </ListGroup.Item>

            <ListGroup.Item>
              <strong>
                Lịch học:
              </strong>{' '}
              {values.schedule}
            </ListGroup.Item>

            <ListGroup.Item>
              <strong>
                Học phí:
              </strong>{' '}
              {course
                ? formatVND(course.fee)
                : ''}
            </ListGroup.Item>
          </ListGroup>

          <Button
            onClick={() =>
              dispatch({
                type: 'RESET',
                payload:
                  initialCourseId,
              })
            }
          >
            Đăng ký khóa khác
          </Button>
        </Card.Body>
      </Card>
    );
  }

  return (
    <Card
      className="shadow-sm mx-auto"
      style={{ maxWidth: '650px' }}
    >
      <Card.Body>
        <Card.Title className="text-center mb-4">
          Đăng ký khóa học
        </Card.Title>

        <Nav
          variant="pills"
          className="mb-4 d-flex"
        >
          {STEPS.map(
            (stepName, index) => (
              <Nav.Item
                key={stepName}
                className="flex-fill"
              >
                <Nav.Link
                  className="text-center"
                  active={step === index}
                  disabled={
                    index > maxVisited
                  }
                  onClick={() =>
                    dispatch({
                      type: 'GO_TO',
                      payload: index,
                    })
                  }
                >
                  {index + 1}.{' '}
                  {stepName}
                </Nav.Link>
              </Nav.Item>
            )
          )}
        </Nav>

        <Form onSubmit={handleSubmit}>
          {step === 0 && (
            <>
              <h5 className="mb-3">
                Thông tin cá nhân
              </h5>

              {field(
                'fullName',
                'Họ tên'
              )}

              {field(
                'email',
                'Email',
                'email'
              )}

              {field(
                'phone',
                'Số điện thoại',
                'tel'
              )}
            </>
          )}

          {step === 1 && (
            <>
              <h5 className="mb-3">
                Chọn khóa học
              </h5>

              <Form.Group className="mb-3">
                <Form.Label>
                  Khóa học
                </Form.Label>

                <Form.Select
                  name="courseId"
                  value={values.courseId}
                  onChange={handleChange}
                  isInvalid={Boolean(
                    errors.courseId
                  )}
                >
                  <option value="">
                    -- Chọn khóa học --
                  </option>

                  {COURSES.map(
                    (item) => (
                      <option
                        key={item.id}
                        value={item.id}
                      >
                        {item.name} -{' '}
                        {formatVND(
                          item.fee
                        )}
                      </option>
                    )
                  )}
                </Form.Select>

                <Form.Control.Feedback type="invalid">
                  {errors.courseId}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>
                  Lịch học
                </Form.Label>

                {SCHEDULES.map(
                  (schedule) => (
                    <Form.Check
                      key={schedule}
                      type="radio"
                      name="schedule"
                      id={`schedule-${schedule}`}
                      label={schedule}
                      value={schedule}
                      checked={
                        values.schedule ===
                        schedule
                      }
                      onChange={
                        handleChange
                      }
                      isInvalid={Boolean(
                        errors.schedule
                      )}
                    />
                  )
                )}

                {errors.schedule && (
                  <div className="text-danger small mt-1">
                    {errors.schedule}
                  </div>
                )}
              </Form.Group>
            </>
          )}

          {step === 2 && (
            <>
              <h5 className="mb-3">
                Xác nhận thông tin
              </h5>

              <ListGroup className="mb-3">
                <ListGroup.Item>
                  <strong>
                    Họ tên:
                  </strong>{' '}
                  {values.fullName}
                </ListGroup.Item>

                <ListGroup.Item>
                  <strong>
                    Email:
                  </strong>{' '}
                  {values.email}
                </ListGroup.Item>

                <ListGroup.Item>
                  <strong>
                    Số điện thoại:
                  </strong>{' '}
                  {values.phone}
                </ListGroup.Item>

                <ListGroup.Item>
                  <strong>
                    Khóa học:
                  </strong>{' '}
                  {course?.name}
                </ListGroup.Item>

                <ListGroup.Item>
                  <strong>
                    Lịch học:
                  </strong>{' '}
                  {values.schedule}
                </ListGroup.Item>

                <ListGroup.Item>
                  <strong>
                    Học phí:
                  </strong>{' '}
                  {course
                    ? formatVND(
                        course.fee
                      )
                    : ''}
                </ListGroup.Item>
              </ListGroup>

              <Form.Check
                type="checkbox"
                name="agree"
                id="agree"
                label="Tôi xác nhận thông tin trên là chính xác"
                checked={values.agree}
                onChange={handleChange}
                isInvalid={Boolean(
                  errors.agree
                )}
              />

              {errors.agree && (
                <div className="text-danger small mt-1">
                  {errors.agree}
                </div>
              )}
            </>
          )}

          <div className="d-flex justify-content-between mt-4">
            <Button
              type="button"
              variant="outline-secondary"
              disabled={step === 0}
              onClick={() =>
                dispatch({
                  type: 'BACK',
                })
              }
            >
              ← Quay lại
            </Button>

            {step <
            STEPS.length - 1 ? (
              <Button type="submit">
                Tiếp tục →
              </Button>
            ) : (
              <Button
                type="submit"
                variant="success"
              >
                Xác nhận đăng ký
              </Button>
            )}
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
}

export default CourseWizard;