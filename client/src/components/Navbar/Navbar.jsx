import React, { useState,useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../assets/logo.png';  
import './Navbar.css';

const Navbar = () => {  
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();
  
    useEffect(() => {
      const token = localStorage.getItem('auth-token');
      setIsLoggedIn(!!token);
    }, []);
  
    const handleLogout = () => {
      localStorage.removeItem('auth-token');
      setIsLoggedIn(false);
      navigate('/login');
    };
  
  
  return (
    <div className="navbar">
      <div className="nav">
        <img src={logo} alt="Logo" /> 
        <p>Sun Roofings</p>
      </div>
      <div className="nav-menu">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/products">Products</Link>
        </li>
        <li >
          <Link to="/favourites">Cart</Link>
        </li>
        <li>
          <Link to="/contact">Contact</Link>
        </li>
        <li>
          {isLoggedIn ? (
            <button onClick={handleLogout} className="logout-btn">Logout</button>
          ) : (
            <Link to="/login">Login</Link>
          )}
        </li>

      </div>
    </div>
  );
}

export default Navbar;
