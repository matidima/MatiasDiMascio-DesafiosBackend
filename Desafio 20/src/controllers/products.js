import { ProductDao } from '../daos/index.js'
import { getTimestamp } from "../utils/date.js";

const getAll = async ctx => {
    try {
        ctx.body = await ProductDao.getAll()
    } catch (error) {
        console.log("getAll error:" + error )
        ctx.body( "Productos no encontrados" )
    }
}

const getById = async ctx => {
    try {
        const { id } = ctx.params
        const product = await ProductDao.getById(id)
        if (!product) {
            return ctx.body({ success: false, message: "Producto no encontrado" })
        }
        ctx.body('product-id', { producto: product })
    } catch (error) {
        console.log("getById error:" + error )
        ctx.body( "Producto no encontrado" )
    }
}

const createProduct = async ctx => {
    try {
        const { title, description, code, price, thumbnail, stock } = ctx.request.body

        const product = { title, description, code, price, thumbnail, stock, timestamp: getTimestamp() }
        await ProductDao.save(product)
        ctx.body({ producto: product })

    } catch (error) {
        console.log("createProduct error:" + error )
        ctx.body( "Producto no encontrado" )
    }
}

const deleteProduct = async ctx => {
    try {
        const { id } = ctx.params
        const product = await ProductDao.deleteById(id)

        if (!product) {
            return ctx.body({ success: false, data: undefined, message: "Producto no encontrado" })
        }
        ctx.body({ producto: product})
    } catch (error) {
        console.log("deleteProduct error:" + error )
        ctx.body( "Producto no encontrado" )
    }

}

export const ProductController = { getAll, getById, createProduct, deleteProduct }