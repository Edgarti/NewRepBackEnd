import mongoose from "mongoose"

let  url ="mongodb+srv://kitservi:React123@codermongoatlas.n8dxdd1.mongodb.net/e-commerceDB?"

class MyMongoClient{
    constructor(){
        this.client = mongoose;
    }

    async connect(){
        try {
            await this.client.connect(url);
            console.log("Base de datos conectada");
        } catch (error) {
            throw new Error(`Error al conectar la base de datos ${error}`);
        }
    };

    async disconnect(){
        try {
            await this.client.connection.close(url);
            console.log("base de datos desconectada")
        } catch (error) {
            throw new Error(`Error al desconectarse de la base de datos ${error}`);
        }
    }
}

export {MyMongoClient}