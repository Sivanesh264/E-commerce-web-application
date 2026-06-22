import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const API = process.env.REACT_APP_API_URL || '';

const Home = () => {
  const [featured, setFeatured] = useState([]);

  useEffect(() => {
    fetch(`${API}/api/products?limit=4`)
      .then(res => res.json())
      .then(data => setFeatured(data.products || []))
      .catch(() => {});
  }, []);

  return (
    <div className="home">
      <section className="hero">
        <h1>Welcome to ShopEase</h1>
        <p>Discover amazing products at unbeatable prices</p>
        <Link to="/products" className="btn btn-primary">Shop Now</Link>
      </section>
      <section className="featured">
        <h2>Featured Products</h2>
        <div className="product-grid">
          {featured.map(product => (
            <div key={product._id} className="product-card">
              <div className="product-image" style={{ background: '#e0e0e0', height: 200, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {product.image ? <img src={product.image} alt={product.name} /> : <span>No Image</span>}
              </div>
              <div className="product-info">
                <h3>{product.name}</h3>
                <p className="price">${product.price.toFixed(2)}</p>
                <Link to={`/products/${product._id}`} className="btn btn-sm">View Details</Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
