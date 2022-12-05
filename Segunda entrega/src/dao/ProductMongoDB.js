import { mongoDBContainer } from "../container/mongoDBContainer.js";
import { productCollection, productSchema } from "../models/productModel.js";

export class productsMongo extends mongoDBContainer{
    constructor(){
        super({
            name: productCollection,
            schema: productSchema
        })
    }
}