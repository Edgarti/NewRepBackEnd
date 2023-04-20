// import { UserManager } from "../model/index.js";
import {getApiDao} from "../model/index.js";
import { options } from "../config/config.js";
import {convertUserToDto} from "../model/dtos/user.dto.js";
import { UserValidation } from "../model/validations/user.validation.js";

const {UserManager, ProductManager} = await getApiDao(options.server.DB_TYPE);

class UserService{
    static async getUsersDTO(){
        const users = await UserManager.getAll();
        const usersDto = convertUserToDto(users);
        return usersDto;
    }

    static async getUsers(){
        const users = await UserManager.getAll();
        return users;
    }

    static async saveUser(body){
        try {
            UserValidation.validateUser(body,true,10); 
            return await UserManager.save(body); 
        } catch (error) {
            throw new Error(error);
        }
    }

    static async getUser(id){
        const user = await UserManager.getById(id);
        const userDto = convertUserToDto(user);
        return userDto;
    }

    static async deleteUserById(id){
        return await UserManager.deleteById(id);
    }
};

export {UserService}