import React, { useState, useEffect, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import {
  HeartIcon,
  BookmarkIcon,
  StarIcon,
  PlayIcon,
  ClockIcon,
  CalendarIcon
} from '@heroicons/react/24/outline';
import {
  HeartIcon as HeartIconSolid,
  BookmarkIcon as BookmarkIconSolid
} from '@heroicons/react/24/solid';

const MovieDetails = () => {
  const { id } = useParams();
  const { isAuthenticated } = useAuth();
  const [movie, setMovie] = useState(null);
  const [similarMovies, setSimilarMovies] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isInWatchlist, setIsInWatchlist] = useState(false);
  const [showFullOverview, setShowFullOverview] = useState(false);

  const fetchMovieDetails = useCallback(async () => {
    try {
      setLoading(true);
      const [movieRes, similarRes] = await Promise.all([
        axios.get(`/movies/${id}`),
        axios.get(`/movies/${id}/similar?limit=6`)
      ]);

      setMovie(movieRes.data);
      setSimilarMovies(similarRes.data.similarMovies || []);
      setReviews(movieRes.data.reviews || []);
    } catch (error) {
      console.error('Error fetching movie details:', error);
      setError('Failed to load movie details. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchMovieDetails();
  }, [fetchMovieDetails]);

  const handleFavoriteToggle = async () => {
    if (!isAuthenticated) return;

    try {
      await axios.post(`/users/favorites/${id}`);
      setIsFavorite(!isFavorite);
    } catch (error) {
      console.error('Error toggling favorite:', error);
    }
  };

  const handleWatchlistToggle = async () => {
    if (!isAuthenticated) return;

    try {
      await axios.post(`/users/watchlist/${id}`);
      setIsInWatchlist(!isInWatchlist);
    } catch (error) {
      console.error('Error toggling watchlist:', error);
    }
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating / 2);
    const hasHalfStar = rating % 2 >= 0.5;

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(
          <StarIcon key={i} className="h-5 w-5 text-yellow-400 fill-current" />
        );
      } else if (i === fullStars && hasHalfStar) {
        stars.push(
          <div key={i} className="relative">
            <StarIcon className="h-5 w-5 text-dark-400" />
            <div className="absolute inset-0 overflow-hidden w-1/2">
              <StarIcon className="h-5 w-5 text-yellow-400 fill-current" />
            </div>
          </div>
        );
      } else {
        stars.push(
          <StarIcon key={i} className="h-5 w-5 text-dark-400" />
        );
      }
    }
    return stars;
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  if (error || !movie) {
    return (
      <div className="text-center py-12">
        <p className="text-red-400 text-lg mb-4">{error || 'Movie not found'}</p>
        <Link to="/" className="btn-primary">
          Back to Home
        </Link>
      </div>
    );
  }

  const overviewText = showFullOverview
    ? movie.overview
    : movie.overview?.slice(0, 300) + (movie.overview?.length > 300 ? '...' : '');

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="relative">
        <div
          className="h-96 bg-cover bg-center relative"
          style={{
            backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.9), rgba(0,0,0,0.7)), url(${movie.backdrop_path || movie.poster_path})`
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-dark-900/50 to-transparent"></div>

          <div className="relative z-10 container mx-auto px-4 h-full flex items-end pb-8">
            <div className="flex flex-col md:flex-row gap-8 items-start max-w-6xl">
              {/* Poster */}
              <div className="flex-shrink-0">
                <img
                  src={movie.poster_path || '/placeholder-movie.jpg'}
                  alt={movie.title}
                  className="w-48 h-72 object-cover rounded-lg shadow-2xl"
                  onError={(e) => {
                    e.target.src = '/placeholder-movie.jpg';
                  }}
                />
              </div>

              {/* Movie Info */}
              <div className="flex-1 text-white">
                <h1 className="text-4xl md:text-5xl font-bold mb-2">{movie.title}</h1>
                {movie.tagline && (
                  <p className="text-xl text-primary-300 italic mb-4">{movie.tagline}</p>
                )}

                <div className="flex flex-wrap items-center gap-4 mb-4 text-sm">
                  <div className="flex items-center gap-1">
                    <CalendarIcon className="h-4 w-4" />
                    <span>{movie.release_date ? new Date(movie.release_date).getFullYear() : 'N/A'}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <ClockIcon className="h-4 w-4" />
                    <span>{movie.runtime ? `${movie.runtime}min` : 'N/A'}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex">{renderStars(movie.vote_average)}</div>
                    <span className="font-semibold">{movie.vote_average?.toFixed(1)}</span>
                    <span className="text-dark-400">({movie.vote_count?.toLocaleString()} votes)</span>
                  </div>
                </div>

                {/* Genres */}
                {movie.genres && movie.genres.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {movie.genres.map((genre) => (
                      <span
                        key={genre.id}
                        className="bg-primary-600 text-white px-3 py-1 rounded-full text-sm"
                      >
                        {genre.name}
                      </span>
                    ))}
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex gap-3 mb-4">
                  <button className="flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors">
                    <PlayIcon className="h-5 w-5" />
                    Watch Trailer
                  </button>

                  {isAuthenticated && (
                    <>
                      <button
                        onClick={handleFavoriteToggle}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-colors ${
                          isFavorite
                            ? 'bg-red-600 hover:bg-red-700 text-white'
                            : 'bg-dark-700 hover:bg-dark-600 text-white'
                        }`}
                      >
                        {isFavorite ? (
                          <HeartIconSolid className="h-5 w-5" />
                        ) : (
                          <HeartIcon className="h-5 w-5" />
                        )}
                        {isFavorite ? 'Favorited' : 'Add to Favorites'}
                      </button>

                      <button
                        onClick={handleWatchlistToggle}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-colors ${
                          isInWatchlist
                            ? 'bg-primary-600 hover:bg-primary-700 text-white'
                            : 'bg-dark-700 hover:bg-dark-600 text-white'
                        }`}
                      >
                        {isInWatchlist ? (
                          <BookmarkIconSolid className="h-5 w-5" />
                        ) : (
                          <BookmarkIcon className="h-5 w-5" />
                        )}
                        {isInWatchlist ? 'In Watchlist' : 'Add to Watchlist'}
                      </button>
                    </>
                  )}
                </div>

                {/* Overview */}
                <div>
                  <h3 className="text-lg font-semibold mb-2">Overview</h3>
                  <p className="text-dark-200 leading-relaxed">
                    {overviewText}
                    {movie.overview?.length > 300 && (
                      <button
                        onClick={() => setShowFullOverview(!showFullOverview)}
                        className="text-primary-400 hover:text-primary-300 ml-2 font-medium"
                      >
                        {showFullOverview ? 'Show Less' : 'Read More'}
                      </button>
                    )}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Cast & Crew Section */}
      {movie.cast && movie.cast.length > 0 && (
        <section>
          <h2 className="text-2xl font-bold text-dark-100 mb-6">Cast</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {movie.cast.slice(0, 6).map((person) => (
              <div key={person.id} className="text-center">
                <img
                  src={person.profile_path || '/placeholder-person.jpg'}
                  alt={person.name}
                  className="w-24 h-24 rounded-full object-cover mx-auto mb-2"
                  onError={(e) => {
                    e.target.src = '/placeholder-person.jpg';
                  }}
                />
                <h3 className="font-semibold text-dark-100 text-sm">{person.name}</h3>
                <p className="text-dark-400 text-xs">{person.character}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Reviews Section */}
      {reviews && reviews.length > 0 && (
        <section>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-dark-100">Reviews</h2>
            <Link to={`/movie/${id}/reviews`} className="text-primary-400 hover:text-primary-300">
              View All →
            </Link>
          </div>
          <div className="grid gap-4">
            {reviews.slice(0, 3).map((review) => (
              <div key={review._id} className="bg-dark-800 rounded-lg p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={review.user?.avatar || '/placeholder-avatar.jpg'}
                      alt={review.user?.username}
                      className="w-10 h-10 rounded-full"
                      onError={(e) => {
                        e.target.src = '/placeholder-avatar.jpg';
                      }}
                    />
                    <div>
                      <h4 className="font-semibold text-dark-100">{review.user?.username}</h4>
                      <div className="flex items-center gap-2">
                        <div className="flex">{renderStars(review.rating)}</div>
                        <span className="text-sm text-dark-400">
                          {new Date(review.created_at).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                {review.title && (
                  <h5 className="font-semibold text-dark-200 mb-2">{review.title}</h5>
                )}
                <p className="text-dark-300">{review.content}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Similar Movies */}
      {similarMovies && similarMovies.length > 0 && (
        <section>
          <h2 className="text-2xl font-bold text-dark-100 mb-6">Similar Movies</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
            {similarMovies.map((similarMovie) => (
              <Link
                key={similarMovie._id}
                to={`/movie/${similarMovie._id}`}
                className="group"
              >
                <div className="card transform transition-all duration-300 hover:scale-105">
                  <img
                    src={similarMovie.poster_path || '/placeholder-movie.jpg'}
                    alt={similarMovie.title}
                    className="w-full h-48 object-cover rounded-t-lg"
                    onError={(e) => {
                      e.target.src = '/placeholder-movie.jpg';
                    }}
                  />
                  <div className="p-3">
                    <h3 className="font-semibold text-dark-100 text-sm group-hover:text-primary-400 transition-colors line-clamp-2">
                      {similarMovie.title}
                    </h3>
                    <div className="flex items-center gap-2 mt-2">
                      <div className="flex">{renderStars(similarMovie.vote_average)}</div>
                      <span className="text-xs text-dark-400">
                        {similarMovie.vote_average?.toFixed(1)}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default MovieDetails;
