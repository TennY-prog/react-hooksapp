import React, { useState, useMemo } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import MovieList from './components/MovieList';
import Filter from './components/Filter';
import AddMovie from './components/AddMovie';
import MovieDetail from './components/MovieDetail';
import './style.css';

// Ensure the function name starts with a CAPITAL letter
const App = () => {
  const [movies, setMovies] = useState([
    {
      title: "Inception",
      description: "A thief who steals corporate secrets through dream-sharing technology...",
      posterURL: "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_.jpg",
      rating: 8.8,
      trailer: "https://www.youtube.com/embed/YoHD9XEInc0"
    },
    {
      title: "The Shawshank Redemption",
      description: "Two imprisoned men bond over a number of years...",
      posterURL: "https://m.media-amazon.com/images/M/MV5BNDE3ODcxYzMtY2YzZC00NmNlLWJiNDMtZDViZWM2MzIxZDYwXkEyXkFqcGdeQXVyNjAwNDUxODI@._V1_.jpg",
      rating: 9.3,
      trailer: "https://www.youtube.com/embed/6hB3S9bIaco"
    }
  ]);

  const [filter, setFilter] = useState({ title: '', rating: '' });

  // Use useMemo to prevent unnecessary calculations
  const filteredMovies = useMemo(() => {
    return movies.filter(movie => {
      const titleMatch = movie.title.toLowerCase().includes(filter.title.toLowerCase());
      const ratingMatch = filter.rating === '' || movie.rating >= parseFloat(filter.rating);
      return titleMatch && ratingMatch;
    });
  }, [movies, filter]);

  const handleAddMovie = (newMovie) => {
    setMovies(prev => [...prev, newMovie]);
  };

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };

  return (
    <Router>
      <div className="app">
        <header className="app-header">
          <Link to="/" className="header-link">
            <h1>🎬 My Movie Collection</h1>
          </Link>
        </header>
        
        <Routes>
          <Route path="/" element={
            <main className="app-content">
              <div className="left-panel">
                <AddMovie onAddMovie={handleAddMovie} />
              </div>
              <div className="right-panel">
                <Filter onFilterChange={handleFilterChange} />
                <MovieList movies={filteredMovies} />
              </div>
            </main>
          } />
          
          {/* This route parameter :title matches your MovieDetail useParams */}
          <Route path="/movie/:title" element={<MovieDetail movies={movies} />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;