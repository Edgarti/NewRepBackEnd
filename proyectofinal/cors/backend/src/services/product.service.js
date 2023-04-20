
import {getApiDao} from "../model/index.js";
import { options } from "../config/config.js";
import {convertProductToDto} from "../model/dtos/product.dto.js";
import { ProductValidation } from "../model/validations/product.validation.js";

const {UserManager, ProductManager} = await getApiDao(options.server.DB_TYPE);

class ProductService{
    static async getProductsDTO(){
        const Product = await ProductManager.getAll();
        const ProductDto = convertProductToDto(Product);
        return ProductDto;
    }

    static async getProducts(){
        const Product = await ProductManager.getAll();
        return Product;
    }

    static async saveProduct(body){
        try {
            ProductValidation.validateProduct(body,true,10); 
            return await ProductManager.save(body); 
        } catch (error) {
            throw new Error(error);
        }
    }

    static async getProduct(id){
        const Product = await ProductManager.getById(id);
        //const ProductDto = ProductValidation(Product);
        //return ProductDto;
        return Product;
    }

    static async deleteProductById(id){
        return await ProductManager.deleteById(id);
    }
};

export {ProductService}