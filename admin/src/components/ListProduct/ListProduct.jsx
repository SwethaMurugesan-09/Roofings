import React, { useEffect, useState } from 'react';
import './ListProduct.css';

const ListProduct = () => {
    const [allProducts, setAllProducts] = useState([]);
    const [editingProductId, setEditingProductId] = useState(null);
    const [editProductDetails, setEditProductDetails] = useState({});
    const [searchTerm, setSearchTerm] = useState(''); 

    useEffect(() => {
        fetchInfo();
    }, []);
    
    const fetchInfo = async () => {
        try {
            const response = await fetch('https://roofings-server.vercel.app/api/product/getProduct');
            const data = await response.json();
            console.log("Fetched Data:", data); 
    
            if (Array.isArray(data)) {
                setAllProducts(data);
            } else if (Array.isArray(data.products)) {
                setAllProducts(data.products);
            } else {
                console.error("Unexpected API response format:", data);
                setAllProducts([]); 
            }
        } catch (error) {
            console.error('Error fetching products:', error);
            setAllProducts([]); 
        }
    };
    

    const removeProduct = async (id) => {
        if (window.confirm("Are you sure you want to delete this product?")) {
            try {
                await fetch(`https://roofings-server.vercel.app/api/product/removeproduct/${id}`, { 
                    method: 'DELETE' 
                });
                fetchInfo(); // Refresh products
            } catch (error) {
                console.error('Error removing product:', error);
            }
        }
    };
    

    const updateProduct = async (productId) => {
        try {
            const productDetails = editProductDetails[productId];
            const response = await fetch(`https://roofings-server.vercel.app/api/product/updateproduct/${productId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(productDetails),
            });
            const result = await response.json();
            if (result.success) {
                fetchInfo();
                setEditingProductId(null);
            }
        } catch (error) {
            console.error('Error updating product:', error);
        }
    };
    

    const handleEditChange = (e, productId) => {
        const { name, value } = e.target;
        setEditProductDetails((prevDetails) => ({
            ...prevDetails,
            [productId]: {
                ...prevDetails[productId],
                [name]: value,
            },
        }));
    };

    const startEditing = (productId, product) => {
        setEditingProductId(productId);
        setEditProductDetails({ ...editProductDetails, [productId]: product });
    };

    const filteredProducts = Array.isArray(allProducts)
    ? allProducts.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase())
    ) 
    : [];

    return (
        <div className="listproduct">
            <div className="search-container">
                <input
                    type="text"
                    placeholder="Search products..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="search-input"
                />
            </div>

            <div className="listproduct-format">
                <p>Products</p>
                <p>Name</p>
                <p>Dimension</p>
                <p>Colour</p>
                <p>Update</p>
                <p>Remove</p>
            </div>

            <div className="listproduct-allproducts">
                <hr />
                {filteredProducts.length > 0 ? (
                    filteredProducts.map((product) => (
                        <React.Fragment key={product._id}>
                            <div className="listproduct-format-main">
                                <img src={product.image} alt={product.name} className="listproduct-img" />
                                {editingProductId === product._id ? (
                                    <>
                                        <input
                                            type="text"
                                            name="name"
                                            value={editProductDetails[product._id]?.name || ''}
                                            onChange={(e) => handleEditChange(e, product._id)}
                                        />
                                        <input
                                            type="text"
                                            name="dimension"
                                            value={editProductDetails[product._id]?.dimension || ''}
                                            onChange={(e) => handleEditChange(e, product._id)}
                                        />
                                        <input
                                            type="text"
                                            name="colour"
                                            value={editProductDetails[product._id]?.colour || ''}
                                            onChange={(e) => handleEditChange(e, product._id)}
                                        />
                                        <button onClick={() => updateProduct(product._id)} className="listproduct-btn">
                                            Save
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <p>{product.name}</p>
                                        <p>{product.dimension}</p>
                                        <p>{product.colour}</p>
                                        <button onClick={() => startEditing(product._id, product)} className="listproduct-btn">
                                            Edit
                                        </button>
                                    </>
                                )}
                                <button onClick={() => removeProduct(product._id)} className="listproduct-btn">
                                    Remove
                                </button>
                            </div>
                            <hr />
                        </React.Fragment>
                    ))
                ) : (
                    <p>No products found</p>
                )}
            </div>
        </div>
    );
};

export default ListProduct;
