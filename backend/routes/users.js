const express = require('express');
const User = require('../models/User');
const Review = require('../models/Review');
const Movie = require('../models/Movie');
const { param, query, validationResult } = require('express-validator');

const router = express.Router();

// Validation middleware
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

// @route   GET /api/users/:id
// @desc    Get user profile by ID
// @access  Public
router.get('/:id', [
  param('id').isMongoId().withMessage('Invalid user ID'),
  handleValidationErrors
], async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
      .select('-password -email -__v')
      .populate('favorites', 'title poster_path vote_average release_date')
      .populate('watchlist', 'title poster_path vote_average release_date')
      .populate('following', 'username avatar')
      .populate('followers', 'username avatar');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Get user's reviews with movie info
    const reviews = await Review.find({ user: req.params.id, isDeleted: false })
      .populate('movie', 'title poster_path vote_average')
      .sort({ created_at: -1 })
      .limit(20);

    const userData = user.toObject();
    userData.reviews = reviews;

    res.json(userData);

  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/users/:id/reviews
// @desc    Get user's reviews
// @access  Public
router.get('/:id/reviews', [
  param('id').isMongoId().withMessage('Invalid user ID'),
  query('page').optional().isInt({ min: 1 }).toInt(),
  query('limit').optional().isInt({ min: 1, max: 50 }).toInt(),
  handleValidationErrors
], async (req, res) => {
  try {
    const { page = 1, limit = 20 } = req.query;

    const reviews = await Review.find({
      user: req.params.id,
      isDeleted: false
    })
    .populate('movie', 'title poster_path vote_average release_date')
    .sort({ created_at: -1 })
    .limit(limit * 1)
    .skip((page - 1) * limit);

    const total = await Review.countDocuments({
      user: req.params.id,
      isDeleted: false
    });

    res.json({
      reviews,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        totalReviews: total
      }
    });

  } catch (error) {
    console.error('Error fetching user reviews:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/users/:id/follow
// @desc    Follow/unfollow a user
// @access  Private
router.post('/:id/follow', [
  param('id').isMongoId().withMessage('Invalid user ID'),
  handleValidationErrors
], async (req, res) => {
  try {
    const targetUserId = req.params.id;
    const currentUserId = req.user.id;

    if (targetUserId === currentUserId) {
      return res.status(400).json({ message: 'Cannot follow yourself' });
    }

    const targetUser = await User.findById(targetUserId);
    const currentUser = await User.findById(currentUserId);

    if (!targetUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if already following
    const isFollowing = currentUser.following.includes(targetUserId);

    if (isFollowing) {
      // Unfollow
      currentUser.following = currentUser.following.filter(id => id.toString() !== targetUserId);
      targetUser.followers = targetUser.followers.filter(id => id.toString() !== currentUserId);
      await currentUser.save();
      await targetUser.save();
      res.json({ message: 'Unfollowed successfully' });
    } else {
      // Follow
      currentUser.following.push(targetUserId);
      targetUser.followers.push(currentUserId);
      await currentUser.save();
      await targetUser.save();
      res.json({ message: 'Followed successfully' });
    }

  } catch (error) {
    console.error('Error following user:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/users/:id/following
// @desc    Get users that the specified user is following
// @access  Public
router.get('/:id/following', [
  param('id').isMongoId().withMessage('Invalid user ID'),
  query('page').optional().isInt({ min: 1 }).toInt(),
  query('limit').optional().isInt({ min: 1, max: 50 }).toInt(),
  handleValidationErrors
], async (req, res) => {
  try {
    const { page = 1, limit = 20 } = req.query;

    const user = await User.findById(req.params.id)
      .populate('following', 'username avatar bio stats')
      .select('following');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const following = user.following.slice((page - 1) * limit, page * limit);

    res.json({
      following,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(user.following.length / limit),
        totalFollowing: user.following.length
      }
    });

  } catch (error) {
    console.error('Error fetching following:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/users/:id/followers
// @desc    Get users that follow the specified user
// @access  Public
router.get('/:id/followers', [
  param('id').isMongoId().withMessage('Invalid user ID'),
  query('page').optional().isInt({ min: 1 }).toInt(),
  query('limit').optional().isInt({ min: 1, max: 50 }).toInt(),
  handleValidationErrors
], async (req, res) => {
  try {
    const { page = 1, limit = 20 } = req.query;

    const user = await User.findById(req.params.id)
      .populate('followers', 'username avatar bio stats')
      .select('followers');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const followers = user.followers.slice((page - 1) * limit, page * limit);

    res.json({
      followers,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(user.followers.length / limit),
        totalFollowers: user.followers.length
      }
    });

  } catch (error) {
    console.error('Error fetching followers:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/users/favorites/:movieId
// @desc    Add/remove movie from favorites
// @access  Private
router.post('/favorites/:movieId', [
  param('movieId').isMongoId().withMessage('Invalid movie ID'),
  handleValidationErrors
], async (req, res) => {
  try {
    const movieId = req.params.movieId;
    const userId = req.user.id;

    const user = await User.findById(userId);
    const movie = await Movie.findById(movieId);

    if (!movie) {
      return res.status(404).json({ message: 'Movie not found' });
    }

    // Check if already in favorites
    const isFavorite = user.favorites.includes(movieId);

    if (isFavorite) {
      // Remove from favorites
      user.favorites = user.favorites.filter(id => id.toString() !== movieId);
      user.stats.favoritesCount = Math.max(0, user.stats.favoritesCount - 1);
      await user.save();
      res.json({ message: 'Removed from favorites' });
    } else {
      // Add to favorites
      user.favorites.push(movieId);
      user.stats.favoritesCount += 1;
      await user.save();
      res.json({ message: 'Added to favorites' });
    }

  } catch (error) {
    console.error('Error updating favorites:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/users/watchlist/:movieId
// @desc    Add/remove movie from watchlist
// @access  Private
router.post('/watchlist/:movieId', [
  param('movieId').isMongoId().withMessage('Invalid movie ID'),
  handleValidationErrors
], async (req, res) => {
  try {
    const movieId = req.params.movieId;
    const userId = req.user.id;

    const user = await User.findById(userId);
    const movie = await Movie.findById(movieId);

    if (!movie) {
      return res.status(404).json({ message: 'Movie not found' });
    }

    // Check if already in watchlist
    const isInWatchlist = user.watchlist.includes(movieId);

    if (isInWatchlist) {
      // Remove from watchlist
      user.watchlist = user.watchlist.filter(id => id.toString() !== movieId);
      user.stats.watchlistCount = Math.max(0, user.stats.watchlistCount - 1);
      await user.save();
      res.json({ message: 'Removed from watchlist' });
    } else {
      // Add to watchlist
      user.watchlist.push(movieId);
      user.stats.watchlistCount += 1;
      await user.save();
      res.json({ message: 'Added to watchlist' });
    }

  } catch (error) {
    console.error('Error updating watchlist:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/users/watched/:movieId
// @desc    Mark movie as watched with rating and review
// @access  Private
router.post('/watched/:movieId', [
  param('movieId').isMongoId().withMessage('Invalid movie ID'),
  handleValidationErrors
], async (req, res) => {
  try {
    const movieId = req.params.movieId;
    const userId = req.user.id;
    const { rating, review } = req.body;

    const user = await User.findById(userId);
    const movie = await Movie.findById(movieId);

    if (!movie) {
      return res.status(404).json({ message: 'Movie not found' });
    }

    // Check if already watched
    const existingWatched = user.watched.find(w => w.movie.toString() === movieId);

    if (existingWatched) {
      // Update existing entry
      if (rating !== undefined) existingWatched.rating = rating;
      if (review !== undefined) existingWatched.review = review;
      existingWatched.watchedAt = new Date();
    } else {
      // Add new entry
      user.watched.push({
        movie: movieId,
        rating: rating || null,
        review: review || '',
        watchedAt: new Date()
      });
      user.stats.moviesWatched += 1;
    }

    await user.save();

    res.json({
      message: existingWatched ? 'Watched status updated' : 'Movie marked as watched'
    });

  } catch (error) {
    console.error('Error updating watched movies:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
