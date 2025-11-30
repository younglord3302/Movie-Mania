import React from 'react';
import { Link } from 'react-router-dom';
import { FilmIcon, HomeIcon } from '@heroicons/react/24/outline';

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-dark-900 px-4">
      <div className="text-center max-w-md">
        <div className="mb-8">
          <FilmIcon className="h-24 w-24 text-primary-500 mx-auto mb-4" />
          <h1 className="text-6xl font-bold text-white mb-2">404</h1>
          <h2 className="text-2xl font-semibold text-dark-300 mb-4">Page Not Found</h2>
          <p className="text-dark-400">
            The movie you're looking for seems to have left the theater.
            Let's get you back to the main show!
          </p>
        </div>

        <div className="space-y-4">
          <Link
            to="/"
            className="btn-primary inline-flex items-center gap-2 px-6 py-3 text-lg"
          >
            <HomeIcon className="h-5 w-5" />
            Back to Home
          </Link>

          <div>
            <Link
              to="/search"
              className="text-primary-400 hover:text-primary-300 font-medium"
            >
              Or search for movies →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
