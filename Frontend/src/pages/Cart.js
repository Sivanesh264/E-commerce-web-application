import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const Cart = () => {
  const { items, removeFromCart, updateQuantity, subtotal } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleCheckout = () => {
    if (!user) return navigate('/login');
    navigate('/checkout');
  };

  if (items.length === 0) {
    return (
      <div className="cart-empty">
        <h2>Your cart is empty</h2>
        <Link to="/products" className="btn btn-primary">Browse Products</Link>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <h2>Shopping Cart ({items.length} items)</h2>
      <div className="cart-items">
        {items.map(item => (
          <div key={item._id} className="cart-item">
            <div className="cart-item-info">
              <h3>{item.name}</h3>
              <p>${item.price.toFixed(2)} each</p>
            </div>
            <div className="cart-item-quantity">
              <button onClick={() => updateQuantity(item._id, item.quantity - 1)} disabled={item.quantity <= 1}>-</button>
              <span>{item.quantity}</span>
              <button onClick={() => updateQuantity(item._id, item.quantity + 1)}>+</button>
            </div>
            <p className="cart-item-total">${(item.price * item.quantity).toFixed(2)}</p>
            <button className="btn-remove" onClick={() => removeFromCart(item._id)}>Remove</button>
          </div>
        ))}
      </div>
      <div className="cart-summary">
        <h3>Subtotal: ${subtotal.toFixed(2)}</h3>
        <button className="btn btn-primary" onClick={handleCheckout}>Proceed to Checkout</button>
      </div>
    </div>
  );
};

export default Cart;
