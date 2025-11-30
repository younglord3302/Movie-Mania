import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import MovieCard from '../components/MovieCard';
import MovieCarousel from '../components/MovieCarousel';
import GenreFilter from '../components/GenreFilter';
import MovieClapper3D from '../components/MovieClapper3D';

const Home = () => {
  const [featuredMovies, setFeaturedMovies] = useState([]);
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchHomeData();
  }, []);

  const fetchHomeData = async () => {
    try {
      setLoading(true);
      const [moviesRes, genresRes] = await Promise.all([
        axios.get('/movies?limit=20&sortBy=popularity&sortOrder=desc'),
        axios.get('/movies/genres')
      ]);

      // Get featured movies (top 5 by popularity)
      setFeaturedMovies(moviesRes.data.movies.slice(0, 5));

      // Get trending movies (sort by vote_average)
      setTrendingMovies(moviesRes.data.movies.slice(5, 16));

      setGenres(genresRes.data.genres);
    } catch (error) {
      console.error('Error fetching home data:', error);
      setError('Failed to load movies. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleGenreChange = async (genre) => {
    setSelectedGenre(genre);
    if (genre) {
      try {
        const response = await axios.get(`/movies?genre=${genre}&limit=10`);
        setTrendingMovies(response.data.movies);
      } catch (error) {
        console.error('Error fetching movies by genre:', error);
      }
    } else {
      fetchHomeData();
    }
  };

  const LoadingSkeleton = () => (
    <div className="animate-pulse">
      <div className="h-8 bg-dark-700 rounded w-1/4 mb-6"></div>
      <div className="flex space-x-6 overflow-hidden">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="flex-shrink-0 w-72">
            <div className="bg-dark-800 rounded-lg overflow-hidden">
              <div className="h-64 bg-dark-700"></div>
              <div className="p-4">
                <div className="h-4 bg-dark-700 rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-dark-700 rounded w-1/2 mb-2"></div>
                <div className="h-3 bg-dark-700 rounded w-2/3"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="min-h-screen space-y-12 py-8">
        {/* Hero Section Skeleton */}
        <section className="relative overflow-hidden">
          <div className="bg-gradient-to-br from-primary-900 via-primary-800 to-dark-900 opacity-90 py-20 px-4">
            <div className="max-w-4xl mx-auto text-center animate-pulse">
              <div className="h-16 bg-primary-800/50 rounded w-3/4 mx-auto mb-6"></div>
              <div className="h-6 bg-primary-700/50 rounded w-2/3 mx-auto mb-4"></div>
              <div className="h-6 bg-primary-700/50 rounded w-1/2 mx-auto mb-8"></div>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <div className="h-14 bg-primary-600 rounded w-48"></div>
                <div className="h-14 bg-dark-700 rounded w-48"></div>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Movies Skeleton */}
        <section className="container mx-auto px-4">
          <LoadingSkeleton />
        </section>

        {/* Genre Filter Skeleton */}
        <section className="container mx-auto px-4">
          <div className="h-8 bg-dark-700 rounded w-1/3 mb-6 animate-pulse"></div>
          <div className="bg-dark-800 rounded-xl p-6 shadow-lg animate-pulse">
            <div className="flex flex-wrap gap-3">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="h-12 bg-dark-700 rounded-full w-32"></div>
              ))}
            </div>
          </div>
        </section>

        {/* Trending Movies Skeleton */}
        <section className="container mx-auto px-4">
          <LoadingSkeleton />
        </section>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center bg-dark-800 rounded-xl p-8 shadow-lg max-w-md w-full">
          <div className="text-6xl mb-4">😵</div>
          <h2 className="text-2xl font-bold text-dark-100 mb-4">Oops! Something went wrong</h2>
          <p className="text-red-400 text-lg mb-6">{error}</p>
          <button
            onClick={fetchHomeData}
            className="btn-primary w-full"
          >
            🔄 Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen space-y-16 py-8">
      {/* Hero Section */}
      <section className="relative overflow-hidden -mx-4 mb-16">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-900 via-primary-800 to-dark-900 opacity-90"></div>
        <div className="relative z-10 py-20 px-4 text-center">
        <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Welcome to <span className="text-primary-300">Movie Mania</span>
            </h1>
            <p className="text-xl md:text-2xl text-primary-100 mb-10 max-w-3xl mx-auto leading-relaxed">
              Discover, explore, and enjoy the world of cinema. Browse through thousands of movies,
              create your personal watchlist, and share your thoughts with the community.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link to="/search" className="bg-primary-600 hover:bg-primary-700 dark:bg-primary-600 dark:hover:bg-primary-700 light:bg-primary-600 light:hover:bg-primary-700 text-white text-xl px-10 py-4 shadow-2xl hover:shadow-primary-500/25 transform hover:scale-105 transition-all duration-300 rounded-lg">
                🎬 Explore Movies
              </Link>
              <Link to="/register" className="bg-dark-700 hover:bg-dark-600 dark:bg-dark-700 dark:hover:bg-dark-600 light:bg-gray-200 light:hover:bg-gray-300 light:text-gray-800 text-xl px-10 py-4 shadow-2xl hover:shadow-dark-500/25 transform hover:scale-105 transition-all duration-300 rounded-lg">
                👥 Join Community
              </Link>
            </div>
          </div>
        </div>

        {/* Background decoration with 3D effects */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
          {/* Floating geometric shapes */}
          <div className="absolute top-10 left-10 w-32 h-32 bg-primary-500/20 rounded-full blur-3xl float-animation layer-1"></div>
          <div className="absolute bottom-10 right-10 w-40 h-40 bg-primary-400/20 rounded-full blur-3xl float-delayed layer-2"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-primary-300/10 rounded-full blur-3xl float-animation layer-3" style={{animationDelay: '4s'}}></div>

          {/* 3D cubes */}
          <div className="absolute top-20 right-20 w-16 h-16 transform rotate-45 bg-gradient-to-br from-primary-600/30 to-primary-800/30 float-delayed" style={{animationDelay: '1s'}}></div>
          <div className="absolute bottom-20 left-20 w-12 h-12 transform rotate-12 bg-gradient-to-br from-primary-400/20 to-primary-600/20 float-animation" style={{animationDelay: '3s'}}></div>

          {/* Floating particles */}
          <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-primary-300/60 rounded-full float-delayed" style={{animationDelay: '0.5s'}}></div>
          <div className="absolute top-3/4 right-1/4 w-3 h-3 bg-primary-400/40 rounded-full float-animation" style={{animationDelay: '2.5s'}}></div>
          <div className="absolute bottom-1/4 left-1/3 w-1.5 h-1.5 bg-primary-500/80 rounded-full float-delayed" style={{animationDelay: '1.5s'}}></div>
        </div>
      </section>

      {/* 3D Model Showcase */}
      <section className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-dark-100 mb-4">
            🎬 Cinematic Experience
          </h2>
          <p className="text-dark-400 text-lg max-w-2xl mx-auto">
            Immerse yourself in our interactive 3D movie clapperboard - a symbol of cinematic magic
            brought to life through cutting-edge web technology.
          </p>
        </div>
        <div className="bg-gradient-to-br from-dark-800 via-dark-700 to-dark-800 rounded-2xl p-8 shadow-2xl border border-primary-500/20">
          <MovieClapper3D />
        </div>
      </section>

      {/* Featured Movies */}
      <section className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-dark-100">⭐ Featured Movies</h2>
          <Link to="/search" className="text-primary-400 hover:text-primary-300 transition-colors flex items-center space-x-2 text-lg">
            <span>View All</span>
            <span>→</span>
          </Link>
        </div>
        <MovieCarousel movies={featuredMovies} />
      </section>

      {/* Genre Filter */}
      <section className="container mx-auto px-4">
        <div className="mb-8">
          <GenreFilter
            genres={genres}
            selectedGenre={selectedGenre}
            onGenreChange={handleGenreChange}
          />
        </div>
      </section>

      {/* Trending Movies */}
      <section className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-dark-100 flex items-center space-x-2">
            <span>🔥</span>
            <span>{selectedGenre ? `${selectedGenre} Movies` : 'Trending Now'}</span>
          </h2>
          <Link to="/search" className="text-primary-400 hover:text-primary-300 transition-colors flex items-center space-x-2 text-lg">
            <span>View All</span>
            <span>→</span>
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {trendingMovies.map((movie) => (
            <MovieCard key={movie._id} movie={movie} />
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className="container mx-auto px-4">
        <div className="bg-gradient-to-r from-dark-800 to-dark-700 rounded-xl p-8 shadow-2xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="transform hover:scale-105 transition-transform duration-300">
              <div className="text-4xl md:text-5xl font-bold text-primary-400 mb-2">
                {trendingMovies.length}+
              </div>
              <div className="text-dark-300 text-lg">Movies Available</div>
            </div>
            <div className="transform hover:scale-105 transition-transform duration-300">
              <div className="text-4xl md:text-5xl font-bold text-primary-400 mb-2">
                {genres.length}
              </div>
              <div className="text-dark-300 text-lg">Genres</div>
            </div>
            <div className="transform hover:scale-105 transition-transform duration-300">
              <div className="text-4xl md:text-5xl font-bold text-primary-400 mb-2">
                24/7
              </div>
              <div className="text-dark-300 text-lg">Streaming</div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="container mx-auto px-4">
        <div className="bg-gradient-to-r from-primary-900 via-primary-800 to-primary-900 rounded-xl p-8 md:p-12 text-center shadow-2xl">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Start Your Movie Journey?
          </h2>
          <p className="text-primary-100 mb-8 max-w-2xl mx-auto text-lg leading-relaxed">
            Create your account to save favorites, build a watchlist, and share reviews
            with fellow movie enthusiasts.
          </p>
          <Link to="/register" className="btn-primary text-xl px-10 py-4 shadow-2xl hover:shadow-primary-500/25 transform hover:scale-105 transition-all duration-300">
            🚀 Get Started
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
