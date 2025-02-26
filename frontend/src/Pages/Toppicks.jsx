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

  const handleRemove = (id) => {
    const updatedTopPicks = topPicks.filter(item => item._id !== id);
    setTopPicks(updatedTopPicks);
    localStorage.setItem("favourites", JSON.stringify(updatedTopPicks));
  };

  return (
    <div className="top-picks">
      <h1>Top Picks</h1>
      {topPicks.length === 0 ? (
        <p className="top-picks-not">No items in Top Picks</p>
      ) : (
        <div className="top-picks-container">
          {topPicks.map((item) => (
            <div key={item._id} className="top-pick-item">
              <img src={item.img} alt={item.name} className="top-pick-img" />
              <p><strong>Material:</strong> {item.name}</p>

              <div className="top-picks-button">
                <button onClick={() => navigate(`/products/${item._id}`)} className="top-picks-btn">view</button>
                <button onClick={() => handleRemove(item._id)}  className="top-picks-view">Remove</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Toppicks;
