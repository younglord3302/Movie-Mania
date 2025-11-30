import React, { useState, memo } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import {
  HeartIcon,
  BookmarkIcon,
  StarIcon,
  PlayIcon
} from '@heroicons/react/24/outline';
import {
  HeartIcon as HeartIconSolid,
  BookmarkIcon as BookmarkIconSolid
} from '@heroicons/react/24/solid';

const MovieCard = memo(({ movie, showActions = true }) => {
  const { isAuthenticated } = useAuth();
  const [isFavorite, setIsFavorite] = useState(false);
  const [isInWatchlist, setIsInWatchlist] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleFavoriteToggle = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isAuthenticated) return;

    setLoading(true);
    try {
      await axios.post(`/users/favorites/${movie._id}`);
      setIsFavorite(!isFavorite);
    } catch (error) {
      console.error('Error toggling favorite:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleWatchlistToggle = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isAuthenticated) return;

    setLoading(true);
    try {
      await axios.post(`/users/watchlist/${movie._id}`);
      setIsInWatchlist(!isInWatchlist);
    } catch (error) {
      console.error('Error toggling watchlist:', error);
    } finally {
      setLoading(false);
    }
  };



  return (
    <Link to={`/movie/${movie._id}`} className="group block">
      <div className="movie-card-3d bg-dark-800 dark:bg-dark-800 light:bg-white border dark:border-dark-700 light:border-gray-200 rounded-lg shadow-lg overflow-hidden">
        {/* Movie Poster */}
        <div className="relative overflow-hidden rounded-t-lg">
          <img
            src={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjQ1MCIgdmlld0JveD0iMCAwIDMwMCA0NTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iNDUwIiBmaWxsPSIjMWExYTFhIiByeD0iOCIvPgo8ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgxMjAsIDE4MCkiPgo8Y2lyY2xlIGN4PSIzMCIgY3k9IjMwIiByPSIyNSIgZmlsbD0iIzNmM2Y0NiIgc3Ryb2tlPSIjNzE3MTdhIiBzdHJva2Utd2lkdGg9IjIiLz4KPHBhdGggZD0iTTE4IDIyIEwyNSAxOCBMMzIgMjIgTDMyIDM4IEwxOCAzOFoiIGZpbGw9IiM3MTcxN2EiLz4KPGNpcmNsZSBjeD0iMjEiIGN5PSIyNSIgcj0iMiIgZmlsbD0iIzNmM2Y0NiIvPgo8Y2lyY2xlIGN4PSIyOSIgY3k9IjI1IiByPSIyIiBmaWxsPSIjM2YzZjQ2Ii8+CjxyZWN0IHg9IjIwIiB5PSIzMCIgd2lkdGg9IjEwIiBoZWlnaHQ9IjIiIHJ4PSIxIiBmaWxsPSIjM2YzZjQ2Ii8+CjwvZz4KPHRleHQgeD0iMTUwIiB5PSIyODAiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZpbGw9IiM5Y2EzYWYiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxNiIgZm9udC13ZWlnaHQ9ImJvbGQiPk5vIEltYWdlPC90ZXh0Pgo8dGV4dCB4PSIxNTAiIHk9IjMwMCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0iIzZiNzI4MCIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjEyIj5BdmFpbGFibGU8L3RleHQ+Cjwvc3ZnPg=='}
            alt={movie.title}
            className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
            onError={(e) => {
              e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjQ1MCIgdmlld0JveD0iMCAwIDMwMCA0NTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iNDUwIiBmaWxsPSIjMWExYTFhIiByeD0iOCIvPgo8ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgxMjAsIDE4MCkiPgo8Y2lyY2xlIGN4PSIzMCIgY3k9IjMwIiByPSIyNSIgZmlsbD0iIzNmM2Y0NiIgc3Ryb2tlPSIjNzE3MTdhIiBzdHJva2Utd2lkdGg9IjIiLz4KPHBhdGggZD0iTTE4IDIyIEwyNSAxOCBMMzIgMjIgTDMyIDM4IEwxOCAzOFoiIGZpbGw9IiM3MTcxN2EiLz4KPGNpcmNsZSBjeD0iMjEiIGN5PSIyNSIgcj0iMiIgZmlsbD0iIzNmM2Y0NiIvPgo8Y2lyY2xlIGN4PSIyOSIgY3k9IjI1IiByPSIyIiBmaWxsPSIjM2YzZjQ2Ii8+CjxyZWN0IHg9IjIwIiB5PSIzMCIgd2lkdGg9IjEwIiBoZWlnaHQ9IjIiIHJ4PSIxIiBmaWxsPSIjM2YzZjQ2Ii8+CjwvZz4KPHRleHQgeD0iMTUwIiB5PSIyODAiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZpbGw9IiM5Y2EzYWYiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxNiIgZm9udC13ZWlnaHQ9ImJvbGQiPk5vIEltYWdlPC90ZXh0Pgo8dGV4dCB4PSIxNTAiIHk9IjMwMCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0iIzZiNzI4MCIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjEyIj5BdmFpbGFibGU8L3RleHQ+Cjwvc3ZnPg==';
            }}
          />

          {/* Overlay with actions */}
          {showActions && (
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-60 transition-all duration-300 flex items-center justify-center">
              <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button
                  onClick={handleFavoriteToggle}
                  disabled={!isAuthenticated || loading}
                  className="p-2 bg-dark-800 bg-opacity-80 rounded-full hover:bg-opacity-100 transition-all duration-200 disabled:opacity-50"
                  title={isAuthenticated ? (isFavorite ? 'Remove from favorites' : 'Add to favorites') : 'Login to add favorites'}
                >
                  {isFavorite ? (
                    <HeartIconSolid className="h-5 w-5 text-red-500" />
                  ) : (
                    <HeartIcon className="h-5 w-5 text-white" />
                  )}
                </button>
                <button
                  onClick={handleWatchlistToggle}
                  disabled={!isAuthenticated || loading}
                  className="p-2 bg-dark-800 bg-opacity-80 rounded-full hover:bg-opacity-100 transition-all duration-200 disabled:opacity-50"
                  title={isAuthenticated ? (isInWatchlist ? 'Remove from watchlist' : 'Add to watchlist') : 'Login to add to watchlist'}
                >
                  {isInWatchlist ? (
                    <BookmarkIconSolid className="h-5 w-5 text-primary-500" />
                  ) : (
                    <BookmarkIcon className="h-5 w-5 text-white" />
                  )}
                </button>
                <div className="p-2 bg-primary-600 bg-opacity-80 rounded-full">
                  <PlayIcon className="h-5 w-5 text-white" />
                </div>
              </div>
            </div>
          )}

          {/* Rating badge */}
          <div className="absolute top-2 left-2 bg-black bg-opacity-80 rounded-full px-2 py-1 flex items-center space-x-1">
            <StarIcon className="h-3 w-3 text-yellow-400 fill-current" />
            <span className="text-white text-sm font-semibold">
              {movie.vote_average?.toFixed(1) || 'N/A'}
            </span>
          </div>
        </div>

        {/* Movie Info */}
        <div className="p-4">
          <h3 className="font-semibold text-dark-100 mb-2 line-clamp-2 group-hover:text-primary-400 transition-colors">
            {movie.title}
          </h3>

          <div className="flex items-center justify-between text-sm text-dark-400 mb-2">
            <span>{movie.release_date ? new Date(movie.release_date).getFullYear() : 'N/A'}</span>
            <span>{movie.runtime ? `${movie.runtime}min` : ''}</span>
          </div>

          {/* Genres */}
          {movie.genres && movie.genres.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-3">
              {movie.genres.slice(0, 2).map((genre) => (
                <span
                  key={genre.id}
                  className="text-xs bg-dark-700 text-dark-300 px-2 py-1 rounded-full"
                >
                  {genre.name}
                </span>
              ))}
            </div>
          )}

          {/* Overview */}
          <p className="text-sm text-dark-400 line-clamp-3">
            {movie.overview}
          </p>
        </div>
      </div>
    </Link>
  );
});

MovieCard.displayName = 'MovieCard';

export default MovieCard;
