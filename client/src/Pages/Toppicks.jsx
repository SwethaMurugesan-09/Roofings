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

  // Decode JWT Base64URL payload
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

          {!showPayPal ? (
            <button className="checkout-btn" onClick={handleCheckoutClick}>
              PROCEED TO CHECKOUT
            </button>
          ) : (
            <PayPalScriptProvider
              options={{
                "client-id": "AU1uQvngJxUaDtLQGxWO4V1_W5UocfDgMuUXYAFtZpYhM1owqdfLipYOGSw_uSYzRvG5ckYsu2JPF45H",
                currency: "USD",
                intent: "capture",
                vault: false
              }}
            >
              <PayPalButtons
                style={{ layout: "vertical", color: "gold", shape: "rect", label: "pay" }}
                forceReRender={[totalAmount]}
                createOrder={(data, actions) => {
                  return actions.order.create({
                    purchase_units: [{
                      amount: {
                        value: totalAmount.toFixed(2),
                      },
                    }],
                    application_context: {
                      shipping_preference: "NO_SHIPPING"
                    }
                  });
                }}
                onApprove={async (data, actions) => {
                  await actions.order.capture();
                  toast.success("Payment successful! Redirecting...");
                  localStorage.removeItem("favourites");
                  setTimeout(() => {
                    navigate('/');
                  }, 2000);
                }}
                onError={(err) => {
                  console.error("PayPal Checkout Error:", err);
                  toast.error("Payment failed. Please try again.");
                }}
              />
            </PayPalScriptProvider>
          )}
        </div>
      )}
    </div>
  );
};

export default Toppicks;
