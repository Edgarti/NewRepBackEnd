//comunicar la capa de persistencia con servicios
//se crea esta capa tambien para otras operaciones 
//sobre la respuesa que estoy recibiendo
import { UserManager } from "../dbOperations/index.js";

class UserService{
    static async getUsers(){
        return await UserManager.getAll();
    }

    static async saveUser(body){
        return await UserManager.save(body)
    }

    static async getUser(id){
        return await UserManager.getById(id)
    }
    // async getOlderUsers(){
    //     const users = await UserManager.getAll("andres");
    //     return olderUsers
    // }
};

export {UserService}