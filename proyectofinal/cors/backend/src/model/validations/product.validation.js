import joi from "joi";

class ProductValidation{
    static validateProduct(product, nameRequired, maxCategoria){
        const productSchemaValidation = joi.object({
            title: nameRequired ? joi.string().required() : joi.string(),
            price: joi.required(),
            category: maxCategoria ? joi.string().max(maxCategoria) : joi.string(),
            img: joi.required(),
        });
        const {error} = productSchemaValidation.validate(product);
        if(error) {
            throw new Error(error);
        }
    }
}

export {ProductValidation}