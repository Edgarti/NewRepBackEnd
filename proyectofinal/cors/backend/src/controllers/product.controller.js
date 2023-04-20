
import { ProductService } from "../services/product.service.js";


class ProductController{

    static async getProductsDto(_req,res){
        try {
            const users = await ProductService.getProductsDTO();
            res.status(200).json({
                status:"SUCCESS",
                data:users
            });
        } catch (error) {
            res.status(400).json({
                status:"ERROR",
                message:`Hubo un error ${error}`
            });
        }
    }

    static async getProducts(_req,res){
        try {
            const products = await ProductService.getProducts();
            res.status(200).json({
                status:"SUCCESS",
                data:products
            });
        } catch (error) {
            res.status(400).json({
                status:"ERROR",
                message:`Hubo un error ${error}`
            });
        }
    }

    static async saveProduct(req,res){
        try {
            const response = await ProductService.saveProduct(req.body);
            // res.redirect("/users");
            res.status(200).json({
                status:"SUCCESS",
                data: response
            });
        } catch (error) {
            res.status(400).json({
                status:"ERROR",
                message:`Hubo un error ${error}`
            });
        }
    }

    static async getProduct(req,res){
        try {
            const response = await ProductService.getProduct(req.params.id);
            res.status(200).json({
                status:"SUCCESS",
                data:response
            });
        } catch (error) {
            res.status(400).json({
                status:"ERROR.",
                message:`Hubo un error..: ${error}`
            });
        }
    }

    static async deleteProduct(req,res){
        try {
            const response = await ProductService.deleteProductById(req.params.id);
            res.status(200).json({
                status:"SUCCESS",
                message: response
            });
        } catch (error) {
            res.status(400).json({
                status:"ERROR",
                message:`Hubo un error ${error}`
            });
        }
    }

}

export {ProductController}