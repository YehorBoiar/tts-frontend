import React from 'react';
import { Link } from 'react-router-dom';

function UpperBar() {
  return (
    <div className="p-4 flex justify-between items-center">
      <h1 className="text-black text-xl font-bold">
      <Link to="/" className="mr-4">
          <button>
            Bebra
          </button>
      </Link>
      </h1>
      <div>
        <Link to="/signin" className="mr-4">
          <button className="text-black hover:text-gray-600">
            Signin
          </button>
        </Link>
        <Link to="/register">
          <button className="text-black hover:text-gray-600">
            Register
          </button>
        </Link>
      </div>
    </div>
  );
}

export default UpperBar;
