import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="flex flex-grow items-center justify-center min-h-screen">
      <div className="text-center space-y-3">
        <h1 className="text-4xl font-bold font-xl mb-4">Convert text to Audio</h1>
        <div className="flex justify-center space-x-4">
          <Link to="/dosound" className="">
            <button className="text-white text-base bg-black hover:bg-gray-800 px-4 py-2 rounded">
              Do sound
            </button>
          </Link>
          <Link to="/tryit" className="">
            <button className="text-white text-base bg-black hover:bg-gray-800 px-4 py-2 rounded border border-white">
              Try it
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
} 

export default Home;
