import { MongoContainer } from "./managers/mongo.managers.js";
import {UserModel} from "./dbmodel/user.model.js";
import {ProductModel} from "./dbmodel/product.model.js";

export const UserManager = new MongoContainer(UserModel);
export const ProductManager = new MongoContainer(ProductModel);


//registrar los diferentes manajer
