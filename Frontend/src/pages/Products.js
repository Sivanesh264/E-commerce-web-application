import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';

const API = process.env.REACT_APP_API_URL || '';

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [total, setTotal] = useState(0);
  const [pages, setPages] = useState(1);
  const [search, setSearch] = useState(searchParams.get('search') || '');
  const [category, setCategory] = useState(searchParams.get('category') || '');
  const page = Number(searchParams.get('page')) || 1;

  useEffect(() => {
    fetch(`${API}/api/products/categories`)
      .then(res => res.json())
      .then(data => setCategories(data || []))
      .catch(() => {});
  }, []);

  useEffect(() => {
    const params = new URLSearchParams();
    if (search) params.set('search', search);
    if (category) params.set('category', category);
    params.set('page', page);
    fetch(`${API}/api/products?${params}`)
      .then(res => res.json())
      .then(data => {
        setProducts(data.products || []);
        setTotal(data.total || 0);
        setPages(data.pages || 1);
      })
      .catch(() => {});
  }, [search, category, page]);

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchParams({ search, category, page: 1 });
  };

  return (
    <div className="products-page">
      <div className="filters">
        <form onSubmit={handleSearch}>
          <input type="text" placeholder="Search products..." value={search} onChange={e => setSearch(e.target.value)} />
          <button type="submit" className="btn btn-sm">Search</button>
        </form>
        <select value={category} onChange={e => { setCategory(e.target.value); setSearchParams({ category: e.target.value, search, page: 1 }); }}>
          <option value="">All Categories</option>
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>
      <p className="result-count">{total} product(s) found</p>
      <div className="product-grid">
        {products.map(product => (
          <div key={product._id} className="product-card">
            <div className="product-image" style={{ background: '#e0e0e0', height: 200, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {product.image ? <img src={product.image} alt={product.name} /> : <span>No Image</span>}
            </div>
            <div className="product-info">
              <h3>{product.name}</h3>
              <p className="category">{product.category}</p>
              <p className="price">${product.price.toFixed(2)}</p>
              <p className="stock">Stock: {product.stock}</p>
              <Link to={`/products/${product._id}`} className="btn btn-sm">View Details</Link>
            </div>
          </div>
        ))}
      </div>
      {pages > 1 && (
        <div className="pagination">
          {Array.from({ length: pages }, (_, i) => i + 1).map(p => (
            <button key={p} className={`btn btn-sm ${p === page ? 'btn-primary' : ''}`}
              onClick={() => setSearchParams({ search, category, page: p })}>{p}</button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Products;
