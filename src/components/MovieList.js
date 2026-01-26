import React from 'react';
import MovieCard from './Moviecard';

const MovieList = ({ movies }) => {
  return (
    <div className="movie-list">
      {movies.length === 0 ? (
        <p className="no-movies">No movies found. Try adjusting your filters.</p>
      ) : (
        movies.map((movie, index) => (
          <MovieCard key={index} movie={movie} />
        ))
      )}
    </div>
  );
};

export default MovieList;