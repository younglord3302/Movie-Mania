import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import {
  FilmIcon,
  MagnifyingGlassIcon,
  UserIcon,
  HeartIcon,
  BookmarkIcon,
  Bars3Icon,
  XMarkIcon,
  SunIcon,
  MoonIcon
} from '@heroicons/react/24/outline';

const Navbar = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const { isDarkMode, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsMenuOpen(false);
  };

  return (
    <nav className="bg-dark-800 dark:bg-dark-800 light:bg-white shadow-lg sticky top-0 z-50 transition-colors duration-300">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <FilmIcon className="h-8 w-8 text-primary-500" />
            <span className="text-xl font-bold text-dark-100 dark:text-dark-100 light:text-gray-900">Movie Mania</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link
              to="/"
              className="text-dark-200 hover:text-primary-400 transition-colors duration-200"
            >
              Home
            </Link>
            <Link
              to="/search"
              className="text-dark-200 hover:text-primary-400 transition-colors duration-200 flex items-center space-x-1"
            >
              <MagnifyingGlassIcon className="h-5 w-5" />
              <span>Search</span>
            </Link>

            {isAuthenticated ? (
              <>
                <Link
                  to="/favorites"
                  className="text-dark-200 hover:text-primary-400 transition-colors duration-200 flex items-center space-x-1"
                >
                  <HeartIcon className="h-5 w-5" />
                  <span>Favorites</span>
                </Link>
                <Link
                  to="/watchlist"
                  className="text-dark-200 hover:text-primary-400 transition-colors duration-200 flex items-center space-x-1"
                >
                  <BookmarkIcon className="h-5 w-5" />
                  <span>Watchlist</span>
                </Link>
                <div className="relative group">
                  <button className="text-dark-200 hover:text-primary-400 transition-colors duration-200 flex items-center space-x-1">
                    <UserIcon className="h-5 w-5" />
                    <span>{user?.username}</span>
                  </button>
                  <div className="absolute right-0 mt-2 w-48 bg-dark-700 rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                    <Link
                      to="/profile"
                      className="block px-4 py-2 text-sm text-dark-200 hover:bg-dark-600 hover:text-primary-400"
                    >
                      Profile
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-dark-200 hover:bg-dark-600 hover:text-primary-400"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  to="/login"
                  className="text-dark-200 hover:text-primary-400 transition-colors duration-200"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="btn-primary"
                >
                  Sign Up
                </Link>
              </div>
            )}

            {/* Theme Toggle with 3D effect */}
            <button
              onClick={toggleTheme}
              className="p-3 text-dark-200 hover:text-primary-400 transition-all duration-300 transform hover:scale-110 hover:rotate-12 hover:shadow-lg hover:shadow-primary-500/30 rounded-full bg-dark-800/50 hover:bg-dark-700/70"
              title={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}
            >
              {isDarkMode ? (
                <SunIcon className="h-5 w-5 transition-transform duration-300 hover:rotate-45" />
              ) : (
                <MoonIcon className="h-5 w-5 transition-transform duration-300 hover:-rotate-45" />
              )}
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            <button
              onClick={toggleTheme}
              className="p-2 text-dark-200 hover:text-primary-400 transition-colors duration-200"
            >
              {isDarkMode ? (
                <SunIcon className="h-5 w-5" />
              ) : (
                <MoonIcon className="h-5 w-5" />
              )}
            </button>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-dark-200 hover:text-primary-400 transition-colors duration-200"
            >
              {isMenuOpen ? (
                <XMarkIcon className="h-6 w-6" />
              ) : (
                <Bars3Icon className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-dark-700">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link
                to="/"
                className="block px-3 py-2 text-dark-200 hover:text-primary-400 transition-colors duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/search"
                className="block px-3 py-2 text-dark-200 hover:text-primary-400 transition-colors duration-200 flex items-center space-x-2"
                onClick={() => setIsMenuOpen(false)}
              >
                <MagnifyingGlassIcon className="h-5 w-5" />
                <span>Search</span>
              </Link>

              {isAuthenticated ? (
                <>
                  <Link
                    to="/favorites"
                    className="block px-3 py-2 text-dark-200 hover:text-primary-400 transition-colors duration-200 flex items-center space-x-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <HeartIcon className="h-5 w-5" />
                    <span>Favorites</span>
                  </Link>
                  <Link
                    to="/watchlist"
                    className="block px-3 py-2 text-dark-200 hover:text-primary-400 transition-colors duration-200 flex items-center space-x-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <BookmarkIcon className="h-5 w-5" />
                    <span>Watchlist</span>
                  </Link>
                  <Link
                    to="/profile"
                    className="block px-3 py-2 text-dark-200 hover:text-primary-400 transition-colors duration-200 flex items-center space-x-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <UserIcon className="h-5 w-5" />
                    <span>Profile</span>
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-3 py-2 text-dark-200 hover:text-primary-400 transition-colors duration-200"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="block px-3 py-2 text-dark-200 hover:text-primary-400 transition-colors duration-200"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="block px-3 py-2 btn-primary text-center mt-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
