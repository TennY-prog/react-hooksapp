import React, { useState } from 'react';

const AddMovie = ({ onAddMovie }) => {
  const [newMovie, setNewMovie] = useState({
    title: '',
    description: '',
    posterURL: '',
    rating: ''
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
      alert('Please fill in all fields');
      return;
    }

    const movieToAdd = {
      ...newMovie,
      rating: parseFloat(newMovie.rating)
    };

    onAddMovie(movieToAdd);
    
    // Reset form
    setNewMovie({
      title: '',
      description: '',
      posterURL: '',
      rating: ''
    });
  };

  return (
    <div className="add-movie-container">
      <h2>Add New Movie</h2>
      <form onSubmit={handleSubmit} className="add-movie-form">
        <div className="form-group">
          <label>Title:</label>
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
          <label>Description:</label>
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
          <label>Poster URL:</label>
          <input
            type="url"
            name="posterURL"
            value={newMovie.posterURL}
            onChange={handleChange}
            placeholder="Enter poster image URL"
            required
          />
        </div>
        
        <div className="form-group">
          <label>Rating (1-10):</label>
          <input
            type="number"
            name="rating"
            value={newMovie.rating}
            onChange={handleChange}
            min="1"
            max="10"
            step="0.1"
            placeholder="Enter rating"
            required
          />
        </div>
        
        <button type="submit" className="submit-btn">
          Add Movie
        </button>
      </form>
    </div>
  );
};

export default AddMovie;