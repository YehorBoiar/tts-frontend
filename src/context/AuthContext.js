import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const storedAuthState = localStorage.getItem('isAuthenticated') === 'true';
    const tokenExists = document.cookie.split('; ').find(row => row.startsWith('token=')) !== undefined;

    if (storedAuthState && tokenExists) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
      localStorage.setItem('isAuthenticated', 'false');
    }
  }, []);

  const logout = () => {
    document.cookie = 'token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
    localStorage.setItem('isAuthenticated', 'false');
    setIsAuthenticated(false);
  };

  const login = () => {
    localStorage.setItem('isAuthenticated', 'true');
    setIsAuthenticated(true);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
