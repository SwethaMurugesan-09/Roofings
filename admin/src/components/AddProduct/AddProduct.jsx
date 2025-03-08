import React, { useState } from 'react';
import './AddProduct.css' 
import upload from '../../assets/upload.png';

const AddProduct = () => {
    const [image, setImage] = useState(false);
    const [productDetails, setProductDetails] = useState({
        name: "",
        image: "",
        category: "",
        description: "",
        colour:"",
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
       
        console.log(productDetails);
        let responseData;
        let product = productDetails;
        setError(null);
        let formData = new FormData();
        formData.append('product', image);
        
        await fetch('http://localhost:5000', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
            },
            body: formData,
        }).then((resp) => resp.json()).then((data) => { responseData = data; });
    
        if (responseData.success) {
            product.image = responseData.image_url;
            console.log(product);
            await fetch('http://localhost:5000/api/product/add-product', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(product),
            }).then((resp) => resp.json()).then((data) => {
                data.success ? alert("Product added") : alert("Failed");
            });
    
        }
    };
    return (
        <div className='addproduct'>
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
            <div className="addproduct-itemfield">
                <p>Product Category</p>
                <select
                    value={productDetails.category}
                    onChange={changeHandler}
                    name="category"
                    className='add-product-selector'
                >
                    <option>--select--</option>
                    <option value="Concrete Roofing Tiles">Concrete Roofing Tiles</option>
                    <option value="Clay Tiles">Clay Tiles</option>
                    <option value="UPVC Pipes">UPVC Pipes</option>
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
                {loading ? 'Adding...' : 'ADD'}
            </button>
        </div>
    );
};

export default AddProduct;
