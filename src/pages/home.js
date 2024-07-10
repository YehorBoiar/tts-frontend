import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="min-h-screen flex">
      <main className="flex flex-col items-center justify-center text-center flex-1">
        <h1 className="text-4xl font-bold mb-6">Make sound from pdf free no sms</h1>
        <div className="flex">
        <Link to="/dosound" className="mr-4">
          <button className="text-black hover:text-gray-600">
            Do sound
          </button>
        </Link>
          <Link to="/signin" className="mr-4">
          <button className="text-black hover:text-gray-600">
            Signin
          </button>
        </Link>
        </div>
      </main>
    </div>
  );
}

export default Home;
