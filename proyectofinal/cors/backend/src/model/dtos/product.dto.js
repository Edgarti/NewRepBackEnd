class ProductsDto{
    constructor({_id, title, price, img}){
        this.fullname = `${title} ${price}`;
        this.dni=_id;
    }
}

export const convertProductToDto = (Products)=>{
    if(Array.isArray(Products)){
        return Products.map(Products=> new ProductsDto(Products));
    } else {
        return new ProductsDto(Products);
    }
}

export {ProductsDto}