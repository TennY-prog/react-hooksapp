import React, { useState } from 'react';

const AddMovie = ({ onAddMovie }) => {
  const [newMovie, setNewMovie] = useState({
    title: '',
    description: '',
    posterURL: '',
    rating: '',
    trailer: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewMovie(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!newMovie.title || !newMovie.description || !newMovie.posterURL || !newMovie.rating) {
      alert('Please fill in all required fields (Title, Description, Poster URL, Rating)');
      return;
    }

    // Convert YouTube watch URL to embed URL if needed
    let trailerUrl = newMovie.trailer;
    if (trailerUrl && trailerUrl.includes('youtube.com/watch?v=')) {
      trailerUrl = trailerUrl.replace('watch?v=', 'embed/');
    }

    const movieToAdd = {
      ...newMovie,
      rating: parseFloat(newMovie.rating),
      trailer: trailerUrl
    };

    onAddMovie(movieToAdd);
    
    // Reset form
    setNewMovie({
      title: '',
      description: '',
      posterURL: '',
      rating: '',
      trailer: ''
    });
    
    alert('Movie added successfully!');
  };

  return (
    <div className="add-movie-container">
      <h2>Add New Movie</h2>
      <form onSubmit={handleSubmit} className="add-movie-form">
        <div className="form-group">
          <label>Title: *</label>
          <input
            type="text"
            name="title"
            value={newMovie.title}
            onChange={handleChange}
            placeholder="Enter movie title"
            required
          />
        </div>
        
        <div className="form-group">
          <label>Description: *</label>
          <textarea
            name="description"
            value={newMovie.description}
            onChange={handleChange}
            placeholder="Enter movie description"
            rows="3"
            required
          />
        </div>
        
        <div className="form-group">
          <label>Poster URL: *</label>
          <input
            type="url"
            name="posterURL"
            value={newMovie.posterURL}
            onChange={handleChange}
            placeholder="https://example.com/poster.jpg"
            required
          />
        </div>
        
        <div className="form-group">
          <label>Rating (1-10): *</label>
          <input
            type="number"
            name="rating"
            value={newMovie.rating}
            onChange={handleChange}
            min="1"
            max="10"
            step="0.1"
            placeholder="8.5"
            required
          />
        </div>
        
        <div className="form-group">
          <label>Trailer URL (YouTube):</label>
          <input
            type="url"
            name="trailer"
            value={newMovie.trailer}
            onChange={handleChange}
            placeholder="https://www.youtube.com/watch?v=VIDEO_ID or https://youtube.com/embed/VIDEO_ID"
          />
          <small className="help-text">Paste YouTube URL (optional)</small>
        </div>
        
        <button type="submit" className="submit-btn">
          Add Movie
        </button>
      </form>
    </div>
  );
};

export default AddMovie;