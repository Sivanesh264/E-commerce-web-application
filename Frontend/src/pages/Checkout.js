import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const API = process.env.REACT_APP_API_URL || '';

const Checkout = () => {
  const { items, subtotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [address, setAddress] = useState({ street: '', city: '', state: '', zip: '', country: 'US' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const tax = Math.round(subtotal * 0.08 * 100) / 100;
  const total = subtotal + tax;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${API}/api/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({
          items: items.map(item => ({ product: item._id, quantity: item.quantity })),
          shippingAddress: address
        })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Order failed');
      clearCart();
      navigate(`/orders/${data._id}`);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (items.length === 0) {
    navigate('/cart');
    return null;
  }

  return (
    <div className="checkout-page">
      <h2>Checkout</h2>
      {error && <p className="error-msg">{error}</p>}
      <div className="checkout-layout">
        <form onSubmit={handleSubmit} className="checkout-form">
          <h3>Shipping Address</h3>
          <input type="text" placeholder="Street Address" value={address.street} onChange={e => setAddress({ ...address, street: e.target.value })} required />
          <input type="text" placeholder="City" value={address.city} onChange={e => setAddress({ ...address, city: e.target.value })} required />
          <div className="form-row">
            <input type="text" placeholder="State" value={address.state} onChange={e => setAddress({ ...address, state: e.target.value })} required />
            <input type="text" placeholder="ZIP Code" value={address.zip} onChange={e => setAddress({ ...address, zip: e.target.value })} required />
          </div>
          <button type="submit" className="btn btn-primary btn-block" disabled={loading}>
            {loading ? 'Placing Order...' : `Place Order $${total.toFixed(2)}`}
          </button>
        </form>
        <div className="checkout-summary">
          <h3>Order Summary</h3>
          {items.map(item => (
            <div key={item._id} className="summary-item">
              <span>{item.name} x{item.quantity}</span>
              <span>${(item.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}
          <hr />
          <div className="summary-item"><span>Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
          <div className="summary-item"><span>Tax (8%)</span><span>${tax.toFixed(2)}</span></div>
          <div className="summary-item total"><span>Total</span><span>${total.toFixed(2)}</span></div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
