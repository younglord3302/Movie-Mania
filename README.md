# Movie-Mania

A full-stack movie discovery and management application built with React (frontend) and Node.js/Express (backend). Users can browse movies, create accounts, write reviews, maintain watchlists, and discover new films.

## Features

- 🔍 **Movie Search & Discovery**: Search through extensive movie database
- 👤 **User Authentication**: Register and login to access personalized features
- ⭐ **Movie Reviews**: Write and read reviews from other users
- 📋 **Watchlist & Favorites**: Keep track of movies you want to watch and your favorites
- 🎬 **Movie Details**: Comprehensive information about each movie
- 🎨 **Modern UI**: Clean, responsive design with dark/light theme support

## Tech Stack

### Frontend
- **React** - UI library
- **React Router** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **Axios** - HTTP client for API requests
- **Context API** - State management

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **JWT** - Authentication
- **bcrypt** - Password hashing

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- MongoDB
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/younglord3302/Movie-Mania.git
   cd movie-mania
   ```

2. **Install backend dependencies**
   ```bash
   cd backend
   npm install
   ```

3. **Install frontend dependencies**
   ```bash
   cd ../frontend
   npm install
   ```

4. **Set up environment variables**

   Create a `.env` file in the backend directory:
   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/movie-mania
   JWT_SECRET=your_jwt_secret_here
   TMDB_API_KEY=your_tmdb_api_key_here
   ```

5. **Seed the database** (optional)
   ```bash
   cd backend
   npm run seed
   ```

6. **Start the development servers**

   Backend:
   ```bash
   cd backend
   npm run dev
   ```

   Frontend (in a new terminal):
   ```bash
   cd frontend
   npm start
   ```

7. **Open your browser**

   Navigate to `http://localhost:3000` to view the application.

## Project Structure

```
movie-mania/
├── backend/                 # Express.js server
│   ├── models/             # MongoDB models
│   ├── routes/             # API routes
│   ├── middleware/         # Custom middleware
│   ├── utils/              # Utility functions
│   └── seed.js             # Database seeding
├── frontend/               # React application
│   ├── public/             # Static assets
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── pages/          # Page components
│   │   ├── context/        # React context providers
│   │   └── services/       # API service functions
│   └── package.json
└── README.md
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login

### Movies
- `GET /api/movies` - Get all movies
- `GET /api/movies/:id` - Get movie by ID
- `GET /api/movies/search` - Search movies

### Reviews
- `GET /api/reviews/movie/:movieId` - Get reviews for a movie
- `POST /api/reviews` - Create a review (authenticated)
- `PUT /api/reviews/:id` - Update a review (authenticated)
- `DELETE /api/reviews/:id` - Delete a review (authenticated)

### Users
- `GET /api/users/profile` - Get user profile (authenticated)
- `PUT /api/users/profile` - Update user profile (authenticated)
- `GET /api/users/watchlist` - Get user watchlist (authenticated)
- `POST /api/users/watchlist` - Add movie to watchlist (authenticated)
- `DELETE /api/users/watchlist/:movieId` - Remove from watchlist (authenticated)

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Movie data provided by [The Movie Database (TMDb)](https://www.themoviedb.org/)
- Icons and UI components inspired by modern design systems
