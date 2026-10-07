const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const initialLoginState = {
  values: {
    email: '',
    password: '',
    remember: false,
  },
  errors: {},
  touched: {},
  status: 'idle',
  message: '',
};

export const validateLogin = (values) => {
  const errors = {};

  if (!values.email.trim()) {
    errors.email = 'Vui lòng nhập email';
  } else if (!EMAIL_REGEX.test(values.email)) {
    errors.email = 'Email không đúng định dạng';
  }

  if (!values.password) {
    errors.password = 'Vui lòng nhập mật khẩu';
  } else if (values.password.length < 8) {
    errors.password =
      'Mật khẩu phải có ít nhất 8 ký tự';
  }

  return errors;
};

export const loginReducer = (state, action) => {
  switch (action.type) {
    case 'CHANGE_FIELD': {
      const newValues = {
        ...state.values,
        [action.payload.name]: action.payload.value,
      };

      return {
        ...state,
        values: newValues,
        errors: validateLogin(newValues),
        status:
          state.status === 'error'
            ? 'idle'
            : state.status,
        message: '',
      };
    }

    case 'BLUR_FIELD':
      return {
        ...state,
        errors: validateLogin(state.values),
        touched: {
          ...state.touched,
          [action.payload]: true,
        },
      };

    case 'SUBMIT': {
      const errors = validateLogin(state.values);

      const touched = {
        email: true,
        password: true,
      };

      if (Object.keys(errors).length > 0) {
        return {
          ...state,
          errors,
          touched,
          status: 'idle',
          message: '',
        };
      }

      return {
        ...state,
        errors: {},
        touched,
        status: 'submitting',
        message: '',
      };
    }

    case 'LOGIN_SUCCESS':
      return {
        ...state,
        status: 'success',
        message: `Xin chào ${state.values.email}!`,
      };

    case 'LOGIN_FAILURE':
      return {
        ...state,
        status: 'error',
        message: 'Email hoặc mật khẩu không đúng',
      };

    case 'RESET':
      return initialLoginState;

    default:
      throw new Error(
        `Unknown login action: ${action.type}`
      );
  }
};