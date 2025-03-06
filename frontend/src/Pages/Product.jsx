import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../styles/Product.css";
import { productsData } from "../assets/products";

const Product = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const queryParams = new URLSearchParams(location.search);
    const selectedCategory = queryParams.get("category");

    const [searchTerm, setSearchTerm] = useState("");

    const categories = [...new Set(productsData.map((product) => product.category))];

    const filteredProducts = productsData.filter((product) => {
        const matchesCategory = selectedCategory ? product.category === selectedCategory : true;
        const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    const handleCategoryChange = (event) => {
        const category = event.target.value;
        if (category === "All") {
            navigate("/products");
        } else {
            navigate(`/products?category=${category}`);
        }
    };

    return (
        <div className="product-container">
            <h1 className="product-header">Products</h1>

            <div className="filter-container">
                <input
                    type="text"
                    placeholder="Search products..."
                    className="search-box"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />

                <select className="category-dropdown" onChange={handleCategoryChange} value={selectedCategory || "All"}>
                    <option value="All">All Categories</option>
                    {categories.map((category) => (
                        <option key={category} value={category}>
                            {category}
                        </option>
                    ))}
                </select>
            </div>

            <div className="products">
                {filteredProducts.length > 0 ? (
                    filteredProducts.map((product) => (
                        <div key={product._id} className="product-item">
                            <img src={product.img} className="products-img" alt={product.name} />
                            <p className="products-name">{product.name}</p>
                            <button onClick={() => navigate(`/products/${product._id}`)} className="products-button">
                                View Details
                            </button>
                        </div>
                    ))
                ) : (
                    <p className="no-products">No products found.</p>
                )}
            </div>
        </div>
    );
};

export default Product;
