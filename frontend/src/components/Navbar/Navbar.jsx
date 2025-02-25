import React, { useState } from 'react';
import { Link } from 'react-router-dom';
// import logo from '../Assets/logo.avif';  
import './Navbar.css';

const Navbar = () => {


  return (
    <div className="navbar">
      <div className="nav">
        <img src="" alt="Logo" /> 
        <p>Roofings</p>
      </div>
      <div className="nav-menu">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/products">Products</Link>
        </li>
        <li >
          <Link to="/favourites">Top Picks</Link>
        </li>
        <li>
          <Link to="/contact">Contact</Link>
        </li>
      </div>
    </div>
  );
}

export default Navbar;
