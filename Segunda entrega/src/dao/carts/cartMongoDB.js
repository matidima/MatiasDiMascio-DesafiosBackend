import { mongoDBContainer } from "../../container/mongoDBContainer.js";
import { cartCollection, cartSchema } from "../../models/cartModel.js"

export class cartMongo extends mongoDBContainer{
    constructor(){
        super({
            name: cartCollection,
            schema: cartSchema
        })
    }
    async getById(id) {
        const response = await this.model.findById(id).populate("products");
    
        return response;
      }
};