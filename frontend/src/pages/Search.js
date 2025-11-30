import React, { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import MovieCard from '../components/MovieCard';
import {
  MagnifyingGlassIcon,
  AdjustmentsHorizontalIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';

const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState(null);
  const [showFilters, setShowFilters] = useState(false);

  // Search parameters
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const [selectedGenre, setSelectedGenre] = useState(searchParams.get('genre') || '');
  const [selectedYear, setSelectedYear] = useState(searchParams.get('year') || '');
  const [sortBy, setSortBy] = useState(searchParams.get('sortBy') || 'popularity');
  const [sortOrder, setSortOrder] = useState(searchParams.get('sortOrder') || 'desc');

  useEffect(() => {
    fetchGenres();
  }, []);

  const fetchGenres = async () => {
    try {
      const response = await axios.get('/movies/genres');
      setGenres(response.data.genres);
    } catch (error) {
      console.error('Error fetching genres:', error);
    }
  };

  const performSearch = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const params = new URLSearchParams();

      if (searchQuery.trim()) params.append('search', searchQuery.trim());
      if (selectedGenre) params.append('genre', selectedGenre);
      if (selectedYear) params.append('year', selectedYear);
      if (sortBy) params.append('sortBy', sortBy);
      if (sortOrder) params.append('sortOrder', sortOrder);

      const response = await axios.get(`/movies?${params.toString()}`);
      setMovies(response.data.movies);
      setPagination(response.data.pagination);

      // Update URL params
      const newSearchParams = new URLSearchParams();
      if (searchQuery.trim()) newSearchParams.set('q', searchQuery.trim());
      if (selectedGenre) newSearchParams.set('genre', selectedGenre);
      if (selectedYear) newSearchParams.set('year', selectedYear);
      if (sortBy !== 'popularity') newSearchParams.set('sortBy', sortBy);
      if (sortOrder !== 'desc') newSearchParams.set('sortOrder', sortOrder);

      setSearchParams(newSearchParams);

    } catch (error) {
      console.error('Search error:', error);
      setError('Failed to search movies. Please try again.');
      setMovies([]);
      setPagination(null);
    } finally {
      setLoading(false);
    }
  }, [searchQuery, selectedGenre, selectedYear, sortBy, sortOrder, setSearchParams]);

  useEffect(() => {
    performSearch();
  }, [performSearch]);

  const handleSearch = (e) => {
    e.preventDefault();
    performSearch();
  };

  const clearFilters = () => {
    setSelectedGenre('');
    setSelectedYear('');
    setSortBy('popularity');
    setSortOrder('desc');
  };

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 50 }, (_, i) => currentYear - i);

  return (
    <div className="space-y-6">
      {/* Search Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-dark-100 mb-4">Discover Movies</h1>
        <p className="text-xl text-dark-400 mb-8">
          Search through our extensive collection of movies
        </p>
      </div>

      {/* Search Form */}
      <form onSubmit={handleSearch} className="max-w-2xl mx-auto">
        <div className="relative">
          <MagnifyingGlassIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-dark-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for movies..."
            className="input-field w-full pl-12 pr-4 py-4 text-lg"
          />
        </div>
      </form>

      {/* Filters Toggle */}
      <div className="flex justify-center">
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center space-x-2 btn-secondary"
        >
          <AdjustmentsHorizontalIcon className="h-5 w-5" />
          <span>{showFilters ? 'Hide Filters' : 'Show Filters'}</span>
        </button>
      </div>

      {/* Filters */}
      {showFilters && (
        <div className="bg-dark-800 rounded-lg p-6 space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold text-dark-100">Filters</h3>
            <button
              onClick={clearFilters}
              className="text-primary-400 hover:text-primary-300 text-sm flex items-center space-x-1"
            >
              <XMarkIcon className="h-4 w-4" />
              <span>Clear All</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Genre Filter */}
            <div>
              <label className="block text-sm font-medium text-dark-300 mb-2">
                Genre
              </label>
              <select
                value={selectedGenre}
                onChange={(e) => setSelectedGenre(e.target.value)}
                className="input-field w-full"
              >
                <option value="">All Genres</option>
                {genres.map((genre) => (
                  <option key={genre} value={genre}>
                    {genre}
                  </option>
                ))}
              </select>
            </div>

            {/* Year Filter */}
            <div>
              <label className="block text-sm font-medium text-dark-300 mb-2">
                Release Year
              </label>
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="input-field w-full"
              >
                <option value="">All Years</option>
                {years.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort By */}
            <div>
              <label className="block text-sm font-medium text-dark-300 mb-2">
                Sort By
              </label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="input-field w-full"
              >
                <option value="popularity">Popularity</option>
                <option value="vote_average">Rating</option>
                <option value="release_date">Release Date</option>
                <option value="title">Title</option>
              </select>
            </div>

            {/* Sort Order */}
            <div>
              <label className="block text-sm font-medium text-dark-300 mb-2">
                Order
              </label>
              <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
                className="input-field w-full"
              >
                <option value="desc">Descending</option>
                <option value="asc">Ascending</option>
              </select>
            </div>
          </div>
        </div>
      )}

      {/* Results */}
      <div>
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary-500"></div>
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <p className="text-red-400 text-lg mb-4">{error}</p>
            <button onClick={performSearch} className="btn-primary">
              Try Again
            </button>
          </div>
        ) : movies.length > 0 ? (
          <>
            <div className="flex justify-between items-center mb-6">
              <p className="text-dark-400">
                Found {pagination?.totalMovies || 0} movies
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {movies.map((movie) => (
                <MovieCard key={movie._id} movie={movie} />
              ))}
            </div>

            {/* Pagination */}
            {pagination && pagination.totalPages > 1 && (
              <div className="flex justify-center mt-8">
                <div className="flex space-x-2">
                  {Array.from({ length: Math.min(5, pagination.totalPages) }, (_, i) => {
                    const page = i + 1;
                    return (
                      <button
                        key={page}
                        className={`px-4 py-2 rounded-lg ${
                          page === pagination.currentPage
                            ? 'bg-primary-600 text-white'
                            : 'bg-dark-700 text-dark-300 hover:bg-dark-600'
                        }`}
                        onClick={() => {
                          // In a real app, you'd implement pagination logic here
                          console.log('Navigate to page:', page);
                        }}
                      >
                        {page}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-12">
            <p className="text-dark-400 text-lg mb-4">
              {searchQuery || selectedGenre || selectedYear
                ? 'No movies found matching your criteria'
                : 'Start searching for movies...'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
