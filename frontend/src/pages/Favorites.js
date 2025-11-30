import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import MovieCard from '../components/MovieCard';
import { HeartIcon } from '@heroicons/react/24/outline';

const Favorites = () => {
  const { isAuthenticated } = useAuth();
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isAuthenticated) {
      fetchFavorites();
    } else {
      setLoading(false);
    }
  }, [isAuthenticated]);

  const fetchFavorites = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/users/favorites');
      setMovies(response.data.favorites || []);
    } catch (error) {
      console.error('Error fetching favorites:', error);
      setError('Failed to load your favorites. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="text-center py-12">
        <HeartIcon className="h-16 w-16 text-red-500 mx-auto mb-4" />
        <h1 className="text-3xl font-bold text-dark-100 mb-4">Your Favorites</h1>
        <p className="text-dark-400 text-lg mb-6">
          Please log in to view and manage your favorite movies.
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
          onClick={fetchFavorites}
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
        <h1 className="text-3xl font-bold text-dark-100 mb-2">My Favorites</h1>
        <p className="text-dark-400">
          Movies you've marked as favorites
        </p>
      </div>

      {movies.length > 0 ? (
        <>
          <div className="flex justify-between items-center">
            <p className="text-dark-400">
              {movies.length} favorite movie{movies.length !== 1 ? 's' : ''}
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
          <HeartIcon className="h-16 w-16 text-dark-600 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-dark-300 mb-2">
            No favorite movies yet
          </h2>
          <p className="text-dark-400 mb-6">
            Start exploring movies and add them to your favorites by clicking the heart icon.
          </p>
          <Link to="/search" className="btn-primary">
            Discover Movies
          </Link>
        </div>
      )}
    </div>
  );
};

export default Favorites;
