import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';

const MovieDetail = ({ movies }) => {
  const { title } = useParams();
  const navigate = useNavigate();
  
  // Decode the title from URL
  const decodedTitle = decodeURIComponent(title);
  
  // Find the movie by title
  const movie = movies.find(m => m.title === decodedTitle);
  
  if (!movie) {
    return (
      <div className="movie-detail">
        <div className="movie-not-found">
          <h2>Movie Not Found</h2>
          <p>The movie you're looking for doesn't exist in our collection.</p>
          <Link to="/" className="back-button">← Back to Home</Link>
        </div>
      </div>
    );
  }
  
  return (
    <div className="movie-detail">
      <div className="detail-header">
        <button onClick={() => navigate(-1)} className="back-button">
          ← Back
        </button>
        <Link to="/" className="home-button">
          🏠 Home
        </Link>
      </div>
      
      <div className="detail-content">
        <div className="detail-left">
          <img 
            src={movie.posterURL} 
            alt={movie.title}
            className="detail-poster"
            onError={(e) => {
              e.target.src = 'https://via.placeholder.com/400x600?text=No+Poster';
            }}
          />
          <div className="movie-stats">
            <div className="stat-item">
              <span className="stat-label">Rating:</span>
              <span className="stat-value">{movie.rating}/10</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Stars:</span>
              <span className="stars-large">{"★".repeat(Math.round(movie.rating))}</span>
            </div>
          </div>
        </div>
        
        <div className="detail-right">
          <h1 className="detail-title">{movie.title}</h1>
          
          <div className="description-section">
            <h3>Description</h3>
            <p className="full-description">{movie.description}</p>
          </div>
          
          <div className="trailer-section">
            <h3>Official Trailer</h3>
            {movie.trailer ? (
              <div className="trailer-container">
                <iframe
                  width="100%"
                  height="400"
                  src={movie.trailer}
                  title={`${movie.title} Trailer`}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
                <p className="trailer-note">
                  If the trailer doesn't load, <a href={movie.trailer.replace('embed/', 'watch?v=')} target="_blank" rel="noopener noreferrer">click here to watch on YouTube</a>
                </p>
              </div>
            ) : (
              <p className="no-trailer">No trailer available for this movie.</p>
            )}
          </div>
          
          <div className="action-buttons">
            <button onClick={() => navigate(-1)} className="secondary-button">
              ← Go Back
            </button>
            <Link to="/" className="primary-button">
              🏠 Return to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;