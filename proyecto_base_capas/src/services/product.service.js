//comunicar la capa de persistencia con servicios
//se crea esta capa tambien para otras operaciones 
//sobre la respuesa que estoy recibiendo
import { ProductManager } from "../dbOperations/index.js";

class ProductService{
    static async getUsers(){
        return await ProductManager.getAll();
    }

    static async saveUser(body){
        return await ProductManager.save(body)
    }

    static async getUser(id){
        return await ProductManager.getById(id)
    }
    // async getOlderUsers(){
    //     const users = await UserManager.getAll("andres");
    //     return olderUsers
    // }
};

export {ProductService}