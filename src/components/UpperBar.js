import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';


function UpperBar() {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="text-black flex justify-between items-center mx-16 h-16 ">
      <h1 className="text-black text-xl font-bold">
        <Link to="/" className="mr-4">
          <button>
            Bebra
          </button>
        </Link>
      </h1>
      <div>
        {isAuthenticated ? (
          <button onClick={handleLogout} className="text-black hover:text-gray-600">
            Logout
          </button>
        ) : (
          <>
            <Link to="/signin" className="mr-4">
              <button className="text-black hover:text-gray-600">
                Sign In
              </button>
            </Link>
            <Link to="/register">
              <button className="text-black hover:text-gray-600">
                Register
              </button>
            </Link>
          </>
        )}
      </div>
    </div>
  );
}

export default UpperBar;
