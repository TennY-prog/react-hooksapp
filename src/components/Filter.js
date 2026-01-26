import React, { useState } from 'react';

const Filter = ({ onFilterChange }) => {
  const [title, setTitle] = useState('');
  const [rating, setRating] = useState('');

  const handleTitleChange = (e) => {
    const newTitle = e.target.value;
    setTitle(newTitle);
    onFilterChange({ title: newTitle, rating });
  };

  const handleRatingChange = (e) => {
    const newRating = e.target.value;
    setRating(newRating);
    onFilterChange({ title, rating: newRating });
  };

  const clearFilters = () => {
    setTitle('');
    setRating('');
    onFilterChange({ title: '', rating: '' });
  };

  return (
    <div className="filter-container">
      <div className="filter-header">
        <h2>Filter Movies</h2>
        <button onClick={clearFilters} className="clear-btn">
          Clear Filters
        </button>
      </div>
      
      <div className="filter-inputs">
        <div className="filter-group">
          <label htmlFor="title-filter">Title:</label>
          <input
            type="text"
            id="title-filter"
            placeholder="Search by title..."
            value={title}
            onChange={handleTitleChange}
          />
        </div>
        
        <div className="filter-group">
          <label htmlFor="rating-filter">Minimum Rating:</label>
          <select
            id="rating-filter"
            value={rating}
            onChange={handleRatingChange}
          >
            <option value="">All Ratings</option>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
              <option key={num} value={num}>{num}+</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default Filter;