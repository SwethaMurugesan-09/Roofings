import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.png';  
import './Navbar.css';
import { useClerk ,useUser} from '@clerk/clerk-react';


const Navbar = () => {  
  const { openSignIn } = useClerk();
  const {user} =useUser()
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
          <Link to="/favourites">Top Picks</Link>
        </li>
        <li>
          <Link to="/contact">Contact</Link>
        </li>
        <li onClick={e => openSignIn()}>
          <Link to='/'>Login</Link>
        </li>
      </div>
    </div>
  );
}

export default Navbar;
