import React, { useState, useEffect } from "react";

const Toppicks = () => {
  const [topPicks, setTopPicks] = useState([]);

  useEffect(() => {
    const savedTopPicks = JSON.parse(localStorage.getItem("favourites")) || [];
    setTopPicks(savedTopPicks);
  }, []);

  return (
    <div>
      <h1>Top Picks</h1>
      {topPicks.length === 0 ? (
        <p>No items in Top Picks</p>
      ) : (
        <div className="top-picks-container">
          {topPicks.map((item) => (
            <div key={item._id} className="top-pick-item">
              <img src={item.img} alt={item.name} className="top-pick-img" />
              <p><strong>Material:</strong> {item.name}</p>
              <p><strong>Color:</strong> {item.colour}</p>
              <p><strong>Dimension:</strong> {item.dimension}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Toppicks;
