const express = require('express');
const Review = require('../models/Review');
const Movie = require('../models/Movie');
const User = require('../models/User');
const { param, body, query, validationResult } = require('express-validator');

const router = express.Router();

// Validation middleware
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

// @route   GET /api/reviews/:id
// @desc    Get review by ID
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const review = await Review.findById(req.params.id)
      .populate('user', 'username avatar')
      .populate('movie', 'title poster_path vote_average')
      .populate('replies.user', 'username avatar');

    if (!review || review.isDeleted) {
      return res.status(404).json({ message: 'Review not found' });
    }

    res.json(review);

  } catch (error) {
    console.error('Error fetching review:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   PUT /api/reviews/:id
// @desc    Update review
// @access  Private (review owner only)
router.put('/:id', async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);

    if (!review || review.isDeleted) {
      return res.status(404).json({ message: 'Review not found' });
    }

    // Check if user owns the review
    if (review.user.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to update this review' });
    }

    const { rating, content, title, spoiler } = req.body;

    // Update fields
    if (rating !== undefined) review.rating = rating;
    if (content !== undefined) review.content = content;
    if (title !== undefined) review.title = title;
    if (spoiler !== undefined) review.spoiler = spoiler;

    review.isEdited = true;

    await review.save();
    await review.populate('user', 'username avatar');
    await review.populate('movie', 'title poster_path vote_average');

    res.json(review);

  } catch (error) {
    console.error('Error updating review:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   DELETE /api/reviews/:id
// @desc    Delete review (soft delete)
// @access  Private (review owner or admin)
router.delete('/:id', async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);

    if (!review || review.isDeleted) {
      return res.status(404).json({ message: 'Review not found' });
    }

    // Check if user owns the review or is admin
    if (review.user.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to delete this review' });
    }

    review.isDeleted = true;
    await review.save();

    // Update user's review count
    await User.findByIdAndUpdate(review.user, {
      $inc: { 'stats.reviewsWritten': -1 }
    });

    res.json({ message: 'Review deleted successfully' });

  } catch (error) {
    console.error('Error deleting review:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/reviews/:id/helpful
// @desc    Mark review as helpful/not helpful
// @access  Private
router.post('/:id/helpful', async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    const userId = req.user.id;
    const { helpful } = req.body;

    if (!review || review.isDeleted) {
      return res.status(404).json({ message: 'Review not found' });
    }

    // Remove existing vote
    review.helpful = review.helpful.filter(vote => vote.user.toString() !== userId);
    review.notHelpful = review.notHelpful.filter(vote => vote.user.toString() !== userId);

    // Add new vote
    const voteData = { user: userId, created_at: new Date() };
    if (helpful) {
      review.helpful.push(voteData);
    } else {
      review.notHelpful.push(voteData);
    }

    await review.save();

    res.json({
      message: helpful ? 'Marked as helpful' : 'Marked as not helpful',
      helpfulCount: review.helpful.length,
      notHelpfulCount: review.notHelpful.length
    });

  } catch (error) {
    console.error('Error marking review helpful:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/reviews/:id/reply
// @desc    Add reply to review
// @access  Private
router.post('/:id/reply', async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    const { content } = req.body;

    if (!review || review.isDeleted) {
      return res.status(404).json({ message: 'Review not found' });
    }

    const reply = {
      user: req.user.id,
      content,
      created_at: new Date(),
      updated_at: new Date()
    };

    review.replies.push(reply);
    await review.save();

    // Populate user data in the new reply
    await review.populate('replies.user', 'username avatar');

    const newReply = review.replies[review.replies.length - 1];

    res.status(201).json(newReply);

  } catch (error) {
    console.error('Error adding reply:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   PUT /api/reviews/reply/:reviewId/:replyId
// @desc    Update reply
// @access  Private (reply owner only)
router.put('/reply/:reviewId/:replyId', async (req, res) => {
  try {
    const review = await Review.findById(req.params.reviewId);
    const { content } = req.body;

    if (!review || review.isDeleted) {
      return res.status(404).json({ message: 'Review not found' });
    }

    const reply = review.replies.id(req.params.replyId);

    if (!reply) {
      return res.status(404).json({ message: 'Reply not found' });
    }

    // Check if user owns the reply
    if (reply.user.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to update this reply' });
    }

    reply.content = content;
    reply.updated_at = new Date();

    await review.save();
    await review.populate('replies.user', 'username avatar');

    res.json(reply);

  } catch (error) {
    console.error('Error updating reply:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   DELETE /api/reviews/reply/:reviewId/:replyId
// @desc    Delete reply
// @access  Private (reply owner or admin)
router.delete('/reply/:reviewId/:replyId', async (req, res) => {
  try {
    const review = await Review.findById(req.params.reviewId);

    if (!review || review.isDeleted) {
      return res.status(404).json({ message: 'Review not found' });
    }

    const reply = review.replies.id(req.params.replyId);

    if (!reply) {
      return res.status(404).json({ message: 'Reply not found' });
    }

    // Check if user owns the reply or is admin
    if (reply.user.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to delete this reply' });
    }

    review.replies.pull(req.params.replyId);
    await review.save();

    res.json({ message: 'Reply deleted successfully' });

  } catch (error) {
    console.error('Error deleting reply:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/reviews/movie/:movieId
// @desc    Get reviews for a specific movie
// @access  Public
router.get('/movie/:movieId', async (req, res) => {
  try {
    const { page = 1, limit = 20, sortBy = 'created_at', sortOrder = 'desc' } = req.query;

    let sort = {};
    if (sortBy === 'helpful') {
      sort = { 'helpful': sortOrder === 'desc' ? -1 : 1 };
    } else if (sortBy === 'rating') {
      sort = { rating: sortOrder === 'desc' ? -1 : 1 };
    } else {
      sort = { created_at: sortOrder === 'desc' ? -1 : 1 };
    }

    const reviews = await Review.find({
      movie: req.params.movieId,
      isDeleted: false
    })
    .populate('user', 'username avatar')
    .populate('replies.user', 'username avatar')
    .sort(sort)
    .limit(limit * 1)
    .skip((page - 1) * limit);

    const total = await Review.countDocuments({
      movie: req.params.movieId,
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
    console.error('Error fetching movie reviews:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/reviews/user/:userId
// @desc    Get reviews by a specific user
// @access  Public
router.get('/user/:userId', [
  param('userId').isMongoId().withMessage('Invalid user ID'),
  query('page').optional().isInt({ min: 1 }).toInt(),
  query('limit').optional().isInt({ min: 1, max: 50 }).toInt(),
  handleValidationErrors
], async (req, res) => {
  try {
    const { page = 1, limit = 20 } = req.query;

    const reviews = await Review.find({
      user: req.params.userId,
      isDeleted: false
    })
    .populate('movie', 'title poster_path vote_average')
    .populate('replies.user', 'username avatar')
    .sort({ created_at: -1 })
    .limit(limit * 1)
    .skip((page - 1) * limit);

    const total = await Review.countDocuments({
      user: req.params.userId,
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

module.exports = router;
