import React from 'react';
import { Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

function UpperBar() {
  const { isAuthenticated, logout } = useAuth();

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
          <button onClick={logout} className="text-black hover:text-gray-600">
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
