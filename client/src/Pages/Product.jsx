import React, { useState ,useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../styles/Product.css";

const Product = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const queryParams = new URLSearchParams(location.search);
    const selectedCategory = queryParams.get("category");

    const [products, setProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const categories = [...new Set(products.map((product) => product.category))];

    const filteredProducts = products.filter((product) => {
        const matchesCategory = selectedCategory ? product.category === selectedCategory : true;
        const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch("https://roofings-server.vercel.app/api/product/getProduct");
                if (!response.ok) {
                    throw new Error("Failed to fetch products");
                }
                const data = await response.json();
                if (Array.isArray(data)) {
                    setProducts(data);
                } else if (data.products && Array.isArray(data.products)) {
                    setProducts(data.products);
                } else {
                    throw new Error("Invalid product data format");
                }            
            } catch (err) {
                setError(err.message);
                setProducts([]);
            }
        };

        fetchProducts();
    }, []);

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
                            <img src={product.image} className="products-img" alt={product.name} />
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
