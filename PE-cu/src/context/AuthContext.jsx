import { createContext, useContext, useEffect, useReducer } from 'react';
import { authReducer, initialAuthState } from '../reducer/authReducer';
import { loginUser as loginAPI } from '../api/authApi';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const storedUser = (() => {
    try {
      const raw = localStorage.getItem('hotel-user');
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  })();

  const [state, dispatch] = useReducer(authReducer, {
    ...initialAuthState,
    user: storedUser,
    isAuthenticated: Boolean(storedUser),
  });

  useEffect(() => {
    if (state.user) {
      localStorage.setItem('hotel-user', JSON.stringify(state.user));
    } else {
      localStorage.removeItem('hotel-user');
    }
  }, [state.user]);

  const loginUser = async (credentials) => {
    const user = await loginAPI(credentials);
    dispatch({ type: 'LOGIN_SUCCESS', payload: user });
    return user;
  };

  const logoutUser = () => {
    dispatch({ type: 'LOGOUT' });
  };

  const value = {
    state,
    ...state,
    dispatch,
    loginUser,
    logoutUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
