import React, { useRef, useCallback, memo } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import MovieCard from './MovieCard';

const MovieCarousel = memo(({ movies }) => {
  const scrollRef = useRef(null);

  const scrollLeft = useCallback(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -320, behavior: 'smooth' });
    }
  }, []);

  const scrollRight = useCallback(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 320, behavior: 'smooth' });
    }
  }, []);

  if (!movies || movies.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-dark-400 text-lg">No movies available</p>
      </div>
    );
  }

  return (
    <div className="relative">
      {/* Navigation buttons - positioned outside the scroll area */}
      <button
        onClick={scrollLeft}
        className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-dark-800 bg-opacity-90 hover:bg-opacity-100 text-white p-3 rounded-full transition-all duration-300 shadow-lg hover:scale-110"
        aria-label="Scroll left"
      >
        <ChevronLeftIcon className="h-6 w-6" />
      </button>

      <button
        onClick={scrollRight}
        className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-dark-800 bg-opacity-90 hover:bg-opacity-100 text-white p-3 rounded-full transition-all duration-300 shadow-lg hover:scale-110"
        aria-label="Scroll right"
      >
        <ChevronRightIcon className="h-6 w-6" />
      </button>

      {/* Scrollable container */}
      <div
        ref={scrollRef}
        className="flex overflow-x-auto scrollbar-hide gap-6 pb-4 px-12"
      >
        {movies.map((movie) => (
          <div
            key={movie._id}
            className="flex-shrink-0 w-72"
          >
            <MovieCard movie={movie} showActions={false} />
          </div>
        ))}
      </div>
    </div>
  );
});

MovieCarousel.displayName = 'MovieCarousel';

export default MovieCarousel;
