import React from 'react';
import { useNavigate } from 'react-router-dom';

function ErrorPage() {
  const navigate = useNavigate();

  const handleBackHome = () => {
    navigate('/');
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <div className="text-center">
        <h1 className="text-8xl font-bold text-black mb-4">404 Not Found</h1>
        <p className="text-lg text-gray-600 mb-8">
          Your visited page not found. You may go home page.
        </p>
        <button
          onClick={handleBackHome}
          className="bg-red-500 text-white px-8 py-3 rounded hover:bg-red-600 transition duration-300"
        >
          Back to home page
        </button>
      </div>
    </div>
  );
}

export default ErrorPage;
