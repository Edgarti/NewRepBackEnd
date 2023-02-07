//importaciones
import express from "express";
import handlebars from "express-handlebars";
import nodemon from "nodemon";
import { dirname } from "path";
import {fileURLToPath} from "url"; 
import process from 'node:process';
import os from "os"; 
import ParsedArgs from "minimist";
import {envConfig} from "./config.js"

//servidor express
const app = express();
const PORT = envConfig.PORT || 8080;
app.listen(PORT, ()=>console.log(`Server listening on port ${PORT}`));


//Recibit argumentos
const options = { alias :{ p: "port"}, default:{ port:8080}} 
//Guardar datos de la linea de comamndo
const objArguments = ParsedArgs( process.argv.slice(2), options);
//node server.js -p 8082
console.log(objArguments);

const PUERTO = objArguments.port;


//archivos estaticos
const __dirname = dirname(fileURLToPath(import.meta.url)); //ruta server.js
app.use(express.static(__dirname+"/public"));//ruta carpeta public


//motor de plantilla
//inicializar el motor de plantillas
app.engine(".hbs",handlebars.engine({extname: '.hbs'}));
//ruta de las vistas
app.set("views", __dirname+"/views");
//vinculacion del motor a express
app.set("view engine", ".hbs");
//interpretacion de formato json desde el cliente
app.use(express.json()); //lectura de json desde el cuerpo de la peticion.
app.use(express.urlencoded({extended:true})); //lectura de json desde un metodo post de formulario
//rutas asociadas a las paginas del sitio web
app.get("/",(req,res)=>{
    res.render("home")
});

app.get("/info",(req,res)=>{
    res.send({"Argumento de entrada":"",
    "Sistema operativo":process.platform,
    "Version de node":process.version,
    "Memoria total":process.memoryUsage(),
    "Path de ejecucion":process.execPath,
    "proceso id":process.getegid,
    "carpeta del proyecto":process.cwd(),
    })
});


app.get("/randoms/:num",(req,res)=>{

    console.log(`numero aleatorio ${req.params.num}`)
    const num = parseInt(req.params.num)
    console.log(`despues del parse: ${req.params.num}`)
    const lis=[]
    for(let n=0; n<num; n++){
    let listaNumero = Math.floor(Math.random() * (num - 1 + 1) + 1);
    console.log(`Numero aleratorio: ${listaNumero}`)
    lis.push(listaNumero);
    }
    // res.render("randoms")
    res.send((lis))
});

app.get("/randoms",(req,res)=>{

  console.log("Calcular 100.000.000 de números rando")

  const num = 50000
  const lis=[]
  for(let n=0; n<num; n++){
  let listaNumero = Math.floor(Math.random() * (num - 1 + 1) + 1);
  console.log(`Numero aleratorio: ${listaNumero}`)
  lis.push(listaNumero);

  }
  res.send((lis))
});
