import React, { useState } from 'react';
import './ProductCard.css';
import ColorPicker from './ColorPicker';
import StarRating from './StarRating';

const ProductCard = ({ product }) => {
  const [selectedColor, setSelectedColor] = useState('yellow');
  const [imageLoading, setImageLoading] = useState(true);
  const [imageError, setImageError] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleColorChange = (color) => {
    setSelectedColor(color);
    setImageLoading(true);
    setImageError(false);
  };

  const formatPrice = (price) => {
    return `$${price.toFixed(2)} USD`;
  };

  return (
    <div 
      className="product-card"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="product-title-header">Product Title</div>
      
      <div className="product-image-container">
        {imageLoading && (
          <div className="image-skeleton">
            <div className="skeleton-shimmer"></div>
          </div>
        )}
        
        {imageError ? (
          <div className="image-placeholder">
            <i className="fas fa-image"></i>
            <span>Image not available</span>
          </div>
        ) : (
          <img
            src={product.images[selectedColor]}
            alt={product.name}
            className={`product-image ${imageLoading ? 'loading' : ''}`}
            onLoad={() => setImageLoading(false)}
            onError={() => {
              setImageLoading(false);
              setImageError(true);
            }}
            loading="lazy"
          />
        )}
      </div>

      <div className="product-info">
        <h3 className="product-name">{product.name}</h3>
        <div className="product-price">{formatPrice(product.price)}</div>
        
        <div className="product-colors">
          <ColorPicker
            colors={product.images}
            selectedColor={selectedColor}
            onColorChange={handleColorChange}
            showColorName={isHovered}
          />
        </div>

        <div className="product-rating">
          <StarRating rating={parseFloat(product.rating)} />
        </div>
      </div>
    </div>
  );
};

export default ProductCard; 