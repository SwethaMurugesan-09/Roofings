import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import React, { useState, useEffect } from "react";
import '../styles/TopPicks.css'
import { useNavigate } from "react-router-dom";

const Toppicks = () => {
  const [topPicks, setTopPicks] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const savedTopPicks = JSON.parse(localStorage.getItem("favourites")) || [];
    setTopPicks(savedTopPicks);
  }, []);
  const totalAmount = topPicks.reduce((sum, item) => sum + (parseFloat(item.price) || 0), 0);

  const handleRemove = (id) => {
    const updatedTopPicks = topPicks.filter(item => item._id !== id);
    setTopPicks(updatedTopPicks);
    toast.error("Product removed successfully.");
    localStorage.setItem("favourites", JSON.stringify(updatedTopPicks));
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
              <p className="top-pick-price">₹{item.price}</p>
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

    {topPicks.length > 0 && (
      <div className="cart-summary">
        <h2>Cart total</h2>
        <div className="cart-row">
          <span>Subtotal</span>
          <span>₹{totalAmount.toFixed(2)}</span>
        </div>
        <div className="cart-row">
          <span>Shipping Fee</span>
          <span>Free</span>
        </div>
        <hr />
        <div className="cart-row total">
          <strong>Total</strong>
          <strong>₹{totalAmount.toFixed(2)}</strong>
        </div>
        <button
          className="checkout-btn"
          onClick={() => {
            const user = JSON.parse(localStorage.getItem("user"));
            if (user) {
              navigate('/checkout');
            } else {
              toast.error("Please log in to proceed to checkout");
              navigate('/login');
            }
          }}
        >
          PROCEED TO CHECKOUT
        </button>
      </div>
    )}
  </div>
);
};

export default Toppicks;
