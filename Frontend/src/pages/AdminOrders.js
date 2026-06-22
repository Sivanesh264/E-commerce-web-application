import React, { useState, useEffect } from 'react';

const API = process.env.REACT_APP_API_URL || '';

const statusColors = {
  pending: '#f0ad4e',
  confirmed: '#5bc0de',
  shipped: '#5cb85c',
  delivered: '#337ab7',
  cancelled: '#d9534f'
};

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [filter, setFilter] = useState('');
  const token = localStorage.getItem('token');

  const loadOrders = () => {
    const url = filter ? `${API}/api/orders/all?status=${filter}` : `${API}/api/orders/all`;
    fetch(url, { headers: { Authorization: `Bearer ${token}` } })
      .then(res => res.json())
      .then(data => setOrders(data.orders || []))
      .catch(() => {});
  };

  useEffect(loadOrders, [filter]);

  const updateStatus = async (id, status) => {
    try {
      await fetch(`${API}/api/orders/${id}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ status, note: `Status updated to ${status}` })
      });
      loadOrders();
    } catch (err) { }
  };

  return (
    <div className="admin-page">
      <h2>Manage Orders</h2>
      <div className="filters">
        <select value={filter} onChange={e => setFilter(e.target.value)}>
          <option value="">All Orders</option>
          <option value="pending">Pending</option>
          <option value="confirmed">Confirmed</option>
          <option value="shipped">Shipped</option>
          <option value="delivered">Delivered</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>
      <table className="admin-table">
        <thead>
          <tr><th>Order ID</th><th>Customer</th><th>Items</th><th>Total</th><th>Status</th><th>Date</th><th>Actions</th></tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <tr key={order._id}>
              <td>#{order._id.slice(-8).toUpperCase()}</td>
              <td>{order.user?.name || 'N/A'}</td>
              <td>{order.items?.length || 0}</td>
              <td>${order.total?.toFixed(2)}</td>
              <td><span className="status-badge" style={{ background: statusColors[order.status] || '#999' }}>{order.status}</span></td>
              <td>{new Date(order.createdAt).toLocaleDateString()}</td>
              <td>
                <select onChange={e => updateStatus(order._id, e.target.value)} defaultValue="">
                  <option value="" disabled>Update Status</option>
                  <option value="confirmed">Confirm</option>
                  <option value="shipped">Ship</option>
                  <option value="delivered">Deliver</option>
                  <option value="cancelled">Cancel</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminOrders;
