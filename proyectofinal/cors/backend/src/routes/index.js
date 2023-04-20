import express from "express";
import { userRouter } from "./api/user.routes.js";
 import { ProductRouter } from "./api/product.routes.js";


 const router = express.Router();
router.use("/users", userRouter);
 router.use("/products", ProductRouter);

 export {router as apiRouter};