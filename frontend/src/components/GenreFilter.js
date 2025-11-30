import React from 'react';
import { TagIcon } from '@heroicons/react/24/outline';

const GenreFilter = ({ genres, selectedGenre, onGenreChange }) => {
  const genreEmojis = {
    'Action': '💥',
    'Adventure': '🗺️',
    'Animation': '🎨',
    'Comedy': '😂',
    'Crime': '🕵️',
    'Documentary': '📽️',
    'Drama': '🎭',
    'Family': '👨‍👩‍👧‍👦',
    'Fantasy': '🧙',
    'History': '📜',
    'Horror': '👻',
    'Music': '🎵',
    'Mystery': '🔍',
    'Romance': '💕',
    'Science Fiction': '🚀',
    'TV Movie': '📺',
    'Thriller': '😱',
    'War': '⚔️',
    'Western': '🤠'
  };

  return (
    <div className="bg-dark-800 dark:bg-dark-800 light:bg-white rounded-xl p-6 shadow-lg border dark:border-dark-700 light:border-gray-200">
      <div className="flex items-center space-x-2 mb-4">
        <TagIcon className="h-5 w-5 text-primary-400" />
        <h3 className="text-lg font-semibold text-dark-100">Browse by Genre</h3>
      </div>

      <div className="flex flex-wrap gap-3">
        <button
          onClick={() => onGenreChange('')}
          className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 transform hover:scale-105 ${
            selectedGenre === ''
              ? 'bg-primary-600 text-white shadow-lg shadow-primary-600/25'
              : 'bg-dark-700 text-dark-300 hover:bg-dark-600 hover:text-dark-100 border border-dark-600'
          }`}
        >
          🎬 All Genres
        </button>

        {genres.map((genre) => (
          <button
            key={genre}
            onClick={() => onGenreChange(genre)}
            className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 transform hover:scale-105 ${
              selectedGenre === genre
                ? 'bg-primary-600 text-white shadow-lg shadow-primary-600/25'
                : 'bg-dark-700 text-dark-300 hover:bg-dark-600 hover:text-dark-100 border border-dark-600'
            }`}
          >
            {genreEmojis[genre] || '🎭'} {genre}
          </button>
        ))}
      </div>
    </div>
  );
};

export default GenreFilter;
