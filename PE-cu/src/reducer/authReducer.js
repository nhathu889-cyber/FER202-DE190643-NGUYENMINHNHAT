export const initialAuthState = {
  user: null,
  isAuthenticated: false,
  serverError: '',
};

export function authReducer(state, action) {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        serverError: '',
      };
    case 'LOGOUT':
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        serverError: '',
      };
    case 'SET_ERROR':
      return {
        ...state,
        serverError: action.payload || '',
      };
    case 'CLEAR_ERROR':
      return {
        ...state,
        serverError: '',
      };
    default:
      return state;
  }
}
