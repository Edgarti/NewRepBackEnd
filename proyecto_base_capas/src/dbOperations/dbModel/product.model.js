import mongoose from "mongoose";

//crea tabla en la base de datos
const productCollection = "products"
const productSchema = new mongoose.Schema({
        code: {
            type: String,
            required: true,
            unique:true
        },

        title:{
            type:String,
            required: true
        },
        price:{
            type: Number,        required: true
        },

        img:{
            type: String

        }
    },
    {
        //segundo parametro para para add
        // me retorna campo con fecha de creacion y campo con fecha actualizacion
   timestamps:true
    }

)

export const ProductModel = mongoose.model(productCollection,productSchema)