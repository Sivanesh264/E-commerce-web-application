import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const API = process.env.REACT_APP_API_URL || '';

const AdminDashboard = () => {
  const [stats, setStats] = useState({ products: 0, orders: 0, pending: 0 });
  const [recentOrders, setRecentOrders] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    fetch(`${API}/api/products?limit=1`)
      .then(res => res.json())
      .then(data => setStats(s => ({ ...s, products: data.total || 0 })))
      .catch(() => {});
    fetch(`${API}/api/orders/all?limit=5`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => {
        setRecentOrders(data.orders || []);
        setStats(s => ({ ...s, orders: data.total || 0, pending: (data.orders || []).filter(o => o.status === 'pending').length }));
      })
      .catch(() => {});
  }, []);

  return (
    <div className="admin-page">
      <h2>Admin Dashboard</h2>
      <div className="admin-stats">
        <div className="stat-card"><h3>{stats.products}</h3><p>Products</p></div>
        <div className="stat-card"><h3>{stats.orders}</h3><p>Orders</p></div>
        <div className="stat-card"><h3>{stats.pending}</h3><p>Pending</p></div>
      </div>
      <div className="admin-links">
        <Link to="/admin/products" className="btn btn-primary">Manage Products</Link>
        <Link to="/admin/orders" className="btn btn-primary">Manage Orders</Link>
      </div>
      <div className="recent-orders">
        <h3>Recent Orders</h3>
        {recentOrders.map(order => (
          <div key={order._id} className="order-card">
            <span>#{order._id.slice(-8).toUpperCase()} - {order.user?.name} - ${order.total.toFixed(2)}</span>
            <span className={`status-${order.status}`}>{order.status}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
