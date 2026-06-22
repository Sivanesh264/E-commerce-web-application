import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const { itemCount } = useCart();
  const navigate = useNavigate();

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-brand">ShopEase</Link>
        <div className="navbar-links">
          <Link to="/products">Products</Link>
          {user ? (
            <>
              <Link to="/cart">Cart ({itemCount})</Link>
              <Link to="/my-orders">My Orders</Link>
              {user.role === 'admin' && <Link to="/admin">Admin</Link>}
              <span className="nav-user">Hi, {user.name}</span>
              <button onClick={logout} className="btn-logout">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
