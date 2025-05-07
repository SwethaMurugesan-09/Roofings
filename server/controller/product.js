import Product from "../models/Product.js";
import {v2 as cloudinary} from 'cloudinary'

export const addProduct = async(req,res)=>{
    const {name,colour,dimension,category,description,price}=req.body
    const imageFile = req.file

    if(!name || !colour || !dimension || !category || !description || !imageFile || !price)
    {
        return res.json({success:false,message:"Missing Detials"})
    }
    try{
        const imageUpload=await cloudinary.uploader.upload(imageFile.path)

        const newProduct=new Product({
            name,
            colour,
            dimension,
            category,
            description,
            price,
            image:imageUpload.secure_url
        })
        await newProduct.save()
        res.json({success:true,newProduct})
    }
    catch(error)
    {
        res.json({success:false,message:error.message})
    }
}

export const getProduct =async(req,res)=>{
    try{
        const products = await Product.find(); 
        res.json({success:true,products })
   }
   catch(error)
   {
       res.json({
           success:false,
           message:error.message
       })
   }
}

export const getProductById = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id);

        if (!product) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }

        res.json({ success: true, product }); 
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const getUniqueCategories = async (req, res) => {
    try {
        const uniqueCategories = await Product.aggregate([
            {
                $group: {
                    _id: "$category",
                    image: { $first: "$image" } 
                }
            }
        ]);

        res.json({ success: true, categories: uniqueCategories });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const removeProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }
        await Product.findByIdAndDelete(id);
        res.json({ success: true, message: "Product removed successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, colour, dimension, category, description } = req.body;
        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }
        
        if (req.file) {
            const imageUpload = await cloudinary.uploader.upload(req.file.path);
            product.image = imageUpload.secure_url;
        }
        
        product.name = name || product.name;
        product.colour = colour || product.colour;
        product.dimension = dimension || product.dimension;
        product.category = category || product.category;
        product.description = description || product.description;
        
        await product.save();
        res.json({ success: true, product });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};