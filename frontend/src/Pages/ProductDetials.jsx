import React from "react";
import { useParams } from "react-router-dom";
import { productsData } from "../assets/products";
import '../styles/ProductDetials.css'

const ProductDetails = () => {
  const { id } = useParams();  
  const product = productsData.find((item) => item._id === parseInt(id)); 

  if (!product) {
    return <h2>Product not found</h2>; 
  }

  return (
    <div className="product-details-container">
    <h1 className="product-details-header">{product.category}</h1>
    <div className="product-detials-container">
        <div className="product-details-left">
            <img src={product.img} className="product-details-img" alt={product.category} />
            <p><strong>Material: </strong> {product.name}</p>
        </div>
        <div className="product-detials-right">
            <p><strong>Color: </strong>{product.colour}</p>
            <p><strong>Dimension: </strong>{product.dimension}</p>
            <p>{product.description}</p>
            <button className="product-detials-btn">Contact us</button>
            <button className="product-detials-favbtn">Add to Top Picks</button>
        </div>
        </div>
    </div>
  );
};

export default ProductDetails;
