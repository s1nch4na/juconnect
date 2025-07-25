import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="space-y-4 text-center">
        <h1 className="text-2xl font-bold">Welcome to JuConnect</h1>

        <div className="flex flex-col gap-4">
          <Link to="/login">
            <button className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700">
              Login
            </button>
          </Link>

          <Link to="/signup">
            <button className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700">
              Signup
            </button>
          </Link>

          <Link to="/feed">
            <button className="bg-purple-600 text-white px-6 py-2 rounded-md hover:bg-purple-700">
              Feed
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
