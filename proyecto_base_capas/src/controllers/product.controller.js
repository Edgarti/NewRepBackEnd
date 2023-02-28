import { ProductService } from "../services/product.service.js";


class ProductController{

    static async getUsers(req,res){
        try {
            const response = await ProductService.getUsers();
            res.status(200).json({
                status:"SUCCESS",
                data:response
            });
        } catch (error) {
            res.status(400).json({
                status:"ERROR...",
                message:`Hubo un error ${error}`
            });
        }
    };

    static async saveUser(req,res){
        try {
            const response = await ProductService.saveUser(req.body);
            res.status(200).json({
                status:"SUCCESS",
                data:response
            });
        } catch (error) {
            res.status(400).json({
                status:"ERROR",
                message:`Hubo un error ${error}`
            });
        }
    };

    static async getUser(req,res){
        try {
            const response = await ProductService.getUser(req.params.id);
            res.status(200).json({
                status:"SUCCESS",
                data:response
            });
        } catch (error) {
            res.status(400).json({
                status:"ERROR",
                message:`Hubo un error ${error}`
            });
        }
    };

}

export {ProductController}