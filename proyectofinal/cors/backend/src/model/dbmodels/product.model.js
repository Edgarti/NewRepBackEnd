import mongoose from "mongoose";

const productCollection = "products";

const productSchema = new mongoose.Schema(
    {
        title:{
            type:String,
            required:true
        },
        price:{
            type:Number,
            required:true
        },
        category:{
            type: String,
            required:true,
        },
       Img:{
            type: String,
        },
    },
    {
        timestamps:true
    }
);

export const ProductModel = mongoose.model(productCollection,productSchema);