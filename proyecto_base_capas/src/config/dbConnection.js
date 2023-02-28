import mongoose from "mongoose"
import {options} from "./options.js" 

// conectar a la base de datos mongo
export const ConnectMongoDB =() =>{
    mongoose.set('strictQuery', false); //add como solucion del comentario abajo descripto
    mongoose.connect(options.mongo.url,(error)=>{
        if(error)
        return console.log('Error al conectar a la base de datos en dbConnection...')
        console.log('Conexion base de datos exitosa.')
        // luego importar  esta funcion a server.js principal
    })
}

// PS F:\coderHouse_backend\NewRepBackEnd\proyecto_base_capas\src> node server.js
// (node:6716) [MONGOOSE] DeprecationWarning: Mongoose: the `strictQuery` option will be switched back to `false` by default in Mongoose 7. Use `mongoose.set('strictQuery', false);` if you want to prepare for this change. Or use `mongoose.set('strictQuery', true);` to suppress this warning.
// (Use `node --trace-deprecation ...` to show where the warning was created)
// Server listening on port 8080
// Error al conectar a la base de datos en dbConnection...