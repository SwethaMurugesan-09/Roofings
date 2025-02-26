import React from "react";
import '../styles/Product.css'
import { useNavigate } from "react-router-dom";
import { productsData } from "../assets/products";

const Product = () => {
    const navigate = useNavigate();
  return (
    <div className="product-container">
      <h1 className="product-header"> Products</h1>
      <div className="products">
        {productsData.map((products) => (
          <div key={products._id} className="">
            <img src={products.img} className="products-img" />
            <h2 className="products-name">{products.name}</h2>
            {/* <p className="products-category">{products.category}</p> */}
            <button onClick={() => navigate(`/products/${products._id}`)} className="products-button">view details</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Product;
