import { mongoDBContainer } from "../containers/mongoDBContainer.js";
import { ProductModel } from "../models/products.js";

export class ProductsMongo extends mongoDBContainer {
    constructor() {
        super({
            name: ProductModel.ProductCollection,
            schema: ProductModel.ProductSchema,
        })
    }
}