// // levantar el servidor 
// import express from "express";

// //Importa funcion coneccion base de datos  
// import { ConnectMongoDB } from "./config/dbConnection.js";
// //Vinculara las rutas 
// import {apiRouter} from "./routes/index.js";


// ConnectMongoDB();
// const app = express();
// app.use(express.json());
// app.use(express.urlencoded({extended:true}));


// app.use("/api", router);

// const PORT = process.env.PORT || 8080;
// app.listen(PORT,()=>console.log(`Server listening on port ${PORT}`));



import express from "express";
// import handlebars from "express-handlebars";
import path from "path";

import { options } from "./config/config.js";
import __dirname from "./utils.js";
import { apiRouter } from "./routes/index.js";

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));

//configurar nuestro motor de plantillas
// app.engine("hbs",handlebars.engine({extname:".hbs"}));
// app.set("views", path.join(__dirname, "/views"));
// app.set("view engine", "hbs");

app.use(apiRouter);

const PORT = options.server.PORT;
app.listen(PORT,()=>console.log(`Server listening on port ${PORT}`));