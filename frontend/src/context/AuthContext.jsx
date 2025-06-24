import { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authTokens, setAuthTokens] = useState(() => {
    const tokens = localStorage.getItem('authTokens');
    return tokens ? JSON.parse(tokens) : null;
  });

  console.log("AuthContext init:", authTokens);

  const [user, setUser] = useState(null);

  useEffect(() => {
    if (authTokens && authTokens.access) {
      // можно тут парсить JWT если нужно имя/роль (но пока без этого)
      setUser({ token: authTokens.access });
    } else {
      setUser(null);
    }
  }, [authTokens]);

  const login = (tokens) => {
    setAuthTokens(tokens);
    localStorage.setItem('authTokens', JSON.stringify(tokens));
  };

  const logout = () => {
    setAuthTokens(null);
    localStorage.removeItem('authTokens');
    setUser(null);
  };

  const isAuthenticated = !!authTokens?.access;

  return (
    <AuthContext.Provider value={{ authTokens, user, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};