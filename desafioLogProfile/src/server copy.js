import express from "express";
import handlebars from "express-handlebars";
import {Server} from "socket.io";
import path from "path";
import {fileURLToPath} from 'url';
import session from "express-session";
import cookieParser from "cookie-parser";
import MongoStore from "connect-mongo";
import { dbOptions } from "./config/dbConfig.js";
import  cluster from "cluster";
import os from "os";   
import  ParsedArgs from "minimist";
import { productRouter } from "./routes/api/products.js";
import { clientRouter } from "./routes/web/clientRoutes.js";
import { authRouter } from "./routes/web/authRouter.js";
import { productsSocket } from "./routes/ws/products.js";
import { chatSocket } from "./routes/ws/chat.js";
import compression from "compression"
import log4js from "log4js"



const options = { alias :{ p: "port", m:"modo"}, default:{modo:"FORK", port:8080}} 
const objArguments = ParsedArgs( process.argv.slice(2), options);
console.log(objArguments);

const PORT = objArguments.port;
const MODO = objArguments.mode;

const numeroCpu = os.cpus.length;

if(MODO === "CLUSTER" && cluster.isPrimary){
    for( let i=0; i< numeroCpu; i++){
        cluster.fork()
    }

    cluster.on("exit",(worker)=>{
        console.log(`El proceso ${worker.process.pid} dejo de trabajar`);
        cluster.fork()
    })
}else{
    
    app.get("/info/saludo",(req,res)=>{
        res.send("Proceso sin Compresion".repeat(15000))
    })

    app.get("/info/saludoZip",compression(),(req,res)=>{
        res.send(" Proceso Con Compresion ".repeat(15000))
    })
}



const __dirname = path.dirname(fileURLToPath(import.meta.url));

//Compression para todas las rutas
//app.use(compression())
//node server.js -p 8082
// const port = patseInt(process.argv(2)) || 8080;
// const modo = process.argv(3)) || "FORK";
// node server.js -p 8082 CLUSTER
//Express server

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(__dirname+"/public"));

//Configuracion template engine handlebars
app.engine(".hbs",handlebars.engine({extname: '.hbs'}));
app.set('views', __dirname+'/views');
app.set("view engine", ".hbs");

app.use(cookieParser());
//confiugracion de session
app.use(session({
    store: MongoStore.create({
        mongoUrl: dbOptions.mongoAtlasSessions.urlDatabase
    }),
    secret:"claveSecreta",
    //indicamos un almacenamiento externo
    resave: false,
    saveUninitialized: false
}));


// Server routes
// Api routes
app.use('/api/productos',productRouter);
//view routes
app.use(clientRouter);
app.use(authRouter);

// routes Compresion

// app.get("/info/saludo",(req,res)=>{
//     res.send("Proceso sin Compresion".repeat(15000))
// })

// app.get("/info/saludoZip",compression(),(req,res)=>{
//     res.send(" Proceso Con Compresion ".repeat(15000))
// })

//configuracion de log4js
log4js.configure({
    appenders:{
        //definir las salidas de datos->como mostrar y almacenar los registros
        //consola:{type:"console"},//los mensajes se muestran por consola
        archivo:{type:"file",filename:"./logs/warn.txt"},
        archivoError:{type:"file",filename:"./logs/error.txt"}
    },
    categories:{
        //default:{appenders:['consola', 'archivo'], level:'warn'},
        default:{appenders:['archivo'], level:'warn'},
        errores:{appenders:['archivoError'], level:'error'}
    }
});
//definir la categoria que vamos a utilizar para los mensajes(logs)

const loggers = log4js.getLogger();//logger va a rempl
loggers.trace("imprimendo nivel trace");
loggers.debug("imprimendo nivel debug");
loggers.fatal("imprimendo nivel fatal");
loggers.warn("imprimendo nivel warn");
loggers.error("imprimendo nivel error");
loggers.info("imprimendo nivel info");

const logger = log4js.getLogger("errores");//logger va a rempl
logger.trace("imprimendo nivel trace");
logger.debug("imprimendo nivel debug");
logger.fatal("imprimendo nivel fatal");
logger.warn("imprimendo nivel warn");
logger.error("imprimendo nivel error");
logger.info("imprimendo nivel info");




//logica cluster
//utilizando PM2
if(MODO === "cluster" && cluster.isPrimary){
    const numCpus= os.cpus().length;
    console.log(`numero de nucleos de procesadores ${numCpus}`)
    for(let i=0 ; i<numCpus; i++ ){
        cluster.fork();
    }
    cluster.on('exit',(worker)=>{
         console.log(` el proceso ${worker.process.pid} ha dejado de funcionar`);
         cluster.fork();
    })
}else{
//Express server
const server = app.listen(PORT,()=>{
    console.log(`listening on port  ${PORT} on process ${process.pid}`)
});

//Websocket server
const io = new Server(server);
//configuracion websocket
io.on("connection",async(socket)=>{
    // console.log('Nuevo cliente conectado!');
    //PRODUCTOS
    productsSocket(socket, io.sockets);
    //CHAT
    chatSocket(socket, io.sockets);
});
}




