import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import React, { useState, useEffect } from "react";
import '../styles/TopPicks.css';
import { useNavigate } from "react-router-dom";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

const Toppicks = () => {
  const [topPicks, setTopPicks] = useState([]);
  const [showPayPal, setShowPayPal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const savedTopPicks = JSON.parse(localStorage.getItem("favourites")) || [];
    setTopPicks(savedTopPicks);

    if (!isTokenValid()) {
      localStorage.removeItem("user");
    }
  }, []);

  const totalAmount = topPicks.reduce((sum, item) => sum + (parseFloat(item.price) || 0), 0);

  const handleRemove = (id) => {
    const updatedTopPicks = topPicks.filter(item => item._id !== id);
    setTopPicks(updatedTopPicks);
    toast.error("Product removed successfully.");
    localStorage.setItem("favourites", JSON.stringify(updatedTopPicks));
  };

  const decodeTokenPayload = (token) => {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map((c) => `%${('00' + c.charCodeAt(0).toString(16)).slice(-2)}`)
          .join('')
      );
      return JSON.parse(jsonPayload);
    } catch (e) {
      return null;
    }
  };

 const isTokenValid = () => {
  const token = localStorage.getItem("auth-token");
  if (!token) return false;

  const payload = decodeTokenPayload(token);
  if (!payload || !payload.exp) return false;

  return payload.exp * 1000 > Date.now();
};

  const handleCheckoutClick = () => {
    if (isTokenValid()) {
      setShowPayPal(true);
    } else {
      toast.error("Please log in to proceed to checkout");
      navigate('/login');
    }
  };

  return (
    <div className="top-picks">
      <h1>Your Cart</h1>

      {topPicks.length === 0 ? (
        <p className="top-picks-not">No items in Top Picks</p>
      ) : (
        <div className="top-picks-container">
          {topPicks.map((item) => (
            <div key={item._id} className="top-pick-item">
              <img src={item.image} alt={item.name} className="top-pick-img" />
              <div className="top-picks-detials">
                <p>{item.name}</p>
                <button
                  onClick={() => navigate(`/products/${item._id}`)}
                  className="top-picks-btn"
                >
                  View
                </button>
              </div>
              <div className="top-picks-button">
                <button
                  onClick={() => handleRemove(item._id)}
                  className="top-picks-remove"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Toppicks;
