import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Grid } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/grid';
import './ProductList.css';
import ProductCard from './ProductCard';
import config from '../config';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    minPrice: '',
    maxPrice: '',
    minPopularity: '',
    maxPopularity: ''
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async (filterParams = {}) => {
    try {
      setLoading(true);
      
      // Local JSON dosyasından veri çek
      const response = await fetch('/products.json');
      const rawProducts = await response.json();
      
      // Backend'deki gibi price hesapla ve format et
      const goldPrice = 65.0; // Sabit altın fiyatı
      const formattedProducts = rawProducts.map((product, index) => ({
        id: index + 1,
        name: product.name,
        popularityScore: product.popularityScore,
        weight: product.weight,
        images: product.images,
        price: (product.popularityScore + 1) * product.weight * goldPrice,
        rating: (product.popularityScore * 5).toFixed(1)
      }));
      
      // Filter uygula
      let filtered = formattedProducts;
      if (filterParams.minPrice) filtered = filtered.filter(p => p.price >= parseFloat(filterParams.minPrice));
      if (filterParams.maxPrice) filtered = filtered.filter(p => p.price <= parseFloat(filterParams.maxPrice));
      if (filterParams.minPopularity) filtered = filtered.filter(p => p.popularityScore >= parseFloat(filterParams.minPopularity));
      if (filterParams.maxPopularity) filtered = filtered.filter(p => p.popularityScore <= parseFloat(filterParams.maxPopularity));
      
      setProducts(filtered);
      setError(null);
    } catch (err) {
      setError('Error loading products');
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const applyFilters = () => {
    fetchProducts(filters);
  };

  const clearFilters = () => {
    const clearedFilters = {
      minPrice: '',
      maxPrice: '',
      minPopularity: '',
      maxPopularity: ''
    };
    setFilters(clearedFilters);
    fetchProducts(clearedFilters);
  };

  if (loading) {
    return (
      <div className="product-list-container">
        <div className="loading-container">
          <div className="loading-spinner">
            <i className="fas fa-spinner fa-spin"></i>
          </div>
          <p>Loading products...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="product-list-container">
        <div className="error-container">
          <div className="error-icon">
            <i className="fas fa-exclamation-triangle"></i>
          </div>
          <h3>Error</h3>
          <p>{error}</p>
          <button onClick={() => fetchProducts()} className="retry-button">
            <i className="fas fa-redo"></i>
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="product-list-container">
      <div className="filters-section">
        <h3>Filters</h3>
        <div className="filters-grid">
          <div className="filter-group">
            <label>Min Price ($)</label>
            <input
              type="number"
              name="minPrice"
              value={filters.minPrice}
              onChange={handleFilterChange}
              placeholder="0"
              min="0"
            />
          </div>
          <div className="filter-group">
            <label>Max Price ($)</label>
            <input
              type="number"
              name="maxPrice"
              value={filters.maxPrice}
              onChange={handleFilterChange}
              placeholder="1000"
              min="0"
            />
          </div>
          <div className="filter-group">
            <label>Min Popularity</label>
            <input
              type="number"
              name="minPopularity"
              value={filters.minPopularity}
              onChange={handleFilterChange}
              placeholder="0"
              min="0"
              max="1"
              step="0.1"
            />
          </div>
          <div className="filter-group">
            <label>Max Popularity</label>
            <input
              type="number"
              name="maxPopularity"
              value={filters.maxPopularity}
              onChange={handleFilterChange}
              placeholder="1"
              min="0"
              max="1"
              step="0.1"
            />
          </div>
        </div>
        <div className="filter-actions">
          <button onClick={applyFilters} className="apply-filters-btn">
            <i className="fas fa-filter"></i>
            Apply Filters
          </button>
          <button onClick={clearFilters} className="clear-filters-btn">
            <i className="fas fa-times"></i>
            Clear
          </button>
        </div>
      </div>

      <div className="products-header">
        <p className="products-count">
          {products.length} products found
        </p>
      </div>

      {products.length > 0 ? (
        <div className="products-carousel">
          <Swiper
            modules={[Navigation, Pagination, Grid]}
            spaceBetween={30}
            slidesPerView={1}
            navigation={{
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev',
            }}
            pagination={{
              clickable: true,
              dynamicBullets: true,
            }}
            grid={{
              rows: 1,
              fill: 'row',
            }}
            breakpoints={{
              640: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              768: {
                slidesPerView: 3,
                spaceBetween: 25,
              },
              1024: {
                slidesPerView: 4,
                spaceBetween: 30,
              },
            }}
            className="products-swiper"
          >
            {products.map((product) => (
              <SwiperSlide key={product.id}>
                <ProductCard product={product} />
              </SwiperSlide>
            ))}
          </Swiper>

          <button className="swiper-button-prev custom-nav-btn">
            <i className="fas fa-chevron-left"></i>
          </button>
          <button className="swiper-button-next custom-nav-btn">
            <i className="fas fa-chevron-right"></i>
          </button>
        </div>
      ) : (
        <div className="no-products">
          <div className="no-products-icon">
            <i className="fas fa-search"></i>
          </div>
          <h3>No Products Found</h3>
          <p>Try adjusting your filters.</p>
          <button onClick={clearFilters} className="clear-filters-btn">
            <i className="fas fa-undo"></i>
            Clear Filters
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductList; 