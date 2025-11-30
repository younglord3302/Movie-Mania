import React from 'react';
import { Link } from 'react-router-dom';
import { FilmIcon, HeartIcon, UserIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-dark-800 dark:bg-dark-800 light:bg-gray-100 border-t dark:border-dark-700 light:border-gray-200 mt-16 transition-colors duration-300">
      <div className="container mx-auto px-4 py-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <FilmIcon className="h-8 w-8 text-primary-400" />
              <span className="text-xl font-bold text-dark-100">Movie Mania</span>
            </div>
            <p className="text-dark-300 mb-4 max-w-md">
              Discover, explore, and track your favorite movies. Your ultimate movie companion for entertainment and reviews.
            </p>
            <div className="flex space-x-4">
              <button
                className="text-dark-400 hover:text-primary-400 transition-colors"
                aria-label="Facebook"
                onClick={() => window.open('https://facebook.com', '_blank')}
              >
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </button>
              <button
                className="text-dark-400 hover:text-primary-400 transition-colors"
                aria-label="Twitter"
                onClick={() => window.open('https://twitter.com', '_blank')}
              >
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
              </button>
              <button
                className="text-dark-400 hover:text-primary-400 transition-colors"
                aria-label="Instagram"
                onClick={() => window.open('https://instagram.com', '_blank')}
              >
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.017 0C8.396 0 7.992.014 6.798.067 5.614.12 4.902.245 4.28.467c-.661.236-1.223.661-1.785 1.223C1.933 2.251 1.508 2.813 1.272 3.474.245 5.146.12 5.858.067 7.042c-.053 1.194-.067 1.598-.067 5.219s.014 3.994.067 5.188c.053 1.194.178 1.906.4 2.528.236.661.661 1.223 1.223 1.785.561.561 1.123 1.002 1.785 1.223.626.236 1.338.367 2.528.42 1.194.053 1.598.067 5.219.067s3.994-.014 5.188-.067c1.194-.053 1.906-.184 2.528-.42.661-.221 1.223-.661 1.785-1.223.561-.561 1.002-1.123 1.223-1.785.236-.626.367-1.338.42-2.528.053-1.194.067-1.598.067-5.219s-.014-3.994-.067-5.188c-.053-1.194-.184-1.906-.42-2.528-.221-.661-.661-1.223-1.223-1.785C21.749 1.933 21.187 1.508 20.526 1.272 19.904 1.05 19.192.92 18.002.867 16.808.814 16.404.8 12.783.8c-3.621 0-4.025.014-5.219.067C6.371.92 5.659 1.05 5.037 1.272c-.661.236-1.223.661-1.785 1.223C2.491 3.015 2.066 3.577 1.83 4.238c-.236.626-.367 1.338-.42 2.528C1.36 7.662 1.346 8.066 1.346 11.687s.014 3.994.067 5.188c.053 1.194.178 1.906.4 2.528.236.661.661 1.223 1.223 1.785.561.561 1.123 1.002 1.785 1.223.626.236 1.338.367 2.528.42 1.194.053 1.598.067 5.219.067s3.994-.014 5.188-.067c1.194-.053 1.906-.184 2.528-.42.661-.221 1.223-.661 1.785-1.223.561-.561 1.002-1.123 1.223-1.785.236-.626.367-1.338.42-2.528.053-1.194.067-1.598.067-5.219s-.014-3.994-.067-5.188c-.053-1.194-.184-1.906-.42-2.528-.221-.661-.661-1.223-1.223-1.785C22.067 1.933 21.505 1.508 20.844 1.272 20.222 1.05 19.51.92 18.32.867 17.126.814 16.722.8 13.101.8c-3.621 0-4.025.014-5.219.067C7.671.92 6.959 1.05 6.337 1.272c-.661.236-1.223.661-1.785 1.223C4.055 3.015 3.63 3.577 3.394 4.238c-.236.626-.367 1.338-.42 2.528C2.92 7.662 2.906 8.066 2.906 11.687s.014 3.994.067 5.188c.053 1.194.178 1.906.4 2.528.236.661.661 1.223 1.223 1.785.561.561 1.123 1.002 1.785 1.223.626.236 1.338.367 2.528.42 1.194.053 1.598.067 5.219.067zM12.017 5.838a6.163 6.163 0 100 12.326 6.163 6.163 0 000-12.326zm0 10.162a3.999 3.999 0 110-7.998 3.999 3.999 0 010 7.998zm6.406-11.845a1.44 1.44 0 11-2.88 0 1.44 1.44 0 012.88 0z"/>
                </svg>
              </button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-dark-100 mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-dark-300 hover:text-primary-400 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/search" className="text-dark-300 hover:text-primary-400 transition-colors flex items-center">
                  <MagnifyingGlassIcon className="h-4 w-4 mr-2" />
                  Search Movies
                </Link>
              </li>
              <li>
                <Link to="/favorites" className="text-dark-300 hover:text-primary-400 transition-colors flex items-center">
                  <HeartIcon className="h-4 w-4 mr-2" />
                  Favorites
                </Link>
              </li>
              <li>
                <Link to="/profile" className="text-dark-300 hover:text-primary-400 transition-colors flex items-center">
                  <UserIcon className="h-4 w-4 mr-2" />
                  Profile
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-lg font-semibold text-dark-100 mb-4">Categories</h3>
            <ul className="space-y-2">
              <li>
                <button
                  className="text-dark-300 hover:text-primary-400 transition-colors text-left"
                  onClick={() => {/* TODO: Implement category filtering */}}
                >
                  Action
                </button>
              </li>
              <li>
                <button
                  className="text-dark-300 hover:text-primary-400 transition-colors text-left"
                  onClick={() => {/* TODO: Implement category filtering */}}
                >
                  Comedy
                </button>
              </li>
              <li>
                <button
                  className="text-dark-300 hover:text-primary-400 transition-colors text-left"
                  onClick={() => {/* TODO: Implement category filtering */}}
                >
                  Drama
                </button>
              </li>
              <li>
                <button
                  className="text-dark-300 hover:text-primary-400 transition-colors text-left"
                  onClick={() => {/* TODO: Implement category filtering */}}
                >
                  Sci-Fi
                </button>
              </li>
              <li>
                <button
                  className="text-dark-300 hover:text-primary-400 transition-colors text-left"
                  onClick={() => {/* TODO: Implement category filtering */}}
                >
                  Horror
                </button>
              </li>
              <li>
                <button
                  className="text-dark-300 hover:text-primary-400 transition-colors text-left"
                  onClick={() => {/* TODO: Implement category filtering */}}
                >
                  Romance
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t dark:border-dark-700 light:border-gray-200 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-dark-400 text-sm">
              © {currentYear} Movie Mania. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <button
                className="text-dark-400 hover:text-primary-400 text-sm transition-colors"
                onClick={() => {/* TODO: Open privacy policy modal */}}
              >
                Privacy Policy
              </button>
              <button
                className="text-dark-400 hover:text-primary-400 text-sm transition-colors"
                onClick={() => {/* TODO: Open terms of service modal */}}
              >
                Terms of Service
              </button>
              <button
                className="text-dark-400 hover:text-primary-400 text-sm transition-colors"
                onClick={() => {/* TODO: Open contact modal */}}
              >
                Contact Us
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
