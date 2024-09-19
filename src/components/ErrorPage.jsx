import React from 'react';
import { useNavigate } from 'react-router-dom';

function ErrorPage() {
  const navigate = useNavigate();

  const handleBackHome = () => {
    navigate('/');
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-6xl font-bold text-red-500 mb-4">404</h1>
        <p className="text-xl font-semibold mb-4">Oops! Page Not Found</p>
        <p className="text-gray-600 mb-8">
          The page you're looking for doesn't seem to exist. It might have been moved or deleted.
        </p>
        <button
          onClick={handleBackHome}
          className="bg-green-500 text-white px-6 py-3 rounded-md hover:bg-green-600 transition duration-300"
        >
          Go Back Home
        </button>
      </div>
    </div>
  );
}

export default ErrorPage;
