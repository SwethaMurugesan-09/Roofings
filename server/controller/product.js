import Product from "../models/Product.js";
import {v2 as cloudinary} from 'cloudinary'

export const addProduct = async(req,res)=>{
    const {name,colour,dimension,category,description}=req.body
    const imageFile = req.file

    if(!name || !colour || !dimension || !category || !description || !imageFile)
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
