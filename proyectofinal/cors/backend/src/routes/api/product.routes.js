import express from "express";
import { ProductController } from "../../controllers/product.controller.js";

const router = express.Router();

router.get("/dto", ProductController.getProductsDto);
router.get("/", ProductController.getProducts);
router.post("/", ProductController.saveProduct);
router.get("/:id", ProductController.getProduct);
router.delete("/:id", ProductController.deleteProduct);

export {router as ProductRouter};