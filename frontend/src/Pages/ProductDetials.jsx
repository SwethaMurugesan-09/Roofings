import React from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { productsData } from "../assets/products";
import '../styles/ProductDetials.css'

const ProductDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();  
  const product = productsData.find((item) => item._id === parseInt(id)); 

  if (!product) {
    return <h2>Product not found</h2>; 
  }

  const handleAddToTopPicks = () => {
    let favourites = JSON.parse(localStorage.getItem("favourites")) || [];
    const exists = favourites.find(item => item._id === product._id);

    if (!exists) {
      favourites.push(product);
      localStorage.setItem("favourites", JSON.stringify(favourites));
    }

    navigate('/favourites');
  };


  return (
    <div className="product-details-container">
    <h1 className="product-details-header">{product.category}</h1>
    <div className="product-detials-container">
        <div className="product-details-left">
            <img src={product.img} className="product-details-img" alt={product.category} />
        </div>
        <div className="product-detials-right">
            <p><strong>Material: </strong> {product.name}</p>
            <p><strong>Color: </strong>{product.colour}</p>
            <p><strong>Dimension: </strong>{product.dimension}</p>
            <p className="product-detials-desc">{product.description}</p>
            <div className="product-detials-btn">
                <button onClick={handleAddToTopPicks} className="product-detials-favbtn">Add to Top Picks</button>
                <button onClick={()=>navigate('/contact')} className="product-detials-contactbtn">Contact us</button>
            </div>
        </div>
        </div>
    </div>
  );
};

export default ProductDetails;
