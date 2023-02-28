import mongoose from "mongoose";

//crea tabla en la base de datos
const userCollection = "users"
const userSchema = new mongoose.Schema({
        nombre: {
            type: String,
            required: true
        },

        edad:{
            type:Number
        },
        email:{
            type: String,
            required: true,
            unique:true
        },

        password:{
            type: String,
     
        }
    },
    {
        //segundo parametro para para add
        // me retorna campo con fecha de creacion y campo con fecha actualizacion
   timestamps:true
    }

)

export const UserModel = mongoose.model(userCollection,userSchema)