import express from "express";
import { ProductController } from "../../controllers/product.controller.js";



const router = express.Router();

// router.get("/",(req,res)=>{
//     res.send("productos")
// });

router.get("/", ProductController.getUsers);
router.post("/", ProductController.saveUser);
router.get("/:id", ProductController.getUser);

export {router as productRouter};





