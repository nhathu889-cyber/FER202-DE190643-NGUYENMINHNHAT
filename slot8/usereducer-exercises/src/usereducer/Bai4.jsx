import { useReducer } from 'react';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Nav from 'react-bootstrap/Nav';
import Alert from 'react-bootstrap/Alert';
import ListGroup from 'react-bootstrap/ListGroup';

const COURSES = [
  {
    id: 'react',
    name: 'ReactJS cơ bản',
    fee: 2500000,
  },
  {
    id: 'node',
    name: 'NodeJS & Express',
    fee: 3000000,
  },
  {
    id: 'fullstack',
    name: 'Fullstack MERN',
    fee: 5000000,
  },
];

const SCHEDULES = [
  'Sáng 2-4-6',
  'Tối 3-5-7',
  'Cuối tuần',
];

const STEPS = [
  'Thông tin',
  'Khóa học',
  'Xác nhận',
];

const STEP_FIELDS = [
  ['fullName', 'email', 'phone'],
  ['courseId', 'schedule'],
  ['agree'],
];

const EMAIL_REGEX =
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const validateField = (name, values) => {
  const value = values[name];

  switch (name) {
    case 'fullName':
      return value.trim().length >= 3
        ? ''
        : 'Họ tên ít nhất 3 ký tự';

    case 'email':
      return EMAIL_REGEX.test(value)
        ? ''
        : 'Email không hợp lệ';

    case 'phone':
      return /^0\d{9}$/.test(value)
        ? ''
        : 'Số điện thoại gồm 10 số, bắt đầu bằng 0';

    case 'courseId':
      return value
        ? ''
        : 'Chọn một khóa học';

    case 'schedule':
      return value
        ? ''
        : 'Chọn lịch học';

    case 'agree':
      return value
        ? ''
        : 'Bạn cần xác nhận thông tin';

    default:
      return '';
  }
};

const validateStep = (step, values) =>
  STEP_FIELDS[step].reduce(
    (errors, name) => {
      const message =
        validateField(name, values);

      return message
        ? {
            ...errors,
            [name]: message,
          }
        : errors;
    },
    {}
  );

const initWizard = (
  initialCourseId = ''
) => ({
  step: 0,
  maxVisited: 0,

  values: {
    fullName: '',
    email: '',
    phone: '',
    courseId: initialCourseId,
    schedule: '',
    agree: false,
  },

  errors: {},
  submitted: false,
});

const wizardReducer = (
  state,
  action
) => {
  switch (action.type) {
    case 'CHANGE': {
      const { name, value } =
        action.payload;

      const values = {
        ...state.values,
        [name]: value,
      };

      const errors = state.errors[name]
        ? {
            ...state.errors,
            [name]: validateField(
              name,
              values
            ),
          }
        : state.errors;

      return {
        ...state,
        values,
        errors,
      };
    }

    case 'NEXT': {
      const errors = validateStep(
        state.step,
        state.values
      );

      if (
        Object.keys(errors).length > 0
      ) {
        return {
          ...state,
          errors,
        };
      }

      const step = Math.min(
        state.step + 1,
        STEPS.length - 1
      );

      return {
        ...state,
        step,
        maxVisited: Math.max(
          state.maxVisited,
          step
        ),
        errors: {},
      };
    }

    case 'BACK':
      return {
        ...state,
        step: Math.max(
          state.step - 1,
          0
        ),
        errors: {},
      };

    case 'GO_TO':
      return action.payload <=
        state.maxVisited
        ? {
            ...state,
            step: action.payload,
            errors: {},
          }
        : state;

    case 'SUBMIT': {
      const errors = validateStep(
        state.step,
        state.values
      );

      if (
        Object.keys(errors).length > 0
      ) {
        return {
          ...state,
          errors,
        };
      }

      return {
        ...state,
        submitted: true,
      };
    }

    case 'RESET':
      return initWizard(action.payload);

    default:
      throw new Error(
        `Action không hợp lệ: ${action.type}`
      );
  }
};

const formatVND = (number) =>
  number.toLocaleString('vi-VN', {
    style: 'currency',
    currency: 'VND',
  });

function Bai4({
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

export default Bai4;