import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const navigate = useNavigate();

  const logout = () => {
    document.cookie = 'token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
    navigate('/');
    setIsAuthenticated(false);
  };

  return {
    isAuthenticated,
    logout,
  };
};

export default useAuth;
