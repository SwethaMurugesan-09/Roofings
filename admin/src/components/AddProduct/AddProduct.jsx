import React, { useState } from 'react';
import './AddProduct.css' 
import upload from '../../assets/upload.png';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const AddProduct = () => {
    const [image, setImage] = useState(null);
    const [productDetails, setProductDetails] = useState({
        name: "",
        category: "",
        description: "",
        colour:"",
        price:"",
        dimension:""
    });    
    
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const imageHandler = (e) => {
        setImage(e.target.files[0]);
    };

    const changeHandler = (e) => {
        setProductDetails({ ...productDetails, [e.target.name]: e.target.value });
    };
    
    const addProduct = async () => {
        console.log("Adding product...");
        setError(null);
        setLoading(true);

        if (!image || !productDetails.name || !productDetails.category || !productDetails.description || !productDetails.colour || !productDetails.dimension || !productDetails.price) {
            toast.error("All fields are required.");
            setLoading(false);
            return;
        }

        let formData = new FormData();
        formData.append('image', image);
        formData.append('name', productDetails.name);
        formData.append('category', productDetails.category);
        formData.append('description', productDetails.description);
        formData.append('colour', productDetails.colour);
        formData.append('dimension', productDetails.dimension);
        formData.append('price', productDetails.price);

        try {
            let response = await fetch('https://roofings-server.vercel.app/api/product/add-product', {
                method: 'POST',
                body: formData,
            });

            let responseData = await response.json();
            console.log("API Response:", responseData);

            if (responseData.success) {
                toast.success("Product added successfully!");
            } else {
                toast.error(responseData.message || "Failed to add product.");
            }
        } catch (error) {
            console.error("Error:", error);
            setError("Something went wrong.");
        } finally {
            setLoading(false);
        }
    };
    return (
        <div className='addproduct'>
            <ToastContainer />
            {error && <p className='error'>{error}</p>}
            <div className="addproduct-itemfield">
                <p>Product title</p>
                <input
                    value={productDetails.name}
                    onChange={changeHandler}
                    type='text'
                    name="name"
                    placeholder='Type here'
                />
            </div>
            <div className="addproduct-price">
                <div className="addproduct-itemfield">
                    <p>Colour</p>
                    <input
                        value={productDetails.colour}
                        onChange={changeHandler}
                        type='text'
                        name="colour"
                        placeholder='Type here'
                    />
                </div>
            </div>
            <div className="addproduct-itemfield">
                <p>Dimension:</p>
                <input
                    value={productDetails.dimension}
                    onChange={changeHandler}
                    type='text'
                    name="dimension"
                    placeholder='Type here'
                />
            </div>
            <div className="addproduct-itemfield">
                <p>Description</p>
                <input
                    value={productDetails.description}
                    onChange={changeHandler}
                    type='text'
                    name="description"
                    placeholder='Type here'
                />
            </div>
            <div className="addproduct-price">
                <div className="addproduct-itemfield">
                    <p>Price</p>
                    <input
                        value={productDetails.price}
                        onChange={changeHandler}
                        type='text'
                        name="price"
                        placeholder='Type here'
                    />
                </div>
            </div>
            <div className="addproduct-itemfield">
                <p>Product Category</p>
                <select
                    value={productDetails.category}
                    onChange={changeHandler}
                    name="category"
                    className='add-product-selector'
                >
                    <option>--select--</option>
                    <option value="Clay False Roofing Tiles">Clay False Roofing Tiles</option>
                    <option value="Clay Tiles">Clay Tiles</option>
                    <option value="UPVC Pipes">UPVC Pipes</option>
                    <option value="Concrete Roofing Tiles">Concrete Roofing Tiles</option>
                    <option value="Ceramic Roofing Tiles">Ceramic Roofing Tiles</option>
                </select>
            </div>
            <div className="addproduct-itemfield">
                <label htmlFor='file-input'>
                    <img
                        src={image?URL.createObjectURL(image):upload}
                        className='addproduct-img'
                        alt="Upload"
                    />
                </label>
                <input
                    onChange={imageHandler}
                    type="file"
                    name="image"
                    id="file-input"
                    hidden
                />
            </div>
            <button 
                onClick={addProduct}
                className='addproduct-btn'
                disabled={loading}
            >
                {loading ? 'Adding...' : 'Add Product'}
            </button>
        </div>
    );
};

export default AddProduct;
