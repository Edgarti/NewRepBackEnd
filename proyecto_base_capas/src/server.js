// levantar el servidor 
import express from "express";
//Importa funcion coneccion base de datos  
import { ConnectMongoDB } from "./config/dbConnection.js";
//Vinculara las rutas 
import {router} from "./routes/index.js";


ConnectMongoDB();
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));


app.use("/api", router);

const PORT = process.env.PORT || 8080;
app.listen(PORT,()=>console.log(`Server listening on port ${PORT}`));

//probar el server src/node server.js

//instalar mongoose 
//ir al portal del mongo atlas coneccion y copiar la cadena y alterar los capos constraseña y base de datos