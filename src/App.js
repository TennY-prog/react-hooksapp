import React, { useState, useEffect } from 'react';
import MovieList from './components/Movielist';
import Filter from './components/Filter';
import AddMovie from './components/AddMovie';
import './styles.css';

const App = () => {
  // Initial movies data
  const initialMovies = [
    {
      title: "Inception",
      description: "A thief who steals corporate secrets through dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
      posterURL: "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_.jpg",
      rating: 8.8
    },
    {
      title: "The Shawshank Redemption",
      description: "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
      posterURL: "https://m.media-amazon.com/images/M/MV5BNDE3ODcxYzMtY2YzZC00NmNlLWJiNDMtZDViZWM2MzIxZDYwXkEyXkFqcGdeQXVyNjAwNDUxODI@._V1_.jpg",
      rating: 9.3
    },
    {
      title: "The Dark Knight",
      description: "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
      posterURL: "https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_.jpg",
      rating: 9.0
    },
    {
      title: "Pulp Fiction",
      description: "The lives of two mob hitmen, a boxer, a gangster and his wife intertwine in four tales of violence and redemption.",
      posterURL: "https://m.media-amazon.com/images/M/MV5BNGNhMDIzZTUtNTBlZi00MTRlLWFjM2ItYzViMjE3YzI5MjljXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_.jpg",
      rating: 8.9
    }
  ];

  // State hooks
  const [movies, setMovies] = useState(initialMovies);
  const [filteredMovies, setFilteredMovies] = useState(initialMovies);
  const [filter, setFilter] = useState({ title: '', rating: '' });

  // Filter movies whenever filter state changes
  useEffect(() => {
    const filtered = movies.filter(movie => {
      const matchesTitle = movie.title.toLowerCase().includes(filter.title.toLowerCase());
      const matchesRating = filter.rating === '' || movie.rating >= parseFloat(filter.rating);
      return matchesTitle && matchesRating;
    });
    setFilteredMovies(filtered);
  }, [movies, filter]);

  // Add new movie
  const handleAddMovie = (newMovie) => {
    setMovies(prevMovies => [...prevMovies, newMovie]);
  };

  // Update filter
  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>🎬 My Movie Collection</h1>
        <p>Your personal movie database with filtering capabilities</p>
      </header>
      
      <main className="app-content">
        <div className="left-panel">
          <AddMovie onAddMovie={handleAddMovie} />
        </div>
        
        <div className="right-panel">
          <Filter onFilterChange={handleFilterChange} />
          <div className="movies-section">
            <div className="movies-header">
              <h2>Movies ({filteredMovies.length})</h2>
              <span className="total-movies">Total in collection: {movies.length}</span>
            </div>
            <MovieList movies={filteredMovies} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;