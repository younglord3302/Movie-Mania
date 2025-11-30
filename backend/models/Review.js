const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  movie: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Movie',
    required: true
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 10
  },
  title: {
    type: String,
    trim: true,
    maxlength: 100,
    default: ''
  },
  content: {
    type: String,
    required: true,
    trim: true,
    maxlength: 2000
  },
  spoiler: {
    type: Boolean,
    default: false
  },
  helpful: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    created_at: {
      type: Date,
      default: Date.now
    }
  }],
  notHelpful: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    created_at: {
      type: Date,
      default: Date.now
    }
  }],
  replies: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    content: {
      type: String,
      required: true,
      trim: true,
      maxlength: 1000
    },
    created_at: {
      type: Date,
      default: Date.now
    },
    updated_at: {
      type: Date,
      default: Date.now
    }
  }],
  isEdited: {
    type: Boolean,
    default: false
  },
  isDeleted: {
    type: Boolean,
    default: false
  },
  created_at: {
    type: Date,
    default: Date.now
  },
  updated_at: {
    type: Date,
    default: Date.now
  }
});

// Update the updated_at field before saving
reviewSchema.pre('save', function(next) {
  this.updated_at = new Date();
  next();
});

// Virtual for helpful count
reviewSchema.virtual('helpfulCount').get(function() {
  return this.helpful.length;
});

// Virtual for not helpful count
reviewSchema.virtual('notHelpfulCount').get(function() {
  return this.notHelpful.length;
});

// Virtual for total reactions
reviewSchema.virtual('totalReactions').get(function() {
  return this.helpful.length + this.notHelpful.length;
});

// Index for performance
reviewSchema.index({ user: 1, movie: 1 }, { unique: true }); // One review per user per movie
reviewSchema.index({ movie: 1, created_at: -1 });
reviewSchema.index({ user: 1, created_at: -1 });
reviewSchema.index({ rating: -1 });
reviewSchema.index({ 'helpful': 1 });
reviewSchema.index({ 'notHelpful': 1 });

// Static method to get average rating for a movie
reviewSchema.statics.getAverageRating = async function(movieId) {
  const result = await this.aggregate([
    { $match: { movie: mongoose.Types.ObjectId(movieId), isDeleted: false } },
    {
      $group: {
        _id: '$movie',
        averageRating: { $avg: '$rating' },
        totalReviews: { $sum: 1 }
      }
    }
  ]);

  return result.length > 0 ? {
    averageRating: Math.round(result[0].averageRating * 10) / 10,
    totalReviews: result[0].totalReviews
  } : { averageRating: 0, totalReviews: 0 };
};

module.exports = mongoose.model('Review', reviewSchema);
