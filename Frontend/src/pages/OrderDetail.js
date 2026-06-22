import React, { useState, useEffect } from 'react';

const API = process.env.REACT_APP_API_URL || '';

const statusColors = {
  pending: '#f0ad4e',
  confirmed: '#5bc0de',
  shipped: '#5cb85c',
  delivered: '#337ab7',
  cancelled: '#d9534f'
};

const OrderDetail = () => {
  const [order, setOrder] = useState(null);
  const orderId = window.location.pathname.split('/orders/')[1];

  useEffect(() => {
    const token = localStorage.getItem('token');
    fetch(`${API}/api/orders/${orderId}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => setOrder(data))
      .catch(() => {});
  }, [orderId]);

  if (!order) return <div className="loading">Loading...</div>;

  return (
    <div className="order-detail-page">
      <h2>Order #{order._id.slice(-8).toUpperCase()}</h2>
      <div className="order-status-badge" style={{ background: statusColors[order.status] || '#999' }}>
        {order.status.toUpperCase()}
      </div>
      <div className="order-detail-grid">
        <div className="order-section">
          <h3>Items</h3>
          {order.items.map((item, idx) => (
            <div key={idx} className="order-item">
              <span>{item.name} x{item.quantity}</span>
              <span>${(item.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}
        </div>
        <div className="order-section">
          <h3>Shipping Address</h3>
          <p>{order.shippingAddress.street}</p>
          <p>{order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zip}</p>
          <p>{order.shippingAddress.country}</p>
        </div>
      </div>
      <div className="order-summary">
        <p>Subtotal: ${order.subtotal.toFixed(2)}</p>
        <p>Tax: ${order.tax.toFixed(2)}</p>
        <p className="total">Total: ${order.total.toFixed(2)}</p>
      </div>
      <div className="tracking-section">
        <h3>Tracking Updates</h3>
        <div className="tracking-timeline">
          {order.trackingUpdates && order.trackingUpdates.length > 0 ? (
            order.trackingUpdates.map((update, idx) => (
              <div key={idx} className="tracking-event">
                <div className="tracking-dot" style={{ background: statusColors[update.status] || '#999' }}></div>
                <div className="tracking-content">
                  <strong>{update.status.toUpperCase()}</strong>
                  <span>{new Date(update.date).toLocaleString()}</span>
                  {update.note && <p>{update.note}</p>}
                </div>
              </div>
            ))
          ) : (
            <p>No tracking updates yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;
