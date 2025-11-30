import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import MovieCard from '../components/MovieCard';
import { BookmarkIcon } from '@heroicons/react/24/outline';

const Watchlist = () => {
  const { isAuthenticated } = useAuth();
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isAuthenticated) {
      fetchWatchlist();
    } else {
      setLoading(false);
    }
  }, [isAuthenticated]);

  const fetchWatchlist = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/users/watchlist');
      setMovies(response.data.watchlist || []);
    } catch (error) {
      console.error('Error fetching watchlist:', error);
      setError('Failed to load your watchlist. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="text-center py-12">
        <BookmarkIcon className="h-16 w-16 text-primary-500 mx-auto mb-4" />
        <h1 className="text-3xl font-bold text-dark-100 mb-4">Your Watchlist</h1>
        <p className="text-dark-400 text-lg mb-6">
          Please log in to view and manage your watchlist.
        </p>
        <Link to="/login" className="btn-primary">
          Log In
        </Link>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-400 text-lg mb-4">{error}</p>
        <button
          onClick={fetchWatchlist}
          className="btn-primary"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-dark-100 mb-2">My Watchlist</h1>
        <p className="text-dark-400">
          Movies you've saved to watch later
        </p>
      </div>

      {movies.length > 0 ? (
        <>
          <div className="flex justify-between items-center">
            <p className="text-dark-400">
              {movies.length} movie{movies.length !== 1 ? 's' : ''} in your watchlist
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {movies.map((movie) => (
              <MovieCard key={movie._id} movie={movie} />
            ))}
          </div>
        </>
      ) : (
        <div className="text-center py-12">
          <BookmarkIcon className="h-16 w-16 text-dark-600 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-dark-300 mb-2">
            Your watchlist is empty
          </h2>
          <p className="text-dark-400 mb-6">
            Start adding movies to your watchlist to keep track of what you want to watch.
          </p>
          <Link to="/search" className="btn-primary">
            Discover Movies
          </Link>
        </div>
      )}
    </div>
  );
};

export default Watchlist;
