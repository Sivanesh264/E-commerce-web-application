import React, { useState, useEffect } from 'react';

const API = process.env.REACT_APP_API_URL || '';

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ name: '', description: '', price: '', category: '', stock: '', image: '' });
  const [editing, setEditing] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const token = localStorage.getItem('token');

  const loadProducts = () => {
    fetch(`${API}/api/products?limit=100`)
      .then(res => res.json())
      .then(data => setProducts(data.products || []))
      .catch(() => {});
  };

  useEffect(loadProducts, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = editing ? `${API}/api/products/${editing}` : `${API}/api/products`;
    const method = editing ? 'PUT' : 'POST';
    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ ...form, price: Number(form.price), stock: Number(form.stock) })
      });
      if (res.ok) {
        setShowForm(false);
        setEditing(null);
        setForm({ name: '', description: '', price: '', category: '', stock: '', image: '' });
        loadProducts();
      }
    } catch (err) { }
  };

  const handleEdit = (product) => {
    setForm({ name: product.name, description: product.description, price: product.price, category: product.category, stock: product.stock, image: product.image || '' });
    setEditing(product._id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this product?')) return;
    try {
      await fetch(`${API}/api/products/${id}`, { method: 'DELETE', headers: { Authorization: `Bearer ${token}` } });
      loadProducts();
    } catch (err) { }
  };

  return (
    <div className="admin-page">
      <div className="admin-header">
        <h2>Manage Products</h2>
        <button className="btn btn-primary" onClick={() => { setShowForm(!showForm); setEditing(null); setForm({ name: '', description: '', price: '', category: '', stock: '', image: '' }); }}>
          {showForm ? 'Cancel' : 'Add Product'}
        </button>
      </div>
      {showForm && (
        <form onSubmit={handleSubmit} className="admin-form">
          <input type="text" placeholder="Product Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required />
          <textarea placeholder="Description" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} required />
          <div className="form-row">
            <input type="number" placeholder="Price" step="0.01" value={form.price} onChange={e => setForm({ ...form, price: e.target.value })} required />
            <input type="number" placeholder="Stock" value={form.stock} onChange={e => setForm({ ...form, stock: e.target.value })} required />
          </div>
          <input type="text" placeholder="Category" value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} required />
          <input type="text" placeholder="Image URL (optional)" value={form.image} onChange={e => setForm({ ...form, image: e.target.value })} />
          <button type="submit" className="btn btn-primary">{editing ? 'Update' : 'Create'} Product</button>
        </form>
      )}
      <table className="admin-table">
        <thead><tr><th>Name</th><th>Category</th><th>Price</th><th>Stock</th><th>Actions</th></tr></thead>
        <tbody>
          {products.map(p => (
            <tr key={p._id}>
              <td>{p.name}</td>
              <td>{p.category}</td>
              <td>${p.price.toFixed(2)}</td>
              <td>{p.stock}</td>
              <td>
                <button className="btn btn-sm" onClick={() => handleEdit(p)}>Edit</button>
                <button className="btn btn-sm btn-danger" onClick={() => handleDelete(p._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminProducts;
