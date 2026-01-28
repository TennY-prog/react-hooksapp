import React from 'react';
import { Link } from 'react-router-dom';

const MovieCard = ({ movie }) => {
  return (
    <Link to={`/movie/${encodeURIComponent(movie.title)}`} className="movie-card-link">
      <div className="movie-card">
        <img 
          src={movie.posterURL} 
          alt={movie.title} 
          className="movie-poster"
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/300x450?text=No+Poster';
          }}
        />
        <div className="movie-info">
          <h3 className="movie-title">{movie.title}</h3>
          <p className="movie-description">
            {movie.description.length > 100 
              ? `${movie.description.substring(0, 100)}...` 
              : movie.description}
          </p>
          <div className="movie-rating">
            <span className="stars">{"★".repeat(Math.round(movie.rating))}</span>
            <span className="rating-number">({movie.rating}/10)</span>
          </div>
          <div className="movie-click-hint">
            <span>Click for details →</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default MovieCard;