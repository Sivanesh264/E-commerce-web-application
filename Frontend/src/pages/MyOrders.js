import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const API = process.env.REACT_APP_API_URL || '';

const statusColors = {
  pending: '#f0ad4e',
  confirmed: '#5bc0de',
  shipped: '#5cb85c',
  delivered: '#337ab7',
  cancelled: '#d9534f'
};

const MyOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    fetch(`${API}/api/orders/myorders`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => setOrders(data || []))
      .catch(() => {});
  }, []);

  return (
    <div className="orders-page">
      <h2>My Orders</h2>
      {orders.length === 0 ? (
        <p>No orders yet. <Link to="/products">Start shopping</Link></p>
      ) : (
        <div className="orders-list">
          {orders.map(order => (
            <div key={order._id} className="order-card">
              <div className="order-header">
                <span className="order-id">Order #{order._id.slice(-8).toUpperCase()}</span>
                <span className="order-status" style={{ background: statusColors[order.status] || '#999' }}>{order.status}</span>
                <span className="order-date">{new Date(order.createdAt).toLocaleDateString()}</span>
              </div>
              <div className="order-body">
                <p>{order.items.length} item(s) | Total: ${order.total.toFixed(2)}</p>
                <Link to={`/orders/${order._id}`} className="btn btn-sm">View Details</Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyOrders;
