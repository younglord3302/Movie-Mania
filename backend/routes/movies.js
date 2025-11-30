const express = require('express');
const mongoose = require('mongoose');
const Movie = require('../models/Movie');
const Review = require('../models/Review');
const { body, param, query, validationResult } = require('express-validator');

const router = express.Router();

// Validation middleware
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

// @route   GET /api/movies
// @desc    Get all movies with filtering and pagination
// @access  Public
router.get('/', async (req, res) => {
  try {
    const {
      page = 1,
      limit = 20,
      genre,
      year,
      sortBy = 'popularity',
      sortOrder = 'desc',
      search
    } = req.query;

    // Build filter object
    let filter = {};

    if (genre) {
      filter['genres.name'] = genre;
    }

    if (year) {
      const startDate = new Date(year, 0, 1); // January 1st of the year
      const endDate = new Date(year + 1, 0, 1); // January 1st of next year
      filter.release_date = { $gte: startDate, $lt: endDate };
    }

    if (search) {
      filter.$text = { $search: search };
    }

    // Build sort object
    const sort = {};
    sort[sortBy] = sortOrder === 'desc' ? -1 : 1;

    // Execute query with pagination
    const movies = await Movie.find(filter)
      .sort(sort)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .select('-__v'); // Exclude version field

    // Get total count for pagination
    const total = await Movie.countDocuments(filter);
    const totalPages = Math.ceil(total / limit);

    res.json({
      movies,
      pagination: {
        currentPage: page,
        totalPages,
        totalMovies: total,
        hasNext: page < totalPages,
        hasPrev: page > 1
      }
    });

  } catch (error) {
    console.error('Error fetching movies:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/movies/genres
// @desc    Get all unique genres
// @access  Public
router.get('/genres', async (req, res) => {
  try {
    const genres = await Movie.distinct('genres.name');
    res.json({ genres: genres.sort() });
  } catch (error) {
    console.error('Error fetching genres:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/movies/:id
// @desc    Get single movie by ID
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id)
      .populate('similar_movies', 'title poster_path vote_average')
      .select('-__v');

    if (!movie) {
      return res.status(404).json({ message: 'Movie not found' });
    }

    // Get movie reviews and ratings
    const reviews = await Review.find({ movie: req.params.id, isDeleted: false })
      .populate('user', 'username avatar')
      .sort({ created_at: -1 })
      .limit(10);

    const ratingStats = await Review.aggregate([
      { $match: { movie: new mongoose.Types.ObjectId(req.params.id), isDeleted: false } },
      {
        $group: {
          _id: null,
          averageRating: { $avg: '$rating' },
          totalReviews: { $sum: 1 },
          ratingDistribution: {
            $push: '$rating'
          }
        }
      }
    ]);

    const movieData = movie.toObject();
    movieData.reviews = reviews;
    movieData.ratingStats = ratingStats.length > 0 ? {
      averageRating: Math.round(ratingStats[0].averageRating * 10) / 10,
      totalReviews: ratingStats[0].totalReviews,
      ratingDistribution: ratingStats[0].ratingDistribution
    } : {
      averageRating: 0,
      totalReviews: 0,
      ratingDistribution: []
    };

    res.json(movieData);

  } catch (error) {
    console.error('Error fetching movie:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/movies/:id/similar
// @desc    Get similar movies
// @access  Public
router.get('/:id/similar', async (req, res) => {
  try {
    const limit = req.query.limit || 10;

    const movie = await Movie.findById(req.params.id);
    if (!movie) {
      return res.status(404).json({ message: 'Movie not found' });
    }

    // Get similar movies based on genres and directors
    const similarMovies = await Movie.find({
      _id: { $ne: req.params.id },
      $or: [
        { 'genres.name': { $in: movie.genres.map(g => g.name) } },
        { 'crew.name': { $in: movie.crew.filter(c => c.job === 'Director').map(c => c.name) } }
      ]
    })
    .limit(limit)
    .select('title poster_path vote_average release_date genres')
    .sort({ vote_average: -1, popularity: -1 });

    res.json({ similarMovies });

  } catch (error) {
    console.error('Error fetching similar movies:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/movies/:id/reviews
// @desc    Get reviews for a movie
// @access  Public
router.get('/:id/reviews', async (req, res) => {
  try {
    const {
      page = 1,
      limit = 20,
      sortBy = 'created_at',
      sortOrder = 'desc'
    } = req.query;

    const sort = {};
    if (sortBy === 'helpful') {
      sort.helpful = sortOrder === 'desc' ? -1 : 1;
    } else {
      sort[sortBy] = sortOrder === 'desc' ? -1 : 1;
    }

    const reviews = await Review.find({
      movie: req.params.id,
      isDeleted: false
    })
    .populate('user', 'username avatar')
    .sort(sort)
    .limit(limit * 1)
    .skip((page - 1) * limit);

    const total = await Review.countDocuments({
      movie: req.params.id,
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
    console.error('Error fetching reviews:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/movies/:id/reviews
// @desc    Add a review for a movie
// @access  Private (requires authentication)
router.post('/:id/reviews', async (req, res) => {
  try {
    const { rating, content, title, spoiler } = req.body;
    const movieId = req.params.id;
    const userId = req.user.id; // From auth middleware

    // Check if movie exists
    const movie = await Movie.findById(movieId);
    if (!movie) {
      return res.status(404).json({ message: 'Movie not found' });
    }

    // Check if user already reviewed this movie
    const existingReview = await Review.findOne({
      user: userId,
      movie: movieId,
      isDeleted: false
    });

    if (existingReview) {
      return res.status(400).json({ message: 'You have already reviewed this movie' });
    }

    // Create review
    const review = new Review({
      user: userId,
      movie: movieId,
      rating,
      content,
      title: title || '',
      spoiler: spoiler || false
    });

    await review.save();

    // Populate user data
    await review.populate('user', 'username avatar');

    res.status(201).json(review);

  } catch (error) {
    console.error('Error creating review:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
