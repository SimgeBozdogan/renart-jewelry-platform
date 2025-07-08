import React from 'react';
import './StarRating.css';

const StarRating = ({ rating, maxStars = 5 }) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;
  const emptyStars = maxStars - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className="star-rating">
      {[...Array(fullStars)].map((_, index) => (
        <i key={`full-${index}`} className="fas fa-star star star-full"></i>
      ))}
      
      {hasHalfStar && (
        <i className="fas fa-star-half-alt star star-half"></i>
      )}
      
      {[...Array(emptyStars)].map((_, index) => (
        <i key={`empty-${index}`} className="far fa-star star star-empty"></i>
      ))}
      
      <span className="rating-text">{rating}/5</span>
    </div>
  );
};

export default StarRating; 