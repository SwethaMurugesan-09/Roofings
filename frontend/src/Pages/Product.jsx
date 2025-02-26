import React from "react";
import '../styles/Product.css'
import { productsData } from "../assets/projectsData";

const Product = () => {
  return (
    <div className="product-container">
      <h1 className="product-header"> Products</h1>
      <div className="products">
        {productsData.map((products) => (
          <div key={products._id} className="">
            <img src={products.img} className="products-img" />
            <h2>{products.name}</h2>
            <p className="products-category">{products.category}</p>
            <button className="products-button">View details</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Product;
