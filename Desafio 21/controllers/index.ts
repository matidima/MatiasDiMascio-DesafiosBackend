import { ObjectId } from "../deps.ts";
import { productDB } from '../db/index.ts'
import { IProduct } from "../types/products.ts";

export const findProducto = async(ctx: { response: { body: { evento?: string; data?: IProduct[]; success?: boolean; msg?: any; }; }; }) =>{
    try{
        const allProduct = await productDB.find({}).toArray();
        ctx.response.body = { evento: 'find', data:allProduct}
    }
    catch(err){
        ctx.response.body = {
            success: false,
            msg: err.toString(),
          };
    }
}
export const deleteProducto = (ctx: { response: { body: { evento: string; }; }; }) =>{
    ctx.response.body = { evento: 'delete'}
}
export const createProducto = async(ctx: { request: { body: () => any; }; response: { body: { evento?: string; success?: boolean; msg?: any; }; }; }) =>{
    try{

        const productoSync = await ctx.request.body();
        const producto = await productoSync.value;
        producto._id=await ObjectId.generate()
        console.log({producto})
        await productDB.insertOne(producto)
        ctx.response.body = { evento: 'create'}
    }
    catch(err){
        console.log(err)
        ctx.response.body = {
            success: false,
            msg: err.toString(),
          };
    }
}
export const updateProducto = (ctx: { response: { body: { evento: string; }; }; }) =>{
    ctx.response.body = { evento: 'update'}
}