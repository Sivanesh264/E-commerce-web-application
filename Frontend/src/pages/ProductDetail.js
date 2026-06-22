import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const API = process.env.REACT_APP_API_URL || '';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    fetch(`${API}/api/products/${id}`)
      .then(res => res.json())
      .then(data => setProduct(data))
      .catch(() => navigate('/products'));
  }, [id, navigate]);

  if (!product) return <div className="loading">Loading...</div>;

  const handleAdd = () => {
    addToCart(product, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="product-detail">
      <div className="product-detail-image" style={{ background: '#e0e0e0', height: 300, width: 300, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {product.image ? <img src={product.image} alt={product.name} /> : <span>No Image</span>}
      </div>
      <div className="product-detail-info">
        <h1>{product.name}</h1>
        <p className="category">{product.category}</p>
        <p className="price">${product.price.toFixed(2)}</p>
        <p className="description">{product.description}</p>
        <p className="stock">Stock: {product.stock} | Rating: {product.rating} ({product.numReviews} reviews)</p>
        <div className="quantity-control">
          <button onClick={() => setQuantity(q => Math.max(1, q - 1))} disabled={quantity <= 1}>-</button>
          <span>{quantity}</span>
          <button onClick={() => setQuantity(q => Math.min(product.stock, q + 1))} disabled={quantity >= product.stock}>+</button>
        </div>
        <button className="btn btn-primary" onClick={handleAdd} disabled={product.stock === 0}>
          {product.stock === 0 ? 'Out of Stock' : added ? 'Added!' : 'Add to Cart'}
        </button>
      </div>
    </div>
  );
};

export default ProductDetail;
