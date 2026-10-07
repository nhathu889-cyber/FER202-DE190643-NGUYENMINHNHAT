import {
  useState,
} from 'react';

import { AuthContext } from './useAuth';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (emailOrUser) => {
    const email =
      typeof emailOrUser === 'string'
        ? emailOrUser
        : emailOrUser.email;

    setUser({
      email,
      name: email.split('@')[0],
    });
  };

  const logout = () => {
    setUser(null);
  };

  const isLoggedIn = user !== null;

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoggedIn,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
