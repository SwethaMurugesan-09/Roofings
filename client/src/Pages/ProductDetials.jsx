import React, { useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import '../styles/ProductDetials.css'

const ProductDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();  
  const [product, setProduct] = useState(null);
  const [similarProducts, setSimilarProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await fetch(`https://roofings-server.vercel.app/api/product/getProduct/${id}`);
        const data = await response.json();

        if (!response.ok || !data.success) {
          throw new Error(data.message || "Product not found");
        }

        setProduct(data.product);

        const allProductsResponse = await fetch("https://roofings-server.vercel.app/api/product/getProduct");
        const allProductsData = await allProductsResponse.json();

        if (!allProductsResponse.ok || !allProductsData.success) {
          throw new Error("Failed to fetch products");
        }

        setSimilarProducts(
          allProductsData.products
            .filter(
              (item) =>
                item.category.trim().toLowerCase() === data.product.category.trim().toLowerCase() &&
                item._id !== data.product._id
            )
            .sort(() => Math.random() - 0.5)
            .slice(0, 4)
        );
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [id]);


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
            <img src={product.image} className="product-details-img" alt={product.category} />
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
    <div className="similiar-products">
      <h3>Similiar Products</h3>
      <div className="similar-products-container">
          {similarProducts.length === 0 ? (
            <p>No similar products available</p>
          ) : (
            similarProducts.map((item) => (
              <div key={item._id} className="similar-product-item">
                <img src={item.img} alt={item.name} className="similar-product-img" />
                <div className="similiar-products-material">
                  <div>
                      <p><strong>Material:</strong> {item.name}</p>
                    </div>
                    <div>
                      <button className="products-view-details-btn" onClick={() => navigate(`/products/${item._id}`)}>View Details</button>
                    </div>
                </div>
              </div>
            ))
          )}  
        </div>
    </div>
    </div>
  );
};

export default ProductDetails;
