const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  overview: {
    type: String,
    required: true
  },
  poster_path: {
    type: String,
    required: true
  },
  backdrop_path: {
    type: String
  },
  release_date: {
    type: Date,
    required: true
  },
  runtime: {
    type: Number, // in minutes
    required: true
  },
  genres: [{
    id: Number,
    name: String
  }],
  vote_average: {
    type: Number,
    default: 0,
    min: 0,
    max: 10
  },
  vote_count: {
    type: Number,
    default: 0
  },
  popularity: {
    type: Number,
    default: 0
  },
  original_language: {
    type: String,
    required: true
  },
  original_title: {
    type: String,
    required: true
  },
  adult: {
    type: Boolean,
    default: false
  },
  video: {
    type: Boolean,
    default: false
  },
  production_companies: [{
    id: Number,
    name: String,
    logo_path: String,
    origin_country: String
  }],
  production_countries: [{
    iso_3166_1: String,
    name: String
  }],
  spoken_languages: [{
    iso_639_1: String,
    name: String
  }],
  status: {
    type: String,
    enum: ['Rumored', 'Planned', 'In Production', 'Post Production', 'Released', 'Canceled'],
    default: 'Released'
  },
  tagline: {
    type: String
  },
  homepage: {
    type: String
  },
  imdb_id: {
    type: String
  },
  revenue: {
    type: Number,
    default: 0
  },
  budget: {
    type: Number,
    default: 0
  },
  trailer_url: {
    type: String // YouTube embed URL
  },
  cast: [{
    id: Number,
    name: String,
    character: String,
    profile_path: String,
    order: Number
  }],
  crew: [{
    id: Number,
    name: String,
    job: String,
    department: String,
    profile_path: String
  }],
  keywords: [{
    id: Number,
    name: String
  }],
  similar_movies: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Movie'
  }],
  recommendations: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Movie'
  }],
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
movieSchema.pre('save', function(next) {
  this.updated_at = new Date();
  next();
});

// Index for search functionality
movieSchema.index({ title: 'text', overview: 'text', tagline: 'text' });
movieSchema.index({ 'genres.name': 1 });
movieSchema.index({ release_date: -1 });
movieSchema.index({ vote_average: -1 });
movieSchema.index({ popularity: -1 });

module.exports = mongoose.model('Movie', movieSchema);
