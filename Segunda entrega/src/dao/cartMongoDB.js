import { mongoDBContainer } from "../container/mongoDBContainer.js";
import { cartModel } from "../models/cartModel.js"

export class cartMongo extends mongoDBContainer{
    constructor(){
        super({
            name: cartModel.cartCollection,
            schema: cartModel.cartSchema
        })
    }
    async getById(id) {
        const response = await this.model.findById(id).populate("products");
    
        return response;
      }
};