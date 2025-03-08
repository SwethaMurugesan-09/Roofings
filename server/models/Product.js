import mongoose from "mongoose";

const productSchema=new mongoose.Schema({
    name:{type:String, required:true},
    colour:{type:String, required:true},
    dimension:{type:String,required:true},
    category:{type:String,required:true},
    description:{type:String},
    image:{type:String, required:true},

})

const Product=mongoose.model('Product',productSchema)

export default Product;